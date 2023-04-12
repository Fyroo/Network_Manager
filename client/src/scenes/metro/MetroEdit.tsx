import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/system";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { IconButton, Typography, TextField, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MetroPorts from "./MetroPorts";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const MetroEdit = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [routerName, setRouterName] = useState("");
  const [newIp, setNewIp] = useState("");
  const [newModel, setNewModel] = useState("");
  const location = useLocation();

  const updateMetro = (name:any) => {
    axios
      .put("http://localhost:3001/updatemetro", {
        ip: newIp,
        model: newModel,
        name: name,
      })
      .then((response) => {
        alert("update");
      });
  };

  useEffect(() => {
    setRouterName(location.state.routerName);
    setNewIp(location.state.routerIp);
    setNewModel(location.state.routerModel);
  }, []);

  return (
    <Box m={"20px"}>
      <Header title="Edit Metro" subtitle="subtitle" addlink={"/"} withbtn={true} variant="1" />
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
          <Typography padding={'10px'} variant="h4" color={colors.greenAccent[300]}>{routerName}</Typography>
          
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
            defaultValue={newIp}
            onChange={(event) => {
              setNewIp(event.target.value);
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
            defaultValue={newModel}
            onChange={(event) => {
              setNewModel(event.target.value);
            }}
          />
        </Box>
        <Box sx={{ mt: "24px" }}>
          <Button variant="contained" color="primary" onClick={() => updateMetro(routerName)}>
            Update Metro
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MetroEdit;
