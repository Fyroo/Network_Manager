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
      flex: 1,
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
    {
      field: "acess",
      headerName: "Access Level",
      flex: 1,
      headerAlign:"center",
      minWidth: 100,
      renderCell: (params: GridCellParams) => {
        const access = params.value as string;
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            color={
              access === "admin"
                ? colors.greenAccent[600]
                : colors.redAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "user" && <LockOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (

      
      <Box
        m={ "0 0 0 0" }
        height={"33vh"}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
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
        <DataGrid hideFooter 
        rows={data} 
        columns={columns}
        onRowClick={(params) => handleItemClick(params.row)}
        components={{ Toolbar: GridToolbar }} />
      </Box>
    
  );
};

export default MetroArray;