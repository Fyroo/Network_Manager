import React, { useState } from "react";
import { Box, useTheme } from "@mui/system";
import { tokens } from "../../theme";
import axios from "axios";
import Header from "../../components/Header";
import {Typography, TextField, Button } from "@mui/material";


const MetroAdd = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [name, setName] = useState("");
  const [ip, setIp] = useState("");
  const [model, setModel] = useState("");

  const addMetro = () => {
    axios.post("http://localhost:3001/createmetro",
    { name: name, ip: ip, model: model }).then(() => { console.log('yes') })
    
  };

  return (
    <Box m={"20px"}>
    <Header title="Add Metro" subtitle="subtitle" addlink={"/"} withbtn={true} variant="1"/> 
    <Box sx={{ padding: "24px" }}  style={{ backgroundColor:colors.blueAccent[700]}}>
    <Box >
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
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
    </Box>
    <Box sx={{ mt: "16px" }}>
      <Typography
        variant="h6"
        color={colors.grey[100]}
        gutterBottom
        sx={{ fontWeight: "bold", mb: "8px" }}
      >
        IP:
      </Typography>
      <TextField
        variant="outlined"
        fullWidth
        value={ip}
        onChange={(event) => setIp(event.target.value)}
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
        value={model}
        onChange={(event) => setModel(event.target.value)}
      />
    </Box>
    <Box sx={{ mt: "24px" }}>
      <Button variant="contained" color="primary" onClick={addMetro}>
        Add Metro
      </Button>
    </Box>
  </Box>
  </Box>
  );
};

export default MetroAdd;
