import React, { useState } from "react";
function PeralatanRow(props) {
  const [title, setTitle] = useState(props.title);
  const [startDate, setStartDate] = useState(props.startDate);
  const [endDate, setEndDate] = useState(props.endDate);
  const [status, setStatus] = useState(props.status);
  return (
    <div className="my-2 w-full h-auto md:h-24 bg-white shadow-xl flex flex-col sm:flex-row sm:justify-between rounded-xl">
      <div className="w-full md:w-24 h-24 sm:w-24 md:h-full bg-gray-700 rounded-lg"></div>
      <div className="w-full md:w-fill flex flex-col md:flex-row p-2 items-start md:items-center justify-evenly">
        <div className="w-full md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-center">Nama</div>
        <div className="w-full md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-center">Tipe</div>
        <div className="w-full md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-center">Kategori</div>
        <div className="w-full md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-center">Deskripsi</div>
        <div className="w-full md:w-1/12 flex flex-wrap justify-start mx-2 md:justify-center">Stok</div>
        <div className="w-full md:w-1/12 flex flex-wrap justify-start mx-2 md:justify-center mb-2 md:mb-0">Tersedia</div>
        <div className="w-full md:w-1/12 flex mx-2 p-2 bg-gray-100 rounded-xl shadow-md flex justify-center items-center">
          Detail
        </div>
      </div>
    </div>
  );
}
export default PeralatanRow;
