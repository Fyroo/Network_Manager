import { Box, typography,useTheme } from "@mui/system";
import { tokens} from "../../theme";
import Metro from "../grid";
import Header from "../../components/Header"
import NetworkChart from "../../components/NetworkChart";
import { Typography } from "@mui/material";
const Dashboard = () => {
  const theme = useTheme();
  const colors =tokens(theme.palette.mode)
    return <Box m={"20px"}>
      {/* <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
      <Header title="DASHBOARD" subtitle="0"/>
      </Box> */}
      <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridAutoRows="140px"
      gap="20px">

      <Box gridColumn="span 8" gridRow="span 3" style={{ backgroundColor:colors.primary[400]}}>
        <Box mt="25px" p="0 30px" justifyContent="space-between" alignContent={"center"}>
        <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
          Reseax Metro Ariana
        </Typography>
        </Box>
        
          <NetworkChart/>
      </Box>  
      <Box gridColumn="span 4" gridRow="span 3" style={{ backgroundColor:colors.primary[400]}}>
      
      </Box>
      <Box display={"felx"} gridColumn="span 8" gridRow="span 3" style={{ backgroundColor:colors.primary[400]}} >
        <Metro></Metro>
      </Box>


      </Box>
    </Box>

  };
  export default Dashboard;