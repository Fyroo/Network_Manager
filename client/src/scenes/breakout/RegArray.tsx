import { useState, Fragment, useEffect } from "react";
import axios from "axios";
import { useTheme } from "@mui/system";
import { tokens } from "../../theme";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface ArrayData {
  id: number;
  name: string;
  A: string;
  B: string;
  FO: string;
  dest: string;
  obs: string;
}

interface EditFormData {
  name: string;
  A: string;
  B: string;
  FO: string;
  dest: string;
  obs: string;
}

interface RegArrayProps {
  inputData: ArrayData[];
}

const RegArray = ({ inputData }: RegArrayProps) => {
  const [contacts, setContacts] = useState<ArrayData[]>(inputData);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  useEffect(() => {
    setContacts(inputData);
  }, [inputData]);

  const [editFormData, setEditFormData] = useState<EditFormData>({
    name: "",
    A: "",
    B: "",
    FO: "",
    dest: "",
    obs: "",
  });

  const [editContactId, setEditContactId] = useState<number | null>(null);

  const handleEditFormChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName!] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditFormSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId!,
      name: editFormData.name,
      A: editFormData.A,
      B: editFormData.B,
      FO: editFormData.FO,
      dest: editFormData.dest,
      obs: editFormData.obs,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex(
      (arrayData) => arrayData.id === editContactId
    );

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    arrayData: ArrayData
  ) => {
    event.preventDefault();
    setEditContactId(arrayData.id);

    const formValues = {
      name: arrayData.name,
      A: arrayData.A,
      B: arrayData.B,
      FO: arrayData.FO,
      dest: arrayData.dest,
      obs: arrayData.obs,
    };

    setEditFormData(formValues);
    console.log(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  if (contacts == null || contacts.length === 0) {
    return <Typography variant="h6">Veuillez compléter toutes les sélections ci-dessus(Cental, Armoir et Reglette) pour visualiser vos données...</Typography>;
  }

  return (
    <div className="app-container" style={{ backgroundColor: colors.primary["500"] }}>
      <form onSubmit={handleEditFormSubmit}>
        <TableContainer component={Paper}>
          <Table style={{ borderCollapse: "collapse", width: "100%" }}>
            <TableHead  style={{ backgroundColor: colors.blueAccent["800"]  }}>
              <TableRow style={{ backgroundColor: colors.blueAccent["500"] }}>
                <TableCell
                  style={{
                    padding: "12px",
                    fontSize: "16px",
                    color: "white",
                    width: "180px",
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  style={{
                    padding: "12px",
                    fontSize: "16px",
                    color: "white",
                    width: "180px",
                  }}
                >
                  Extremite A
                </TableCell>
                <TableCell
                  style={{
                    padding: "12px",
                    fontSize: "16px",
                    color: "white",
                    width: "180px",
                  }}
                >
                  Extremite B
                </TableCell>
                <TableCell
                  style={{
                    padding: "12px",
                    fontSize: "16px",
                    color: "white",
                    width: "180px",
                  }}
                >
                  vers FO
                </TableCell>
                <TableCell
                  style={{
                    padding: "12px",
                    fontSize: "16px",
                    color: "white",
                    width: "180px",
                  }}
                >
                  Destination
                </TableCell>
                <TableCell
                  style={{
                    padding: "12px",
                    fontSize: "16px",
                    color: "white",
                    width: "180px",
                  }}
                >
                  Observ
                </TableCell>
                <TableCell
                  style={{
                    padding: "12px",
                    fontSize: "16px",
                    color: "white",
                    width: "180px",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((arrayData) => (
                <Fragment key={arrayData.id}>
                  {editContactId === arrayData.id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                      id={arrayData.id}
                    />
                  ) : (
                    <ReadOnlyRow
                      arrayData={arrayData}
                      handleEditClick={handleEditClick}
                    />
                  )}
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </form>
    </div>
  );
};

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  id,
}: {
  editFormData: any;
  handleEditFormChange: any;
  handleCancelClick: any;
  id: number;
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleSaveClick = (activeid: any, data: any) => {
    console.log(data);
    axios
      .put(`/api/updateReg/${activeid}`, {
        A: data.A,
        B: data.B,
        FO: data.FO,
        dest: data.dest,
        obs: data.obs,
      })
      .then((response) => {
        alert("updated");
      });
  };

  return (
    <TableRow style={{backgroundColor:colors.blueAccent[900]}}>
      <TableCell>
        <TextField
        
          variant="outlined"
          disabled={true}
          placeholder="Enter a name..."
          name="name"
          value={editFormData.name}
          onChange={handleEditFormChange}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="outlined"
          required={true}
          placeholder="Enter an A..."
          name="A"
          value={editFormData.A}
          onChange={handleEditFormChange}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="outlined"
          required={true}
          placeholder="Enter a phone number..."
          name="B"
          value={editFormData.B}
          onChange={handleEditFormChange}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="outlined"
          required={true}
          placeholder="Enter an FO..."
          name="FO"
          value={editFormData.FO}
          onChange={handleEditFormChange}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="outlined"
          required={true}
          placeholder="Enter a destination"
          name="dest"
          value={editFormData.dest}
          onChange={handleEditFormChange}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="outlined"
          required={true}
          placeholder="Enter an observation..."
          name="obs"
          value={editFormData.obs}
          onChange={handleEditFormChange}
        />
      </TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          style={{marginRight:'10px'}}
          onClick={() => handleSaveClick(id, editFormData)}
        >
          Save
        </Button>
        <Button variant="contained" onClick={handleCancelClick}>
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  );
};

const ReadOnlyRow = ({
  arrayData,
  handleEditClick,
}: {
  arrayData: ArrayData;
  handleEditClick: any;
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <TableRow style={{backgroundColor:colors.blueAccent[600]}}>
      <TableCell>{arrayData.name}</TableCell>
      <TableCell>{arrayData.A}</TableCell>
      <TableCell>{arrayData.B}</TableCell>
      <TableCell>{arrayData.FO}</TableCell>
      <TableCell>{arrayData.dest}</TableCell>
      <TableCell>{arrayData.obs}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          onClick={(event) => handleEditClick(event, arrayData)}
          style={{color:colors.primary[100],backgroundColor:colors.primary[900]}}
        >
          Edit
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default RegArray;
