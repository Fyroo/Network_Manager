import { Box,useTheme } from "@mui/system";
import { tokens} from "../../theme";
import Header from "../../components/Header"
import NetworkChart from "./NetworkChart";
import {IconButton, Typography } from "@mui/material";
import MetroArray from "./MetroArray";
import { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BlocksMap from "./BlocksMap";
import { Link } from "react-router-dom";
import EditPortField from "./EditPortField";
import SaveIcon from '@mui/icons-material/Save';
import { animated, useSpring } from '@react-spring/web';

  const Metro = () => {
  const theme = useTheme();
  const colors =tokens(theme.palette.mode)
  const [selectedMetro, setSelectedMetro] = useState([]);
  const [portAddress, setPortAddress] = useState("No Port Selected");
  const [portId, setPortId] = useState();
  const [isEditing,setIsEditing]= useState(false);
  const [routerName, setRouterName] = useState("No Router Selected");
  const [routerIp, setRouterIP] = useState("");
  const [routerModel, setRouterModel] = useState("No Router Selected");
  const [metroList, setMetroList] = useState([]);


  const metroArrayAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    reverse: !MetroArray,
    reset: !MetroArray
});
  const boxAnimation = useSpring({
    from: { backgroundColor: colors.primary[500] },
    to: { backgroundColor: colors.blueAccent[500] },
    delay: 500
});
const editIconAnimation = useSpring({ scale: 1, opacity: 1 });
const saveIconAnimation = useSpring({ scale: 1, opacity: 1 });
const handleEditIconHover = () => {
    editIconAnimation.scale.set(1.2);
    editIconAnimation.opacity.set(0.5);
};
const handleSaveIconHover = () => {
    saveIconAnimation.scale.set(1.2);
    saveIconAnimation.opacity.set(0.5);
};
const handleIconLeave = () => {
    editIconAnimation.scale.set(1);
    editIconAnimation.opacity.set(1);
    saveIconAnimation.scale.set(1);
    saveIconAnimation.opacity.set(1);
};
function AnimatedHeader(props:any) {
  const springProps = useSpring({
    opacity: 1,
    transform: 'translateY(0px)',
    from: { opacity: 0, transform: 'translateY(-20vh)' },
  });

  return (
    <animated.div style={springProps}>
      <Header {...props} />
    </animated.div>
  );
}

const MyComponent=()=> {
  return (
    <Box m="20px">
      <AnimatedHeader
        title="Metro"
        subtitle="Description"
        addlink="/Metro/add"
        withbtn={true}
        variant="2"

      />
    </Box>
  );
}
  const getMetro = () =>{
    axios.get("http://localhost:3001/metro").then((response)=>{
    setMetroList(response.data)
    });
  }
  useEffect(() => {
    getMetro();
  }, []);
  function getPort(childData:any){
    setPortAddress(childData.Address);

    setPortId(childData.ID);

  };
  function callbackFunction(childData:any){
    setRouterName(childData.name);
    setRouterIP(childData.ip);
    setRouterModel(childData.model)
    setTimeout(() => {
      setSelectedMetro(childData)
    }, 500); 
  };
  const AnimatedBox = animated(Box);
  function handelMetroDelete(){
    if (routerName==="No Router Selected"){
      return ;
    }else{
      axios.delete(`http://localhost:3001/deletemetro/${routerName}`);
      window.location.reload();
    }
  };
    return    ( <Box  m="20px" >
      <MyComponent/>
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridColumn={12}
      gridAutoRows="14vh"
      gap="25px"
      mt="10px"
      
    >
            <Box gridColumn="span 9" gridRow="span 2">
            <animated.div style={metroArrayAnimation}>
        <MetroArray parentCallback={callbackFunction} data={metroList} />
        </animated.div>
      </Box>
      <Box  gridColumn="span 3" gridRow="span 5" >
        <Box display={'flex'} alignItems={"center"} height={'100%'}>
        <AnimatedBox style={boxAnimation}
            sx={{
            minHeight:'20vh',
            backgroundColor: colors.blueAccent[500],
            borderRadius: "10px",
            color: "white",
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            width:'100%',
          }}

        >

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" fontWeight="600">
            {portAddress}
          </Typography>
          <Box alignSelf={"flex-end"}>
          <animated.div
          style={editIconAnimation}
          onMouseEnter={handleEditIconHover}
          onMouseLeave={handleIconLeave}
        >
          <IconButton
              aria-label="save"
              sx={{ color: colors.blueAccent[100] }}
              disabled={portAddress === "No Port Selected" || !isEditing}
              onClick={() => setIsEditing(false)}
            >
              <SaveIcon />
            </IconButton>
            </animated.div>
            <animated.div
          style={saveIconAnimation}
          onMouseEnter={handleSaveIconHover}
          onMouseLeave={handleIconLeave}
        >
            <IconButton
              aria-label="edit"
              sx={{ color: colors.blueAccent[100] }}
              disabled={portAddress === "No Port Selected" || isEditing}
              onClick={() => setIsEditing(true)}
            >
              <EditIcon />
              
            </IconButton>
            </animated.div>
          </Box>

          </Box>
          <Box sx={{ marginTop: "15px" }}>
            {portAddress !== "No Port Selected" && (
              <EditPortField isEditing={isEditing} portId={portId} />
            )}
          </Box>
          </AnimatedBox>
        </Box>

      </Box>
      <AnimatedBox style={boxAnimation} gridColumn="span 6" gridRow="span 3"
              sx={{
                backgroundColor: colors.blueAccent[500],
                borderRadius: "10px",
                color: "white",
                display: "flex",
                flexDirection: "column",
                padding: "20px",
                height: "48vh"
               
              }}>
                        <Typography variant="h5" fontWeight="600">
          Reseax Metro Ariana
        </Typography>
        <NetworkChart />
        </AnimatedBox>
      <Box gridColumn="span 3" gridRow="span 3">
      <AnimatedBox style={boxAnimation}
          sx={{
            backgroundColor: colors.blueAccent[500],
            borderRadius: "10px",
            color: "white",
            display: "flex",
            flexDirection: "column",
            padding:"20px 20px 0 20px",
            height: "48vh"
          }}
        >

            <Box            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              
            }}>
            <Typography variant="h6" fontWeight="600">
            {routerName}
          </Typography>
            <Box>
            <Link to={routerName === 'No Router Selected' ?"#":"/Metro/edit"} 
            state={{routerName,routerIp,routerModel}}>

            <IconButton aria-label="edit" sx={{color:colors.grey[200]}}
            disabled={routerName === 'No Router Selected' ? true:false}>
              <EditIcon/>
            </IconButton>
            
            </Link>
              <IconButton
                aria-label="delete"
                sx={{ color: colors.redAccent[400] }}
                onClick={handelMetroDelete}
                disabled={routerName === "No Router Selected" ? true : false}
              >
                <DeleteIcon />
              </IconButton>

            </Box>

            </Box>
            <Typography variant="h6" fontWeight="600">
              {routerIp}
            </Typography>
          <Box sx={{ marginTop: "20px" }} >
            <BlocksMap
              parentCallback={getPort}
              selectedMetro={selectedMetro}
            />
          </Box>
          </AnimatedBox>
      </Box>

    </Box>
    </Box>
);
};
  export default Metro;




















 