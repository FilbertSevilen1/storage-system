import { Button } from "@mui/material";
import React, { useState } from "react";
function PeralatanRow(props) {
  let [id, setID] = useState(props.peralatanId);
  let [name, setName] = useState(props.peralatanName);
  let [type, setType] = useState(props.peralatanType);
  let [category, setCategory] = useState(props.peralatanCategory);
  let [description, setDescription] = useState(props.peralatanDescription);
  let [stock, setStock] = useState(props.peralatanStock);
  let [available, setAvailable] = useState(props.peralatanAvailable);

  return (
    <div className="my-2 w-full h-auto md:h-24 bg-white shadow-xl flex flex-col sm:flex-row sm:justify-between rounded-xl">
      <div className="w-full md:w-24 h-24 sm:w-24 md:h-full bg-gray-700 rounded-lg"></div>
      <div className="w-full md:w-fill flex flex-col md:flex-row p-2 items-start md:items-center justify-evenly">
        <div className="w-full md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Nama : </div>
          {name}
        </div>
        <div className="w-full md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Jenis : </div>
          {type}
        </div>
        <div className="w-full md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Kategori : </div>
          {category}
        </div>
        <div className="w-full md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Deskripsi : </div>
          {description}
        </div>
        <div className="w-full md:w-1/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Stok : </div>
          {stock}
        </div>
        <div className="w-full md:w-1/12 flex flex-wrap justify-start mx-2 md:justify-center mb-2 md:mb-0">
          <div className="flex md:hidden mr-2 font-bold">Terssedia : </div>
          {available}
        </div>
        <div className="w-full md:w-1/12 flex md:mx-2 p-2 rounded-xl flex justify-center items-center">
          <div className="mx-1 p-2 bg-gray-200 rounded-md cursor-pointer transition-all active:scale-100 hover:scale-110 hover:shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M11 13H6q-.425 0-.712-.288T5 12q0-.425.288-.712T6 11h5V6q0-.425.288-.712T12 5q.425 0 .713.288T13 6v5h5q.425 0 .713.288T19 12q0 .425-.288.713T18 13h-5v5q0 .425-.288.713T12 19q-.425 0-.712-.288T11 18z"
              />
            </svg>
          </div>
          <div className="mx-1 p-2 bg-gray-200 rounded-md cursor-pointer transition-all active:scale-100 hover:scale-110 hover:shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="black"
                d="M4 14v-2h7v2zm0-4V8h11v2zm0-4V4h11v2zm9 14v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55q0 .275-.1.563t-.325.512l-5.5 5.5zm6.575-5.6l.925-.975l-.925-.925l-.95.95z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PeralatanRow;
