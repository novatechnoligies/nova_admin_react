import React, { useState, useEffect } from "react";
import { Card_Data } from "./AcardData";
import { useParams, NavLink } from "react-router-dom";
import "./More.css";
import AddDrop from "./AddDrop";
import BillPart from "./BillPart";

export const More = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const selectedCard = Card_Data.find((item) => item.id === parseInt(id));

    setDetail(selectedCard);
  }, [id]);
  if (!detail) {
    return <div>Card not found</div>;
  }

  return (
    <>
      <section className="profile_pg">
        <div class="panel-body bio-graph-info">
          <h1>Bio Graph</h1>

          <div class="p_row">
            <div className="p_row_1">
              <div class="p_bio-row">
                <p>
                  <span>First Name </span>: Camila
                </p>
              </div>
              <div class="p_bio-row">
                <p>
                  <span>Last Name </span>: Smith
                </p>
              </div>
              <div class="p_bio-row">
                <p>
                  <span>Birthday</span>: 13 July 1983
                </p>
              </div>
            </div>
            <div className="p_row_2">
              <div class="p_bio-row">
                <p>
                  <span>Email </span>: jsmith@flatlab.com
                </p>
              </div>
              <div class="p_bio-row">
                <p>
                  <span>Mobile </span>: (12) 03 4567890
                </p>
              </div>
              <div class="p_bio-row">
                <p>
                  <span>Phone </span>: 88 (02) 123456
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="drop-downs">
        <div className="drops-continer">
          <AddDrop />
          <NavLink  className="cta" to={"/Acard"}>
            <svg className="cta-svg" viewBox="0 0 13 10" height="10px" width="15px">
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
            <span className="cta-span">Back</span>
          </NavLink >
        </div>
        <BillPart />
      </div>
    </>
  );
};
