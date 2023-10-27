import React, { useState, useEffect } from "react";
import { Card_Data } from "./AcardData";
import { useParams, NavLink } from "react-router-dom";
import "./More.css";

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
                  <span>Country </span>: Australia
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
                  <span>Occupation </span>: UI Designer
                </p>
              </div>
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
        <NavLink to={"/Acard"}>back</NavLink>
      </section>
    </>
  );
};
