import React from "react";

export default function Die(props) {
  return (
    <div
      className={`flex justify-center items-center p-5 border text-2xl shadow-[0px_2px_2px_rgba(0,0,0,0.15)] rounded-lg cursor-pointer ${
        props.isHeld ? "bg-[#59E391]" : "bg-white"
      }`}
      onClick={props.holdDice} // Add onClick handler
    >
      <h2 className="font-bold">{props.value}</h2>
    </div>
  );
}
