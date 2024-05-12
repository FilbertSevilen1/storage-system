import React from "react";
function PinjamanHeader() {
  return (
    <div className="font-bold hidden md:flex w-full h-16 justify-between shadow-xl border-b-4 border-blue-500">
      <div className=" w-full sm:w-fill flex flex-row p-2 items-center justify-evenly">
        <div className="w-1/12 flex justify-center">No</div>
        <div className="w-2/12 flex justify-center">Nama</div>
        <div className="w-2/12 flex justify-center">Tanggal Mulai</div>
        <div className="w-2/12 flex justify-center">Tanggal Selesai</div>
        <div className="w-2/12 flex justify-center">Status</div>
        <div className="w-2/12 flex justify-center">Aksi</div>
      </div>
    </div>
  );
}
export default PinjamanHeader;
