import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/system";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Typography, TextField, Button } from "@mui/material";

import { useLocation } from "react-router-dom";
import axios from "axios";

const LSWEdit = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [name, setName] = useState("");
  const [uplink, setUplink] = useState("");
  const [model, setModel] = useState("");
  const [lswId, setlswId] = useState();
  const location = useLocation();

  const updateLSW = () => {
    axios
      .put(`http://localhost:3001/updateLSW/${lswId}`, {
        uplink: uplink,
        model: model,
        name: name,
      })
      .then((response) => {
        alert("update");
      });
  };

  useEffect(() => {
    setName(location.state.lswName);
    setUplink(location.state.lswUplink);
    setlswId(location.state.lswId);
    setModel(location.state.lswModel);
  }, []);

  return (
    <Box m={"20px"}>
      <Header title="Edit LSW" subtitle="subtitle" addlink={"/LSW"} withbtn={true} variant="1" />
      <Box sx={{ padding: "24px" }} style={{ backgroundColor: colors.blueAccent[700] }}>
        <Box>
          <Typography
            variant="h6"
            color={colors.grey[100]}
            gutterBottom
            sx={{ fontWeight: "bold", mb: "8px" }}
          >
            Name:
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            defaultValue={name}
            onChange={(event) => {
              setName(event.target.value);
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
            Uplink:
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            defaultValue={uplink}
            onChange={(event) => {
              setUplink(event.target.value);
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
            Model:
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            defaultValue={model}
            onChange={(event) => {
              setModel(event.target.value);
            }}
          />
        </Box>
        <Box sx={{ mt: "24px" }}>
          <Button variant="contained" color="primary" onClick={() => updateLSW()}>
            Update LSW
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LSWEdit;
