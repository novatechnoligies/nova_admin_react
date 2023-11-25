import React, { useState,useEffect } from "react";
import "./AppChildCards.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
// import { Card_Data } from "./AcardData";
import itac from "./itac.jpg";

// export const Card_Data =`localhost:8082/getAllConsumerDetailsByld/4`;

const AppChildCards = () => {
  // const [searchItem, setSearchItem] = useState("");
  const [items,setItems]= useState([])
  // const [isError, setIsError]=useState({show:"false",msg:""})

  // const handelChange = (e) => {
  //   setSearchItem(e.target.value);
  // };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8082/getAllConsumerDetailsByld/4");
      setItems(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
 

  useEffect(()=>{
    fetchData(); 
  },[])

  //serch filter
  // const filteredData = Card_Data.filter((val) => {
  //   if (searchItem === "") {
  //     return true;
  //   } else if (val.name.toLowerCase().includes(searchItem.toLowerCase())) {
  //     return true;
  //   }
  //   return false;
  // });

  return (
    <div className="data_card_container">
      <input
        type="text"
        name="text"
        placeholder="Search"
        class="search_input"
        // onChange={handelChange}
      ></input>
      <div className="data_cards">
        {items.map((e, index) => (
          <div
            className="card"
            key={index}
           
          >
            <div class="first-content"  style={{
              background:
                e.type === "home"
                  ? e.appointmentStatus === "BOOKED"
                    ? "linear-gradient(109.6deg, rgb(9, 154, 151) 11.2%, rgb(21, 205, 168) 91.1%)"
                    : "linear-gradient(to top, #a7a6cb 0%, #8989ba 52%, #8989ba 100%)"
                  : e.type === "store" && e.appointmentStatus === "BOOKED"
                  ? "linear-gradient(109.6deg, rgb(255, 207, 84) 11.2%, rgb(255, 158, 27) 91.1%)"
                  : "linear-gradient(to top, #a7a6cb 0%, #8989ba 52%, #8989ba 100%)",
            }}>
              <div className="img">
                <img src={itac} alt="a-img" />
              </div>
              <div className="content">
                <h1 className="h1">{e.name}</h1>
                <p className="p"> Appointment:</p>
              </div>
              <div
                className="s_container"
                style={{
                  visibility:
                    e.appointmentStatus === "NOT-BOOKED" ? "hidden" : "",
                }}
              >
                <div className="s_card">
                  <i>{e.type}</i>
                </div>
              </div>
            </div>
            <div class="second-content">
              <section class="s_bottom">
                <ul className="s_ul">
                  <li class="list_item">
                    <span class="name">service</span>
                    <span class="count">6</span>
                  </li>
                  <li class="list_item">
                    <span class="name">service</span>
                    <span class="count">6</span>
                  </li>
                  <li class="list_item">
                    <span class="name">service</span>
                    <span class="count">6</span>
                  </li>
                  <li class="list_item">
                    <span class="name">service</span>
                    <span class="count">6</span>
                  </li>

                  <NavLink className="na_button" to={`/AppChildCards/${e.id}`} key={e.id}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      ></path>
                    </svg>
                    <div class="na_text">More..</div>
                  </NavLink>
                </ul>
              </section>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppChildCards;
