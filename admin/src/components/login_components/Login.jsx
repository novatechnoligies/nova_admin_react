import React from "react";
import "./Login.css"
import { Form, Input, Button, message } from 'antd';
import { useState } from 'react';
import axios from 'axios';
import { UserOutlined } from '@ant-design/icons';
import { BASE_URL } from "../../constants/constants";




const Login = (props) => {
  const [showLogin, setShowLogin] = useState(true);
  const [showForget, setShowForget] = useState(false);
  const [showVerifyOTP, setShowVerifyOTP] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showCreateAccount, setCreateAccount] =useState(false);
  const [otpform] = Form.useForm();
  const [verifyotpform] = Form.useForm();
  const [newpasswordform] = Form.useForm();
  
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  //const [otpEmailForm, setOtpEmailForm] = useState(null);

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

    const formData = otpform.getFieldsValue();
    console.log(formData.emailorphone);
    setEmail(formData.emailorphone);

    try {
      axios.get(BASE_URL+"/dataservice/sendOtpToEmailForForgetPassword/"+formData.emailorphone)
      .then(response => {
    // Handle the response data here
    //if(response.data=="username/password not found"){
      alert("invalid username or passowrd");
    // }else{
    //   props.onLogin();  
    //   alert("u r success");
    // }
    console.log(response.data);
  })
  .catch(error => {
    // Handle any errors that occur during the request
    console.error(error);
  });
    } catch (error) {

    }
    
    
  };

  const handleLogin = async (values) => {
    try {
      const formData = new FormData();
      formData.append('username', values.username);
      formData.append('password', values.password);
  
      const response = await axios.post(BASE_URL + "/dataservice/getUserByUserNameAndPassword", formData);
  
      if (response.data === "username/password not found") {
        alert("Invalid username or password");
      } else {
        // Store response.data in session storage
        sessionStorage.setItem('userData', JSON.stringify(response.data));
  
        // Trigger the onLogin function or dispatch an action to update the state
        props.onLogin();
  
        message.success("Login success.");
      }
  
      console.log(response.data);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
    }
  };
  

  const handleNewpassword= () =>{
    alert();
    setShowLogin(false);
    setShowForget(false);
    setShowVerifyOTP(false);
    setShowNewPassword(true);
    const otp = verifyotpform.getFieldsValue();
    console.log(otp.verifyotp);
    setOtp(otp.verifyotp);

    try {
      axios.get(BASE_URL+"/dataservice/verifyEmail/"+email+"/"+otp.verifyotp)
      .then(response => {
    // Handle the response data here
    //if(response.data=="username/password not found"){
      alert("invalid username or passowrd");
    // }else{
    //   props.onLogin();  
    //   alert("u r success");
    // }
    console.log(response.data);
  })
  .catch(error => {
    // Handle any errors that occur during the request
    console.error(error);
  });
    } catch (error) {

    }

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
    const passwordfrom = newpasswordform.getFieldsValue();

    try {
      axios.get(BASE_URL+"/dataservice/updtaePasswordByEmail/"+email+"/"+otp+"/"+passwordfrom.password)
      .then(response => {
    // Handle the response data here
    //if(response.data=="username/password not found"){
      alert("invalid username or passowrd");
    // }else{
    //   props.onLogin();  
    //   alert("u r success");
    // }
    console.log(response.data);
  })
  .catch(error => {
    // Handle any errors that occur during the request
    console.error(error);
  });
    } catch (error) {

    }

  }
  

  return (
    <div className="log-in-wrapper">
      <div className="container">
        {/* <div className="left-side">Left Side</div> */}
        <div className=" left-side_L login-right-img "></div>
        <div className="right-side_R login-img">
          
            {showLogin && (
              <div className="login-container">
                <Form onFinish={handleLogin}>
                  <div>
                  <h1 className="login-taital">
                    <span className="red-letter">W</span>
                    <span className="white-letters">ELL-COME </span><br/>
                    <span className="red-letter">N</span>
                    <span className="white-letters">OVA  ADMIN</span>
                  </h1>
                  </div>
                  <Form.Item
                    className="from-label-color"
                    name="username"
                    label="Username"
                    rules={[
                      { required: true, message: "Please input your username!" },
                    ]}
                  >
                    <Input className="custom-input" placeholder="Enter your username" prefix={<UserOutlined />} />
                  </Form.Item>
                  <Form.Item
                    className="from-label-color"
                    name="password"
                    label="Password"
                    rules={[
                      { required: true, message: "Please input your password!" },
                    ]}
                  >
                    <Input.Password className="custom-input" placeholder="Enter your password"/>
                  </Form.Item>

                    <Form.Item>
                      <Button type="primary custom-button" className="button" htmlType="submit">
                        Log in
                      </Button><br/>
                      {/* <Button className="button" type="link" onClick={handleForgetPassword}> //onClick={handleCreateAccount}
                        Forget Password..?
                      </Button><br/> */}
                      <Button type="primary custom-button" className="button" onClick={handleForgetPassword}>
                      Forget Password..?
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    
                  </Form.Item>

                  {/* <div>
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
                  </div> */}
                </Form>
              </div>
            )}
            {showForget && (
              <div className="login-container">
                {/* <h2>Password Reset</h2> */}
                <div>
                  <Form form={otpform} onFinish={handleLogin}>
                    <Form.Item
                      className="from-label-color"
                      name="emailorphone"
                      label="Enter Email/Phone"
                      rules={[
                        { required: true, message: "Please input your email!" },
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
                {/* <h2>Enter OTP</h2> */}
                <div>
                  <Form form={verifyotpform} onFinish={handleLogin}>
                    <Form.Item
                      className="from-label-color"
                      name="verifyotp"
                      label="Enter OTP"
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
                  <Form form ={newpasswordform} onFinish={handleLogin}>
                    <Form.Item
                      className="from-label-color"
                      name="password"
                      label="Enter password"
                      rules={[
                        { required: true, message: "Please input your username!" },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      className="from-label-color"
                      name="conform Password"
                      label="re-ernter password"
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
        
            {/* {showCreateAccount&&( <div className="login-container">
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
              </div>)} */}
      </div>
      </div>
    </div>
    
  );
};

export default Login;