import React from "react";
import { Input,Select,Slider,Checkbox,DatePicker } from 'antd';
import './Filter.css'
const Filter = (probs) => {

    const { Option } = Select;

    return (
          <div className="container-row" style={{ background: 'white' ,marginTop:'5px'}}>
            <div>
                <div>
                <label>Filter By : </label> <Input placeholder="Search..."  className="seach-filter" style={{width:'200px'}}/>

                <label style={{marginLeft:'15%'}}>Status: </label>
                    <Select defaultValue="All" style={{width:'200px'}}>
                        <Option value="">All</Option>
                        <Option value="category1">Active</Option>
                        <Option value="category2">In-Active</Option>
                    </Select>
                <label htmlFor="price-range" className="label" style={{marginLeft:'15%'}}>Price Range:</label>
                    <div className="slider-container">
                        <div><Slider range min={0} max={100} step={1} className="slider" id="price-range" /></div>
                    </div>
                    <br></br> <br></br>
                    <div style={{width: 'fit-content'}}>   
                     
                        <label>Features:</label>
                            <Checkbox style={{marginLeft:'20px'}}>Feature 1</Checkbox>
                            <Checkbox style={{marginLeft:'20px'}}>Feature 2</Checkbox>
                        <label style={{marginLeft:'190px'}}>Data Range : </label>
                            <label style={{marginLeft:'20px'}}>Start Date:</label>
                            <DatePicker />
                            <label style={{marginLeft:'10px'}}>End Date:</label>
                            <DatePicker />
                            <br></br>
                            
                    </div>

                
                </div>
            </div>
          </div>
        
      );
}

export default Filter;