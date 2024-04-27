// MovieSeatBooking.jsx
import React, { useState, useEffect, useContext } from "react";
import "./seat.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import PaymentModel from "../components/PaymentModel/Payment.Component";

const MovieSeatBooking = () => {
  async function fetchMovieName(movieId) {
    try {
      const response = await axios.get(`/movie/${movieId}`);
      setMovieName(response.data.title);
    } catch (error) {
      console.log("Error fetching movie name:", error);
    }
    try {
      const response = await axios.get(`/movie/${movieId}/images`);
    } catch (error) {
      console.log("error");
    }
  }

  const location = useLocation();
  const data = location.state;
  const id = data.id;
  //console.log(id);

  const [movieName, setMovieName] = useState("");
  fetchMovieName(id);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);

  const finalData = {
    id: id,
    data: data,
    seats: selectedSeats,
  };
  const navigate = useNavigate();
  const toTicket = () => {
    console.log(finalData);
    navigate("/ticket", { state: finalData });
  };
  //for payment model
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [price, setTicketPrice] = useState(0); // Example ticket price
  // Function to open the payment modal
  const openPaymentModal = () => {
    if (price > 0) {
      setIsPaymentModalOpen(true);
    }
  };
  useEffect(() => {
    const storedSelectedSeats = JSON.parse(
      localStorage.getItem("selectedSeats")
    );
    if (storedSelectedSeats) {
      setSelectedSeats(storedSelectedSeats);
    }

    const storedSelectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if (storedSelectedMovieIndex) {
      setSelectedMovieIndex(parseInt(storedSelectedMovieIndex));
    }
  }, []);

  let ticketPrice = 0;
  const updateSelectedCount = () => {
    ticketPrice = 0;
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    const seatsIndex = [...selectedSeats].reverse().map((seat) => {
      const index = seat.dataset.index;

      if (index.match(/[A-C]/i)) {
        ticketPrice += 200;
      } else if (index.match(/[D-H]/i)) {
        ticketPrice += 250;
      } else if (index.match(/[I-J]/i)) {
        ticketPrice += 400;
      }
      return index;
    });

    //console.log("Total Price:", price);
    //console.log(seatsIndex);

    setTicketPrice(ticketPrice);
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
    const selectedSeatsCount = selectedSeats.length;
    document.getElementById("count").innerText = selectedSeatsCount;

    document.getElementById("total").innerText = ticketPrice;

    localStorage.setItem("selectedMovieIndex", selectedMovieIndex);
    localStorage.setItem("selectedMoviePrice", ticketPrice);
  };

  const handleSeatClick = (e) => {
    if (
      e.target.classList.contains("seat") &&
      !e.target.classList.contains("sold")
    ) {
      e.target.classList.toggle("selected");
      updateSelectedCount();
    }
  };

  return (
    <div className="body">
      <PaymentModel
        isOpen={isPaymentModalOpen}
        setIsOpen={setIsPaymentModalOpen}
        price={price}
        onSuccess={toTicket}
      />
      <div className="movie-container">
        <label>Movie Title : </label>
        <label>{movieName}</label>
        <ul className="showcase">
          <li>
            <div className="seat"></div>
            <small>Available</small>
          </li>
          <li>
            <div className="seat selected"></div>
            <small>Selected</small>
          </li>
          <li>
            <div className="seat sold"></div>
            <small>Sold</small>
          </li>
        </ul>
        <div className="container" onClick={handleSeatClick}>
          <div className="screen"></div>
          {/* Your seat rows here */}
          <div class="text">CLASSIC-Rs. 200.00</div>
          <hr width="100%;" size="1"></hr>
          <div class="space"></div>
          <div class="row">
            A<div class="seat" data-index="A1"></div>
            <div class="seat" data-index="A2"></div>
            <div class="seat" data-index="A3"></div>
            <div class="seat" data-index="A4"></div>
            <div class="seat" data-index="A5"></div>
            <div class="seat" data-index="A6"></div>
            <div class="seat" data-index="A7"></div>
            <div class="seat" data-index="A8"></div>
          </div>
          <div class="row">
            B <div class="seat" data-index="B1"></div>
            <div class="seat" data-index="B2"></div>
            <div class="seat" data-index="B3"></div>
            <div class="seat" data-index="B4"></div>
            <div class="seat" data-index="B5"></div>
            <div class="seat" data-index="B6"></div>
            <div class="seat" data-index="B7"></div>
            <div class="seat" data-index="B8"></div>
          </div>
          <div class="row">
            C <div class="seat" data-index="C1"></div>
            <div class="seat" data-index="C2"></div>
            <div class="seat" data-index="C3"></div>
            <div class="seat" data-index="C4"></div>
            <div class="seat" data-index="C5"></div>
            <div class="seat" data-index="C6"></div>
            <div class="seat" data-index="C7"></div>
            <div class="seat" data-index="C8"></div>
          </div>
          <div class="text">PRIME-Rs. 250.00</div>
          <hr width="100%;" size="1"></hr>
          <div class="row">
            D<div class="seat" data-index="D1"></div>
            <div class="seat" data-index="D2"></div>
            <div class="seat" data-index="D3"></div>
            <div class="seat" data-index="D4"></div>
            <div class="seat" data-index="D5"></div>
            <div class="seat" data-index="D6"></div>
            <div class="seat" data-index="D7"></div>
            <div class="seat" data-index="D8"></div>
          </div>
          <div class="row">
            E<div class="seat" data-index="E1"></div>
            <div class="seat" data-index="E2"></div>
            <div class="seat" data-index="E3"></div>
            <div class="seat" data-index="E4"></div>
            <div class="seat " data-index="E5"></div>
            <div class="seat" data-index="E6"></div>
            <div class="seat" data-index="E7"></div>
            <div class="seat" data-index="E8"></div>
          </div>
          <div class="row">
            F<div class="seat" data-index="F1"></div>
            <div class="seat" data-index="F2"></div>
            <div class="seat" data-index="F3"></div>
            <div class="seat" data-index="F4"></div>
            <div class="seat " data-index="F5"></div>
            <div class="seat " data-index="F6"></div>
            <div class="seat " data-index="F7"></div>
            <div class="seat" data-index="F8"></div>
          </div>
          <div class="row">
            G<div class="seat" data-index="G1"></div>
            <div class="seat" data-index="G2"></div>
            <div class="seat" data-index="G3"></div>
            <div class="seat" data-index="G4"></div>
            <div class="seat " data-index="G5"></div>
            <div class="seat " data-index="G6"></div>
            <div class="seat " data-index="G7"></div>
            <div class="seat" data-index="G8"></div>
          </div>
          <div class="row">
            H<div class="seat" data-index="H1"></div>
            <div class="seat" data-index="H2"></div>
            <div class="seat" data-index="H3"></div>
            <div class="seat" data-index="H4"></div>
            <div class="seat " data-index="H5"></div>
            <div class="seat " data-index="H6"></div>
            <div class="seat " data-index="H7"></div>
            <div class="seat" data-index="H8"></div>
          </div>
          <div class="text">RECLINER-Rs. 400.00</div>
          <hr width="100%;" size="1"></hr>
          <div class="row">
            I<div class="seat" data-index="I1"></div>
            <div class="seat" data-index="I2"></div>
            <div class="seat" data-index="I3"></div>
            <div class="seat" data-index="I4"></div>
            <div class="seat " data-index="I5"></div>
            <div class="seat " data-index="I6"></div>
            <div class="seat " data-index="I7"></div>
            <div class="seat" data-index="I8"></div>
          </div>
          <div class="row">
            J<div class="seat" data-index="J1"></div>
            <div class="seat" data-index="J2"></div>
            <div class="seat" data-index="J3"></div>
            <div class="seat" data-index="J4"></div>
            <div class="seat " data-index="J5"></div>
            <div class="seat " data-index="J6"></div>
            <div class="seat" data-index="J7"></div>
            <div class="seat" data-index="J8"></div>
          </div>
          <p className="text">
            You have selected <span id="count">{selectedSeats.length}</span>{" "}
            seat for a price of RS.
            <span id="total">{ticketPrice}</span>
          </p>
          <button
            className="payButton"
            //disabled={selectedSeats.length === 0}
            onClick={openPaymentModal}
          >
            Click To Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieSeatBooking;
