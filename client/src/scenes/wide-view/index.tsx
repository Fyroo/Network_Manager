import { useState } from "react";
import { Box, } from '@mui/system'
import { Button, IconButton } from "@mui/material";
import { styled } from '@mui/material/styles';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const RootBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  border: `2px solid ${theme.palette.grey[300]}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(6),
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: "''",
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundImage: "url('/router-rack-empty.png')",
    backgroundSize: "cover",
    opacity: "0.4",
    zIndex: "1",
  },
}));

const RouterBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[700],
  color: theme.palette.common.white,
  fontSize: "6rem",
  fontWeight: "bold",
  textAlign: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "2",
}));

const MountButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(6),
  right: theme.spacing(6),
  zIndex: "2",
}));

const PowerButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(6),
  right: theme.spacing(6),
  zIndex: "2",
}));

const RouterRack = () => {
  const [mounted, setMounted] = useState(false);

  const handleMount = () => {
    setMounted(true);
  };

  const handleDismount = () => {
    setMounted(false);
  };

  return (
    <RootBox>
      {mounted && <RouterBox>Router</RouterBox>}
      <MountButton
        variant="contained"
        color={mounted ? "secondary" : "primary"}
        size="large"
        onClick={mounted ? handleDismount : handleMount}
      >
        {mounted ? "Dismount" : "Mount"}
      </MountButton>
      {mounted && (
        <PowerButton aria-label="power-off" onClick={handleDismount}>
          <PowerSettingsNewIcon />
        </PowerButton>
      )}
    </RootBox>
  );
};

export default RouterRack;
