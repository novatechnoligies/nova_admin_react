import React from "react";
import './Dashboard.css';

//import Tile1 from "./Tile1";
// import Tile2 from "./Tile2";

const Dashboard = () => {
    return(
        <div className="dashboard-container">
           <div className="first-container">
            <div className="tile tile1">
             Total Appointment  
             &rarr;
            </div>
            <div className="tile tile2">
            Todays Appointment Count
            </div>
            <div className="tile tile3">
            Total Earnings
            </div>
            <div className="tile tile4">
            Todays Earnings
            </div>
            <div className="tile tile5">
            Todays Count
            </div>
            
            <div className="tile6">
            <div className="heading custom-heading">Pax Count</div>        
            <div className="box box1"> Adult Count
           <div className="count-cicle custom-count">8</div>
          </div>
           <div className="box box2"> Kids Count
           <div className="count-cicle custom-count">4</div>
           </div>  
             <div className="box box3">Extra Adult Count
             <div 
            className="count-cicle custom-count">5</div>
           </div>
              </div>
                   </div>


           <div className="second-container">
           <div className="tile1">
           <heading>Todays Earnings</heading>
           <table>
      <thead>
        <tr>
          <th className="custom-th">Id</th>
          <th className="custom-th">Lab Name</th>
          <th className="custom-th">Todays Earnings</th>
          <th className="custom-th">Owner Name</th>
          <th className="custom-th">Status</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
          
            </div>
            <div className="tile2">
           <heading>Todays Earnings</heading>
           <table>
      <thead>
        <tr>
          <th className="custom-th">SN</th>
          <th className="custom-th">Total Inventories</th>
          <th className="custom-th">Total Earnings</th>
          <th className="custom-th">Active pramotions</th>
          <th className="custom-th">Cancel Action</th>
        </tr>
      </thead>
    </table>
             </div>
            </div>
            
            
            <div className="third-container">
            <div className="tile1">
            <div className="chart-heading">Lab Status</div>
            <div className="pie-chart">
             </div>
             <div className="color-box-container">
             <div class="color-box-label">
             <div class="color-box green"></div>
             <div className="color-name">Total Appointment</div>
              </div>
              <div class="color-box-label">
             <div class="color-box gray"></div>
             <div className="color-name">Todays Appointment</div>
              </div>
            <div class="color-box-label">
            <div class="color-box red"></div>
             <div className="color-name">Total Earnings</div>
            </div>
             <div class="color-box-label">
              <div class="color-box blue"></div>
              <div className="color-name">Todays Earnings</div>
              </div>
             </div>
             </div>
             <div className="tile2">
           <heading>Todays Earnings</heading>
           <table>
      <thead>
        <tr>
        <th className="custom-th">SN</th>
          <th className="custom-th">Total Inventories</th>
          <th className="custom-th">Total Earnings</th>
          <th className="custom-th">Active pramotions</th>
          <th className="custom-th">Cancel Action</th>
        </tr>
      </thead>
    </table>
             </div>
            </div>
            </div>
             )
            }
            export default Dashboard;
    