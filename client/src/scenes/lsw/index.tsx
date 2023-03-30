import GmailTreeView from './LSWTree'
import { Box,useTheme } from '@mui/system'
import { tokens } from '../../theme'
import Header from '../../components/Header'
import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'

const LSW = () => {

  const theme = useTheme();
  const colors =tokens(theme.palette.mode)
  





  return (
<Box m={"20px"}>
      <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
      <Header title="LSW" subtitle="Description"/>
      </Box> 
      <Box
      
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridColumn={12}
      gridRow={1}
      gap="23px">

<Box gridColumn="span 2" minHeight={'80vh'} style={{ backgroundColor:colors.blueAccent[500]}}>
        <Box  pt={"10px"} sx={{backgroundColor:colors.blueAccent[800]}}
        justifyContent="space-between" alignContent={"center"}>
        <Typography p= "10px 25px 15px" variant="h5" fontWeight="600" color={colors.grey[100]}>
          LSW
        </Typography>
        </Box>
      
        <GmailTreeView />
          
          
      </Box>  

      </Box>
  </Box>


  )
}

export default LSW
