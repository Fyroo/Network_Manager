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
import BlocksMapLsw from './BlocksMapLsw'
import { useSpring, animated } from "react-spring";
import { AnimatedTypography } from '../../components/AnimatedComponents'
import EditLswPortField from './EditLswPortField'

const LSW = ({role}:{role:any}) => {
  const [lswName, setLswName] = useState("No Router Selected");
  const [selectedLsw, setselectedLsw] = useState([]);
  const [lswModel, setLswModel] = useState("");
  const [lswId, setLswId] = useState(0);
  const [portAddress, setPortAddress] = useState("No Port Selected");
  const [portId, setPortId] = useState();
  const [lswUplink, setLswUplink] = useState("");
  const theme = useTheme();
  const colors =tokens(theme.palette.mode);
  const AnimatedBox = animated(Box);
  const boxAnimation = useSpring({
    from: { backgroundColor: colors.primary[500] },
    to: { backgroundColor: colors.blueAccent[500] },
    delay: 300,
  });
  useEffect(() => {
    console.log(role)
  },[]);
  function getPort(childData:any){
    setPortAddress(childData.Address);
    setPortId(childData.ID);
  };

  function callbackFunction(childData:any){
    setselectedLsw(childData);
    setLswName(childData.labelText);
    setLswModel(childData.model);
    setLswId(childData.id);
    setLswUplink(childData.uplink);
  };
  function handelLSWDelete(id:number){
    console.log(id)
    if (lswName==="No Router Selected"){
      return ;
    }else{
      axios.delete(`/api/deleteLSW/${id}`);
      window.location.reload();
    }
  };

  return (
<Box m={"20px"}>
  <Header title="LSW" subtitle="Description" addlink='/LSW/add' withbtn={role==='Administrateur'} variant={''}/>

      <Box
      
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridColumn={12}
      gridRow={1}
      gap="23px">

        <AnimatedBox gridColumn="span 3" gridRow="span 1" height={'83vh'} 
        style={boxAnimation}
        sx={{
          backgroundColor: colors.blueAccent[500],
          borderRadius: "10px",
          color: "white",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
        }}>
        <Box  pt={"10px"} sx={{backgroundColor:colors.blueAccent[800],
        }}
        justifyContent="space-between" alignContent={"center"}>
        <AnimatedTypography reset={false} p= "10px 25px 15px" variant="h5" fontWeight="600" color={colors.grey[100]}>
          LSW
        </AnimatedTypography>
        </Box>
        
      
        <GmailTreeView parentCallback={callbackFunction} />
          
          
      </AnimatedBox>  
      <AnimatedBox
       gridColumn="span 9" 
      gridRow="span 1"
       minHeight={'80vh'}
        style={boxAnimation}
        sx={{
          backgroundColor: colors.blueAccent[500],
          borderRadius: "10px",
          color: "white",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
        }}>
      <Box display={'flex'}  pt={"10px"} sx={{backgroundColor:colors.blueAccent[800]}}
        justifyContent="space-between" alignContent={"center"}>
       <AnimatedTypography reset={true}
        p= "10px 25px 15px" variant="h5" fontWeight="600" color={colors.grey[100]}>
          {lswName}
        </AnimatedTypography>
        <Box   justifyContent="space-between">
        
        <Link to={(lswName === 'No Router Selected')|| (role==='Administrateur') ?"#":"/LSW/edit"} 
            state={{lswName,lswModel,lswUplink,lswId}}>
            <IconButton aria-label="delete" sx={{color:colors.grey[200]}}
            disabled={((lswName === 'No Router Selected')|| (role==='Utilisateur'))}>
              <EditIcon/>
            </IconButton>
            </Link>


            <IconButton aria-label="edit" sx={{color:colors.redAccent[400]}}
            onClick={()=>handelLSWDelete(lswId)}
            disabled={((lswName === 'No Router Selected')|| !(role==='Administrateur')) }>
              <DeleteIcon/>
            </IconButton>

        </Box>
        </Box>
        <BlocksMapLsw
              parentCallback={getPort}
              selecteLsw={selectedLsw}
            />
                      <Box display={"flex"} alignItems={"center"} height={"100%"}>
            <AnimatedBox
              style={boxAnimation}
              sx={{
                minHeight: "20vh",
                backgroundColor: colors.blueAccent[500],
                borderRadius: "10px",
                color: "white",
                display: "flex",
                flexDirection: "column",
                padding: "20px",
                width: "100%",
              }}
            >

                <AnimatedTypography alignSelf={'center'} variant="h4" fontWeight="600">
                  {portAddress}
                </AnimatedTypography>
             
              <Box sx={{ marginTop: "15px" }}>
                {portAddress !== "No Port Selected" && (
                  <EditLswPortField portId={portId} portadd={portAddress} role={role} />
                )}
              </Box>
            </AnimatedBox>
          </Box>
      </AnimatedBox>
      </Box>

  </Box>


  )
}

export default LSW
