import React from "react";
function SubHeading(props){
    let title = props.title
    return(
        <h1 className="text-xl md:text-2xl font-bold">
            {title}
        </h1>
    )
}
export default SubHeading