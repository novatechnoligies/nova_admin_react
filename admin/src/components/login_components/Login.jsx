import React from "react";
import "./Login.css"
import { Form, Input, Button } from 'antd';
import { Alignment } from "react-data-table-component";
import FormItem from "antd/es/form/FormItem";
import { useState } from 'react';
import axios from 'axios';





const Login = (props) => {
  const [showLogin, setShowLogin] = useState(true);
  const [showForget, setShowForget] = useState(false);
  const [showVerifyOTP, setShowVerifyOTP] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showCreateAccount, setCreateAccount] =useState(false);

  const handleForgetPassword = () => {
    setShowLogin(false);
    setShowForget(true);
    setShowVerifyOTP(false);
    setShowNewPassword(false);
  };

  const handleEnterOtp = () => {
    setShowLogin(false);
    setShowForget(false);
    setShowVerifyOTP(true);
    setShowNewPassword(false);
  };

  const handleLogin = async(values) => {

    
   // Handle login form submission
    console.log(values);
    const formData = new FormData();
    formData.append('username', values.username);
    formData.append('password', values.password);
    try {
      axios.post("http://13.127.197.105:8082/getUserByUserNameAndPassword", formData)
  .then(response => {
    // Handle the response data here
    if(response.data=="username/password not found"){
      alert("invalid username or passowrd");
    }else{
      props.onLogin();
      alert("u r success");
    }
    console.log(response.data);
  })
  .catch(error => {
    // Handle any errors that occur during the request
    console.error(error);
  });
    } catch (error) {}
  };

  const handleNewpassword= () =>{
    setShowLogin(false);
    setShowForget(false);
    setShowVerifyOTP(false);
    setShowNewPassword(true);
  }

  const handleCreateAccount = () => {
    setShowLogin(false);
    setShowForget(false);
    setShowVerifyOTP(false);
    setShowNewPassword(false);
    setCreateAccount(true)
    
    // Handle create account button click
    
  };
  const handleLoginPage =()=>{
    setShowLogin(true);
    setShowForget(false);
    setShowVerifyOTP(false);
    setShowNewPassword(false);

  }
  

  return (
    <div className="login-img">
      {showLogin && (
        <div className="login-container">
          <Form onFinish={handleLogin}>
            <div>
              <h1 className="login-taital">Login</h1>
            </div>
            <Form.Item
              className="from-label-color"
              name="username"
              label="Username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              className="from-label-color"
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" className="button" htmlType="submit">
                Log in
              </Button>
              <Button
                className="for-position"
                type="link"
                onClick={handleForgetPassword}
              >
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

                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: "5%" }}
                >
                  facebook
                </Button>
              </div>
            </div>
          </Form>
        </div>
      )}
      {showForget && (
        <div className="login-container">
          <h2>Password Reset</h2>
          <div>
            <Form onFinish={handleLogin}>
              <Form.Item
                className="from-label-color"
                name="emailorphone"
                label="Enter Email/Phone"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  className="button"
                  onClick={handleEnterOtp}
                >
                  Get OTP
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
      {showVerifyOTP && (<div className="login-container">
          <h2>Enter OTP</h2>
          <div>
            <Form onFinish={handleLogin}>
              <Form.Item
                className="from-label-color"
                name="emailorphone"
                label="Enter Email/Phone"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  className="button"
                  onClick={handleNewpassword}
                >
                  Verify OTP
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>)}

        {showNewPassword && (<div className="login-container">
          <h2>Set Password</h2>
          <div>
            <Form onFinish={handleLogin}>
              <Form.Item
                className="from-label-color"
                name="new Password"
                label="Enter Email/Phone"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                className="from-label-color"
                name="conform Password"
                label="Enter Email/Phone"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  className="button"
                  onClick={handleLoginPage}
                >
                  Set new password
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>)}
       
       {showCreateAccount&&( <div className="login-container">
          <h2>Create Your Account</h2>
          <Form onFinish={handleCreateAccount}>
            <Form.Item label="Firstname" name="firstName" rules={[{ required: true, message: 'Please enter your Firstname' }]}>
              <Input placeholder="Enter your Firstname" />
            </Form.Item>
            <Form.Item label="Lastname" name="lastName" rules={[{ required: true, message: 'Please enter your Lastname' }]}>
              <Input placeholder="Enter your Lastname" />
            </Form.Item>
            <Form.Item label="Date of birth" name="dateOfBirth" rules={[{ required: true, message: 'Please enter your Date of Birth' }]}>
              <Input type="date" placeholder="Enter your Date of Birth" />
            </Form.Item>
            <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true, message: 'Please select your Gender' }]}
              >
                    {/* <Radio.Group>
              <Radio.Button value="male">Male</Radio.Button>
              <Radio.Button value="female">Female</Radio.Button>
                      </Radio.Group> */}
             </Form.Item>
             <Form.Item label="Phone" name="Phone num" rules={[{ required: true, message: 'Please enter your PhoneNumber' }]}>
              <Input placeholder="Enter your PhoneNumber" />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'Please enter a valid email' }]}>
              <Input type="email" placeholder="Enter your email" />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" >
                Create Account
              </Button>
            </Form.Item>
          </Form>
        </div>)}
    </div>
  );
};

export default Login;