import { Box } from '@mui/system'
import { Button, Grid, Typography } from '@mui/material'
import PortIcon from './PortIcon'
import Data from '../data/Data'
import { tokens } from "../theme";
import { useTheme } from '@mui/material'



const ServerRack = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  function Port(props:any) {
    return(
      <Grid item xs={4} alignItems={'center'}>
                  <Box  display={'flex'} alignItems={'center'} justifyContent={'center'}>
                  <Button style={{padding:'5'}}><PortIcon isActive = {props.state}  /></Button>
          </Box>
          
          <Box  display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <Typography  color={colors.primary[900]} sx={{fontSize:{sm:11,xs:15}}} >{props.title}</Typography>
          </Box>
          
     </Grid>
    )
  }


const dataComp = Data.map((data)=> {
  return(
    <Port 
      key={data.id}
      state={data.state}
      title={data.title}
    />
  )
})

  return (
    <Box      display="flex" >
        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 2 }} columns={16} >
      {dataComp}
        </Grid>
    </Box>
   
  )
}

export default ServerRack
