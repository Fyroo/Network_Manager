import { Box, typography,useTheme } from "@mui/system";
import { tokens} from "../../theme";
import Header from "../../components/Header"
import NetworkChart from "./NetworkChart";
import { Typography } from "@mui/material";
import MetroArray from "./MetroArray";
import ServerRack from "../../components/ServerRack";

const Metro = () => {
  const theme = useTheme();
  const colors =tokens(theme.palette.mode)
    return <Box m={"20px"}>
      <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
      <Header title="Metro" subtitle="Description"/>
      </Box> 
      <Box
      
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridColumn={12}
      gridAutoRows="150px"
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
      <Box pt={"10px"}  sx={{backgroundColor:colors.blueAccent[800]}}
        justifyContent="space-between" alignContent={"center"}>
        <Typography p= "10px 25px 15px" variant="h5" fontWeight="600" color={colors.grey[100]}>
          Router Name
        </Typography>
        </Box>
        <Box p= "5px 20px 25px" 
        sx={{backgroundColor:colors.blueAccent[500]}}>
          <ServerRack/>
        </Box>
    
      </Box>
      <Box display="felx" gridColumn="span 8" gridRow="span 2"  >
        <MetroArray isDashboard = {true}/>
      </Box>


      </Box>
    </Box>

  };
  export default Metro;