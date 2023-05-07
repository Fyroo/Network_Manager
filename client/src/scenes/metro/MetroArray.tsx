import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams, GridToolbar  } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataMetro } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";


const MetroArray = ({data, parentCallback}: { data:any, parentCallback: (childData: any) => void }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  function handleItemClick(item: number) {
    parentCallback(item);
  }

  const columns:any = [
    {
      field: "name",
      headerName: "Name",
      flex: 2,
      cellClassName: "name-column--cell",
      minWidth: 100,
    },
    {
      field: "ip",
      headerName: "Address",
      flex:1,
      minWidth: 100,
    },
    {
      field: "model",
      headerName: "Model",
      flex: 1,
      minWidth: 100,
    },

  ];

  return (

    <Box
    height={"33vh"}
    sx={{
      "& .MuiDataGrid-root": {
        border: "none",
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
      },
      "& .MuiDataGrid-cell": {
        borderBottom: "none",
        padding: "10px 15px",
      },
      "& .name-column--cell": {
        color: colors.greenAccent[300],
      },
      "& .MuiDataGrid-columnHeaders": {
        backgroundColor: colors.blueAccent[700],
        borderTopLeftRadius:'10px',
        borderTopRightRadius:'10px',
        borderBottom: "none",
        padding: "10px 15px",
      },
      "& .MuiDataGrid-virtualScroller": {
        backgroundColor: colors.primary[400],
      },
      "& .MuiDataGrid-footerContainer": {
        borderTop: "none",
        backgroundColor: colors.blueAccent[700],
        padding: "10px 15px",
      },
      "& .MuiCheckbox-root": {
        color: `${colors.greenAccent[200]} !important`,
      },
      "& .MuiDataGrid-root .MuiDataGrid-cell:focus": {
        outline:"none",
      },
      
      "& .MuiDataGrid-root .MuiDataGrid-cell":{
        border:"none"
      },
      
      "& .MuiDataGrid-row:nth-of-type(odd)": {
        outline:"none",
        backgroundColor: theme.palette.mode === 'dark' ? colors.primary[500] : colors.primary[900],
      },
      "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
    
        color: `${colors.grey[100]} !important`,
      },
      "& .MuiDataGrid-row:hover":{
        backgroundColor: theme.palette.mode === 'dark' ? colors.primary[900] : colors.grey[800],          },
    }}
  >
    <DataGrid style={{borderRadius:'10px'}} hideFooter 
    rows={data} 
    columns={columns}
    onRowClick={(params) => handleItemClick(params.row)}
    components={{ Toolbar: GridToolbar }} />
  </Box>

);
};

export default MetroArray;