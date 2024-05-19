import React from "react";
function NoData() {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full text-xl my-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="96"
        height="96"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M20 17.175L7.4 4.6L10 2h8q.825 0 1.413.588T20 4zm.5 6.125L15.2 18l1.425-1.4L20 19.975V20q0 .825-.587 1.413T18 22H6q-.825 0-1.412-.587T4 20V8l.6-.6L.7 3.5l1.425-1.4L21.9 21.875z"
        />
      </svg>
      <div className="mt-4">Tidak ada data...</div>
    </div>
  );
}
export default NoData;
