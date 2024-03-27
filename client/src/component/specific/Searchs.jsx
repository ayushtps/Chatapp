import { Dialog, List, ListItem, ListItemText } from '@mui/material'
import React, { useState } from 'react'
import { Modal, Input } from 'antd';
import UserItem from '../shared/UserItem';
import { sampleUser } from '../../constants/SampleData';
const { Search } = Input;


function Searchs() {
  const [Open, setOpen] = useState(true)
  const [user, setuser] = useState(sampleUser)

  const addFriendHandler = (id) => {
    console.log(id);
  }
  let isLoadingSendFriendRequest = false
  return (
    <Modal
      title="Search User"
      open={Open}
      centered
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      onCancel={() => setOpen(!Open)}
    >
      <Search
        placeholder="input search text"
      />
      <List>
        {
          user.map((x, i) => (
            <UserItem user={x} key={i} handler={addFriendHandler} handlerIsLoading={isLoadingSendFriendRequest} />
          ))
        }
      </List>
    </Modal>
  )
}

export default Searchs