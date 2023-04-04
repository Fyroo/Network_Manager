import { Typography, Box, useTheme,IconButton } from "@mui/material";
import { tokens } from "../theme";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


const Header = ({title, subtitle}:{title : string; subtitle : string}) => {
const theme = useTheme();
const colors = tokens(theme.palette.mode)
return <Box width={'100%'} display={"flex"} mb="5px"mt={"0px"} flexDirection={"row"}
justifyContent="space-between" alignContent={"center"}>
  <Box>
  <Typography 
  variant="h2"
  color={colors.grey[100]}
   fontWeight="bold"
    sx={{mb:"5px"}}>
      {title}
      </Typography>
  <Typography
  variant="h5"
  color={colors.greenAccent[400]}>
    {subtitle}
    </Typography>

  </Box>
 <Box pt={'10px'}>     
   <IconButton aria-label="add" sx={{color:colors.greenAccent[500]}}>
  <AddCircleOutlineIcon sx={{transform: 'scale(2)'}}/>
      </IconButton></Box>

    
</Box>

};
export default Header;