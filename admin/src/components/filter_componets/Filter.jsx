import React from "react";
import { Input,Select,Slider,Checkbox,DatePicker } from 'antd';
import './Filter.css'
const Filter = (probs) => {

    const { Option } = Select;

    return (

          <div className=" filter_container-row" style={{ background: 'white' ,marginTop:'5px'}}>
            
                <div className="filter-chuld-1" >
                   <div className="search-box">
                     <label htmlFor="s-bar" >Filter By : </label> 
                     <Input type="search" placeholder="Search..."  className="seach-filter" name="s-bar" style={{width:'200px'}}/>
                   </div> 
                    
                   <div className="status-box">
                     <label>Status: </label>
                        <Select defaultValue="All" style={{width:'200px'}}>
                         <Option value="">All</Option>
                         <Option value="category1">Active</Option>
                         <Option value="category2">In-Active</Option>
                        </Select>
                   </div>
                   <div className="price-box">
                      <label htmlFor="price-range" className="label" >Price Range:</label>
                          <div className="slider-container">
                             <div><Slider range min={0} max={100} step={1} className="slider" id="price-range" /></div>
                          </div>
                   </div>
                     
                </div>


                
                <div  className="filter-chuld-2" >   
                      <div className="feature-box">
                         <label>Features:</label>
                            <Checkbox style={{marginLeft:'20px'}}>Feature 1</Checkbox>
                            <Checkbox style={{marginLeft:'20px'}}>Feature 2</Checkbox>
                      </div>
                       <div className="date-range-box">
                         <label>Data Range : </label>
                            <label style={{marginLeft:'20px'}}>Start Date:</label>
                            <DatePicker />
                            <label style={{marginLeft:'10px'}}>End Date:</label>
                            <DatePicker />
                       </div> 
       
                </div>
     
          </div>
        
      );
}

export default Filter;