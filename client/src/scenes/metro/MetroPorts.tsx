import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import PortIcon from "../../components/PortIcon";
import { tokens } from "../../theme";
import info from "./modelinfo";
import { useState, useEffect } from "react";
import axios from "axios";

const MetroPorts = ({ parentCallback ,selectedMetro}: { selectedMetro:any;parentCallback: (childData: any) => void }) => {
  const theme = useTheme();
  const [blocksList, setBlocksList] = useState<any[]>([]);
  const colors = tokens(theme.palette.mode);

  const getBlocks = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/blocks/${selectedMetro.id}`);
      setBlocksList(response.data);
      console.log(blocksList);
    } catch (error) {
      console.error(error);
    }
  };

useEffect(() => {
  getBlocks();
}, [selectedMetro]);

useEffect(() => {
  check();
}, [blocksList]);

  const createBlocks = (props:any,i:any) => {
     axios.post("http://localhost:3001/createblock", { name: `${props.name}-${i}`, metroid: props.id, state: false ,slot:i });
    console.log('yes');

  };
  // const handleItemClick = (item: any) => {
  //   parentCallback(item);
  // };
  
  function Port({ name, state }: any) {
    return (
      <Box>
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <Button style={{ padding: '5' }}>
            <PortIcon isActive={true} />
          </Button>
        </Box>
  
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <Typography color={colors.primary[900]} sx={{ fontSize: { sm: 11, xs: 15 } }}>
            {name}
          </Typography>
        </Box>
      </Box>
    );
  }

  const dataComp = blocksList.map((data) => {
    if (data.state) {
      return (
        <Port key={data.id} state={data.state} title={data.name} />
      );
    } else {
      return (
        <Box key={data.id}>
          <Typography>{data.name}</Typography>
        </Box>
      );
    }
  });

  function check(){
    let modelInfo = info.find((model: any) => 
    model.modelname === selectedMetro.model);
    if(modelInfo){
      console.log(blocksList.length)
      if ((blocksList.length) === 0) {
        console.log('no blocks')
        for (let i = 1; i <= modelInfo.blocksnumber; i++) {
          createBlocks(selectedMetro, i);
         }
      }else{
        return;
      }
      }else{
        return 
    }

  }
  
  return (
    <Box display="flex" height={'77vh'} flexDirection="column" 
    style={{ overflow: "hidden", overflowY: "scroll" }}>
  {dataComp}
    </Box>
  );
};

export default MetroPorts;
