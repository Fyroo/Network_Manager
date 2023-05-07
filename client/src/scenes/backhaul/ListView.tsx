import React, { useState } from "react";
import List, { Item } from "devextreme-react/list";
import { useTheme } from "@mui/system";
import { tokens } from "../../theme";
import { Box } from "@mui/material";
import { AnimatedTypography } from "../../components/AnimatedComponents";

const ListView = ({
  data,
  parentCallback,
}: {
  data: any;
  parentCallback: (childData: any) => void;
}) => {
  const [searchMode, setSearchMode] = useState("contains");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  function ItemTemplate(data: any) {
    return <AnimatedTypography reset={true}>{data.name}</AnimatedTypography>;
  }
  function handleItemClick(item: any) {
    parentCallback(item);
  }

  return (
    <Box
      sx={{
        ".list-container": {
          backgroundColor: colors.blueAccent[500],
          borderRadius: "5px",
          padding: "10px",
          marginBottom: "20px",
          
        },

        ".dx-list-item": {
          color: colors.blueAccent[900],
          fontSize: "16px",
          fontWeight: "500",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          transition: "transition: background-color 0.2s ease",
        },
        ".dx-list-item:hover": {
          backgroundColor: colors.blueAccent[100],
        },
      }}
    >
      <List
        dataSource={data}
        height={400}
        itemRender={ItemTemplate}
        searchExpr="Name"
        searchEnabled={true}
        searchMode={searchMode}
        className="list-container"
        onItemClick={(e: { itemData: Item }) => handleItemClick(e.itemData)}
      />
    </Box>
  );
};

export default ListView;
