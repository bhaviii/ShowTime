import React, { useState } from "react";
import "./ticketView.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Ticket = () => {
  const currentDate = new Date();
  //const options = { year: "numeric", month: "long", day: "numeric" };
  //const formattedDate = currentDate.toLocaleDateString("en-US", options);
  const weekday = currentDate.toLocaleDateString("en-US", { weekday: "long" });
  const year = currentDate.toLocaleDateString("en-US", { year: "numeric" });
  const month = currentDate.toLocaleDateString("en-US", { month: "long" });
  const day = currentDate.toLocaleDateString("en-US", { day: "numeric" });

  const [movie_image, setImage] = useState();
  async function fetchMovieName(movieId) {
    try {
      const response = await axios.get(`/movie/${movieId}`);
      setMovieName(response.data.title);
    } catch (error) {
      console.log("Error fetching movie name:", error);
    }
    try {
      const response = await axios.get(`/movie/${movieId}/images`);
      setImage(response.data.backdrops[0].file_path);
    } catch (error) {
      console.log("Image error");
    }
  }
  const location = useLocation();
  const data = location.state;
  const id = data.id;
  console.log(data);
  const [movieName, setMovieName] = useState("");
  fetchMovieName(id);
  console.log(id);
  console.log(movieName);
  console.log(data.data.time);
  return (
    <html class="bodyy">
      <div className="ticket created-by-anniedotexe">
        <div className="left">
          <div
            className="image"
            style={{
              backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie_image}')`,
            }}
          >
            <p className="admit-one">
              <span>ADMIT ONE</span>
              <span>ADMIT ONE</span>
              <span>ADMIT ONE</span>
            </p>
            <div className="ticket-number">
              <p>#{data.id}</p>
            </div>
          </div>
          <div className="ticket-info">
            <p className="date">
              <span>{weekday}</span>
              <span className="curr-date">
                {month}
                {day}
              </span>
              <span>{year}</span>
            </p>
            <div className="show-name">
              <h1>{movieName}</h1>
            </div>
            <div className="time">
              <p>
                DOORS <span>@</span> {data.data.time}
              </p>
            </div>
            <p className="location">
              <span>{data.data.cinemaDetail.name}-</span>
              <span className="separator"></span>
              <span className="separator"></span>
              <span>{data.data.cinemaDetail.address}</span>
            </p>
          </div>
        </div>
        <div className="right">
          <p className="admit-one">
            <span>ADMIT ONE</span>
            <span>ADMIT ONE</span>
            <span>ADMIT ONE</span>
          </p>
          <div className="right-info-container">
            <div className="show-name">
              <h1>{data.seats.length} Person</h1>
            </div>
            <div className="time">
              <p></p>
              <p>
                DOORS <span>@</span> {data.data.time}
              </p>
            </div>
            <div className="barcode">
              <img
                src="https://external-preview.redd.it/cg8k976AV52mDvDb5jDVJABPrSZ3tpi1aXhPjgcDTbw.png?auto=webp&s=1c205ba303c1fa0370b813ea83b9e1bddb7215eb"
                alt="QR code"
              />
            </div>
            <p className="ticket-number">#{data.id}</p>
          </div>
        </div>
      </div>
    </html>
  );
};

export default Ticket;
