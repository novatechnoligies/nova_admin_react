import React from "react";
import "./Login.css"
import { Form, Input, Button } from 'antd';
import { Alignment } from "react-data-table-component";
import FormItem from "antd/es/form/FormItem";
import { useState } from 'react';


const Login = () => {

  
    const [showLogin, setShowLogin] = useState(true);
    const [showForget, setShowForget] = useState(true);

    const handleForgetPassword = () => {
      setShowLogin(false);
      setShowForget(true);
    };

    const handleEnterOtp =() =>{
      setShowLogin(false);
      setShowForget(false);
    }
  
    const handleLogin = (values) => {
      // Handle login form submission
      console.log(values);
    };
  
    const handleCreateAccount = () => {
      // Handle create account button click
    };
 
  return (
    <div className="login-img">
      {showLogin ? (
        <div className="login-container">
          <Form onFinish={handleLogin}>
            <div>
              <h1 className="login-taital">Login</h1>
            </div>
            <Form.Item
              className="from-label-color"
              name="username"
              label="Username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              className="from-label-color"
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" className="button" htmlType="submit">
                Log in
              </Button>
              <Button className="for-position" type="link" onClick={handleForgetPassword}>
                Forget Password..?
              </Button>
              <br />
            </Form.Item>
            <Form.Item>
              <Button type="primary" className="button" onClick={handleCreateAccount}>
                Create new account
              </Button>
            </Form.Item>

            <div>
              <p className="for-position1">Alternatem Login</p>
              <div className="gf-btn">
                <Button type="primary" htmlType="submit">
                  google
                </Button>

                <Button type="primary" htmlType="submit" style={{ marginLeft: '5%' }}>
                  facebook
                </Button>
              </div>
            </div>
          </Form>
        </div>
      ) : (
        <div className="login-container">
          <h2>Password Reset</h2>
          <div>
            <Form onFinish={handleLogin}>
              <Form.Item
                className="from-label-color"
                name="emailorphone"
                label="Enter Email/Phone"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
              <Button type="primary" className="button" onClick={handleEnterOtp}>
                Get OTP
              </Button>
            </Form.Item>

            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;