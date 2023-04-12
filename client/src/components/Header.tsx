import { Typography, Box, useTheme,IconButton } from "@mui/material";
import { tokens } from "../theme";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const Header = ({title, subtitle,addlink ='#' ,withbtn=false,variant='1'}:
{title : string; subtitle : string; addlink:string; withbtn:boolean;variant:string}) => {
const theme = useTheme();
const colors = tokens(theme.palette.mode)
function btnvariant(variant:string){
  if(variant==='1'){
return  <ArrowBackIcon sx={{transform: 'scale(2)'}}/>
  }else{
return <AddCircleOutlineIcon sx={{transform: 'scale(2)'}}/>
  }
}
if(withbtn){
  return (
<Box width={'100%'} display={"flex"} mb="5px"mt={"0px"} flexDirection={"row"}
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
 <Box>     
   <IconButton aria-label="add" sx={{color:colors.greenAccent[500]}} href={addlink}>
  {btnvariant(variant)}
      </IconButton></Box>

    
</Box>
)}else{return(
<Box width={'100%'} display={"flex"} mb="5px"mt={"0px"} flexDirection={"row"}
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
</Box>
)}


};
export default Header;