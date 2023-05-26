import React, { useState, useEffect } from 'react';
import { Table, Select } from 'antd';
import { Box } from "@mui/material";
import axios from 'axios';
import { UserOutlined, CrownOutlined, ToolOutlined } from '@ant-design/icons';
import { tokens } from "../../theme";
import Header from '../../components/Header';

const UserTable = () => {
  const { Option } = Select;

  const columns = [
    {
      title: 'Nom d\'utilisateur',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Rôle',
      dataIndex: 'role',
      key: 'role',
      render: (text, record) => (
        <Select defaultValue={text} style={{ width: 120 }} onChange={(value) => handleChange(value, record)}>
          <Option value="Administrateur"><Box><CrownOutlined /> Admin</Box></Option>
          <Option value="Modérateur">  <Box><ToolOutlined /> Mod</Box></Option>
          <Option value="Utilisateur"><Box><UserOutlined /> Utilisateur</Box></Option>
        </Select>
      ),
    },
  ];

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      const dataWithKeys = response.data.map((item) => ({ ...item, key: item.id }));
      setTableData(dataWithKeys);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (value, record) => {
    try {
      // Make an API call to update the user's role in the database
      await axios.put(`/api/users/${record.id}`, { role: value });

      // Update the role in the local table data
      const newData = [...tableData];
      const index = newData.findIndex((item) => record.key === item.key);
      const item = newData[index];
      item.role = value;
      setTableData(newData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box m={'20px'}>
      <Header title={'Gestion des utilisateurs'} subtitle={'Modifier tous les privilèges des utilisateurs.'} addlink={''} withbtn={false} variant={''} />
      <Table columns={columns} dataSource={tableData} />
    </Box>
  );
};

export default UserTable;
