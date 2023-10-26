import React, { useState } from "react";
import "./AppChildCards.css";
import { NavLink } from "react-router-dom";
import { Card_Data } from "./AcardData";
import itac from "./itac.jpg";

const AppChildCards = () => {
  const [searchItem, setSearchItem] = useState("");
  // const [items,setItems]= useState([])
  // const [isError, setIsError]=useState({show:"false",msg:""})

  const handelChange = (e) => {
    setSearchItem(e.target.value);
  };

  // const getData = async (url)=>{
  //   setisLoading(true)
  //   try{
  //     const res= await fetch (url);
  //     const data = await res.json();
  //     console.log(data);
  //     if(data.res === "true"){
  //       setIsError({show:false,msg:""} );
  //       setItems(data.as_per_the_res);
  //     }else{
  //       setIsError({show:true, msg:""})
  //     }
  //   }catch(error){
  //     console.log(error)
  //   }

  // }

  //debouncing is removed

  // useEffect(()=>{
  //   let timeOut=setTimeout(()=>{getData(`${Card_Data}`)},900)

  //   return()=>clearTimeout(timeOut);
  // },[])

  //serch filter
  const filteredData = Card_Data.filter((val) => {
    if (searchItem === "") {
      return true;
    } else if (val.name.toLowerCase().includes(searchItem.toLowerCase())) {
      return true;
    }
    return false;
  });

  return (
    <div className="data_card_container">
      <input
        type="text"
        name="text"
        placeholder="Search"
        class="search_input"
        onChange={handelChange}
      ></input>
      <div className="data_cards">
        {filteredData.map((e, index) => (
          <div
            className="card"
            key={index}
            style={{
              background:
                e.type === "home"
                  ? e.appointmentStatus === "BOOKED"
                    ? "linear-gradient(109.6deg, rgb(9, 154, 151) 11.2%, rgb(21, 205, 168) 91.1%)"
                    : "linear-gradient(to top, #a7a6cb 0%, #8989ba 52%, #8989ba 100%)"
                  : e.type === "store" && e.appointmentStatus === "BOOKED"
                  ? "linear-gradient(109.6deg, rgb(255, 207, 84) 11.2%, rgb(255, 158, 27) 91.1%)"
                  : "linear-gradient(to top, #a7a6cb 0%, #8989ba 52%, #8989ba 100%)",
            }}
          >
            {/* <div class="first-content">
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
            </div> */}
            <div class="second-content">
              <section class="bottom">
                <ul class="users">
                  <li class="user">
                    <span class="user-name">services</span>
                    <span class="user-occupation">5</span>
                  </li>
                  <li class="user">
                    <span class="user-name">Ethan Murphy</span>
                    <span class="user-occupation">Graphic Designer</span>
                  </li>
                  <li class="user">
                    <span class="user-name">Ava Collins</span>
                    <span class="user-occupation">Financial Analyst</span>
                  </li>
                  <li class="user">
                    <span class="user-name">Noah Walker</span>
                    <span class="user-occupation">Journalist</span>
                  </li>
                </ul>
              </section>

              <NavLink to={`/AppChildCards/${e.id}`} key={e.id}>
               <p className="n_p">More</p>
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppChildCards;
