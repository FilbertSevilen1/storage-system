import React from "react";
import "../../css/loading.css";
import Loading from "./Loading";
function LoadingFull() {
  return (
    <div className="fixed w-full h-full bg-overlay pt-28 left-0 top-0 z-50">
      <div className="w-full flex justify-center">
        <div className="w-20 h-20 bg-white shadow-md rounded-full flex justify-center items-center">
        <Loading></Loading>
        </div>

      </div>
    </div>
  );
}
export default LoadingFull;
