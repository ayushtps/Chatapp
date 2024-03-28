import React from 'react'
import AdminLayout from '../../layout/admin/AdminLayout'
import { Avatar, Container, Paper, Stack } from '@mui/material'
import TableComponent from '../../component/shared/TableComponent'
import AvatarCard from '../../component/shared/AvatarCard'
import { dashBoardData } from '../../constants/SampleData'

const ChatManage = () => {
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
                <AvatarCard avatar={value} />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Total Members',
            key: 'totalMembers',
            dataIndex: 'totalMembers',
        },
        {
            title: 'Members',
            key: 'members',
            dataIndex: 'members',
            render: (value) => (
                <>
                    <AvatarCard avatar={value.map(x => x.avatar)} />
                </>
            ),
        },
        {
            title: 'Total Messages',
            key: 'totalMessages',
            dataIndex: 'totalMessages',
        },
        {
            title: 'Created By ',
            key: 'creator',
            dataIndex: 'creator',
            render: (value) => (
                <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
                    <Avatar src={value.avatar} />
                    <span>{value.name}</span>
                </Stack>
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
                    <TableComponent heading={'All Chat'} columns={columns} data={dashBoardData.chats} />
                </Paper>
            </Container>
        </AdminLayout>
    )
}

export default ChatManage