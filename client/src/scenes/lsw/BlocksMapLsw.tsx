import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { tokens } from "../../theme";
import lswinfo from "./lswmodelinfo";
import { useState, useEffect } from "react";
import axios from "axios";
import PortsMap from "./PortsMapLsw";
import RackIcon from "../../components/RackIcon";
import { useSpring, animated } from "react-spring";

const BlocksMapLsw = ({
  parentCallback,
  selecteLsw,
}: {
  selecteLsw: any;
  parentCallback: (childData: any) => void;
}) => {
  const theme = useTheme();
  const [lswblocksList, setlswBlocksList] = useState<any[]>([]);
  const colors = tokens(theme.palette.mode);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [lswblockState, setlswBlockState] = useState({});
  // State variable to track data loading status

  function getPort(childData: any) {
    parentCallback(childData);
  }

  const enableBlock = async (blockId: number) => {
    try {
      await axios.put(`http://localhost:3001/updatelswblocks/${blockId}`, {
        state: 1,
      });
      console.log("Block state updated");
      setlswBlockState({ ...lswblockState, [blockId]: 1 });
    } catch (error) {
      console.error(error);
    }
  };

  const getlswBlocks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/lswblocks/${selecteLsw.id}`
      );
      setlswBlocksList(response.data);
      console.log(selecteLsw);
    } catch (error) {
      console.error(error);
    }
  };
  const createlswBlocks = async (props: any, i: any, length: any) => {
    await axios.post("http://localhost:3001/createlswblock", {
      name: `${props.name}-${i}`,
      lswid: props.id,
      state: false,
      slot: i,
      length: length,
    });
    console.log("Block Created");
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
          padding={"20px"}
          justifyContent="center"
          alignItems="center"
          flexDirection={"column"}
          key={data.id}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <RackIcon />

          <animated.div style={{ color }}>{data.name}</animated.div>
          <Button
            style={{
              backgroundColor: bg,
              transition: "background-color 0.2s ease-in-out",
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
    transform: isDataLoaded ? "translateY(0)" : "translateY(50px)",
  });

  async function handleEnableClick(props: any) {
    await enableBlock(props.id);
  }

  async function check() {
    let modelInfo = lswinfo.find(
      (model: any) => model.modelname === selecteLsw.model
    );
    if (modelInfo) {
      if (lswblocksList.length === 0) {
        console.log("No lswblocks Found, Creating lswBlocks...");
        for (let i = 0; i < modelInfo.blocksnumber; i++) {
          await createlswBlocks(selecteLsw, i, modelInfo.blockorder);
        }
        await getlswBlocks();
        setIsDataLoaded(true); // Set data loading status to true
      } else {
        setIsDataLoaded(true); // Set data loading status to true
      }
    } else {
      setIsDataLoaded(false); // Set data loading status to true
    }
  }
  return (
    <Box
      display="flex"
      minHeight={"33vh"}
      flexDirection="row"
      style={{ overflow: "hidden", overflowX: "scroll" }}
    >
      {isDataLoaded ? (
        // Conditionally render JSX based on data loading status
        <animated.div style={dataAnimation}>
          <Box display={"flex"} flexDirection={"row"}>
            {dataComp}
          </Box>
        </animated.div>
      ) : (
        <Box
          sx={{
            m: 1,
            border: 1,
            borderRadius: "10px",
            borderColor: colors.primary[100],
          }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          width={"100%"}
        >
          <Typography textAlign={'center'} variant="h3" color={colors.blueAccent[200]}>
            Waiting for selection...
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default BlocksMapLsw;
