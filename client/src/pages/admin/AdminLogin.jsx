import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import React from 'react';
import { useInputValidation } from '6pp';
import { Navigate } from 'react-router-dom'

const isAdmin = true

const AdminLogin = () => {
    const secretkey = useInputValidation('')

    const handleSubmit = () => {

    }
    if (isAdmin) return <Navigate to='/admin/dashboard' />
        return (
            <>
                <div style={{
                    backgroundImage:
                        "linear-gradient(rgba(200,200,200,0.5),rgba(120,110,220,0.5))"
                }}>
                    <Container maxWidth="xs" component={"main"} sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '10px' }}>
                            <Typography variant='h5'>Admin Login</Typography>
                            <form style={{ width: '100%', marginTop: '1rem', }} onSubmit={handleSubmit}>

                                <TextField
                                    required
                                    type='password'
                                    fullWidth
                                    label="Secret Key"
                                    margin='normal'
                                    variant='outlined'
                                    value={secretkey.value}
                                    onChange={secretkey.changeHandler}
                                />
                                <Button sx={{ marginTop: '1rem' }}
                                    variant='contained'
                                    fullWidth
                                    color='primary'
                                    type='submit'
                                >
                                    Login
                                </Button>
                            </form>
                        </Paper>
                    </Container>
                </div>
            </>
        )
}

export default AdminLogin