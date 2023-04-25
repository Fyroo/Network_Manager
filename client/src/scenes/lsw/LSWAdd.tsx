import { useState } from "react";
import { Box, useTheme } from "@mui/system";
import { tokens } from "../../theme";
import axios from "axios";
import Header from "../../components/Header";
import {Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";


const LSWAdd = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [name, setName] = useState("");
  const [uplink, setUplink] = useState("");
  const [model, setModel] = useState("");

  const addLSW = () => {
    axios.post("http://localhost:3001/createLSW",
    { name: name, uplink:uplink, model: model }).then(() => { console.log('yes') })
    
  };

  return (
    <Box m={"20px"}>
    <Header title="Add LSW" subtitle="subtitle" addlink={"/LSW"} withbtn={true} variant="1"/> 
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
        Uplink:
      </Typography>
      <TextField
        variant="outlined"
        fullWidth
        value={uplink}
        onChange={(event) => setUplink(event.target.value)}
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

      <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">LSW Model</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={model}
    label="LSW Model"
    onChange={(event) => {
      setModel(event.target.value);
    }}
  >
    <MenuItem value={"LSW 5700"}>LSW 5700</MenuItem>
    <MenuItem value={"LSW 7706"}>LSW 7706</MenuItem>
    <MenuItem value={"LSW 5720"}>LSW 5720</MenuItem>
    <MenuItem value={"LSW 5735"}>LSW 5735</MenuItem>
  </Select>
</FormControl>

    </Box>
    <Box sx={{ mt: "24px" }}>
      <Button variant="contained" color="primary" onClick={addLSW}>
        Add LSW
      </Button>
    </Box>
  </Box>
  </Box>
  );
};

export default LSWAdd;
