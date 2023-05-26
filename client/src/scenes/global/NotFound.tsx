import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = ({ variant }) => {
  const renderButtonLabel = () => {
    if (variant === 1) {
      return "Go to Home";
    } else if (variant === 2) {
      return "Go to Login";
    } else {
      return "Go to Home"; // Default variant
    }
  };

  const renderButtonLink = () => {
    if (variant === 1) {
      return "/Metro";
    } else if (variant === 2) {
      return "/";
    } else {
      return "/"; // Default variant
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography variant="h1" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        The page you are looking for does not exist.
      </Typography>
      <Button component={Link} to={renderButtonLink()} variant="contained" color="primary">
        {renderButtonLabel()}
      </Button>
    </Box>
  );
};

export default NotFound;
