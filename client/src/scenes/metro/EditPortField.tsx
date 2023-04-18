import { Box,useTheme } from "@mui/system";
import { tokens} from "../../theme";
import { IconButton, Typography, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

const EditPortField = ({isEditing, portId}:{isEditing:boolean;portId:any}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [portAddress, setPortAddress] = useState('');
    const [portAff, setPortAff] = useState('');
    const [portBreakout, setPortBreakout] = useState('');
    const [portOptHead, setPortOptHead] = useState('');
    const [portObserv, setPortObserv] = useState('');
    const [activePort, setActivePort] = useState([]);

    useEffect(() => {
        console.log(portId);
        getPort();
      }, [portId]);
      useEffect(() => {
        setPortAddress(activePort.address);
        setPortAff(activePort.affport);
        setPortBreakout(activePort.breakout);
        setPortOptHead(activePort.optheadd);
        setPortObserv(activePort.observ);
      }, [activePort]);
    
    const getPort = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/port/${portId}`);
            setActivePort(response.data);
            console.log(activePort);
        } catch (error) {
            console.error(error);
        }
    };
  return (
    
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
            variant="outlined"
            fullWidth
            defaultValue={portAddress}
            contentEditable={isEditing?true:false}
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
            variant="outlined"
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
            variant="outlined"
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
            variant="outlined"
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
            variant="outlined"
            fullWidth
            defaultValue={portObserv}
            onChange={(event) => {
              setPortObserv(event.target.value);
            }}
          />
        </Box>
        <Box sx={{ mt: "24px" }}>
      <Button variant="contained" color="primary" >
        Save
      </Button>
    </Box>
</Box>
  )
}

export default EditPortField
