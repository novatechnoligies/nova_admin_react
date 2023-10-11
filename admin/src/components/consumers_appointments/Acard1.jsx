import React from 'react'
import Collapsible from 'react-collapsible';
import { DownSquareOutlined} from '@ant-design/icons/lib/icons';
import "./Acard1.css"

const data = [
  {
    name:"zoro",
    gender:"mail",
    phone:'1234-44',
    type:"store"
  },
  {
    name:"luffy",
    gender:"mail",
    phone:'1234-44',
    type:"home"
  },
  {
    name:"nami",
    gender:"femail",
    phone:'1234-44',
    type:"home"
  },
  {
    name:"brook",
    gender:"mail",
    phone:'1234-44',
    type:"store"
  }
]



const Acard1 = () => {
  return (
   <section className='data_cards'>
    {data.map((item,index)=>
             <div class="card" key={index}
              style={{background: item.type === 'home' ? 'linear-gradient(109.6deg, rgb(9, 154, 151) 11.2%, rgb(21, 205, 168) 91.1%)' : 'linear-gradient(109.6deg, rgb(255, 207, 84) 11.2%, rgb(255, 158, 27) 91.1%)'}}
             >
                <div class="infos">
                 <div class="image"></div>
                 <div class="info">
                    <div className='C_name'>
                      <p class="name">
                        {item.name}
                      </p>
                      <p class="function">
                        {item.type}
                      </p>
                     </div>
                 </div>
                </div>
                <Collapsible trigger={<button class="request" type="button"><DownSquareOutlined /></button>}>
                 <p className="p"> <b>E-mail : </b></p>
                 <p className="p"><b>Phone : {item.phone}</b></p>
                 <p className="p"> <b>Gender :{item.gender}</b> </p>
                </Collapsible>    
             </div>  
    )}
    
   </section>
  )
}

export default Acard1