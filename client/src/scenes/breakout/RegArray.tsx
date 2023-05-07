import { useState, Fragment, useEffect } from "react";
import axios from "axios";
import { useTheme } from "@mui/system";
import { tokens } from "../../theme";
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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

  const handleEditFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName!] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

    const index = contacts.findIndex((arrayData) => arrayData.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event: React.MouseEvent<HTMLAnchorElement>, arrayData: ArrayData) => {
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
    return <div>Waiting for data</div>;
  }

  return (
    <div
      className="app-container"
      style={{ backgroundColor: colors.primary["500"] }}
    >
      <form onSubmit={handleEditFormSubmit}>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr style={{ backgroundColor: colors.grey["700"] }}>
              <th
                style={{
                  padding: "12px",
                  fontSize: "16px",
                  color: "white",
                  width: "180px",
                }}
              >
                Name
              </th>
              <th
                style={{
                  padding: "12px",
                  fontSize: "16px",
                  color: "white",
                  width: "180px",
                }}
              >
                Extremite A
              </th>
              <th
                style={{
                  padding: "12px",
                  fontSize: "16px",
                  color: "white",
                  width: "180px",
                }}
              >
                Extremite B
              </th>
              <th
                style={{
                  padding: "12px",
                  fontSize: "16px",
                  color: "white",
                  width: "180px",
                }}
              >
                vers FO
              </th>
              <th
                style={{
                  padding: "12px",
                  fontSize: "16px",
                  color: "white",
                  width: "180px",
                }}
              >
                Destination
              </th>
              <th
                style={{
                  padding: "12px",
                  fontSize: "16px",
                  color: "white",
                  width: "180px",
                }}
              >
                Observ
              </th>
              <th
                style={{
                  padding: "12px",
                  fontSize: "16px",
                  color: "white",
                  width: "180px",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
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
          </tbody>
        </table>
      </form>
    </div>
  );
};

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  id,
}:{  editFormData:any;
  handleEditFormChange:any;
  handleCancelClick:any;
  id:number;}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleSaveClick = (activeid: any, data: any) => {
    console.log(data);
    axios
      .put(`http://localhost:3001/updateReg/${activeid}`, {
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
    <tr>
      <td>
        <input
          type="text"
          disabled={true}
          placeholder="Enter a name..."
          name="name"
          value={editFormData.name}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required={true}
          placeholder="Enter an A..."
          name="A"
          value={editFormData.A}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required={true}
          placeholder="Enter a phone number..."
          name="B"
          value={editFormData.B}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="FO"
          required={true}
          placeholder="Enter an FO..."
          name="FO"
          value={editFormData.FO}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="dest"
          required={true}
          placeholder="Enter a destination"
          name="dest"
          value={editFormData.dest}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="obs"
          required={true}
          placeholder="Enter an observation..."
          name="obs"
          value={editFormData.obs}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button type="submit" onClick={() => handleSaveClick(id, editFormData)}>
          Save
        </button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

const ReadOnlyRow = ({ arrayData, handleEditClick }:{arrayData:ArrayData;handleEditClick:any}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <tr>
      <td>{arrayData.name}</td>
      <td>{arrayData.A}</td>
      <td>{arrayData.B}</td>
      <td>{arrayData.FO}</td>
      <td>{arrayData.dest}</td>
      <td>{arrayData.obs}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, arrayData)}
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default RegArray;
