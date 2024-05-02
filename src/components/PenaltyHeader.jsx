import React from "react";
function PenaltyHeader() {
  return (
    <div className="font-bold hidden md:flex w-full h-16 justify-between shadow-xl border-b-4 border-blue-500">
      <div className=" w-full sm:w-fill flex flex-row p-2 items-center justify-evenly">
        <div className="w-1/12 flex justify-center">No</div>
        <div className="w-3/12 flex justify-center">Nama</div>
        <div className="w-2/12 flex justify-center">Jenis Hukuman</div>
        <div className="w-2/12 flex justify-center">Batas Waktu</div>
        <div className="w-2/12 flex justify-center">Status</div>
        <div className="w-2/12 flex justify-center">Aksi</div>
      </div>
    </div>
  );
}
export default PenaltyHeader;
