import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { tokens } from "../../theme";
import info from "./modelinfo";
import { useState, useEffect } from "react";
import axios from "axios";
import PortsMap from "./PortsMap";

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

  const dataComp = blocksList.map((data) => {
    if (data.state === 1) {
      return (<PortsMap key={data.id} block={data} parentCallback={getPort}/>
      );
    } else {
      return (
        <Box flexDirection={'column'} key={data.id}>
          <Typography>{data.name}</Typography>
          <Button 
          onClick={() => handleEnableClick(data)}>enable</Button>
        </Box>
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
    <Box display="flex" height={'77vh'} flexDirection="column" 
    style={{ overflow: "hidden", overflowY: "scroll" }}>
      {isDataLoaded ? ( // Conditionally render JSX based on data loading status
        <Box>{dataComp}</Box>    ) : (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <Typography>Loading data...</Typography>
          </Box>
        )}
    </Box>
    );
  };
  
  export default BlocksMap;