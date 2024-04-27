import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAllCinema } from "../../user/getuser";
import { useNavigate } from "react-router-dom";

const DynamicTable = ({ data, columns }) => {
  const location = useLocation();
  const id = location.state;
  console.log(id);
  const navigate = useNavigate();
  const toSeats = (cinemaDetail, time) => {
    console.log(cinemaDetail);
    console.log(time);
    const data = {
      id: id,
      cinemaDetail: cinemaDetail,
      time: time,
    };
    navigate("/seats", { state: data });
  };
  const movieName = "asd";
  const headers = columns;
  return (
    <div>
      <div class="p-5 h-screen bg-gray-100">
        <h1 class="text-3xl mb-2 text-center">Cinema List</h1>

        <div class="overflow-auto rounded-lg shadow hidden md:block">
          <table class="w-full">
            <thead class="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th class="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  No.
                </th>
                <th
                  class="p-1 text-sm font-semibold tracking-wide text-center"
                  colSpan={2}
                >
                  Details
                </th>
                <th
                  class="p-3 text-sm font-semibold tracking-wide text-center"
                  colSpan={5}
                >
                  {" "}
                  Time-Slots
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              {data.map((row, rowIndex) => (
                <tr class="bg-white" key={rowIndex}>
                  <td>{rowIndex + 1}</td>
                  {headers.map((value, i) => (
                    <td
                      class="p-3 text-sm text-gray-700 whitespace-nowrap"
                      key={i}
                    >
                      {row[value]}
                    </td>
                  ))}
                  <td class=" px-4 py-2 bg-green-500 font-semibold ">
                    <button onClick={() => toSeats(row, "9.00 AM")}>
                      09.00am
                    </button>
                  </td>
                  <td class="p-3 text-green-500 bg-slate-100 font-medium ">
                    <button onClick={() => toSeats(row, "11.30 AM")}>
                      {" "}
                      11.30am
                    </button>
                  </td>
                  <td class=" px-4 py-2 bg-green-500 font-semibold ">
                    <button onClick={() => toSeats(row, "01.00 PM")}>
                      01.00pm
                    </button>
                  </td>
                  <td class="p-3 text-green-500 bg-slate-100  font-medium">
                    <button onClick={() => toSeats(row, "03.15 PM")}>
                      {" "}
                      03.15pm
                    </button>
                  </td>
                  <td class=" px-4 py-2 bg-green-500 font-semibold  ">
                    <button onClick={() => toSeats(row, "06.30 PM")}>
                      06.30pm
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
const Cast = () => {
  const location = useLocation();
  //const id = location.state.id;
  const [cinemaList, setCinemaList] = useState([]);

  //LIST ALL CINEMA HERE
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCinema() // FROM FILE getuser
        .then((data) => (data = data))
        .catch((err) => console.log(err));
      setCinemaList(data);
    };
    fetchData();
  }, []);

  const columnsToDisplay = ["name", "address"];
  return (
    <>
      <DynamicTable data={cinemaList} columns={columnsToDisplay} />
    </>
  );
};

export default Cast;
