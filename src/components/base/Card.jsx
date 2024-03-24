import React, { useState } from "react";
function Card(props){
    const [title, setTitle] = useState(props.title)
    const [description, setDescription] = useState(props.description)

    console.log(props)
    return(
        <div className="transition-all active:scale-95 cursor-pointer  my-2 w-full h-auto sm:h-20 bg-white shadow-xl flex flex-col sm:flex-row sm:justify-between rounded-xl">
            <div className="w-full h-24 sm:w-48 sm:h-full bg-gray-700 rounded-lg">
            </div>
            <div className="w-full sm:w-2/3 flex flex-row p-2 items-center">
                <div className="w-full sm:w-80">
                    <h2 className="font-bold text-2xl">{title}</h2>
                    <p className="text-l mb-2">{description}</p>
                    {/* <p className="text-l">Jumlah Item</p> */}
                    
                </div>
            </div>
        </div>
    )
}
export default Card;