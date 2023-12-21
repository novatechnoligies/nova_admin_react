import React, { useState } from 'react';
import { Menu } from 'antd';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { DashboardOutlined, HomeOutlined, ProfileOutlined, SettingOutlined, ShopOutlined, ShoppingOutlined,IdcardOutlined } from '@ant-design/icons/lib/icons';
import ShopTable from './components/shop_components/ShopTable';
import SpaTable from './components/spa_components/SpaTable';
import LabTable from './components/lab_components/LabTable';
import CscTable from './components/csc_components/CscTable';
import ClinicTable from './components/clinic_components/ClinicTable';
import LoginPage from './components/login_components/Login';
// import Filter from './components/filter_componets/Filter';
import Acards from './components/consumers_appointments/Acards';
import { NotificationOutlined ,UserOutlined } from '@ant-design/icons';
import { MailOutlined } from '@ant-design/icons';
import { Badge, Avatar, Upload, Button, Popover} from 'antd';
import "./App.css";
import NewConsumer from './components/consumer_components/consumermodule';
import { More } from './components/consumers_appointments/More';
import AppointmentBookingPage from './components/consumers_appointments/AppointmentBookingPage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    // Perform login logic here
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Perform logout logic here
    setLoggedIn(false);
  };

  return (
    <div>
      {loggedIn ? (
        <section>
           <div> 
          <Header onLogout={handleLogout} />
          </div>
          <div className="wrapper">
            <div className="container">
              <div className=" left-side"><SlideMenu location={location} navigate={navigate} onLogout={handleLogout} /></div>
              <div  className='right-side'>
                 <div className='container-row'>
                    {/* <div className="top"><Filter></Filter></div> */}
                    <div className><Content /></div>
                 </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <LoginPage onLogin={handleLogin}></LoginPage>
        // <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

function Header({ onLogout }) {
  return (
    <div  className="top-bar" >
      {/* <div>Header</div> */}
      <div className='top_bar_icons' >
        <Badge count='5' offset={[10, 0]}>
        <NotificationOutlined />
        </Badge>
      </div>
      <div  className='top_bar_icons' >
        <Badge count='5' offset={[10, 0]}>
        <MailOutlined style={{ fontSize: '24px' }} />
        </Badge>
      </div>
      <div className='top_bar_icons' >
        <UserOutlined  className="profile-photo"/>
      </div>
      
    </div>
  );
}

function SlideMenu({ location, navigate, onLogout }) {
  const selectedKeys = [location.pathname];

  return (
    <div className="App">
      <Menu style={{background:'#0B8C73',color:'white', height:'92.5vh', overflow:'hidden'}}
        selectedKeys={selectedKeys}
        onClick={({ key }) => {
          if (key === '/logout') {
            onLogout();
          } else {
            navigate(key);
          }
        }}
        items={[
          { label: 'Home', key: '/', icon: <HomeOutlined /> },
          { label: 'Dashboard', key: '/dash', icon: <DashboardOutlined /> },
          { label:'Appointments', key:'Acard',icon: <IdcardOutlined />},
          { label: 'Lab', key: '/lab', icon: <ShopOutlined /> },
          { label: 'Spa', key: '/spa', icon: <ShopOutlined /> },
          { label: 'Shalon', key: '/shalon', icon: <ShopOutlined /> },
          { label: 'CSC', key: '/csc', icon: <ShopOutlined /> },
          { label: 'Clinic', key: '/clinic', icon: <ShopOutlined /> },
          { label: 'Consumer', key: '/consumer', icon: <ShoppingOutlined />, children: [
          { label: 'Active', key: '/active', icon: <ShopOutlined /> },
          { label: 'Inactive', key: '/inactive', icon: <ShopOutlined /> },
          { label: 'New Consumer Account', key: '/newconsumeraccount', icon: <ShopOutlined /> },
          ] },
          { label: 'Profile', key: '/profile', icon: <ProfileOutlined /> },
          { label: 'Sign Out', key: '/logout', icon: <SettingOutlined />, danger: true },
        ]}
      />
    </div>
  );
}

function Content() {
  return (
    <div style={{marginTop:'1px'}}>
      <Routes>
        <Route path="/" element={<div>Dashboard</div>} />
        <Route path="/dash" element={<div>Dashboard</div>} />
        <Route path="/lab" element={<div className="d-flex flex-column align-items-center"> <LabTable /></div>} />
        <Route path="/Acard" element={<div className="d-flex flex-column align-items-center"> <Acards/></div>} />
        <Route path="/spa" element={<div className="d-flex flex-column align-items-center"> <SpaTable /></div>} />
        <Route path="/shalon" element={<div className="d-flex flex-column align-items-center"> <ShopTable /></div>} />
        <Route path="/csc" element={<div className="d-flex flex-column align-items-center"> <CscTable /></div>} />
        <Route path="/clinic" element={<div className="d-flex flex-column align-items-center"> <ClinicTable /></div>} />
        <Route path="/consumer" element={<div>Consumer</div>} />
        <Route path="/profile" element={<div>Profile</div>} />
        <Route path="/logout" element={<div>Logout</div>} />
        <Route path="/active" element={<div>Active</div>} />
        <Route path="/inactive" element={<div>Inactive</div>} />
        <Route path="/AppChildCards/:id" element={<More/>}/>
        <Route path="/newconsumeraccount" element={<div><NewConsumer/></div>} />
        <Route path="/appointment-booking" element={<AppointmentBookingPage />} />
      </Routes>
    </div>
  );
}

function Login({ onLogin }) {
  const handleLogin = () => {
    // Perform login logic here
    onLogin();
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}></button>
    </div>
  );
}

export default App;
