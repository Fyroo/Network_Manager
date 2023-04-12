import GmailTreeView from './LSWTree'
import { Box,useTheme } from '@mui/system'
import { tokens } from '../../theme'
import Header from '../../components/Header'
import { Typography, IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const LSW = () => {
  const [lswName, setLswName] = useState("No Router Selected");
  const theme = useTheme();
  const colors =tokens(theme.palette.mode)
  function callbackFunction(childData:any){
    console.log(childData.labelText);
    setLswName(childData.labelText)
  };


  return (
<Box m={"20px"}>
      <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
      <Header title="LSW" subtitle="Description" addlink='' withbtn={false}/>
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
        
        <IconButton aria-label="delete" sx={{color:colors.grey[400]}}>
          <EditIcon/>
        </IconButton>
        <IconButton aria-label="delete" sx={{color:colors.redAccent[400]}}>
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
