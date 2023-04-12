import { Box,useTheme } from "@mui/system";
import { tokens} from "../../theme";
import Header from "../../components/Header"
import NetworkChart from "./NetworkChart";
import { IconButton, Typography } from "@mui/material";
import MetroArray from "./MetroArray";
import { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MetroPorts from "./MetroPorts";
import { Link } from "react-router-dom";

const Metro = () => {

  const theme = useTheme();
  const colors =tokens(theme.palette.mode)
  const [routerName, setRouterName] = useState("No Router Selected");
  const [routerIp, setRouterIP] = useState("No Router Selected");
  const [routerModel, setRouterModel] = useState("No Router Selected");

  const [metroList, setMetroList] = useState([]);
  const getMetro = () =>{
    axios.get("http://localhost:3001/metro").then((response)=>{
    setMetroList(response.data)
    });

  }
  useEffect(() => {
    getMetro();
  }, []);

  function getPort(childData:any){
    console.log(childData);
  };

  function callbackFunction(childData:any){
    console.log(childData.ip);
    setRouterName(childData.name);
    setRouterIP(childData.ip);
    setRouterModel(childData.model)
    
  };
  function handelMetroDelete(){
    if (routerName==="No Router Selected"){
      return ;
    }else{
      axios.delete(`http://localhost:3001/deletemetro/${routerName}`);
      window.location.reload();
    }
  };
    return <Box m={"20px"}>
      <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
      <Header title="Metro" subtitle="Description" addlink="/Metro/add" withbtn={true} variant="2"/>
      </Box> 
      <Box
      
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridColumn={12}
      gridAutoRows="14vh"
      gap="23px">
      
          <Box gridColumn="span 7" gridRow="span 3" style={{ backgroundColor:colors.blueAccent[500]}}>
            <Box  pt={"10px"} sx={{backgroundColor:colors.blueAccent[800]}}
            justifyContent="space-between" alignContent={"center"}>
            <Typography p= "10px 25px 15px" variant="h5" fontWeight="600" color={colors.grey[100]}>
              Reseax Metro Ariana
            </Typography>
            </Box>
          
              <NetworkChart/>
              
              
          </Box>  
          <Box display="felx" gridColumn="span 2" gridRow="span 4"  alignContent="center">
          <Box display={"flex"} height={'5.5vh'}  flexDirection={'row'} sx={{backgroundColor:colors.blueAccent[800]}}
            justifyContent="space-between" alignItems={"center"} >
              
              <Typography pl={'10px'} variant="h5" fontWeight="600" color={colors.grey[100]}>
              {routerName}
            </Typography>
              
            <Box   justifyContent="space-between">
            <Link to={routerName === 'No Router Selected' ?"#":"/Metro/edit"} 
            state={{routerName,routerIp,routerModel}}>
            <IconButton aria-label="delete" sx={{color:colors.grey[200]}}
            disabled={routerName === 'No Router Selected' ? true:false}>
              <EditIcon/>
            </IconButton>
            </Link>


            <IconButton aria-label="edit" sx={{color:colors.redAccent[400]}}
            onClick={handelMetroDelete}
            disabled={routerName === 'No Router Selected' ? true:false}>
              <DeleteIcon/>
            </IconButton>

            </Box>

            </Box>
            
            
            <Box pt={"5px"} minHeight={'40.9vh'}
            sx={{backgroundColor:colors.blueAccent[500]}}>
              <MetroPorts parentCallback={getPort}></MetroPorts>
            </Box>
            
        
          </Box>
          <Box gridColumn="span 3" gridRow="span 5" style={{ backgroundColor:colors.blueAccent[500]}}> </Box>
          
          <Box display="felx" gridColumn="span 7" gridRow="span 2"  >
            <MetroArray parentCallback={callbackFunction} data={metroList}  />
          </Box>
          
      


      </Box>
    </Box>

  };
  export default Metro;




















 