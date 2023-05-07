import { useState } from "react"; 
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar"; 
import { Box, IconButton, Typography, useTheme } from "@mui/material"; 
import { Link } from "react-router-dom"; 
import "react-pro-sidebar/dist/css/styles.css"; 
import { tokens } from "../../theme"; 
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"; 
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"; 
import PublicIcon from '@mui/icons-material/Public'; 
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

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
                <Typography variant="h4" color={colors.grey[100]}> ADMINIS </Typography> 
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}> 
                  <MenuOutlinedIcon /> 
                </IconButton> 
              </Box> 
            )} 
          </MenuItem> 
          {!isCollapsed && ( 
            <Box mb="25px"> 
              <Box textAlign="center" paddingTop={"20px"}> 
                <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ m: "10px 0 0 0" }} > Nom Utilisateur </Typography> 
                <Typography variant="h5" color={colors.greenAccent[500]}> Niveau d'Access </Typography> 
              </Box> 
            </Box> 
          )} 
          <Box  paddingLeft={isCollapsed ? undefined : "10%"}> 
            <Item title="Metro" to="/" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} /> 
            <Item title="LSW" to="/LSW" icon={<PublicIcon />} selected={selected} setSelected={setSelected} /> 
            <Item title="Breakout" to="/Breakout" icon={<PublicIcon />} selected={selected} setSelected={setSelected} /> 
            <SubMenu title="Backhaul" icon={<PublicIcon />} > 
              <Item title="144 FO" to="/Backhaul/144FO" icon={<PublicIcon />} selected={selected} setSelected={setSelected} ></Item> 
              <Item title="72 FO" to="/Backhaul/72FO" icon={<PublicIcon />} selected={selected} setSelected={setSelected} ></Item> 
              <Item title="48 FO" to="/Backhaul/48FO" icon={<PublicIcon />} selected={selected} setSelected={setSelected} ></Item> 
              <Item title="24 FO" to="/Backhaul/24FO" icon={<PublicIcon />} selected={selected} setSelected={setSelected} ></Item> 
            </SubMenu> 
            <Box height={isCollapsed ?'57vh': "43vh"}></Box>
            <Item title="User Management" to="/user-management" icon={<AccountCircleOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Profile Settings" to="/profile-settings" icon={<SettingsOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Log Out" to="/logout" icon={<ExitToAppOutlinedIcon />} selected={selected} setSelected={setSelected} />
          </Box> 
        </Menu> 
      </ProSidebar> 
    </Box> 
  ); 
}; 

export default Sidebar;