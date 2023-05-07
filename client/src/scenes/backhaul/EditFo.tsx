import { Box, useTheme } from "@mui/system";
import { tokens } from "../../theme";
import { IconButton, Typography, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSpring, animated } from "@react-spring/web";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AnimatedTypography } from "../../components/AnimatedComponents";

const EditFo = ({ selectedFo,foName }: { selectedFo: any; foName:any }) => {
  const [isEditing, setIsEditing] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [pos, setPos] = useState("");
  const [ref, setRef] = useState("");
  const [breakout, setBreakout] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const AnimatedBox = animated(Box);
  const boxAnimation = useSpring({
    from: { backgroundColor: colors.primary[500] },
    to: { backgroundColor: colors.blueAccent[500] },
    delay: 300,
  });
  const animationProps = useSpring({
    opacity: isEditing ? 1 : 1,
    transform: isEditing ? "translateY(10px)" : "translateY(0px)",
  });

  useEffect(() => {
    setIsDataLoaded(false);
    getfo();
  }, [selectedFo]);
  
  function handelLSWDelete(id:number){
    console.log(id)
    if (foName==="No FO Selected"){
      return ;
    }else{
      axios.delete(`http://localhost:3001/deleteFO/${id}`);
      window.location.reload();
    }
  };
  function handelSaveClick() {console.log(selectedFo.ID);
        axios
      .put(`http://localhost:3001/updatefo/${selectedFo.ID}`, {
        name: name,
        client: client,
        pos: pos,
        ref: ref,
        breakout: breakout,
       
      })
      .then((response) => {
        alert("fo Updated");
        setIsEditing(false);
      });
  }

  const getfo = async () => {
    setName(selectedFo.name);
    setClient(selectedFo.client);
    setPos(selectedFo.pos);
    setRef(selectedFo.ref);
    setBreakout(selectedFo.breakout);

    setTimeout(() => {
      setIsDataLoaded(true);
    }, 500);
  };
  return (
    <animated.div style={animationProps}>
      <Box
        display={"flex"}
        pt={"10px"}
        sx={{ backgroundColor: colors.blueAccent[800] }}
        justifyContent="space-between"
        alignContent={"center"}
      >
        <AnimatedTypography
          reset={true}
          p="10px 25px 15px"
          variant="h5"
          fontWeight="600"
          color={colors.grey[100]}
        >
          {foName}
        </AnimatedTypography>
        <Box justifyContent="space-between">
        <Box display={"flex"} >
                  <IconButton
                    aria-label="save"
                    sx={{ color: colors.blueAccent[100] }}
                    disabled={foName === "No FO Selected" || !isEditing}
                    onClick={() => handelSaveClick()}
                  >
                    <SaveIcon />
                  </IconButton>

                  <IconButton
                    aria-label="edit"
                    sx={{ color: colors.blueAccent[100] }}
                    disabled={foName === "No FO Selected" || isEditing}
                    onClick={() => setIsEditing(true)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
            aria-label="edit"
            onClick={()=>handelLSWDelete(selectedFo.ID)}
            sx={{ color: colors.redAccent[400] }}
            disabled={foName === "No FO Selected" ? true : false}>
            <DeleteIcon />
          </IconButton>
          </Box>

        </Box>
      </Box>
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


          <Box sx={{ marginTop: "15px" }}>
            {foName !== "No FO Selected" && (
              <Box
                display="flex"
                flexDirection={"column"}
                justifyContent="center"
                alignItems="center"
                height="100%"
              >

                {isDataLoaded ? ( // Conditionally render JSX based on data loading status
                  <Box>
                    <Box>
                      <Typography
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
                    <Box>
                      <Typography
                        variant="h6"
                        color={colors.grey[100]}
                        gutterBottom
                        sx={{ fontWeight: "bold", mb: "8px" }}
                      >
                        Position Metro/LSW:
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
                    <Box sx={{ mt: "16px" }}>
                      <Typography
                        variant="h6"
                        color={colors.grey[100]}
                        gutterBottom
                        sx={{ fontWeight: "bold", mb: "8px" }}
                      >
                        Reference:
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
                        defaultValue={ref}
                        onChange={(event) => {
                          setRef(event.target.value);
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
                        variant={isEditing ? "outlined" : "standard"}
                        InputProps={{
                          disabled: !isEditing,
                          disableUnderline: !isEditing,
                          inputProps: {
                            style: { textAlign: isEditing ? "left" : "center" },
                          },
                        }}
                        fullWidth
                        defaultValue={breakout}
                        onChange={(event) => {
                          setBreakout(event.target.value);
                        }}
                      />
                    </Box>

                    <Box sx={{ mt: "20px" }}>
                      {/* <Button variant="contained" color="primary" onClick={handelSaveClick}>
                            Save
                          </Button> */}
                    </Box>
                  </Box>
                ) : null}
              </Box>
            )}
          </Box>
        </AnimatedBox>
      </Box>
    </animated.div>
  );
};

export default EditFo;
