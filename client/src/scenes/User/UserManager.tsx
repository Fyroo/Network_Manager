import React, { useState } from 'react';
import { Table, Select } from 'antd';
import { Box, Button, Typography, useTheme } from "@mui/material";
import { UserOutlined, CrownOutlined, ToolOutlined } from '@ant-design/icons';
import { tokens } from "../../theme";

const { Option } = Select;

const data = [
  {
    key: '1',
    name: 'Mehdi Amor',
    date: '2022-05-10',
    email: 'mehdi.amor@example.com',
    role: 'Admin',
  },
  {
    key: '2',
    name: 'Walid Selmi',
    date: '2022-05-09',
    email: 'walid.selmi@example.com',
    role: 'Moderator',
  },
  {
    key: '3',
    name: 'Ahmed Dahmani',
    date: '2022-05-08',
    email: 'ahmed.dahmani@example.com',
    role: 'User',
  },
];

const columns = [
  {
    title: 'Nom',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: "Date d'enregistrement",
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: (text, record) => (
      <Select defaultValue={text} style={{ width: 120 }} onChange={(value) => handleChange(value, record)}>
        <Option value="Admin"><Box><CrownOutlined /> Admin</Box></Option>
        <Option value="Moderator">  <Box><ToolOutlined /> Mod</Box></Option>
        <Option value="User"><Box><UserOutlined /> User</Box></Option>
      </Select>
    ),
  },
];

const handleChange = (value, record) => {
  const newData = [...data];
  const index = newData.findIndex((item) => record.key === item.key);
  const item = newData[index];
  item.role = value;
  newData[index] = item;
  setData(newData);
};

const UserTable = () => {
  const [tableData, setData] = useState(data);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m={'20px'}>
      <Box sx={{
        "& .ant-table-row ": {
          fontSize: '15px',
          height: '64px',
        
        },
      "& .ant-table-thead .ant-table-cell":{
        backgroundColor:colors.blueAccent[600],
      },
      "& .ant-table-tbody .ant-table-row:nth-child(even)": {
        backgroundColor: theme.palette.mode === 'dark' ? colors.primary[100] : colors.primary[900],
      }
      }}>
      <Table columns={columns} dataSource={tableData} />
      </Box>
      
    </Box>
    
  );
};

export default UserTable;
