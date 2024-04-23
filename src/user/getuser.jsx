import axios from "axios";

export const getAllUser = async () => {
  const res = await axios
    .get("http://localhost:5000/user")
    .catch((err) => console.log(err));
  console.log(res.status);
  if (res.status > 300) {
    return console.log("no data");
  }

  const data = res.data;
  return data;
};

export const getAllCinema = async () => {
  const res = await axios
    .get("http://localhost:5000/cinema")
    .catch((err) => console.log(err));
  console.log(res.status);
  if (res.status > 300) {
    return console.log("no data");
  }
  const data = res.data.cinemaList;
  console.log(data);
  return data;
};
