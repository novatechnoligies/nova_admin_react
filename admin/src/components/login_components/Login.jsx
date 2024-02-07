import React from "react";
import "./Login.css";
import { Form, Input, Button, message } from "antd";
import { useState } from "react";
import axios from "axios";
import { UserOutlined } from "@ant-design/icons";
import { BASE_URL } from "../../constants/constants";

const Login = (props) => {
  const [showLogin, setShowLogin] = useState(true);
  const [showForget, setShowForget] = useState(false);
  const [showVerifyOTP, setShowVerifyOTP] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showCreateAccount, setCreateAccount] = useState(false);
  const [otpform] = Form.useForm();
  const [verifyotpform] = Form.useForm();
  const [newpasswordform] = Form.useForm();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");


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
      axios
        .get(BASE_URL + "/dataservice/sendOtpToEmailForForgetPassword/" + formData.emailorphone)
        .then((response) => {
          message.success("OTP Send to Mail");
        })
        .catch((error) => {
          // Handle any errors that occur during the request
          console.error(error);
        });
    } catch (error) {}
  };

  const handleLogin = async (values) => {
    try {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("password", values.password);

      const response = await axios.post(
        BASE_URL + "/dataservice/getUserByUserNameAndPassword",
        formData
      );

      if (response.data === "username/password not found") {
        message.success("Invalid username or password");
      } else {
        // Store response.data in session storage
        sessionStorage.setItem("userData", JSON.stringify(response.data));
        props.onLogin();
        message.success("Login success.");
      }
      console.log(response.data);
    } catch (error) {
      message.success("Try after some time");
      // Handle any errors that occur during the request
      console.error(error);
    }
  };

  const handleNewpassword = () => {
    alert();
    setShowLogin(false);
    setShowForget(false);
    setShowVerifyOTP(false);
    setShowNewPassword(true);
    const otp = verifyotpform.getFieldsValue();
    console.log(otp.verifyotp);
    setOtp(otp.verifyotp);

    try {
      axios
        .get(
          BASE_URL + "/dataservice/verifyEmail/" + email + "/" + otp.verifyotp
        )
        .then((response) => {
          message.success("invalid OTP");
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {}
  };

  const handleCreateAccount = () => {
    setShowLogin(false);
    setShowForget(false);
    setShowVerifyOTP(false);
    setShowNewPassword(false);
    setCreateAccount(true);
  };
  const handleLoginPage = () => {
    setShowLogin(true);
    setShowForget(false);
    setShowVerifyOTP(false);
    setShowNewPassword(false);
    const passwordfrom = newpasswordform.getFieldsValue();

    try {
      axios
        .get(BASE_URL +"/dataservice/updtaePasswordByEmail/"+ email +"/" + otp + "/" + passwordfrom.password)
        .then((response) => {
          message("invalid Otp");
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {}
  };

  return (
    <div className="log-in-wrapper">
      <div className="container">
        <div className=" left-side_L login-right-img "></div>
        <div className="right-side_R login-img">
          {showLogin && (
            <div className="login-container">
              <Form onFinish={handleLogin}>
                <div>
                  <h1 className="login-taital">
                    <span className="red-letter">W</span>
                    <span className="white-letters">elcome- </span>
                    <br />
                    <span className="red-letter"> N</span>
                    <span className="white-letters">ova Admin</span>
                  </h1>
                </div>
                <Form.Item
                  className="from-label-color"
                  name="username"
                  label="User name"
                  rules={[
                    { required: true, message: "Please input your username!" , min: 2 },
                  ]}
                >
                  <Input
                    className="custom-input"
                    placeholder="Enter your username"
                    prefix={<UserOutlined />}
                  />
                </Form.Item>
                <Form.Item
                  className="from-label-color"
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password
                    className="custom-input"
                    placeholder="Enter your password"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary custom-button"
                    className="button"
                    htmlType="submit"
                  >
                    Login
                  </Button>
                  <br />
                  <Button
                    type="primary custom-button"
                    className="button"
                    onClick={handleForgetPassword}
                  >
                    Forget Password
                  </Button>
                </Form.Item>
                <Form.Item></Form.Item>
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
          {showVerifyOTP && (
            <div className="login-container">
              {/* <h2>Enter OTP</h2> */}
              <div>
                <Form form={verifyotpform} onFinish={handleLogin}>
                  <Form.Item
                    className="from-label-color"
                    name="verifyotp"
                    label="Enter OTP"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
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
            </div>
          )}
          {showNewPassword && (
            <div className="login-container">
              <h2>Set Password</h2>
              <div>
                <Form form={newpasswordform} onFinish={handleLogin}>
                  <Form.Item
                    className="from-label-color"
                    name="password"
                    label="Enter password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    className="from-label-color"
                    name="conform Password"
                    label="re-ernter password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
