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
import BlocksMap from "./BlocksMap";
import { Link } from "react-router-dom";
import EditPortField from "./EditPortField";
import SaveIcon from '@mui/icons-material/Save';

const Metro = () => {

  const theme = useTheme();
  const colors =tokens(theme.palette.mode)
  const [selectedMetro, setSelectedMetro] = useState([]);

  const [portAddress, setPortAddress] = useState("No Port Selected");
  const [portId, setPortId] = useState();
  const [isEditing,setIsEditing]= useState(false);
  
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
    setPortAddress(childData.Address);

    setPortId(childData.ID);

  };

  function callbackFunction(childData:any){
    setRouterName(childData.name);
    setRouterIP(childData.ip);
    setRouterModel(childData.model)
    setTimeout(() => {
      setSelectedMetro(childData)
    }, 500); 
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
              <BlocksMap parentCallback={getPort} selectedMetro={selectedMetro}></BlocksMap>
            </Box>
            
        
          </Box>
          <Box gridColumn="span 3" gridRow="span 5" minHeight={'81vh'} style={{ backgroundColor:colors.blueAccent[500]}}> 
          <Box display={"flex"} height={'5.5vh'}  flexDirection={'row'} sx={{backgroundColor:colors.blueAccent[800]}}
            justifyContent="space-between" alignItems={"center"} >
              
              <Typography pl={'10px'} variant="h5" fontWeight="600" color={colors.grey[100]}>
              {portAddress}
            </Typography>
              
            <Box   justifyContent="space-between">

            <IconButton aria-label="save" sx={{color:colors.grey[200]}}
            disabled={(portAddress === 'No Port Selected') || (!isEditing) ? true:false}
            onClick={()=>setIsEditing(false)}>
              <SaveIcon/>
            </IconButton>

            <IconButton aria-label="edit" sx={{color:colors.grey[200]}}
            disabled={(portAddress === 'No Port Selected') || (isEditing)? true:false}
            onClick={()=>setIsEditing(true)}>
              <EditIcon/>
              
            </IconButton>
           

            </Box>

            </Box>
            <Box m={'3px'}>
            {portAddress != 'No Port Selected' ? (
                <EditPortField isEditing={isEditing} portId={portId} />
            ) : (
                
                    null
                
            )}
            
            </Box>
            
          </Box>

          <Box display="felx" gridColumn="span 7" gridRow="span 2">
            <MetroArray parentCallback={callbackFunction} data={metroList}  />
          </Box>
          
      


      </Box>
    </Box>

  };
  export default Metro;




















 