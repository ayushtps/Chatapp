import React, { useRef } from 'react'
import AppLayout from '../layout/AppLayout'
import { IconButton, Stack } from '@mui/material'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import { InputBox } from '../component/styles/StyledComponent';
import FileMenu from '../component/dailogs/FileMenu';
import { sampleMessage } from '../constants/SampleData';
import MessageComponent from '../component/shared/MessageComponent';
import { ContrastColor } from '../color';

const user={
  _id:'abcdef',
  name:'chaman'
}

function Chat() {
  const containerRef = useRef(null)
  return (
    <>
      <Stack ref={containerRef}
        boxSizing={'border-box'}
        padding={'1rem'}
        spacing={'1rem'}
        bgcolor={'rgba(247,247,247,1)'}
        height={'90%'}
        sx={{
          overflowX: 'hidden',
          overflowY: 'auto'
        }}
      >

        {
          sampleMessage.map((x, i) => (
            <MessageComponent message={x} user={user}  key={i}/>
          ))
        }

      </Stack>
      <form style={{ height: '10%' }}>
        <Stack
          direction={'row'}
          height={'100%'}
          padding={'1rem'}
          alignItems={'center'}
          position={'relative'}
        >

          <IconButton sx={{
            position: 'absolute',
            left: '1.5rem',
            rotate: '30deg'
          }}

          >
            <AttachFileIcon />
          </IconButton>

          <InputBox placeholder='Type Message here....' />

          <IconButton type='submit' sx={{
            rotate: '-30deg',
            bgcolor: ContrastColor,
            color: 'white',
            marginLeft: '1rem',
            padding: '0.5rem',
            "&:hover": {
              bgcolor: 'error.dark'
            }
          }}>
            <SendIcon />
          </IconButton>

        </Stack>
      </form>
      <FileMenu />
    </>
  )
}

export default AppLayout()(Chat)