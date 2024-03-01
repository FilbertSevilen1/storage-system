import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Heading from "../components/base/Heading";
import PinjamanCard from "../components/PinjamanCard";
import { useNavigate } from "react-router";

function Dashboard() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [listPinjamanCard, setListPinjamanCard] = useState([
    {
      pinjaman_id: "1",
      pinjaman_start_date: "01 Januari 2024",
      pinjaman_end_date: "29 Februari 2024",
      pinjaman_status: "Selesai",
    },
    {
      pinjaman_id: "2",
      pinjaman_start_date: "01 Januari 2024",
      pinjaman_end_date: "29 Februari 2024",
      pinjaman_status: "Selesai",
    },
    {
      pinjaman_id: "3",
      pinjaman_start_date: "01 Januari 2024",
      pinjaman_end_date: "29 Februari 2024",
      pinjaman_status: "Selesai",
    },
    {
      pinjaman_id: "4",
      pinjaman_start_date: "01 Januari 2024",
      pinjaman_end_date: "29 Februari 2024",
      pinjaman_status: "Selesai",
    },
    {
      pinjaman_id: "5",
      pinjaman_start_date: "01 Januari 2024",
      pinjaman_end_date: "29 Februari 2024",
      pinjaman_status: "Selesai",
    },
  ]);

  const generatePinjamanCard = () => {
    if(listPinjamanCard){
      return listPinjamanCard.map((card, index)=>{
        return <PinjamanCard
            title={card.pinjaman_id}
            startDate={card.pinjaman_start_date}
            endDate={card.pinjaman_end_date}
            status={card.pinjaman_status}
        >

        </PinjamanCard>
      })
    }
  };
  return (
    <div className="w-11/12 md:w-10/12 mx-auto flex flex-row flex-wrap justify-between mt-20">
      <div className="w-full xl:w-1/2 flex flex-col px-8">
        <div className="mb-8">
          <Heading title="Pinjaman Saya"></Heading>
        </div>
        {generatePinjamanCard()}
        {/* <div onClick={() => navigate("/detailpinjaman/1")}>
          <PinjamanCard
            title="Pinjaman 001"
            startDate="01 Januari 2024"
            endDate="29 Februari 2024"
            status="Selesai"
          ></PinjamanCard>
        </div>
        <PinjamanCard
          title="Pinjaman 001"
          startDate="01 Januari 2024"
          endDate="29 Februari 2024"
          status="Dalam Peminjaman"
        ></PinjamanCard>
        <PinjamanCard
          title="Pinjaman 001"
          startDate="01 Januari 2024"
          endDate="29 Februari 2024"
          status="Dalam Peminjaman"
        ></PinjamanCard>
        <PinjamanCard
          title="Pinjaman 001"
          startDate="01 Januari 2024"
          endDate="29 Februari 2024"
          status="Dalam Peminjaman"
        ></PinjamanCard>
        <PinjamanCard
          title="Pinjaman 001"
          startDate="01 Januari 2024"
          endDate="29 Februari 2024"
          status="Dalam Peminjaman"
        ></PinjamanCard> */}

        <div className="w-full my-8">
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/pinjaman")}
          >
            Lihat Selengkapnya
          </Button>
        </div>
      </div>
      <div className="w-full xl:w-1/2 flex flex-col px-8">
        <div className="mb-8">
          <Heading title="Riwayat Pinjaman"></Heading>
        </div>
        <PinjamanCard
          title="Pinjaman 001"
          startDate="01 Januari 2024"
          endDate="29 Februari 2024"
          status="Selesai"
        ></PinjamanCard>
        <PinjamanCard
          title="Pinjaman 001"
          startDate="01 Januari 2024"
          endDate="29 Februari 2024"
          status="Selesai"
        ></PinjamanCard>
        <PinjamanCard
          title="Pinjaman 001"
          startDate="01 Januari 2024"
          endDate="29 Februari 2024"
          status="Selesai"
        ></PinjamanCard>
        <div className="w-full my-8">
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/pinjamansaya")}
          >
            Lihat Selengkapnya
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
