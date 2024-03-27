import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import React, { useState } from 'react'
import { VisuallyHiddenInput } from '../component/styles/StyledComponent';;

function LoginRegister() {
    const [isLogin, setisLogin] = useState(true)
    const [file, setfile] = useState('')

    const uploadFile = (event) => {
        let files = event.target.files[0];
        if (files) {
            const reader = new FileReader();
            reader.onload = () => {
                setfile(reader.result);
            };
            reader.readAsDataURL(files);
        }
    }

    const handalRegister = (e) => {
        e.preventDefault();
    }

    const handalLogin = (e) => {
        e.preventDefault();
    }
    return (
        <>
            <div style={{
                backgroundImage:
                    "linear-gradient(rgba(200,200,200,0.5),rgba(120,110,220,0.5))"
            }}>
                <Container maxWidth="xs" component={"main"} sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' ,borderRadius:'10px' }}>
                        {
                            isLogin ? <>
                                <Typography variant='h5'>Login</Typography>
                                <form style={{width: '100%', marginTop: '1rem',}} onSubmit={handalLogin}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="UserName"
                                        margin='normal'
                                        variant='outlined'
                                    />

                                    <TextField
                                        required
                                        type='password'
                                        fullWidth
                                        label="Password"
                                        margin='normal'
                                        variant='outlined'
                                    />
                                    <Button sx={{ marginTop: '1rem' }}
                                        variant='contained'
                                        fullWidth
                                        color='primary'
                                        type='submit'
                                    >
                                        Login
                                    </Button>
                                    <Typography textAlign={'center'} m={'1rem'}>
                                        Or
                                    </Typography>
                                    <Button
                                        fullWidth
                                        variant='text'
                                        onClick={() => setisLogin(false)}
                                    >
                                        Sign Up
                                    </Button>
                                </form>
                            </> : <>
                                <Typography variant='h5'>Sign up</Typography>
                                <form style={{ width: '100%', marginTop: '1rem' }} onSubmit={handalRegister}>

                                    <Stack position={"relative"} width={'10rem'} margin={'auto'}
                                    >
                                        <Avatar
                                            sx={{
                                                width: '10rem',
                                                height: '10rem',
                                                objectFit: 'contain'
                                            }}
                                            src={file}
                                        />
                                        <IconButton sx={{
                                            position: 'absolute',
                                            bottom: '0',
                                            right: '0',
                                            color: 'white',
                                            bgcolor: 'rgba(0,0,0,0.5)',
                                            ":hover": {
                                                bgcolor: 'rgba(0,0,0,0.7)'
                                            }
                                        }}
                                            component='label'
                                        >
                                            <>
                                                <AddAPhotoIcon />
                                                <VisuallyHiddenInput type='file' onChange={uploadFile} />
                                            </>
                                        </IconButton>
                                    </Stack>

                                    <TextField
                                        required
                                        fullWidth
                                        label="Name"
                                        margin='normal'
                                        variant='outlined'
                                    />

                                    <TextField
                                        required
                                        fullWidth
                                        label="Bio"
                                        margin='normal'
                                        variant='outlined'
                                    />

                                    <TextField
                                        required
                                        fullWidth
                                        label="UserName"
                                        margin='normal'
                                        variant='outlined'
                                    />

                                    <TextField
                                        required
                                        type='password'
                                        fullWidth
                                        label="Password"
                                        margin='normal'
                                        variant='outlined'
                                    />
                                    <Button sx={{ marginTop: '1rem' }}
                                        variant='contained'
                                        fullWidth
                                        color='primary'
                                        type='submit'
                                    >
                                        Register
                                    </Button>
                                    <Typography textAlign={'center'} m={'1rem'}>
                                        Or
                                    </Typography>
                                    <Button
                                        fullWidth
                                        variant='text'
                                        onClick={() => setisLogin(true)}
                                    >
                                        Sign In
                                    </Button>
                                </form>
                            </>
                        }
                    </Paper>
                </Container>
            </div>
        </>
    )
}

export default LoginRegister