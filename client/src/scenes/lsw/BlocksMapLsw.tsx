import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import { tokens } from '../../theme';
import lswinfo from './lswmodelinfo';
import axios from 'axios';
import PortsMap from './PortsMapLsw';
import RackIcon from '../../components/RackIcon';
import { useSpring, animated } from 'react-spring';

interface Block {
  id: string;
  state: number;
  name: string;
}

interface Lsw {
  id: string;
  model: string;
}

interface Props {
  parentCallback: (childData: any) => void;
  selecteLsw: Lsw;
}

const BlocksMapLsw: React.FC<Props> = ({ parentCallback, selecteLsw }) => {
  const theme = useTheme();
  const [lswblocksList, setlswBlocksList] = useState<Block[]>([]);
  const colors = tokens(theme.palette.mode);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [lswblockState, setlswBlockState] = useState<{ [key: string]: number }>({});

  function getPort(childData: any) {
    parentCallback(childData);
  }

  const enableBlock = async (blockId: string) => {
    try {
      await axios.put(`/api/updatelswblocks/${blockId}`, {
        state: 1,
      });
      console.log('Block state updated');
      setlswBlockState({ ...lswblockState, [blockId]: 1 });
    } catch (error) {
      console.error(error);
    }
  };

  const getlswBlocks = async () => {
    try {
      const response = await axios.get<Block[]>(
        `/api/lswblocks/${selecteLsw.id}`
      );
      setlswBlocksList(response.data);
      console.log(selecteLsw);
    } catch (error) {
      console.error(error);
    }
  };

  const createlswBlocks = async (props: any, i: number, length: number) => {
    await axios.post('/api/createlswblock', {
      name: `${props.name}-${i}`,
      lswid: props.id,
      state: false,
      slot: i,
      length: length,
    });
    console.log('Block Created');
  };

  useEffect(() => {
    console.log(selecteLsw);
    getlswBlocks();
  }, [selecteLsw]);

  useEffect(() => {
    check();
  }, [lswblocksList, lswblockState]);

  useEffect(() => {
    getlswBlocks();
  }, [lswblockState]);

  const AnimatedBox = animated(Box);
  const boxAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 500,
    reverse: !AnimatedBox,
    reset: !AnimatedBox,
  });

  const [hovered, setHovered] = useState(false);
  const { color, bg } = useSpring({
    color: hovered ? colors.blueAccent[100] : colors.greenAccent[900],
    bg: hovered ? colors.greenAccent[900] : colors.blueAccent[700],
  });

  const dataComp = lswblocksList.map((data) => {
    if (data.state === 1) {
      return <PortsMap key={data.id} block={data} parentCallback={getPort} />;
    } else {
      return (
        <AnimatedBox
          style={boxAnimation}
          display="flex"
          padding="20px"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          key={data.id}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          sx={{
            border: 1,
            borderRadius: '10px',
            borderColor: colors.primary[100],
            margin: '10px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <RackIcon />
          <animated.div style={{ color }}>{data.name}</animated.div>
          <Button
            style={{
              backgroundColor: bg,
              transition: 'background-color 0.2s ease-in-out',
              marginTop: '10px',
            }}
            onClick={() => handleEnableClick(data)}
          >
            Mount Rack
          </Button>
        </AnimatedBox>
      );
    }
  });

  const dataAnimation = useSpring({
    opacity: isDataLoaded ? 1 : 0,
    transform: isDataLoaded ? 'translateY(0)' : 'translateY(50px)',
  });

  async function handleEnableClick(props: Block) {
    await enableBlock(props.id);
  }

  async function check() {
    let modelInfo = lswinfo.find(
      (model) => model.modelname === selecteLsw.model
    );
    if (modelInfo) {
      if (lswblocksList.length === 0) {
        console.log('No lswblocks Found, Creating lswBlocks...');
        for (let i = 0; i < modelInfo.blocksnumber; i++) {
          await createlswBlocks(selecteLsw, i, modelInfo.blockorder);
        }
        await getlswBlocks();
        setIsDataLoaded(true);
      } else {
        setIsDataLoaded(true);
      }
    } else {
      setIsDataLoaded(false);
    }
  }

  return (
    <Box
      display="flex"
      minHeight="33vh"
      flexDirection="row"
      style={{ overflow: 'hidden', overflowX: 'scroll' }}
    >
      {isDataLoaded ? (
        <animated.div style={dataAnimation}>
          <Box display="flex" flexDirection="row">
            {dataComp}
          </Box>
        </animated.div>
      ) : (
        <Box
          sx={{
            m: 1,
            border: 1,
            borderRadius: '10px',
            borderColor: colors.primary[100],
            margin: '10px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <Typography textAlign="center" variant="h3" color={colors.blueAccent[200]}>
            En attente d'une sélection...
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default BlocksMapLsw;
