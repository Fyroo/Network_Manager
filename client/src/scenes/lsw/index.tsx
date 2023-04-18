import GmailTreeView from './LSWTree'
import { Box,useTheme } from '@mui/system'
import { tokens } from '../../theme'
import Header from '../../components/Header'
import { Typography, IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom'
import axios from 'axios'


const LSW = () => {
  const [lswName, setLswName] = useState("No Router Selected");
  const [lswModel, setLswModel] = useState("");
  const [lswId, setLswId] = useState(0);
  const [lswUplink, setLswUplink] = useState("");
  const theme = useTheme();
  const colors =tokens(theme.palette.mode)

  function callbackFunction(childData:any){
    setLswName(childData.labelText)
    setLswModel(childData.model);
    setLswId(childData.id);
    setLswUplink(childData.uplink);
    
  };
  function handelLSWDelete(id:number){
    console.log(id)
    if (lswName==="No Router Selected"){
      return ;
    }else{
      axios.delete(`http://localhost:3001/deleteLSW/${id}`);
      window.location.reload();
    }
  };

  return (
<Box m={"20px"}>
      <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
      <Header title="LSW" subtitle="Description" addlink='/LSW/add' withbtn={true} variant={''}/>
      </Box> 
      <Box
      
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridColumn={12}
      gridRow={1}
      gap="23px">

        <Box gridColumn="span 3" gridRow="span 1" minHeight={'80vh'} style={{ backgroundColor:colors.blueAccent[500]}}>
        <Box  pt={"10px"} sx={{backgroundColor:colors.blueAccent[800]}}
        justifyContent="space-between" alignContent={"center"}>
        <Typography p= "10px 25px 15px" variant="h5" fontWeight="600" color={colors.grey[100]}>
          LSW
        </Typography>
        </Box>
        
      
        <GmailTreeView parentCallback={callbackFunction} />
          
          
      </Box>  
      <Box gridColumn="span 9" gridRow="span 1" minHeight={'80vh'} style={{ backgroundColor:colors.blueAccent[500]}}>
      <Box display={'flex'}  pt={"10px"} sx={{backgroundColor:colors.blueAccent[800]}}
        justifyContent="space-between" alignContent={"center"}>
        <Typography p= "10px 25px 15px" variant="h5" fontWeight="600" color={colors.grey[100]}>
          {lswName}
        </Typography>
        <Box   justifyContent="space-between">
        
        <Link to={lswName === 'No Router Selected' ?"#":"/LSW/edit"} 
            state={{lswName,lswModel,lswUplink,lswId}}>
            <IconButton aria-label="delete" sx={{color:colors.grey[200]}}
            disabled={lswName === 'No Router Selected' ? true:false}>
              <EditIcon/>
            </IconButton>
            </Link>


            <IconButton aria-label="edit" sx={{color:colors.redAccent[400]}}
            onClick={()=>handelLSWDelete(lswId)}
            disabled={lswName === 'No Router Selected' ? true:false}>
              <DeleteIcon/>
            </IconButton>

        </Box>
        </Box>
      </Box>
      </Box>


  </Box>


  )
}

export default LSW
