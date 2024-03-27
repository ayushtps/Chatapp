import { Button, Stack, Typography } from '@mui/material'
import { Input, Modal } from 'antd'
import React, { useState } from 'react'
import { sampleUser } from '../../constants/SampleData'
import UserItem from '../shared/UserItem'

const NewGroup = () => {
  const [Open, setOpen] = useState(true)

  const [members, setmembers] = useState(sampleUser)
  const [selectedmembers, setselectedmembers] = useState([])

  const selectMemberHandler = (id) => {
    setselectedmembers(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const submitHandler = () => {

  }
  return (
    <>
      <Modal
        title="New Group"
        open={Open}
        centered
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        onCancel={() => setOpen(!Open)}
      >
        <Input placeholder="Basic usage" />
        <Typography>Members</Typography>
        <Stack>
          {
            members.map((x, i) => (
              <UserItem user={x} key={i} handler={selectMemberHandler} isAdded={selectedmembers.includes(x._id)} />
            ))  
          }
        </Stack>
        <Stack direction={'row'} justifyContent={'space-evenly'}>
          <Button variant="text" color='error' size='large'>Cancel</Button>
          <Button variant="contained" size='large' onClick={submitHandler}>Create</Button>
        </Stack>
      </Modal >
    </>
  )
}

export default NewGroup