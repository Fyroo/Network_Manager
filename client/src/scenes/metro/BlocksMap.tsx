import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { tokens } from "../../theme";
import info from "./modelinfo";
import { useState, useEffect } from "react";
import axios from "axios";
import PortsMap from "./PortsMap";
import { useSpring, animated } from "react-spring";
import RackIcon from "../../components/RackIcon";


const BlocksMap = ({ parentCallback ,selectedMetro}: { selectedMetro:any;parentCallback: (childData: any) => void }) => {
  const theme = useTheme();
  const [blocksList, setBlocksList] = useState<any[]>([]);
  const colors = tokens(theme.palette.mode);
  const [isDataLoaded, setIsDataLoaded] = useState(false); 
  const [blockState, setBlockState] = useState({});
  // State variable to track data loading status
  function getPort(childData:any){
    parentCallback(childData);
  };
  const dataAnimation = useSpring({
    opacity: isDataLoaded ? 1 : 0,
    transform: isDataLoaded ? "translateY(0)" : "translateY(50px)",
  });
  const enableBlock = async (blockId: number) => {
    try {
      await axios.put(`http://localhost:3001/updateblocks/${blockId}`, { state: 1 });
      console.log('Block state updated');
      setBlockState({ ...blockState, [blockId]: 1 });
    } catch (error) {
      console.error(error);
    }
  };
  const getBlocks = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/blocks/${selectedMetro.id}`);
      setBlocksList(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const createBlocks = async (props:any,i:any,length:any) => {
    await axios.post("http://localhost:3001/createblock", 
    { name: `${props.name}-${i}`, metroid: props.id, state: false ,slot:i,length:length});
   console.log('Block Created');
 };

  useEffect(() => {
    getBlocks();
  }, [selectedMetro]);

  useEffect(() => {
    check();
  }, [blocksList, blockState]);

  useEffect(() => {
    getBlocks();
    
  }, [blockState]);
  const AnimatedBox = animated(Box);
  const boxAnimation = useSpring({
    from: { opacity: 0, },
    to: { opacity: 1,},
    delay: 500,
    reverse: !AnimatedBox,
    reset: !AnimatedBox,
  });
  const [hovered, setHovered] = useState(false);
  const { color, bg } = useSpring({
    color: hovered ? colors.blueAccent[700] : colors.greenAccent[300],
    bg: hovered ? colors.greenAccent[900] : colors.blueAccent[700],
  });
  const dataComp = blocksList.map((data) => {
    if (data.state === 1) {
      return (
        <PortsMap key={data.id} block={data} parentCallback={getPort}/>
      );
    } else {
      return (
        
        <AnimatedBox 
        display='flex' 
        padding={'20px'}
        justifyContent="center" 
        alignItems="center" 
        style={boxAnimation} 
        flexDirection={'column'} 
        key={data.id} 
        onMouseEnter={() => setHovered(true)}
         onMouseLeave={() => setHovered(false)}>

          <animated.div 
          style={{ color }}>
            {data.name}
            </animated.div>
          <RackIcon/>
          <Button 
            onClick={() => handleEnableClick(data)} 
            style={{
              backgroundColor: bg,
              transition: "background-color 0.2s ease-in-out",
            }}
          >
            Mount Rack
          </Button>
        </AnimatedBox>
      );
    }
  });


    async function handleEnableClick(props:any) {   
    await enableBlock(props.id);
  };


  async function check() {
    let modelInfo = info.find((model: any) => model.modelname === selectedMetro.model);
    if (modelInfo) {
      if (blocksList.length === 0) {
        console.log('No blocks Found, Creating Blocks...');
        for (let i = 0; i < modelInfo.blocksnumber; i++) {
          await createBlocks(selectedMetro, i,modelInfo.blockorder[i]);
        }
        await getBlocks();
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
      height="34vh" 
      flexDirection="column" 
      style={{ overflow: "hidden", overflowY: "scroll" }}
    >
      {isDataLoaded ? ( // Conditionally render JSX based on data loading status
      <animated.div style={dataAnimation}>
      <Box display={"flex"} 
      flexDirection={"column"}>
        {dataComp}
      </Box>
      </animated.div>
      ) : (
        <Box
        sx={{ m:1, border: 1 ,borderColor: colors.primary[100], borderRadius: "10px"}}
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={'100%'}
        >
          <Typography textAlign={'center'} variant="h3" color={colors.blueAccent[200]}>Waiting for selection...</Typography>
        </Box>
      )}
    </Box>
  );
};

export default BlocksMap;