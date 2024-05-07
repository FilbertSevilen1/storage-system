import React from "react";
function PurchaseHeader() {
  return (
    <div className="font-bold hidden md:flex w-full h-16 justify-between shadow-xl border-b-4 border-blue-500">
      <div className=" w-full sm:w-fill flex flex-row p-2 items-center justify-evenly">
        <div className="w-2/12 flex justify-center">No</div>
        <div className="w-3/12 flex justify-center">Nama Alat</div>
        <div className="w-3/12 flex justify-center">Jumlah</div>
        <div className="w-3/12 flex justify-center">Tanggal Pembelian</div>
        <div className="w-2/12 flex justify-center">Harga</div>
      </div>
    </div>
  );
}
export default PurchaseHeader;
