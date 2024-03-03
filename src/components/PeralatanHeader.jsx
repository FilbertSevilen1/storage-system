import React from "react";
function PeralatanHeader() {
  return (
    <div className="font-bold hidden md:flex w-full h-16 justify-between shadow-xl border-b-4 border-blue-500">
      <div className="w-24 h-full sm:w-24 sm:h-full rounded-lg flex items-center justify-center">
        Gambar
      </div>
      <div className=" w-full sm:w-fill flex flex-row p-2 items-center justify-evenly">
        <div className="w-2/12 flex justify-center">Nama</div>
        <div className="w-2/12 flex justify-center">Kategori</div>
        <div className="w-2/12 flex justify-center">Deskripsi</div>
        <div className="w-1/12 flex justify-center">Stok</div>
        <div className="w-1/12 flex justify-center">Tersedia</div>
        <div className="w-1/12 flex justify-center">Aksi</div>
      </div>
    </div>
  );
}
export default PeralatanHeader;
