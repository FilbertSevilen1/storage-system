import React from "react";
function LaporanHeader() {
  return (
    <div className="font-bold hidden md:flex w-full h-16 justify-between shadow-xl border-b-4 border-blue-500">
      <div className=" w-full sm:w-fill flex flex-row p-2 items-center justify-evenly">
        <div className="w-2/12 flex justify-center">ID</div>
        <div className="w-3/12 flex justify-center">Nama</div>
        <div className="w-3/12 flex justify-center">Tanggal Laporan</div>
        <div className="w-3/12 flex justify-center">Status</div>
        <div className="w-2/12 flex justify-center">Aksi</div>
      </div>
    </div>
  );
}
export default LaporanHeader;
