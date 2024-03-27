import CloseIcon from '@mui/icons-material/Close';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Drawer, Grid, IconButton, Stack, Typography, styled } from '@mui/material';
import React, { useState } from 'react';
import { Link as LinkComponent, Navigate, useLocation } from 'react-router-dom';
import { matBlack } from '../../color';
import { adminTabs } from '../../constants/Route';
// import { Links } from '../../component/styles/StyledComponent';

const Link = styled(LinkComponent)`
    text-decoration:none;
    border-radius:2rem;
    padding:1rem 2rem;
    color:black;
    &:hover{
        color:rgba(0,0,0,0.54)
    }
`

const Sidebar = ({ w = '100%' }) => {
    const location = useLocation()
    const logOutHandler = () => { }
    return (
        <Stack width={w} direction={'column'} p={'3rem'} spacing={'3rem'}>
            <Typography variant='h5' textTransform={'uppercase'}>Mychatt</Typography>
            <Stack spacing={'1rem'}>
                {
                    adminTabs.map((x, i) => (
                        <>
                            <Link key={i} to={x.path} sx={
                                location.pathname === x.path && {
                                    bgcolor: matBlack,
                                    color: 'white',
                                    ":hover": {
                                        color: 'white'
                                    }
                                }
                            }>
                                <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
                                    {x.icon}
                                    <Typography fontSize={'1.2rem'}>{x.name}</Typography>
                                </Stack>
                            </Link>
                        </>
                    ))
                }
                <Link onClick={logOutHandler}>
                    <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
                        <ExitToAppIcon/>
                        <Typography fontSize={'1.2rem'}>Logout</Typography>
                    </Stack>
                </Link>
            </Stack>
        </Stack>
    )
}

const isAdmin = true;


const AdminLayout = ({ children }) => {
    const [isMobile, setisMobile] = useState(false)
    const handlMobile = () => setisMobile(!isMobile)
    const handlClose = () => setisMobile(false)

    if(!isAdmin) return <Navigate to='/admin' />
    return (
        <>
            <Grid container minHeight={'100vh'}>
                <Box sx={{
                    display: { xs: 'block', md: 'none' },
                    position: 'fixed',
                    right: '1rem',
                    top: '1rem'
                }}>
                    <IconButton onClick={handlMobile}>
                        {
                            isMobile ? <CloseIcon /> : <MenuIcon />
                        }
                    </IconButton>
                </Box>
                <Grid item md={4} lg={3} sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Sidebar />
                </Grid>
                <Grid item xs={12} md={8} lg={9} sx={{
                    bgcolor: '#f5f5f5'
                }}>
                    {children}
                </Grid>

                <Drawer open={isMobile} onClose={handlClose}>
                    <Sidebar w='50vw' />
                </Drawer>
            </Grid>
        </>
    )
}

export default AdminLayout