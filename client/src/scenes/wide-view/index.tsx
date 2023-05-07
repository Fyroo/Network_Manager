// import { useState, Fragment } from "react";
// import axios from "axios";
// import { useTheme } from "@mui/system";
// import { tokens } from "../../theme";
// import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button, IconButton } from "@mui/material";
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

 const RouterRack = ({ inputData }: { inputData: any }) => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   const [editContactId, setEditContactId] = useState(null);
//   const [editFormData, setEditFormData] = useState({
//     name: "",
//     A: "",
//     B: "",
//     FO: "",
//     dest: "",
//     obs: "",
//   });

//   const handleEditClick = (event: any, contact: any) => {
//     event.preventDefault();
//     setEditContactId(contact.id);
//     setEditFormData(contact);
//   };

//   const handleCancelClick = () => {
//     setEditContactId(null);
//   };

//   const handleEditFormChange = (event: any) => {
//     setEditFormData({
//       ...editFormData,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const handleEditFormSubmit = (event: any) => {
//     event.preventDefault();
//   };

//   const handleSaveClick = (id: any, contact: any) => {
//     axios
//       .put(`https://my.api.com/contacts/${id}`, contact)
//       .then(() => {
//         setEditContactId(null);
//       })
//       .catch((err: any) => {
//         console.error(err);
//       });
//   };

//   const handleDeleteClick = (id: any) => {
//     axios
//       .delete(`https://my.api.com/contacts/${id}`)
//       .then(() => {
//         setEditContactId(null);
//       })
//       .catch((err: any) => {
//         console.error(err);
//       });
//   };

//   return (
//     <TableContainer component={Paper} style={{ backgroundColor: colors.primary["500"] }}>
//       <Table sx={{ minWidth: 650 }}>
//         <TableHead>
//           <TableRow sx={{ backgroundColor: colors.grey["700"] }}>
//             <TableCell style={{ fontSize: "16px", color: "white", width: "180px" }}>Name</TableCell>
//             <TableCell style={{ fontSize: "16px", color: "white", width: "180px" }}>Extremite A</TableCell>
//             <TableCell style={{ fontSize: "16px", color: "white", width: "180px" }}>Extremite B</TableCell>
//             <TableCell style={{ fontSize: "16px", color: "white", width: "180px" }}>vers FO</TableCell>
//             <TableCell style={{ fontSize: "16px", color: "white", width: "180px" }}>Destination</TableCell>
//             <TableCell style={{ fontSize: "16px", color: "white", width: "180px" }}>Observ</TableCell>
//             <TableCell style={{ fontSize: "16px", color: "white", width: "180px" }}>Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {inputData.map((contact: any) => (
//             <Fragment key={contact.id}>
//               {editContactId === contact.id ? (
//                 <TableRow>
//                   <TableCell>
//                     <input type="text" disabled={true} placeholder="Enter a name..." name="name" value={editFormData.name} onChange={handleEditFormChange} ></input>
//                   </TableCell>
//                   <TableCell>
//                     <input type="text" required={true} placeholder="Enter an A..." name="A" value={editFormData.A} onChange={handleEditFormChange} ></input>
//                   </TableCell>
//                   <TableCell>
//                     <input type="text" required={true} placeholder="Enter a phone number..." name="B" value={editFormData.B} onChange={handleEditFormChange} ></input>
//                   </TableCell>
//                   <TableCell>
//                     <input type="FO" required={true} placeholder="Enter an FO..." name="FO" value={editFormData.FO} onChange={handleEditFormChange} ></input>
//                   </TableCell>
//                   <TableCell>
//                     <input type="dest" required={true} placeholder="Enter a destination" name="dest" value={editFormData.dest} onChange={handleEditFormChange} ></input>
//                   </TableCell>
//                   <TableCell>
//                     <input type="obs" required={true} placeholder="Enter an observation..." name="obs" value={editFormData.obs} onChange={handleEditFormChange} ></input>
//                   </TableCell>
//                   <TableCell>
//                     <Button variant="contained" onClick={() => handleSaveClick(contact.id, editFormData)}>Save</Button>
//                     <IconButton aria-label="cancel" onClick={handleCancelClick}>
//                       <DeleteIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 <TableRow>
//                   <TableCell>{contact.name}</TableCell>
//                   <TableCell>{contact.A}</TableCell>
//                   <TableCell>{contact.B}</TableCell>
//                   <TableCell>{contact.FO}</TableCell>
//                   <TableCell>{contact.dest}</TableCell>
//                   <TableCell>{contact.obs}</TableCell>
//                   <TableCell>
//                     <Button variant="contained" onClick={(event) => handleEditClick(event, contact)}>
//                       <EditIcon />
//                     </Button>
//                     <IconButton aria-label="delete" onClick={() => handleDeleteClick(contact.id)}>
//                       <DeleteIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </Fragment>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
 };

export default RouterRack;