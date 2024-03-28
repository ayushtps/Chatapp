import React from 'react'
import AdminLayout from '../../layout/admin/AdminLayout'
import { Box, Container, Paper, Stack, Typography, Input, Button } from '@mui/material'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import PersonIcon from '@mui/icons-material/Person';
// import { Button, Input } from 'antd';
import moment from 'moment'
import { CurveButton, SearchFeild } from '../../component/styles/StyledComponent';
import Groups from '@mui/icons-material/Groups';
import { DoughnutChart, LineChart } from '../../component/specific/Chart';
const DashBoard = () => {

  const Appbar = <Paper elevation={3} sx={{ padding: '2rem', margin: '2rem 0', borderRadius: '1rem' }}>
    <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
      <AdminPanelSettingsIcon sx={{ fontSize: '3rem' }} />
      <SearchFeild />
      <CurveButton>Search</CurveButton>
      <Box flexGrow={1} />
      <Typography display={{
        xs: 'none',
        lg: 'block'
      }} color={'rgba(0,0,0,0.7)'} textAlign={'center'}>
        {moment().format('MMMM Do YYYY')}
      </Typography>
      <NotificationsIcon />
    </Stack>
  </Paper>

  const Widgets = <Stack direction={{
    xs: 'column',
    sm: 'row'
  }}
    spacing={'2rem'}
    justifyContent={'space-between'}
    alignItems={'center'}
    margin={'2rem 0'}
  >
    <Widget title={'Users'} value={28} icon={<PersonIcon />} />
    <Widget title={'Chats'} value={3} icon={<Groups />} />
    <Widget title={'Messages'} value={78} icon={<MessageIcon />} />
  </Stack>
  return (
    <>
      <AdminLayout>
        <Container component={'main'}>
          {
            Appbar
          }
          <Stack direction={{
            xs:'column',
            lg:'row'
          }}  flexWrap={'wrap'} justifyContent={'center'} alignItems={{
            xs:'center',
            lg:'stretch'
          }} sx={{gap:'2rem'}}>
            <Paper sx={{ padding: '2rem 3.5rem', borderRadius: '1rem', width: '100%', maxWidth: '45rem'}} elevation={3}>
              <Typography>Last Messages</Typography>
              <LineChart  value={[234,45,65,33,344,6,33,55]}/>
            </Paper>
            <Paper elevation={3} sx={{
              padding: '1rem',
              borderRadius: '1rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: { xs: '100%', sm: '50%' },
              position: 'relative',
              width: '100%',
              maxWidth: '25rem'
            }}>
              <DoughnutChart value={[12, 19]} />
              <Stack
                position={'absolute'}
                direction={'row'}
                justifyContent={'center'}
                alignItems={'center'}
                spacing={'0.5rem'}
                width={'100%'}
                height={'100%'}
              >
                <Groups /><Typography>Vs</Typography>
                <PersonIcon />
              </Stack>
            </Paper>
          </Stack>
          {
            Widgets
          }
        </Container>
      </AdminLayout>
    </>
  )
}

const Widget = ({ title, value, icon }) => <Paper sx={{
  padding: '2rem',
  margin: '2rem 0',
  borderRadius: '1.5rem',
  width: '20rem'
}} elevation={3}>
  <Stack alignItems={'center'} spacing={'1rem'}>
    <Typography sx={{
      color: 'rgba(153, 102, 255, 1)',
      borderRadius: '50%',
      width: '5rem',
      height: '5rem',
      border: '2px solid rgba(153, 102, 255, 1)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
    >
      {value}
    </Typography>
    <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
      {icon}
      <Typography>{title}</Typography>
    </Stack>
  </Stack>
</Paper>

export default DashBoard