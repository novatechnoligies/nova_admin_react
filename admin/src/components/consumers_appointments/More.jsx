import React,{useState,useEffect} from 'react'
import { Card_Data } from './AcardData'
import { useParams,NavLink } from 'react-router-dom'

export const More = () => {
  const {id}= useParams();
  const [detail,setDetail]=useState(null)

  

 useEffect(()=>{

  const selectedCard = Card_Data.find((item) => item.id === parseInt(id));

  setDetail(selectedCard);
  
 },[id]) 
 if (!detail) {
  return <div>Card not found</div>;
}

  return (
    <>
      <div className='profile_pg'>
         <h1>Card Details</h1>
         <p>ID: {detail.id}</p>
         <p>Name: {detail.name}</p>
         <p>Price: {detail.amount}</p>
         <p>Appointment Status: {detail.appointmentStatus}</p>
         <NavLink to="/Acard" className='back-btn'>Back</NavLink>
      </div>
      
    </>
  )
}
