import { Box,useTheme } from "@mui/system";
import { tokens} from "../../theme";
import { IconButton, Typography, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSpring,animated } from "@react-spring/web";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";

const EditPortField = ({ portId}:{portId:any}) => {
  const [isEditing, setIsEditing] = useState(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [portAddress, setPortAddress] = useState("");
    const [portAff, setPortAff] = useState("");
    const [portBreakout, setPortBreakout] = useState("");
    const [portOptHead, setPortOptHead] = useState("");
    const [portObserv, setPortObserv] = useState("");
    const [isDataLoaded, setIsDataLoaded] = useState(false);
     const animationProps = useSpring({

    opacity: isEditing ? 1 : 1,
    transform: isEditing ? "translateY(10px)" : "translateY(0px)",
      
  });

    useEffect(() => {
      setIsDataLoaded(false);
        getPort();
      }, [portId]);

function handelSaveClick(){
  axios
  .put(`http://localhost:3001/updateport/${portId}`, {
    address: portAddress,
    affport: portAff,
    breakout: portBreakout,
    opthead: portOptHead,
    observ: portObserv,
  })
  .then((response) => {
    alert("Port Updated");
    setIsEditing(false);
  });
}

    const getPort = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/port/${portId}`);
            const portData = response.data[0];
             setPortOptHead(portData.opthead);
             setPortAddress(portData.address);
             setPortAff(portData.affport);
             setPortBreakout(portData.breakout);
             setPortObserv(portData.observ);
            
            setTimeout(() => {
            setIsDataLoaded(true)
            }, 500);
            
        } catch (error) {
            console.error(error);
        }
    };
  return (
    <animated.div style={animationProps}>
    <Box display="flex"
    flexDirection={'column'}
     justifyContent="center"
      alignItems="center"
       height="100%">
      <Box display={'flex'}
         height={'35px'}
          alignSelf={'end'}>
          <IconButton
            aria-label="save"
            sx={{ color: colors.blueAccent[100] }}
            disabled={portAddress === "No Port Selected" || !isEditing}
            onClick={() => handelSaveClick()}
          >
            <SaveIcon />
          </IconButton>

          <IconButton
            aria-label="edit"
            sx={{ color: colors.blueAccent[100] }}
            disabled={portAddress === "No Port Selected" || isEditing}
            onClick={() => setIsEditing(true)}
          >
            <EditIcon />
          </IconButton>
        </Box>
    {isDataLoaded ? ( // Conditionally render JSX based on data loading status
    <Box>
       
    <Box>
              <Typography
                variant="h6"
                color={colors.grey[100]}
                gutterBottom
                sx={{ fontWeight: "bold", mb: "8px" }}
              >
                Position Metro:
              </Typography>
              <TextField
              
                variant={isEditing?'outlined':'standard'}
                InputProps={{
                  disabled:!isEditing,
                  disableUnderline:!isEditing,
                  inputProps: {
                    style: { textAlign: isEditing ? "left" : "center" },
                  }
                }}
                
                fullWidth
                defaultValue={portAddress}
                onChange={(event) => {
                    setPortAddress(event.target.value);
                }}

              />
              
            </Box>
            <Box sx={{ mt: "16px" }}>
              <Typography
                variant="h6"
                color={colors.grey[100]}
                gutterBottom
                sx={{ fontWeight: "bold", mb: "8px" }}
              >
                Affectation Port:
              </Typography>
              <TextField
                 variant={isEditing?'outlined':'standard'}
                 InputProps={{
                   disabled:!isEditing,
                   disableUnderline:!isEditing,
                   inputProps: {
                     style: { textAlign: isEditing ? "left" : "center" },
                   }
                 }}
                fullWidth
                defaultValue={portAff}
                onChange={(event) => {
                  setPortAff(event.target.value);
                }}
              />
            </Box>
            <Box sx={{ mt: "16px" }}>
              <Typography
                variant="h6"
                color={colors.grey[100]}
                gutterBottom
                sx={{ fontWeight: "bold", mb: "8px" }}
              >
                Breakout:
              </Typography>
              <TextField
                 variant={isEditing?'outlined':'standard'}
                 InputProps={{
                   disabled:!isEditing,
                   disableUnderline:!isEditing,
                   inputProps: {
                     style: { textAlign: isEditing ? "left" : "center" },
                   }
                 }}
                fullWidth
                defaultValue={portBreakout}
                onChange={(event) => {
                  setPortBreakout(event.target.value);
                }}
              />
            </Box>
            <Box sx={{ mt: "16px" }}>
              <Typography
                variant="h6"
                color={colors.grey[100]}
                gutterBottom
                sx={{ fontWeight: "bold", mb: "8px" }}
              >
                Position tete Optique:
              </Typography>
              <TextField
                 variant={isEditing?'outlined':'standard'}
                 InputProps={{
                   disabled:!isEditing,
                   disableUnderline:!isEditing,
                   inputProps: {
                     style: { textAlign: isEditing ? "left" : "center" },
                   }
                 }}
                fullWidth
                defaultValue={portOptHead}
                onChange={(event) => {
                  setPortOptHead(event.target.value);
                }}
              />
            </Box>
            <Box sx={{ mt: "16px" }}>
              <Typography
                variant="h6"
                color={colors.grey[100]}
                gutterBottom
                sx={{ fontWeight: "bold", mb: "8px" }}
              >
                Observ:
              </Typography>
              <TextField
                 variant={isEditing?'outlined':'standard'}
                 InputProps={{
                   disabled:!isEditing,
                   disableUnderline:!isEditing,
                   inputProps: {
                     style: { textAlign: isEditing ? "left" : "center" },
                   }
                 }}
                fullWidth
                defaultValue={portObserv}
                onChange={(event) => {
                  setPortObserv(event.target.value);
                }}
              />
            </Box>
            <Box sx={{ mt: "20px" }}>
          {/* <Button variant="contained" color="primary" onClick={handelSaveClick}>
            Save
          </Button> */}
        </Box>
        
    </Box>   ) : (
      null
    )}
</Box>
</animated.div>
    







  )
}

export default EditPortField
