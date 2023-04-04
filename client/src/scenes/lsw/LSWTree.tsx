import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SvgIconProps } from '@mui/material/SvgIcon';
import RouterIcon from '@mui/icons-material/Router';
import { useEffect, useState } from 'react'
import axios from 'axios';




declare module 'react' {
  interface CSSProperties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelIcon: React.ElementType<SvgIconProps>;
  labelInfo?: string;
  labelText: string;
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: 'var(--tree-view-color)',
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));


 function GmailTreeView({parentCallback}:{parentCallback: (childData: any) => void }) {
  function TreeItemBP(props:any){

    return(
      <StyledTreeItem  nodeId={props.Id} labelText={props.name} labelIcon={RouterIcon} />
    )
  }
  
  
  
  function StyledTreeItem(props: StyledTreeItemProps) {
    const {
      bgColor,
      color,
      labelIcon: LabelIcon,
      labelInfo,
      labelText,
      ...other
    } = props; 
    function handleItemClick(item:any) {
      parentCallback(item);
    }
  
  
    return (
      <StyledTreeItemRoot
        label={
          <Box sx={{ display: 'flex', alignItems: 'left', p: 0.5, pr: 0,}}
  
           onClick={() => handleItemClick(props)}>
            <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
            <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
              {labelText}
            </Typography>
            <Typography variant="caption" color="inherit">
              {labelInfo}
            </Typography>
          </Box>
        }
        style={{
          '--tree-view-color': color,
          '--tree-view-bg-color': bgColor,
        }}
        {...other}
        sx={{
          "& .MuiTreeItem-content": {
            paddingLeft:'0',
            
          }
        }}
      />
    );
  }
  const [lswList, setlswList] = useState([ {id: 5,nodeid:"5",name:"ASR54468517"}]);
const getLSW = () =>{
  axios.get("http://localhost:3001/lsw").then((response)=>{
    setlswList(response.data)
  });

}
  useEffect(() => {
  getLSW();
}, []);



  const TreeComp = lswList.map((data)=> {
    return(
      <TreeItemBP 
        key={data.id}
        Id={data.nodeid}
        name={data.name}
      />
    )})
  return (
   
      <TreeView
      aria-label="gmail"
      defaultExpanded={['3']}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{ height: '77vh', flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
      
    >
      {TreeComp}
        {/* <StyledTreeItem
          nodeId="8"
          labelText="test"
          labelIcon={LocalOfferIcon}
          labelInfo="733"
          color="#3c8039"
          bgColor="#e6f4ea"
        /> */}
    </TreeView>
    
    
  );
}
export default GmailTreeView