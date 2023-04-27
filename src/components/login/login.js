import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { Button, Checkbox, Form, Input } from 'antd';
import backebdEndpoint from '../../endpoint';
import isLoggedIn from '../../utils/isLoggedIn';
import './login.css'
import axios from 'axios';
export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log(isLoggedIn())
        if (isLoggedIn()) {
            navigate("/");
        }
    }, [])

    const navigate = useNavigate();

    const onFinish = async (values) => {
        const { email, password } = values
        setLoading(true)
        await onLogin(email, password)

        console.log('Success:', values);
    };

    const onLogin = async (email, password) => {
        navigate("/");
        await axios.post(`${backebdEndpoint}/user/login`, {
            email: email,
            password: password
        })
            .then((response) => {
                localStorage.setItem("token", response.data.token)
                setLoading(false)
                console.log(response.data.token)
                setLoading(false)
                navigate("/");
            }).catch(err => {
                console.log(err?.response?.data?.error)
                toast.error(err?.response?.data?.error || "Some error occured")
                setLoading(false)
            })
    }

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="login-page">
            <Toaster />
            <div className="login-box">
                <div className="illustration-wrapper">
                    <img src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700" alt="Login" />
                </div>
                <Form
                    name="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <p className="form-title">Welcome back</p>
                    <p>Login to the Dashboard</p>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                            LOGIN
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

