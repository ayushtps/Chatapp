import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import React, { useState } from 'react'
import { VisuallyHiddenInput } from '../component/styles/StyledComponent'; import { UserLogin } from '../redux/slices/LoginSlice';
import { useDispatch, useSelector } from "react-redux";
import { UserRegister } from '../redux/slices/RegisterSlice';

function LoginRegister() {
    const [isLogin, setisLogin] = useState(true)

    const dispatch = useDispatch()

    const [formData, setformData] = useState({
        username: "",
        password: ""
    })

    const [registerForm, setregisterForm] = useState({
        avatar: "",
        name: "",
        bio: "",
        username: '',
        password: '',
    })

    const handleChangeRegister = (name, value) => {
        setregisterForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setformData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const uploadFile = (event) => {
        let files = event.target.files[0];
        if (files) {
            const reader = new FileReader();
            reader.onload = () => {
                setregisterForm({ avatar: reader.result });
            };
            reader.readAsDataURL(files);
        }
    }

    const handalRegister = async (e) => {
        let result = await dispatch(UserRegister(registerForm))
        if (result.type === 'register/fulfilled') {
            console.log(result);
        }
        else {
            console.log(result.error.message);
        }
    }

    const handalLogin = async (e) => {
        let result = await dispatch(UserLogin(formData))
        if (result.type === 'login/fulfilled') {
            // console.log( result.payload.message);
        }
        else {
            console.log(result.error.message);
        }
    }
    return (
        <>
            <div style={{
                backgroundImage:
                    "linear-gradient(rgba(200,200,200,0.5),rgba(120,110,220,0.5))"
            }}>
                <Container maxWidth="xs" component={"main"} sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '10px' }}>
                        {
                            isLogin ? <>
                                <Typography variant='h5'>Login</Typography>
                                <form style={{ width: '100%', marginTop: '1rem', }} >
                                    <TextField
                                        required
                                        fullWidth
                                        label="UserName"
                                        margin='normal'
                                        name='username'
                                        variant='outlined'
                                        onChange={handleChange}
                                    />

                                    <TextField
                                        required
                                        type='password'
                                        fullWidth
                                        label="Password"
                                        name='password'
                                        margin='normal'
                                        variant='outlined'
                                        onChange={handleChange}

                                    />
                                    <Button sx={{ marginTop: '1rem' }}
                                        variant='contained'
                                        fullWidth
                                        color='primary'
                                        type='submit'
                                        onClick={handalLogin}
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
                                <form style={{ width: '100%', marginTop: '1rem' }}>

                                    <Stack position={"relative"} width={'10rem'} margin={'auto'}
                                    >
                                        <Avatar
                                            sx={{
                                                width: '10rem',
                                                height: '10rem',
                                                objectFit: 'contain'
                                            }}
                                            src={registerForm.avatar}
                                            name="avatar"
                                            onChange={handleChangeRegister}
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
                                        name="name"
                                        onChange={handleChangeRegister}
                                    />

                                    <TextField
                                        required
                                        fullWidth
                                        label="Bio"
                                        margin='normal'
                                        variant='outlined'
                                        name="bio"
                                        onChange={handleChangeRegister}
                                    />

                                    <TextField
                                        required
                                        fullWidth
                                        label="UserName"
                                        margin='normal'
                                        variant='outlined'
                                        name="username"
                                        onChange={handleChangeRegister}
                                    />

                                    <TextField
                                        required
                                        type='password'
                                        fullWidth
                                        label="Password"
                                        margin='normal'
                                        variant='outlined'
                                        name="password"
                                        onChange={handleChangeRegister}
                                    />
                                    <Button sx={{ marginTop: '1rem' }}
                                        variant='contained'
                                        fullWidth
                                        color='primary'
                                        type='submit'
                                        onClick={handalRegister}
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