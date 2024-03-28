import { Backdrop, Box, Button, Drawer, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import React, { Suspense, lazy, memo, useEffect, useState } from 'react';
import { Links } from '../component/styles/StyledComponent';
import AvatarCard from '../component/shared/AvatarCard';
import { sampleChats, sampleUser } from '../constants/SampleData';
import { Input } from 'antd';
import Swal from "sweetalert2";
import UserItem from '../component/shared/UserItem';
import { bgGradient } from '../color';

const isMember = false;

const AddmemberDailog = lazy(() => import('../component/dailogs/AddmemberDailog'))

function Group() {
  const chatId = useSearchParams()[0].get('group')

  const navigate = useNavigate()

  const [isMobile, setisMobile] = useState(false)
  const [isEdit, setisEdit] = useState(false)
  const [groupName, setgroupName] = useState('')
  const [groupNameUpdated, setgroupNameUpdated] = useState('')


  const naviagteBack = () => {
    navigate('/')
  }

  const handalMobile = () => {
    setisMobile(prev => !prev)
  }

  const updateGroupName = () => {
    console.log('asb');
    setisEdit(false)
  }

  const handalMobileClose = () => setisMobile(false)

  const addMember = () => {

  }

  const conifrmDeletehandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }

  const removeMemberHandler = (id) => {

  }

  useEffect(() => {
    if (chatId) {
      setgroupName(`Group Name ${chatId}`)
      setgroupNameUpdated(`Group Name ${chatId}`)
    }

    return () => {
      setgroupName('')
      setgroupNameUpdated('')
      setisEdit(false)
    }
  }, [chatId])

  const IconBtns = <>

    <Box sx={{
      display: {
        xs: 'block',
        sm: 'none'
      },
      position: 'fixed',
      right: '1rem',
      top: '1rem'
    }}>
      <IconButton onClick={handalMobile} >
        <MenuIcon />
      </IconButton>
    </Box>

    <Tooltip title='back'>
      <IconButton sx={{
        position: 'absolute',
        top: '2rem',
        left: '2rem',
        bgcolor: 'rgba(0,0,0,0.8)',
        color: 'white',
        ":hover": {
          bgcolor: 'rgba(0,0,0,0.7)'
        }
      }} onClick={naviagteBack}>
        <KeyboardBackspaceIcon />
      </IconButton>
    </Tooltip>
  </>

  const GroupName = (
    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={'1rem'} padding={'3rem'}>
      {
        isEdit ?
          <>
            <Input placeholder="" value={groupNameUpdated} onChange={(e) => setgroupNameUpdated(e.target.value)} />
            <IconButton onClick={updateGroupName}><DoneIcon /></IconButton>
          </>
          : <>
            <Typography variant='h4'>{groupName}</Typography>
            <IconButton onClick={() => setisEdit(true)}>
              <EditIcon />
            </IconButton>
          </>
      }
    </Stack>
  )

  const ButtonGroup = (
    <Stack direction={{
      sm: 'row',
      xs: 'column-reverse'
    }}
      spacing={'1rem'}
      p={{
        sm: '1rem',
        xs: '0',
        md: '1rem 4rem'
      }}
    >
      <Button size='large' color='error' variant='outlined' startIcon={<DeleteIcon />} onClick={conifrmDeletehandler} >Delete Group</Button>
      <Button size='large' variant='contained' startIcon={<AddIcon />} onClick={addMember}>Add Member</Button>
    </Stack>
  )
  return (
    <>
      <Grid container height={'100vh'}>
        <Grid item sm={4} sx={{
          display: {
            xs: 'none',
            sm: 'block'
          }
        }}>
          <GroupList myGroups={sampleChats} chatId={chatId} />
        </Grid>
        <Grid item xs={12} sm={8} sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          position: 'relative',
          padding: '1rem 3rem',

        }}>
          {
            IconBtns
          }
          {
            groupName && <>
              {GroupName}
              <Typography margin={'2rem'} alignSelf={'flex-start'} variant='body1'>Members</Typography>
              <Stack
                maxWidth={'45rem'}
                width={'100%'}
                boxSizing={'border-box'}
                padding={{
                  sm: '1rem',
                  xs: '0',
                  md: '1rem 4rem'
                }}
                spacing={'2rem'}
                height={'50vh'}
                overflow={'auto'}
              >
                {
                  sampleUser.map((x, i) => (
                    <UserItem user={x} isAdded styling={{
                      boxShadow: '0 0 0.5rem rgba(0,0,0,0.2)',
                      padding: '1rem 2rem',
                      borderRadius: '1rem'
                    }} handler={removeMemberHandler} key={i} />
                  ))
                }

              </Stack>
              {ButtonGroup}
            </>
          }
        </Grid>

        {
          isMember && <>
            <Suspense fallback={<Backdrop open />}>
              <AddmemberDailog />
            </Suspense>
          </>
        }

        <Drawer open={isMobile} onClose={handalMobileClose} sx={{
          display: {
            xs: 'block',
            sm: 'none'
          }
        }}>
          <GroupList w={'50vw'} myGroups={sampleChats} chatId={chatId} />
        </Drawer>

      </Grid>
    </>
  )
}

const GroupList = ({ w = '100%', myGroups = [], chatId }) => (
  <Stack width={w} sx={{
    backgroundImage: bgGradient,
    height: '100vh',
    overflow: 'auto'
  }}>
    {
      myGroups.length > 0 ? myGroups.map((x, i) => <GroupListItem group={x} chatId={chatId} key={i} />) : <Typography textAlign={'center'} padding={'1rem'}>No Group</Typography>
    }
  </Stack>
)

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;
  return <Links to={`?group=${_id}`}
    onClick={e => { if (chatId === _id) e.preventDefault(); }}
  >
    <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
      <AvatarCard avatar={avatar} />
      <Typography>{name}</Typography>
    </Stack>
  </Links>
})

export default Group