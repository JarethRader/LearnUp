import React from "react";

const TileComponent = (props: any) => {
  return (
    <div className="flex justify-center">
      <div
        className={`px-2 py-1 m-1 text-center border-4 border-black hover:border-fuschia-500 cursor-pointer rounded-lg text-md font-semibold shadow-xl focus:outline-none ${props.tile.color}`}
      >
        <p>{props.tile.letters}</p>
      </div>
    </div>
  );
};

export default TileComponent;
