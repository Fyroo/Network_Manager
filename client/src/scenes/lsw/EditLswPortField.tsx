import { Box, useTheme } from "@mui/system";
import { tokens } from "../../theme";
import { IconButton, Typography, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSpring, animated } from "@react-spring/web";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import { Flex } from "@chakra-ui/react";
const EditLswPortField = ({
  portId,
  portadd,
  role
}: {
  portId: any;
  portadd: string;
  role: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [portAddress, setPortAddress] = useState(portadd);
  const [client, setClient] = useState("");
  const [portBreakout, setPortBreakout] = useState("");
  const [otfo, setOtfo] = useState("");
  const [pos, setPos] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const animationProps = useSpring({
    opacity: isEditing ? 1 : 1,
    transform: isEditing ? "translateY(10px)" : "translateY(0px)",
  });

  useEffect(() => {
    console.log(role)
    setIsDataLoaded(false);
    getPort();
  }, [portId]);

  function handelSaveClick() {
    axios
      .put(`/api/updatelswport/${portId}`, {
        address: portAddress,
        client: client,
        breakout: portBreakout,
        otfo: otfo,
        pos: pos,
      })
      .then((response) => {
        alert("Port Updated");
        setIsEditing(false);
      });
  }

  const getPort = async () => {
    try {
      const response = await axios.get(
        `/api/lswport/${portId}`
      );
      const portData = response.data[0];
      setClient(portData.client);
      setPortBreakout(portData.breakout);
      setPortAddress(portData.address);
      setOtfo(portData.otfo);
      setPos(portData.pos);

      setTimeout(() => {
        setIsDataLoaded(true);
      }, 500);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <animated.div style={animationProps}>
      <Box display={"flex"}
       flexDirection={'column'}>
        <Box display={'flex'}
         height={'35px'}
          alignSelf={'end'}>
          <IconButton
            aria-label="save"
            sx={{ color: colors.blueAccent[100] }}
            disabled={portAddress === "No Port Selected" || !isEditing || role=='Utilisateur'}
            onClick={() => handelSaveClick()}
          >
            <SaveIcon />
          </IconButton>

          <IconButton
            aria-label="edit"
            sx={{ color: colors.blueAccent[100] }}
            disabled={portAddress === "No Port Selected" || isEditing || role==='Utilisateur'}
            onClick={() => setIsEditing(true)}
          >
            <EditIcon />
          </IconButton>
        </Box>

        <Box display="flex" width={"100%"}>
          {isDataLoaded ? ( // Conditionally render JSX based on data loading status
            <Box width={"100%"}>
              <Box 
                mt={'20px'}
                display={"flex"}
                flexDirection={"row"}
                width={"100%"}
                justifyContent={"space-between"}
              >
                <Box 
                ml={"5vw"}>
                  <Typography
                    textAlign={"center"}
                    variant="h6"
                    color={colors.grey[100]}
                    gutterBottom
                    sx={{ fontWeight: "bold", mb: "8px" }}
                  >
                    Position LSW:
                  </Typography>
                  <TextField
                    variant={isEditing ? "outlined" : "standard"}
                    InputProps={{
                      disabled: !isEditing,
                      disableUnderline: !isEditing,
                      inputProps: {
                        style: { textAlign: isEditing ? "left" : "center" },
                      },
                    }}
                    fullWidth
                    defaultValue={portAddress}
                    onChange={(event) => {
                      setPortAddress(event.target.value);
                    }}
                  />
                </Box>

                <Box 
                mr={"5vw"}>
                  <Typography
                    textAlign={"center"}
                    variant="h6"
                    color={colors.grey[100]}
                    gutterBottom
                    sx={{ fontWeight: "bold", mb: "8px" }}
                  >
                    Client:
                  </Typography>
                  <TextField
                    variant={isEditing ? "outlined" : "standard"}
                    InputProps={{
                      disabled: !isEditing,
                      disableUnderline: !isEditing,
                      inputProps: {
                        style: { textAlign: isEditing ? "left" : "center" },
                      },
                    }}
                    fullWidth
                    defaultValue={client}
                    onChange={(event) => {
                      setClient(event.target.value);
                    }}
                  />
                </Box>
              </Box>

              <Box               
                mt={'20px'}
                display={"flex"}
                flexDirection={"row"}
                width={"100%"}
                justifyContent={"space-between"}>
                <Box
                ml={"5vw"}>
                  <Typography
                    textAlign={"center"}
                    variant="h6"
                    color={colors.grey[100]}
                    gutterBottom
                    sx={{ fontWeight: "bold", mb: "8px" }}
                  >
                    Breakout:
                  </Typography>
                  <TextField
                    variant={isEditing ? "outlined" : "standard"}
                    InputProps={{
                      disabled: !isEditing,
                      disableUnderline: !isEditing,
                      inputProps: {
                        style: { textAlign: isEditing ? "left" : "center" },
                      },
                    }}
                    fullWidth
                    defaultValue={portBreakout}
                    onChange={(event) => {
                      setPortBreakout(event.target.value);
                    }}
                  />
                </Box>
                <Box
                mr={"5vw"}>
                  <Typography
                    textAlign={"center"}
                    variant="h6"
                    color={colors.grey[100]}
                    gutterBottom
                    sx={{ fontWeight: "bold", mb: "8px" }}
                  >
                    Position tete Optique:
                  </Typography>
                  <TextField
                    variant={isEditing ? "outlined" : "standard"}
                    InputProps={{
                      disabled: !isEditing,
                      disableUnderline: !isEditing,
                      inputProps: {
                        style: { textAlign: isEditing ? "left" : "center" },
                      },
                    }}
                    fullWidth
                    defaultValue={pos}
                    onChange={(event) => {
                      setPos(event.target.value);
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{ mt: "16px" }}>
                <Typography
                    textAlign={"center"}
                    variant="h6"
                    color={colors.grey[100]}
                    gutterBottom
                    sx={{ fontWeight: "bold", mb: "8px" }}
                >
                  OT FO:
                </Typography>
                <TextField
                  variant={isEditing ? "outlined" : "standard"}
                  InputProps={{
                    disabled: !isEditing,
                    disableUnderline: !isEditing,
                    inputProps: {
                      style: { textAlign: isEditing ? "left" : "center" },
                    },
                  }}
                  fullWidth
                  defaultValue={otfo}
                  onChange={(event) => {
                    setOtfo(event.target.value);
                  }}
                />
              </Box>
              <Box sx={{ mt: "20px" }}></Box>
            </Box>
          ) : null}
        </Box>
      </Box>
    </animated.div>
  );
};

export default EditLswPortField;
