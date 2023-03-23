import { Box, IconButton, useTheme } from "@mui/material";
import { Component, useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Topbar:React.FC = () => {
  // Retrieve the current theme object
  const theme = useTheme();

  // Get the token colors based on the current theme mode
  const colors = tokens(theme.palette.mode);

  // Retrieve the current color mode (light or dark) and the function to toggle it
  const colorMode = useContext(ColorModeContext);

  return (
    // Render a box with flex display and space-between justification with 2 units of padding
    <Box display="flex" justifyContent="space-between" p={2} pb={0}>

      {/* SEARCH BAR */}

      
      <Box
        // Render a box with flex display, a background color based on the primary token color, and 3px of border radius
        display="flex"
        color={colors.primary[400]}
        borderRadius="3px"
      >
        {/* Render an input field with margin left and a flex grow of 1, and a placeholder text of "Search" */}
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />

        {/* Render an icon button with a padding of 1 */}
        <IconButton type="button" sx={{ p: 1 }}>
          {/* Render a search icon */}
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        {/* Render an icon button that toggles between light and dark mode when clicked */}
        <IconButton onClick={colorMode.toggleColorMode}>
          {/* Render either a dark or light mode icon based on the current theme mode */}
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

// Export the Topbar component as the default export
export default Topbar;
