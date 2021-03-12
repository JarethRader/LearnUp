import React from "react";

const TileComponent = (props: any) => {
  return (
    <div className="flex justify-center">
      <div
        className={`lg:px-2 px-1 lg:py-1 lg:m-1 text-center border-4 rounded-lg lg:text-md md:text-sm font-semibold shadow-xl focus:outline-none ${
          props.tile.color
        } ${props.cursor ? props.cursor : "cursor-pointer"} ${
          props.border ? props.border : "border-black hover:border-fuschia-500"
        }`}
      >
        <p>{props.tile.letters}</p>
      </div>
    </div>
  );
};

export default TileComponent;
