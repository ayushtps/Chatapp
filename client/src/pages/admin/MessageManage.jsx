import React from 'react'
import AdminLayout from '../../layout/admin/AdminLayout'
import { Avatar, Box, Container, Paper, Stack } from '@mui/material';
import TableComponent from '../../component/shared/TableComponent';
import { dashBoardData } from '../../constants/SampleData';
import moment from 'moment'
import { fileFormate } from '../../lib/Features';
import RenderAttachment from '../../component/shared/RenderAttachment';


const MessageManage = () => {
  const columns = [
    {
      title: 'Id',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Attachment',
      dataIndex: 'attachments',
      key: 'attachments',
      render: (value) => {
        return value?.length > 0 ? value.map((x,i) => {
          const url = x.url;
          const file = fileFormate(url)
          return <Box key={i}>
            <a href={url} download target='_blank' style={{color:'black'}}>
            {
              RenderAttachment(file,url)
            }
            </a>
          </Box>
        }) : 'No attachment'
      }
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Sent By',
      dataIndex: 'sender',
      key: 'sender',
      render: (value) => (
        <>
          <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
            <Avatar src={value.avatar} />
            <span>{value.name}</span>
          </Stack>
        </>
      ),
    },
    {
      title: 'Chat',
      key: 'chat',
      dataIndex: 'chat',
    },
    {
      title: 'Group Chat',
      key: 'groupChat',
      dataIndex: 'groupChat',
    },
    {
      title: 'Time',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (value) => (
        moment(value).format('MMMM Do YYYY,h:mm:ss a')
      ),
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
          <TableComponent heading={'All Messages'} columns={columns} data={dashBoardData.messages} />
        </Paper>
      </Container>
    </AdminLayout>
  )
}

export default MessageManage