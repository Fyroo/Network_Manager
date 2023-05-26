import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import PortIcon from "../../components/PortIcon";
import { tokens } from "../../theme";
import { useTheme } from "@mui/system";
import { useSpring, animated } from "react-spring";

const PortsMap = ({
  block,
  parentCallback,
}: {
  parentCallback: (childData: any) => void;
  block: any;
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [portList, setPortList] = useState<any[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const checkCalledRef = useRef(false);
  const loadingAnimation = useSpring({
    opacity: isDataLoaded ? 0 : 1,
    transform: isDataLoaded ? "translateY(-50px)" : "translateY(0)",
  });

  const dataAnimation = useSpring({
    opacity: isDataLoaded ? 1 : 0,
    transform: isDataLoaded ? "translateY(0)" : "translateY(50px)",
  });

  useEffect(() => {
    getPorts();
  }, [block]);

  const getPorts = () => {
    axios.get(`/api/ports/${block.id}`).then((response) => {
      setPortList(response.data);
      if (!checkCalledRef.current) {
        check(response.data, block);
        checkCalledRef.current = true;
      }
    });
  };

  const createPort = async (key: any, i: any) => {
    await axios.post("/api/createport", {
      blockid: key,
      slot: i,
    });
    console.log("Port Created");
  };

  async function check(props: any, block: any) {
    if (props.length === 0) {
      console.log("No Ports Found, Creating Ports..");
      for (let i = 0; i < block.length; i++) {
        await createPort(block.id, i);
      }
      await getPorts();
      setIsDataLoaded(true);
    } else {
      await getPorts();
      setIsDataLoaded(true);
    }
  }

  const dataPort = portList.map((data) => {
    return (
      <Port
        key={data.id}
        ID={data.id}
        Address={data.address}
        AffPort={data.affport}
        Breakout={data.breakout}
        OptHead={data.opthead}
        Observ={data.observ}
      />
    );
  });

  function handelShowClick(item: any) {
    parentCallback(item);
  }

  function Port(props: any) {
    return (
      <Box flexDirection={"column"}>
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <Button onClick={() => handelShowClick(props)}>
            <PortIcon />
          </Button>
        </Box>
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <Typography
            color={colors.primary[900]}
            variant="h3"
            sx={{ color: colors.grey[100] }}
          >
            {props.Address}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Typography>{block.name}</Typography>
      <animated.div style={loadingAnimation}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Typography>Loading Ports...</Typography>
        </Box>
      </animated.div>
      <animated.div style={dataAnimation}>
        <Box>{dataPort}</Box>
      </animated.div>
    </Box>
  );
};

export default PortsMap;
