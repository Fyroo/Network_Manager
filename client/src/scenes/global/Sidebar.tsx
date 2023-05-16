import { useState } from "react"; 
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar"; 
import { Box, IconButton, Typography, useTheme } from "@mui/material"; 
import { Link } from "react-router-dom"; 
import "react-pro-sidebar/dist/css/styles.css"; 
import { tokens } from "../../theme"; 
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"; 
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"; 
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import TroubleshootOutlinedIcon from '@mui/icons-material/TroubleshootOutlined';
import CableOutlinedIcon from '@mui/icons-material/CableOutlined';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';

const Item = ({ title, to, icon, selected, setSelected }: { title: any; to: any; icon:any; selected:any; setSelected:any}) => { 
  const theme = useTheme(); 
  const colors = tokens(theme.palette.mode); 
  return ( 
    <MenuItem 
      active={selected === title} 
      style={{ color: colors.grey[100], }} 
      onClick={() => setSelected(title)} 
      icon={icon} 
    > 
      <Typography>{title}</Typography> 
      <Link to={to} /> 
    </MenuItem> 
  ); 
}; 

const Sidebar = () => { 
  const theme = useTheme(); 
  const colors = tokens(theme.palette.mode); 
  const [isCollapsed, setIsCollapsed] = useState(false); 
  const [selected, setSelected] = useState("Dashboard"); 

  return ( 
    <Box 
      sx={{ 
        "& .pro-sidebar-inner": { 
          background: `${colors.primary[400]} !important`, 
        }, 
        "& .pro-icon-wrapper": { 
          backgroundColor: "transparent !important", 
        }, 
        "& .pro-inner-item": { 
          padding: "5px 35px 0px 0px !important", 
        }, 
        "& .pro-inner-item:hover": { 
          color: "#868dfb !important", 
        }, 
        "& .pro-menu-item.active": { 
          color: "#6870fa !important", 
        }, 
      }} 
    > 
      <ProSidebar collapsedWidth="35px" collapsed={isCollapsed}> 
        <Menu iconShape="square"> 
          {/* LOGO AND MENU ICON */} 
          <MenuItem 
            onClick={() => setIsCollapsed(!isCollapsed)} 
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined} 
            style={{ margin: "10px 0 20px 0", marginLeft: 0, color: colors.grey[100], }} 
          > 
            {!isCollapsed && ( 
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px" > 
                <Typography variant="h4" color={colors.grey[100]}> OptiDoc </Typography> 
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}> 
                  <MenuOutlinedIcon /> 
                </IconButton> 
              </Box> 
            )} 
          </MenuItem> 
          {!isCollapsed && ( 
            <Box mb="25px"> 
              <Box textAlign="center" paddingTop={"20px"}> 
                <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ m: "10px 0 0 0" }} > User </Typography> 
                <Typography marginTop={'10px'} variant="h4" color={colors.primary[200]}> Niveaux d'access :</Typography> 
                <Box display={'flex'} flexDirection={'row'} justifyContent={'center'}>
                <Typography variant="h5" color={colors.redAccent[500]} marginRight={'15px'}> Administrateur </Typography> 
                <ShieldOutlinedIcon sx={{color:colors.redAccent[500]}}/>
                </Box>
                
              </Box> 
            </Box> 
          )} 
          <Box  paddingLeft={isCollapsed ? undefined : "10%"}> 
            <Item title="Metro" to="/" icon={<HubOutlinedIcon />} selected={selected} setSelected={setSelected} /> 
            <Item title="LSW" to="/LSW" icon={<DnsOutlinedIcon />} selected={selected} setSelected={setSelected} /> 
            <Item title="Breakout" to="/Breakout" icon={<TroubleshootOutlinedIcon />} selected={selected} setSelected={setSelected} /> 
            {!isCollapsed ? (            <SubMenu title="Backhaul" icon={<CableOutlinedIcon />}> 
              <Item title="144 FO" to="/Backhaul/144FO" icon={<CableOutlinedIcon/>} selected={selected} setSelected={setSelected} ></Item> 
              <Item title="72 FO" to="/Backhaul/72FO" icon={<CableOutlinedIcon/>} selected={selected} setSelected={setSelected} ></Item> 
              <Item title="48 FO" to="/Backhaul/48FO" icon={<CableOutlinedIcon/>} selected={selected} setSelected={setSelected} ></Item> 
              <Item title="24 FO" to="/Backhaul/24FO" icon={<CableOutlinedIcon/>} selected={selected} setSelected={setSelected} ></Item> 
            </SubMenu>  ):(
              <IconButton  onClick={() => setIsCollapsed(!isCollapsed)} >
                <CableOutlinedIcon/>
              </IconButton>
              
            )}

            

            <Item title="Gestion des utilisateurs" to="/Users/ManageRoles" icon={<AccountCircleOutlinedIcon sx={{color:colors.redAccent[500]}} />} selected={selected} setSelected={setSelected} />

          </Box> 
        </Menu> 
      </ProSidebar> 
    </Box> 
  ); 
}; 

export default Sidebar;