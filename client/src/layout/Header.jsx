import { AppBar, Backdrop, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { Suspense, lazy, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import Loaders from './Loaders';
import { ContrastColor } from '../color';


const Searchs = lazy(() => import('../component/specific/Searchs'))
const Notification = lazy(() => import('../component/specific/Notification'))
const Newgroup = lazy(() => import('../component/specific/NewGroup'))


function Header() {

  const [mobileView, setmobileView] = useState(false)
  const [isSearch, setisSearch] = useState(false)
  const [isNewGroup, setisNewGroup] = useState(false)
  const [isNotification, setisNotification] = useState(false)

  const navigate = useNavigate()

  const handalMobile = () => {
    setmobileView(!mobileView)
  }
  const openSeachDialog = () => {
    setisSearch(!isSearch)
  }
  const openNewGroup = () => {
    setisNewGroup(!isNewGroup)
  }
  const navigateToGroup = () => {
    navigate('/group')
  }
  const openNotification = () => {
    setisNotification(!isNotification)
  }
  const logOutbtn = () => {

  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={'4rem'}>
        <AppBar position='static' sx={{
          bgcolor: ContrastColor
        }}>
          <Toolbar>
            <Typography variant='h6' sx={{
              display: { xs: 'none', sm: 'block' }
            }}>
              Mychatt
            </Typography>
            <Box sx={{
              display: { xs: 'block', sm: 'none' }
            }}>
              <IconButton color='inherit' onClick={handalMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{
              flexGrow: 1,
            }} />
            <Box>

              <IconBtn
                title={'Search'}
                icon={<SearchIcon />}
                onClick={openSeachDialog}
              />

              <IconBtn
                title={'New group'}
                icon={< AddIcon />}
                onClick={openNewGroup}
              />

              <IconBtn
                title={'Manage group'}
                icon={< GroupIcon />}
                onClick={navigateToGroup}
              />

              <IconBtn
                title={'Notification'}
                icon={< NotificationsIcon />}
                onClick={openNotification}
              />

              <IconBtn
                title={'Logout'}
                icon={< LogoutIcon />}
                onClick={logOutbtn}
              />

            </Box>
          </Toolbar>
        </AppBar>

      </Box>
      {
        isSearch && (
          <Suspense fallback={<Backdrop open />}>
            <Searchs />
          </Suspense>
        )
      }
      {
        isNotification && (
          <Suspense fallback={<Backdrop open />}>
            <Notification />
          </Suspense>
        )
      }
      {
        isNewGroup && (
          <Suspense fallback={<Backdrop open />}>
            <Newgroup />
          </Suspense>
        )
      }
    </>
  )
}

const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color='inherit' size='larger' onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  )
}

export default Header