import React from "react";
function Heading(props){
    let title = props.title
    return(
        <h1 className="text-3xl md:text-4xl font-bold">
            {title}
        </h1>
    )
}
export default Heading