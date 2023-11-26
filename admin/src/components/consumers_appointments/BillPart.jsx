import React from 'react'
import './BillPart.css'

const BillPart = () => {
  return (
    <div className='bill-items'>
        <ul className='br-1'>
            <li className='br-l1'>Tax 1</li>
            <li className='br-l2'>: 12</li>
        </ul>
        <ul className='br-1'>
            <li className='br-l1'>Tax 2</li>
            <li className='br-l2'>: 12</li>
        </ul>
        <ul className='br-1'>
            <li className='br-l1'>gst</li>
            <li className='br-l2'>: 12</li>
        </ul>
        <ul className='br-1'>
            <li className='br-l1'>cgst</li>
            <li className='br-l2'>: 12</li>
        </ul>
        <ul className='br-1'>
            <li className='br-l1'>sgst</li>
            <li className='br-l2'>: 12</li>
        </ul>
        <ul className='br-1'>
            <li className='br-l1'>total amount</li>
            <li className='br-l2'>: 12</li>
        </ul>
    </div>
  )
}

export default BillPart