import React, { useState } from "react";
import { useNavigate } from "react-router";
function PinjamanCard(props){
    const [item, setItem] = useState(props.item)
    const [title, setTitle] = useState(props.title)
    const [startDate, setStartDate] = useState(props.startDate)
    const [endDate, setEndDate] = useState(props.endDate)
    const [status, setStatus] = useState(props.status)


    const navigate = useNavigate();
    return(
        <div className="transition-all active:scale-95 cursor-pointer  my-2 w-full h-auto sm:h-20 bg-white shadow-xl flex flex-col sm:flex-row sm:justify-between rounded-xl">
            <div className="w-full h-24 sm:w-48 sm:h-full bg-gray-700 rounded-lg">
            </div>
            <div className="w-full sm:w-2/3 flex flex-row p-2 items-center">
                <div onClick={()=>navigate(`/borrow/${item.id}`)} className="w-full sm:w-80">
                    <h2 className="font-bold text-2xl">{title}</h2>
                    <p className="text-l mb-2">{startDate} - {endDate}</p>
                    {/* <p className="text-l">Jumlah Item</p> */}
                    
                </div>
                <div className="text-center w-32 h-12 p-2 flex bg-gray-100 rounded-xl shadow-md flex justify-center items-center">
                    {status}
                </div>
            </div>
        </div>
    )
}
export default PinjamanCard;