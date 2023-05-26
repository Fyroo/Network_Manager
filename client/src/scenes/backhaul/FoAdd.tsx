import { useState } from "react";
import { Box, useTheme } from "@mui/system";
import { tokens } from "../../theme";
import axios from "axios";
import Header from "../../components/Header";
import {
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const FoAdd = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [pos, setPos] = useState("");
  const [ref, setRef] = useState("");
  const [breakout, setBreakout] = useState("");
  const [variant, setVariant] = useState(0);

  const addfo = () => {
    axios
      .post("/api/createfo", {
        name: name,
        client: client,
        pos: pos,
        ref: ref,
        breakout: breakout,
        FO: variant,
      })
      .then(() => {
        console.log("yes");
      });
  };

  return (
    <Box m={"20px"}>
      <Header
        title="Add fo"
        subtitle="subtitle"
        addlink={"/"}
        withbtn={true}
        variant="1"
      />
      <Box
        sx={{ padding: "24px" }}
        style={{ backgroundColor: colors.blueAccent[700] }}
      >
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
            Client:
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            value={client}
            onChange={(event) => setClient(event.target.value)}
          />
        </Box>
        <Box sx={{ mt: "16px" }}>
          <Typography
            variant="h6"
            color={colors.grey[100]}
            gutterBottom
            sx={{ fontWeight: "bold", mb: "8px" }}
          >
            Position Metro/LSW:
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            value={pos}
            onChange={(event) => setPos(event.target.value)}
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
            variant="outlined"
            fullWidth
            value={ref}
            onChange={(event) => setRef(event.target.value)}
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
            value={breakout}
            onChange={(event) => setBreakout(event.target.value)}
          />
        </Box>
        <Box sx={{ mt: "16px" }}>
          <Typography
            variant="h6"
            color={colors.grey[100]}
            gutterBottom
            sx={{ fontWeight: "bold", mb: "8px" }}
          >
            Type:
          </Typography>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">LSW Model</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={variant}
              label="fo Model"
              onChange={(event) => {
                setVariant(event.target.value);
              }}
            >
              <MenuItem value={144}>144FO</MenuItem>
              <MenuItem value={72}>72FO</MenuItem>
              <MenuItem value={48}>48FO</MenuItem>
              <MenuItem value={24}>24FO</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ mt: "24px" }}>
          <Button variant="contained" color="primary" onClick={addfo}>
            Add FO
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FoAdd;
