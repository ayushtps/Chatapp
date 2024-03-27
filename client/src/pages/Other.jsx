import React, { useState } from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import { BiUser } from "react-icons/bi";
import { BsShieldLockFill } from "react-icons/bs";


function LoginRegister() {
    const [page, setpage] = useState(true)
    return (
        <>
            <section>
                <div style={{ width: '100%' }}>
                    {
                        page ? <div className="login-page">
                            <div className="loginpage-container">
                                <div className="logo-title">
                                    Sign-in
                                </div>
                                <Form>
                                    <div className="input-form">
                                        <Form.Item
                                            name="username"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your username!',
                                                },
                                            ]}
                                        >
                                            <Input
                                                prefix={<BiUser />}
                                                placeholder='Email'
                                            />
                                        </Form.Item>
                                    </div>

                                    <div className="input-form">
                                        <Form.Item
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your password!',
                                                },
                                            ]}
                                        >
                                            <Input.Password
                                                prefix={<BsShieldLockFill />}
                                                placeholder='Password'
                                            />
                                        </Form.Item>
                                        <div className="login-forgot">
                                            Forgot Password?
                                        </div>
                                    </div>

                                    <div className="input-form">
                                        <button className='primary-btn'>
                                            Sign in
                                        </button>
                                    </div>
                                </Form>
                                <div className="account" onClick={() => setpage(false)}>
                                    Don't have a account?
                                </div>
                            </div>
                        </div> : <div className="login-page">
                            <div className="loginpage-container">
                                <div className="logo-title">
                                    Sign-Up
                                </div>
                                <Form>
                                    <div className="input-form">
                                        <Form.Item
                                            name="username"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your username!',
                                                },
                                            ]}
                                        >
                                            <Input
                                                prefix={<BiUser />}
                                                placeholder='Email'
                                            />
                                        </Form.Item>
                                    </div>

                                    <div className="input-form">
                                        <Form.Item
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your password!',
                                                },
                                            ]}
                                        >
                                            <Input.Password
                                                prefix={<BsShieldLockFill />}
                                                placeholder='Password'
                                            />
                                        </Form.Item>
                                        <div className="login-forgot">
                                            Forgot Password?
                                        </div>
                                    </div>

                                    <div className="input-form">
                                        <button className='primary-btn'>
                                            Sign Up
                                        </button>
                                    </div>
                                </Form>
                                <div className="account" onClick={() => setpage(true)}>
                                    Already have a account?
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </section>
        </>
    )
}

export default LoginRegister