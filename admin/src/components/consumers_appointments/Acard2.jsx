import React from 'react'
import Collapsible from 'react-collapsible';
import { DownSquareOutlined} from '@ant-design/icons/lib/icons';
import "./Acard2.css"
import { useState } from 'react';


const data = [
  {
      name: "Alice",
      Date: "05/25/2023",
      gender: "female",
      phone: "5678-90",
      type: "home",
      price: "1200"
  },
  {
      name: "Bob",
      Date: "02/15/2023",
      gender: "male",
      phone: "9876-54",
      type: "shop",
      price: "1800"
  },
  {
      name: "Charlie",
      Date: "07/08/2023",
      gender: "male",
      phone: "3456-78",
      type: "home",
      price: "1600"
  },
  {
      name: "David",
      Date: "09/30/2023",
      gender: "male",
      phone: "2345-67",
      type: "shop",
      price: "2100"
  },
  {
      name: "Eva",
      Date: "04/12/2023",
      gender: "female",
      phone: "8765-43",
      type: "home",
      price: "1350"
  },
  {
      name: "Frank",
      Date: "11/17/2023",
      gender: "male",
      phone: "6543-21",
      type: "shop",
      price: "1900"
  },
  {
      name: "Grace",
      Date: "03/22/2023",
      gender: "female",
      phone: "7890-12",
      type: "home",
      price: "1250"
  },
  {
      name: "Hannah",
      Date: "10/05/2023",
      gender: "female",
      phone: "5432-10",
      type: "shop",
      price: "2000"
  },
  {
      name: "Ian",
      Date: "06/14/2023",
      gender: "male",
      phone: "4567-89",
      type: "home",
      price: "1400"
  },
  {
      name: "Jack",
      Date: "12/01/2023",
      gender: "male",
      phone: "6789-01",
      type: "shop",
      price: "2200"
  },
  {
      name: "Karen",
      Date: "08/23/2023",
      gender: "female",
      phone: "6789-12",
      type: "home",
      price: "1300"
  },
  {
      name: "Liam",
      Date: "01/09/2023",
      gender: "male",
      phone: "5678-90",
      type: "shop",
      price: "1750"
  },
  {
      name: "Mia",
      Date: "09/14/2023",
      gender: "female",
      phone: "3456-78",
      type: "home",
      price: "1550"
  },
  {
      name: "Noah",
      Date: "04/30/2023",
      gender: "male",
      phone: "2345-67",
      type: "shop",
      price: "2050"
  },
  {
      name: "Olivia",
      Date: "11/05/2023",
      gender: "female",
      phone: "8765-43",
      type: "home",
      price: "1450"
  },
  {
      name: "Parker",
      Date: "02/17/2023",
      gender: "male",
      phone: "6543-21",
      type: "shop",
      price: "1950"
  },
  {
      name: "Quinn",
      Date: "07/26/2023",
      gender: "female",
      phone: "7890-12",
      type: "home",
      price: "1280"
  },
  {
      name: "Ryan",
      Date: "05/10/2023",
      gender: "male",
      phone: "5432-10",
      type: "shop",
      price: "1980"
  },
  {
      name: "Samantha",
      Date: "12/12/2023",
      gender: "female",
      phone: "4567-89",
      type: "home",
      price: "1375"
  },
  {
      name: "Thomas",
      Date: "03/03/2023",
      gender: "male",
      phone: "6789-01",
      type: "shop",
      price: "2125"
  },
  {
      name: "Uma",
      Date: "08/09/2023",
      gender: "female",
      phone: "6789-12",
      type: "home",
      price: "1275"
  },
  {
      name: "Victor",
      Date: "01/19/2023",
      gender: "male",
      phone: "5678-90",
      type: "shop",
      price: "1830"
  },
  {
      name: "Willow",
      Date: "09/01/2023",
      gender: "female",
      phone: "3456-78",
      type: "home",
      price: "1590"
  },
  {
      name: "Xander",
      Date: "04/05/2023",
      gender: "male",
      phone: "2345-67",
      type: "shop",
      price: "2010"
  },
  {
      name: "Yara",
      Date: "10/28/2023",
      gender: "female",
      phone: "8765-43",
      type: "home",
      price: "1420"
  }
];






const Acard2 = () => {
const [searchItem ,setSearchItem]=useState('')

const handelChange=(e)=>{
  setSearchItem(e.target.value)
}

  return (
    <div className='data_card_container'>
          <label htmlFor="search">Search:</label>
          <input type='text' placeholder='search' onChange={handelChange}/>
          <div className='data_cards' >
          {data.filter((val)=>{
                        if(searchItem==""){
                         return val
                           }else if(val.name.toLowerCase().includes(searchItem.toLowerCase())){
                               return val;
                           }
                        }).map((e,index)=>
          <div className="card" key={index}
          style={{
            background: e.type === 'home' ? 'linear-gradient(109.6deg, rgb(9, 154, 151) 11.2%, rgb(21, 205, 168) 91.1%)' : 'linear-gradient(109.6deg, rgb(255, 207, 84) 11.2%, rgb(255, 158, 27) 91.1%)'
          }}
          >
          <div className="img"></div>
            <div className="textBox">
               <div className="textContent">
                  <div className='textContent-c'>
                   <p className="h1"> {e.name}</p>
                   <p className='h1'>{e.Date} </p>
                  </div> 
                   <span className="span">{e.type}</span>
               </div>
               <div className='d_body'>
                  <Collapsible trigger={<span className='spam'><DownSquareOutlined /></span>}>
                   <p className="p">
                     <b>E-mail :</b>
                   </p>
                   <p className="p">
                     <b>Phone :{e.phone}</b>
                   </p>
                   <p className="p">
                     <b>Gender : {e.gender}</b>
                   </p>
                   <p className="p">
                     <b>Price: {e.price}</b>
                   </p>
                  </Collapsible>  
               </div>         
            </div>                    
          </div> 
     )}
          
    </div>
    </div>
    
  )
}

export default Acard2