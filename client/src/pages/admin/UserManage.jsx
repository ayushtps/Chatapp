import React from 'react'
import AdminLayout from '../../layout/admin/AdminLayout'
import TableComponent from '../../component/shared/TableComponent'
import { Container, Paper } from '@mui/material'
import { Avatar } from 'antd'
import { dashBoardData } from '../../constants/SampleData'

const UserManage = () => {
  const columns = [
    {
      title: 'Id',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (value) => (
          <Avatar src={value} />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'UserName',
      key: 'username',
      dataIndex: 'username',
    },
    {
      title: 'Friends',
      key: 'friends',
      dataIndex: 'friends',
    },
    {
      title: 'Groups',
      key: 'groups',
      dataIndex: 'groups',
    },
  ];
  return (
    <AdminLayout>
      <Container component={'main'} sx={{
        padding: "2rem 0"
      }}>
        <Paper sx={{
          borderRadius: '1.5rem'
        }} elevation={3}>
          <TableComponent heading={'All User'} columns={columns} data={dashBoardData.users}/>
        </Paper>
      </Container>
    </AdminLayout>
  )
}

export default UserManage