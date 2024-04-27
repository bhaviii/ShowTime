import React, { useState, createContext } from "react";
export const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const onSuccess = () => {};
  const [movie, setMovie] = useState({
    id: 0,
    original_title: "",
    overview: "",
    backdrop_path: "",
    poster_path: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState(0);
  const rentMoive = () => {
    setIsOpen(true);
    setPrice(149);
    onSuccess();
  };

  const buyMoive = () => {
    setIsOpen(true);
    setPrice(599);
    onSuccess();
  };
  const bookTickets = () => {
    setIsOpen(true);
    setPrice(500);
  };
  return (
    <MovieContext.Provider
      value={{
        movie,
        setMovie,
        isOpen,
        price,
        setIsOpen,
        setPrice,
        rentMoive,
        buyMoive,
        bookTickets,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
