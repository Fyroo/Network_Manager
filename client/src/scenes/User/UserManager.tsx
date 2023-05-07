import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "role", headerName: "Role", width: 120 },
];

const rows = [
  { id: 1, name: "John Doe", email: "johndoe@example.com", role: "user" },
  { id: 2, name: "Jane Doe", email: "janedoe@example.com", role: "moderator" },
  { id: 3, name: "Bob Smith", email: "bobsmith@example.com", role: "user" },
  { id: 4, name: "Alice Brown", email: "alicebrown@example.com", role: "admin" },
];

const UserManager = () => {
  const [userRows, setUserRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    // Fetch user data from your API or database and set it in state
    setUserRows(rows);
  }, []);

  const handleRowSelection = (selection) => {
    setSelectedRows(selection.rowIds);
  };

  const handleRoleSelection = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleRoleAssignment = () => {
    // Update user data in your API or database based on selectedRows and selectedRole
    const updatedRows = userRows.map((row) => {
      if (selectedRows.includes(row.id)) {
        return { ...row, role: selectedRole };
      }
      return row;
    });
    setUserRows(updatedRows);
    setSelectedRows([]);
    setSelectedRole("");
  };

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={userRows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          onSelectionModelChange={handleRowSelection}
        />
      </div>
      <FormControl variant="outlined" style={{ marginTop: "1rem" }}>
        <InputLabel id="role-select-label">Assign Role</InputLabel>
        <Select
          labelId="role-select-label"
          id="role-select"
          value={selectedRole}
          onChange={handleRoleSelection}
          label="Assign Role"
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="moderator">Moderator</MenuItem>
          <MenuItem value="user">User</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "1rem" }}
        disabled={selectedRows.length === 0 || !selectedRole}
        onClick={handleRoleAssignment}
      >
        Assign Role
      </Button>
    </>
  );
};

export default UserManager;
