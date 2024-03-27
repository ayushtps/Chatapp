import { Avatar, Button, ListItem, Stack, Typography } from '@mui/material';
import { Modal } from 'antd';
import React, { memo, useState } from 'react';
import { sampleNotification } from '../../constants/SampleData';

function Notification() {
  const [Open, setOpen] = useState(true)
  const friendRequestHandler = ({ _id, accept }) => {

  }
  return (
    <>
      <Modal
        title="All Notification"
        open={Open}
        centered
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        onCancel={() => setOpen(!Open)}
      >
        {
          sampleNotification.length > 0 ? (
            sampleNotification.map((x, i) => (
              <NotificationItem sender={x.sender} _id={x._id} handler={friendRequestHandler} key={i} />
            ))
          ) : (<Typography textAlign={'center'} > 0 Notification </Typography>)
        }

      </Modal >
    </>
  )
}

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return <>
    <ListItem>
      <Stack direction={'row'} alignItem={'center'} spacing={'1rem'} width={'100%'}>
        <Avatar />
        <Typography sx={{
          flexGlow: 1,
          display: '-webkit-box',
          WebkitLineClamp: 1,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '100%',
        }}
          variant="body1"
        >
          {`${name} sent you a friend request`}
        </Typography>

        <Stack direction={{
          xs:"column",
          sm:"row"
        }}>
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color='error' onClick={() => handler({ _id, accept: false })}>Reject</Button>
        </Stack>
      </Stack>
    </ListItem>
  </>
})

export default Notification