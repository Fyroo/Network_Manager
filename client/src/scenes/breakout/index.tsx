import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useTheme } from '@mui/system'
import { tokens } from '../../theme'
import axios from "axios";
import RegArray from "./RegArray";



interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateCentralDialog: React.FC<Props> = ({ open, onClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [centralName, setCentralName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const armoir: string[] = ["AR1", "AR2", "AR3", "AR4", "AR5"];
  const reglette: string[] = [
    "REG1",
    "REG2",
    "REG3",
    "REG4",
    "REG5",
    "REG6",
    "REG7",
    "REG8",
    "REG9",
    "REG10",
  ];
  const regNames: string[] = [
    "01 02",
    "03 04",
    "05 06",
    "07 08",
    "09 10",
    "11 12",
    "13 14",
    "15 16",
    "17 18",
    "19 20",
    "21 22",
    "23 24",
  ];

  const handleCreateCentral = async (name: string) => {
    setLoading(true);
    try {
      const response = await axios.post<{ data: string }>(
        `http://localhost:3001/createcentral/${name}`,
        {}
      );
      const newCentralId = response.data;
      console.log("Created new central with ID:", newCentralId);

      const promises = [];
      for (let i = 0; i < armoir.length; i++) {
        for (let j = 0; j < reglette.length; j++) {
          for (let k = 0; k < regNames.length; k++) {
            const res = await axios.post(
              "http://localhost:3001/createregdata",
              {
                name: regNames[k],
                centralid: newCentralId,
                armoirid: armoir[i],
                regid: reglette[j],
              }
            );
            promises.push(res);
          }
        }
      }

      await Promise.all(promises);
      console.log("All regdata created");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setCentralName("");
    onClose();
  };

  const handleConfirm = () => {
    handleCreateCentral(centralName);
    setCentralName("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>Create a new Central</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="central-name"
          label="Central Name"
          type="text"
          fullWidth
          value={centralName}
          onChange={(event) => setCentralName(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Back</Button>
        <Button onClick={handleConfirm} disabled={!centralName}>
          {loading ? <CircularProgress size={24} /> : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};


const CreateCentralButton = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Create Central
      </Button>
      <CreateCentralDialog open={open} onClose={handleClose} />
    </>
  );
};

const Breakout = () => {
  interface Central {
  id: number;
  name: string;
}

interface RegData {
  id: number;
  reg_id: string;
  created_at: string;
  updated_at: string;
}
  const [centralList, setCentralList] = useState<Central[]>([]);
  const [regData, setRegData] = useState<RegData[]>([]);
  const [selectedItem1, setSelectedItem1] = useState("");
  const [selectedItem2, setSelectedItem2] = useState("");
  const [selectedItem3, setSelectedItem3] = useState("");

  useEffect(() => {
    getCentral();
  }, []);

  const getCentral = () => {
    axios.get("http://localhost:3001/central").then((response) => {
      setCentralList(response.data);
      console.log(response.data);
    });
  };
  const handleChange1 = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    console.log(event.target.value);
    setSelectedItem1(event.target.value);
    setSelectedItem2("");
    setSelectedItem3("");
    setRegData([]);
  };

  const handleChange2 = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedItem2(event.target.value);
    setSelectedItem3("");
    setRegData([]);
  };

  const handleChange3 = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    console.log(selectedItem1);
    console.log(selectedItem2);
    console.log(event.target.value);
    axios
      .get(`http://localhost:3001/regdata/${selectedItem1}?armoirid=${selectedItem2}&regid=${event.target.value}`)
      .then((response) => {
        console.log(response.data);
        setRegData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setSelectedItem3(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <CreateCentralButton />
      <FormControl variant="outlined" sx={{ mr: 2 }}>
        <InputLabel id="dropdown1-label">Central</InputLabel>
        <Select
          labelId="dropdown1-label"
          id="dropdown1"
          value={selectedItem1}
          onChange={handleChange1}
          sx={{ minWidth: "150px" }}
          displayEmpty
        >
          <MenuItem value="">Select a Central</MenuItem>
          {centralList.map((central) => (
            <MenuItem value={central.id} key={central.id}>
              {central.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedItem1 && (
        <FormControl variant="outlined" sx={{ mr: 2 }}>
          <InputLabel id="dropdown2-label">Armoire</InputLabel>
          <Select
            labelId="dropdown2-label"
            id="dropdown2"
            value={selectedItem2}
            onChange={handleChange2}
            sx={{ minWidth: "150px" }}
            displayEmpty
          >
            <MenuItem value="">Select an Armoire</MenuItem>
            <MenuItem value="AR1">Armoire 1</MenuItem>
            <MenuItem value="AR2">Armoire 2</MenuItem>
            <MenuItem value="AR3">Armoire 3</MenuItem>
            <MenuItem value="AR4">Armoire 4</MenuItem>
            <MenuItem value="AR5">Armoire 5</MenuItem>
          </Select>
        </FormControl>
      )}
      {selectedItem2 && (
        <FormControl variant="outlined">
          <InputLabel id="dropdown3-label">Reglette</InputLabel>
          <Select
            labelId="dropdown3-label"
            id="dropdown3"
            value={selectedItem3}
            onChange={handleChange3}
            sx={{ minWidth: "150px" }}
            displayEmpty
          >
            <MenuItem value="">Select a Reglette</MenuItem>
            <MenuItem value="REG1">Reglette 1</MenuItem>
            <MenuItem value="REG2">Reglette 2</MenuItem>
            <MenuItem value="REG3">Reglette 3</MenuItem>
            <MenuItem value="REG4">Reglette 4</MenuItem>
            <MenuItem value="REG5">Reglette 5</MenuItem>
            <MenuItem value="REG6">Reglette 6</MenuItem>
            <MenuItem value="REG7">Reglette 7</MenuItem>
            <MenuItem value="REG8">Reglette 8</MenuItem>
            <MenuItem value="REG9">Reglette 9</MenuItem>
            <MenuItem value="REG10">Reglette 10</MenuItem>
          </Select>
        </FormControl>
      )}
      <RegArray inputData={regData}/>
    </Box>
  );
};

export default Breakout;
