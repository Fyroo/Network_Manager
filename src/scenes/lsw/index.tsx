import GmailTreeView from './LSWTree'
import { Box,useTheme,typography } from '@mui/system'
import { tokens } from '../../theme'
import Header from '../../components/Header'

const LSW = () => {
  const theme = useTheme();
  const colors =tokens(theme.palette.mode)
  return (
<Box m={"20px"}>
      <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
      <Header title="LSW" subtitle="Description"/>
      </Box> 
      <GmailTreeView/>
  </Box>


  )
}

export default LSW
