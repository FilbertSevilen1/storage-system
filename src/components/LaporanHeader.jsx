import React from "react";
function LaporanHeader() {
  return (
    <div className="font-bold hidden md:flex w-full h-16 justify-between shadow-xl border-b-4 border-blue-500">
      <div className=" w-full sm:w-fill flex flex-row p-2 items-center justify-evenly">
        <div className="w-2/12 flex justify-center text-center">No</div>
        <div className="w-2/12 flex justify-center text-center">Nama Alat</div>
        <div className="w-2/12 flex justify-center text-center">Penanggung Jawab</div>
        <div className="w-2/12 flex justify-center text-center">Tanggal Laporan</div>
        <div className="w-2/12 flex justify-center text-center">Status</div>
        <div className="w-2/12 flex justify-center text-center">Aksi</div>
      </div>
    </div>
  );
}
export default LaporanHeader;
