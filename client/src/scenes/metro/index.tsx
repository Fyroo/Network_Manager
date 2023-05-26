import { Box, useTheme } from "@mui/system";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import NetworkChart from "./NetworkChart";
import { Button, IconButton, Typography } from "@mui/material";
import MetroArray from "./MetroArray";
import { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import BlocksMap from "./BlocksMap";
import { Link } from "react-router-dom";
import EditPortField from "./EditPortField";
import SaveIcon from "@mui/icons-material/Save";
import { animated, useSpring } from "@react-spring/web";

const Metro = ({role}:{role:any}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [selectedMetro, setSelectedMetro] = useState([]);
  const [portAddress, setPortAddress] = useState("No Port Selected");
  const [portId, setPortId] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [routerName, setRouterName] = useState("No Router Selected");
  const [routerIp, setRouterIP] = useState("");
  const [routerModel, setRouterModel] = useState("No Router Selected");
  const [metroList, setMetroList] = useState([]);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const ConfirmBox = () => {
    const dialogStyles = {
      backgroundColor: "#fff",
      boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
      borderRadius: "8px",
    };
    const titleStyles = {
      backgroundColor: colors.redAccent[600],
      color: "#fff",
    };

    return (
      <animated.div style={useSpring({ opacity: open ? 1 : 0 })}>
        <Dialog
          open={open}
          onClose={handleClose}
          sx={{ "& .MuiDialog-paper": dialogStyles }}
        >
          <DialogTitle sx={{ ...titleStyles }}>
            Delete Router {routerName}?
          </DialogTitle>
          <DialogContent>
            <Typography color={colors.primary[800]}>
              Are you sure you want to delete this router and all it's
              components?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={() => {
                axios
                  .delete(`/api/deletemetro/${routerName}`)
                  .then(() => {
                    handleClose();
                    window.location.reload();
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </animated.div>
    );
  };

  const metroArrayAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(-50px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    reverse: !MetroArray,
    reset: !MetroArray,
  });
  const boxAnimation = useSpring({
    from: { backgroundColor: colors.primary[500] },
    to: { backgroundColor: colors.blueAccent[500] },
    delay: 300,
  });
  const editIconAnimation = useSpring({ scale: 1, opacity: 1 });
  const saveIconAnimation = useSpring({ scale: 1, opacity: 1 });
  const handleEditIconHover = () => {
    editIconAnimation.scale.set(1.2);
    editIconAnimation.opacity.set(0.5);
  };
  const handleSaveIconHover = () => {
    saveIconAnimation.scale.set(1.2);
    saveIconAnimation.opacity.set(0.5);
  };
  const handleIconLeave = () => {
    editIconAnimation.scale.set(1);
    editIconAnimation.opacity.set(1);
    saveIconAnimation.scale.set(1);
    saveIconAnimation.opacity.set(1);
  };


  const getMetro = () => {
    axios.get("/api/metro").then((response) => {
      setMetroList(response.data);
    });
  };
  useEffect(() => {
    getMetro();
  }, []);
  function getPort(childData: any) {
    setPortAddress(childData.Address);
    setPortId(childData.ID);
  }

  function callbackFunction(childData: any) {
    setRouterName(childData.name);
    setRouterIP(childData.ip);
    setRouterModel(childData.model);
    setTimeout(() => {
      setSelectedMetro(childData);
    }, 500);
  }
  const AnimatedBox = animated(Box);

  function handelMetroDelete() {
    if (routerName === "No Router Selected") {
      return;
    } else {
      handleOpen();
    }
  }
  return (
    <Box m="20px">
      <Header
        title="Metro"
        subtitle="Description"
        addlink="/Metro/add"
        withbtn={role==='Administrateur'} 
        variant="2"
      />
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridColumn={12}
        gridAutoRows="14vh"
        gap="30px"
        mt="10px"
      >
        <Box gridColumn="span 9" gridRow="span 2">
          <animated.div style={metroArrayAnimation}>
            <MetroArray parentCallback={callbackFunction} data={metroList} />
          </animated.div>
        </Box>

        <Box gridColumn="span 3" gridRow="span 5">
          <Box display={"flex"} alignItems={"center"} height={"100%"}>
            <AnimatedBox
              style={boxAnimation}
              sx={{
                minHeight: "20vh",
                backgroundColor: colors.blueAccent[500],
                borderRadius: "10px",
                color: "white",
                display: "flex",
                flexDirection: "column",
                padding: "20px",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" fontWeight="600">
                  {portAddress}
                </Typography>
              </Box>
              <Box sx={{ marginTop: "15px" }}>
                {portAddress !== "No Port Selected" && (
                  <EditPortField portId={portId} role={role} />
                )}
              </Box>
            </AnimatedBox>
          </Box>
        </Box>
        <AnimatedBox
          style={boxAnimation}
          gridColumn="span 6"
          gridRow="span 3"
          sx={{
            backgroundColor: colors.blueAccent[500],
            borderRadius: "10px",
            color: "white",
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            height: "48vh",
          }}
        >
          <Typography variant="h5" fontWeight="600">
            Reseax Metro Ariana
          </Typography>
          <NetworkChart />
        </AnimatedBox>
        <Box gridColumn="span 3" gridRow="span 3">
          <AnimatedBox
            style={boxAnimation}
            sx={{
              backgroundColor: colors.blueAccent[500],
              borderRadius: "10px",
              color: "white",
              display: "flex",
              flexDirection: "column",
              padding: "20px 20px 0 20px",
              height: "48vh",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" fontWeight="600">
                {routerName}
              </Typography>
              <Box>
                <Link
                  to={routerName === "No Router Selected" ? "#" : "/Metro/edit"}
                  state={{ routerName, routerIp, routerModel }}
                >
                  <IconButton
                    aria-label="edit"
                    sx={{ color: colors.grey[200] }}
                    disabled={((routerName === 'No Router Selected')|| (role==='Utilisateur'))
                    }
                  >
                    <EditIcon />
                  </IconButton>
                </Link>
                <IconButton
                  aria-label="delete"
                  sx={{ color: colors.redAccent[400] }}
                  onClick={handelMetroDelete}
                  disabled={((routerName === 'No Router Selected')|| !(role==='Administrateur')) }
                >
                  <DeleteIcon />
                </IconButton>

                <ConfirmBox></ConfirmBox>
              </Box>
            </Box>
            <Typography variant="h6" fontWeight="600">
              {routerIp}
            </Typography>
            <Box sx={{ marginTop: "20px" }}>
              <BlocksMap
                parentCallback={getPort}
                selectedMetro={selectedMetro}
              />
            </Box>
          </AnimatedBox>
        </Box>
      </Box>
    </Box>
  );
};
export default Metro;