// import logo from './logo.svg';
import './App.css';
import { Menu } from 'antd';
import { Route, Routes, useNavigate} from 'react-router-dom';
import {  DashboardOutlined, HomeOutlined, ProfileOutlined, SettingOutlined, ShopOutlined, ShoppingOutlined } from '@ant-design/icons/lib/icons';
import { useLocation } from 'react-router-dom';
import ShopTable from './components/shop_components/ShopTable';
import ShopFilters from './components/filters/ShopFilter';
import SpaTable from './components/spa_components/SpaTable';
import LabTable from './components/lab_components/LabTable';
import CscTable from './components/csc_components/CscTable';
//import BusTable from './components/bus_components copy/BusTable';
import ClinicTable from './components/clinic_components/ClinicTable';
//import Login from './components/login_components/Login';


function App() {
  const navigate = useNavigate()
  const location = useLocation();
  return (
    <div>
    <div style={{display: "flex", flexDirection: "column" , flex:1}}>
      <Header/>
      </div>
      <div  style={{display: "flex", flexDirection: "row",flex:1 ,alignItems: 'flex-start'}}>
        {/* <Login>
          
        </Login> */}

     <SlideMenu/>
     <Content/>
     </div>
     </div>   
  );


  function Header() {
    return(
      <div style={{height:60, background: 'lightblue', color:'white',display:'flex',justifyContent:'center',alignItems:'center',fontWeight:'bold'}}>
        header
      </div>
    );
  }

  function SlideMenu() {
    const selectedKeys = [location.pathname];
    return(
      <div className="App" style={{display: "flex", flexDirection: "row",alignItems: 'flex-start'}}>

      <Menu selectedKeys={selectedKeys}
        onClick={({key})=>{
          if(key==="logout"){
            //TO DO sign out future here
          }else{
            navigate(key)
          }
        }
      }
        items= {[
          {label :"home", key:"/", icon:<HomeOutlined />},
          {label :"DashBourd",key:"/dash", icon:<DashboardOutlined/>},
          {label :"Lab", key:"/lab",icon:<ShopOutlined/>},
          {label :"Spa", key:"/spa",icon:<ShopOutlined/>},
          {label :"Shalon", key:"/shalon",icon:<ShopOutlined/>},
          {label :"CSC", key:"/csc",icon:<ShopOutlined/>},
          {label :"BUS", key:"/bus",icon:<ShopOutlined/>},
          {label :"Clinic", key:"/clinic",icon:<ShopOutlined/>},
          {label :"Consumer", key:"/consumer",icon:<ShoppingOutlined/>, children:[
            {label :"active", key:"/active",icon:<ShopOutlined/>},
            {label :"inactive", key:"/inavtive",icon:<ShopOutlined/>},
          ]},
          {label :"Profile", key:"/profile",icon:<ProfileOutlined/>},
          {label :"Sign Out", key:"/logout",icon:<SettingOutlined/>, danger:true},
        ]}>
        
        
      </Menu>
      </div>
    );
    
  }

  function Content() {
      

    return (
      <div>
          <Routes>
            <Route path="/" element={<div>dash</div>}></Route>
            <Route path="/dash" element={<div>dash</div>}></Route>
            <Route path="/lab" element={<div className='d-flex flex-column align-items-center'> <LabTable/></div>}></Route>
            <Route path="/spa" element={<div className='d-flex flex-column align-items-center'> <SpaTable/></div>}></Route>
            <Route path="/shalon" element={<div className='d-flex flex-column align-items-center'> <ShopTable/></div>}></Route>
            <Route path="/csc" element={<div className='d-flex flex-column align-items-center'> <CscTable/></div>}></Route>
            {/* <Route path="/bus" element={<div className='d-flex flex-column align-items-center'> <BusTable/></div>}></Route> */}
            <Route path="/clinic" element={<div className='d-flex flex-column align-items-center'> <ClinicTable/></div>}></Route>
            <Route path="/consumer" element={<div>consumer</div>}></Route>
            <Route path="/profile" element={<div>profile</div>}></Route>
            <Route path="/logout" element={<div>out</div>}></Route>
            <Route path="/active" element={<div>profile</div>}></Route>
            <Route path="/inactive" element={<div>out</div>}></Route>

          </Routes>
      </div>
    );
  }
}

export default App;
