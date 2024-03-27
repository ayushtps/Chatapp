import React from 'react'
import AppLayout from '../layout/AppLayout';
import { Box, Typography } from '@mui/material';

const Home = () => {
  return (
    <Box height={'100%'} bgcolor={'rgba(247,247,247,1)'}>
      <Typography p={'2rem'} variant='h5' textAlign={'center'}>Select a friend to chat</Typography>
    </Box>
  )
}

export default AppLayout()(Home);