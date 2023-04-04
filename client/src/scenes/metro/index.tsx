import { Box, typography,useTheme } from "@mui/system";
import { tokens} from "../../theme";
import Header from "../../components/Header"
import NetworkChart from "./NetworkChart";
import { IconButton, Typography } from "@mui/material";
import MetroArray from "./MetroArray";
import ServerRack from "../../components/ServerRack";
import { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Metro = () => {
  
  const theme = useTheme();
  const colors =tokens(theme.palette.mode)
  const [routerName, setRouterName] = useState("No Router Selected");

  const [metroList, setMetroList] = useState([]);
  const getMetro = () =>{
    axios.get("http://localhost:3001/metro").then((response)=>{
    setMetroList(response.data)
    });

  }
  useEffect(() => {
    getMetro();
  }, []);


  function callbackFunction(childData:any){
    console.log(childData.name);
    setRouterName(childData.name)
  };
    return <Box m={"20px"}>
      <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
      <Header title="Metro" subtitle="Description"/>
      </Box> 
      <Box
      
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridColumn={12}
      gridAutoRows="14vh"
      gap="23px">
      
      <Box gridColumn="span 8" gridRow="span 3" style={{ backgroundColor:colors.blueAccent[500]}}>
        <Box  pt={"10px"} sx={{backgroundColor:colors.blueAccent[800]}}
        justifyContent="space-between" alignContent={"center"}>
        <Typography p= "10px 25px 15px" variant="h5" fontWeight="600" color={colors.grey[100]}>
          Reseax Metro Ariana
        </Typography>
        </Box>
      
          <NetworkChart/>
          
          
      </Box>  
      <Box display="felx" gridColumn="span 4" gridRow="span 4"  alignContent="center">
      <Box display={"flex"}pr={'5px'} pt={"10px"} flexDirection={'row'} sx={{backgroundColor:colors.blueAccent[800]}}
        justifyContent="space-between" alignContent={"center"} >
          
          <Typography p= "10px 25px 15px" variant="h5" fontWeight="600" color={colors.grey[100]}>
          {routerName}
        </Typography>
          
        <Box   justifyContent="space-between">
        
        <IconButton aria-label="delete" sx={{color:colors.grey[400]}}>
          <EditIcon/>
        </IconButton>
        <IconButton aria-label="edit" sx={{color:colors.redAccent[400]}}>
          <DeleteIcon/>
        </IconButton>

        </Box>

        </Box>
        
        <Box p= "5px 20px 25px" minHeight={'40.9vh'}
        sx={{backgroundColor:colors.blueAccent[500]}}>
          <ServerRack/>
        </Box>
    
      </Box>
      <Box display="felx" gridColumn="span 8" gridRow="span 2"  >
        <MetroArray isDashboard = {true} parentCallback={callbackFunction} data={metroList} />
      </Box>


      </Box>
    </Box>

  };
  export default Metro;