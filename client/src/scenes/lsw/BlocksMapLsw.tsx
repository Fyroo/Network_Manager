import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { tokens } from "../../theme";
import lswinfo from "./lswmodelinfo";
import { useState, useEffect } from "react";
import axios from "axios";
import PortsMap from "./PortsMapLsw";

const BlocksMapLsw = ({ parentCallback ,selecteLsw}: { selecteLsw:any;parentCallback: (childData: any) => void }) => {
  const theme = useTheme();
  const [lswblocksList, setlswBlocksList] = useState<any[]>([]);
  const colors = tokens(theme.palette.mode);
  const [isDataLoaded, setIsDataLoaded] = useState(false); 
  const [lswblockState, setlswBlockState] = useState({});
  // State variable to track data loading status

  function getPort(childData:any){
    parentCallback(childData);
  };

  const enableBlock = async (blockId: number) => {
    try {
      await axios.put(`http://localhost:3001/updatelswblocks/${blockId}`, { state: 1 });
      console.log('Block state updated');
      setlswBlockState({ ...lswblockState, [blockId]: 1 });
    } catch (error) {
      console.error(error);
    }
  };

  const getlswBlocks = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/lswblocks/${selecteLsw.id}`);
      setlswBlocksList(response.data);
      console.log(selecteLsw)
    } catch (error) {
      console.error(error);
    }
  };
  const createlswBlocks = async (props:any,i:any,length:any) => {
    await axios.post("http://localhost:3001/createlswblock", 
    { name: `${props.name}-${i}`, lswid: props.id, state: false ,slot:i,length:length});
   console.log('Block Created');
 };

  useEffect(() => {
    console.log(selecteLsw)
    getlswBlocks();
  }, [selecteLsw]);

  useEffect(() => {
    check();
  }, [lswblocksList, lswblockState]);

  useEffect(() => {
    getlswBlocks();
    
  }, [lswblockState]);

  const dataComp = lswblocksList.map((data) => {
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
    let modelInfo = lswinfo.find((model: any) => model.modelname === selecteLsw.model);
    if (modelInfo) {
      if (lswblocksList.length === 0) {
        console.log('No lswblocks Found, Creating lswBlocks...');
        for (let i = 0; i < modelInfo.blocksnumber; i++) {
          await createlswBlocks(selecteLsw, i,modelInfo.blockorder);
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
    <Box display="flex" height="34vh" flexDirection="column" 
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
  
  export default BlocksMapLsw;