import axios from "axios";
import ListView from "./ListView";
import { useEffect, useState } from "react";
import { AnimatedTypography } from "../../components/AnimatedComponents";
import Header from "../../components/Header";
import { Box, useTheme } from "@mui/system";
import { tokens } from "../../theme";
import { useSpring, animated } from "react-spring";
import EditFo from "./EditFo";


const Backhaul = ({ foVarient }: { foVarient: number }) => {
  const [foName, setfoName] = useState("No FO Selected");
  const [selectedFo, setselectedFo] = useState([]);
  const [foData, setFoData] = useState<[]>();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const AnimatedBox = animated(Box);
  const boxAnimation = useSpring({
    from: { backgroundColor: colors.primary[500] },
    to: { backgroundColor: colors.blueAccent[500] },
    delay: 300,
  });
  useEffect(() => {
    axios.get(`http://localhost:3001/fo/${foVarient}`).then((response) => {
      setFoData(response.data);
    });
  }, [foVarient]);

  function getSelectedFo(childData: any) {
    console.log(childData);
    setfoName(childData.name);
    setselectedFo(childData);
  }

  if (foData === null) {
    return <div>Loading...</div>;
  }

  return (
    <Box m={"20px"}>
      <Header
        title={foVarient.toString()}
        subtitle="Description"
        addlink="/Backhaul/Add"
        withbtn={true}
        variant={""}
      />

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridColumn={12}
        gridRow={1}
        gap="23px"
      >
        <AnimatedBox
          gridColumn="span 3"
          gridRow="span 1"
          minHeight={"80vh"}
          style={boxAnimation}
          sx={{
            backgroundColor: colors.blueAccent[500],
            borderRadius: "10px",
            color: "white",
            display: "flex",
            flexDirection: "column",
            padding: "20px",
          }}
        >
          <Box
            pt={"10px"}
            sx={{ backgroundColor: colors.blueAccent[800] }}
            justifyContent="space-between"
            alignContent={"center"}
          >
            <AnimatedTypography
              reset={false}
              p="10px 25px 15px"
              variant="h5"
              fontWeight="600"
              color={colors.grey[100]}
            >
              LSW
            </AnimatedTypography>
          </Box>

          <ListView data={foData} parentCallback={getSelectedFo} />
        </AnimatedBox>

        <AnimatedBox
          gridColumn="span 9"
          gridRow="span 1"
          minHeight={"80vh"}
          style={boxAnimation}
          sx={{
            backgroundColor: colors.blueAccent[500],
            borderRadius: "10px",
            color: "white",
            display: "flex",
            flexDirection: "column",
            padding: "20px",
          }}>
          <EditFo selectedFo={selectedFo} foName={foName}/>
        </AnimatedBox>
      </Box>
    </Box>
  );
};

export default Backhaul;
