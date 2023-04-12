import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import PortIcon from "../../components/PortIcon";
import Data from "../../data/Data";
import { tokens } from "../../theme";
import info from "./modelinfo";

const MetroPorts = ({ parentCallback }: { parentCallback: (childData: any) => void }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const Block = ({ isActive = false, Data }: { isActive?: boolean; Data: any }) => {
    const handleItemClick = (item: any) => {
      parentCallback(item);
    };

    const Port = (props: any) => (
      <Box>
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <Button onClick={() => handleItemClick(props)} style={{ padding: 5 }}>
            <PortIcon isActive={true} />
          </Button>
        </Box>
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <Typography color={colors.primary[900]} sx={{ fontSize: { sm: 11, xs: 15 } }}>
            {props.title}
          </Typography>
        </Box>
      </Box>
    );

    const dataComp = (blockId: number) =>
      Data.map((data: any) => {
        if (data.blockId === blockId) {
          return <Port key={data.id} state={data.state} title={data.title} />;
        } else {
          return null;
        }
      });

    const blocklist = () => {
      let blockID = 22;
      let modelInfo = info.find((model: any) => model.modelname === 'ASR903');
      const blocks = [];
      if (modelInfo) {
        for (let i = 0; i < modelInfo.blocksnumber; i++) {
          if (!modelInfo.blockstats[i]) {
            blocks.push(<Typography key={i}>NOPE</Typography>);
          } else {
            blocks.push(<Box key={i}>{dataComp(blockID)}</Box>);
          }
          blockID++
        }
      }
      return blocks;
    };

    return <>{blocklist()}</> ;
  };

  return (
    <Box display="flex" height={'77vh'} flexDirection="column" style={{ overflow: "hidden", overflowY: "scroll" }}>
      <Block isActive={true} Data={Data} />
    </Box>
  );
};

export default MetroPorts;
