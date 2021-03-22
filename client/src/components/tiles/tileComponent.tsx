import React from "react";

const TileComponent = (props: any) => {
  const classNames = [
    props.tile.color,
    props.cursor ? "cursor-move" : "cursor-pointer",
    props.border ? props.border : "border-black hover:border-fuschia-500",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={`lg:px-2 px-1 lg:py-1 lg:m-1 text-center border-4 rounded-lg lg:text-md md:text-sm font-semibold shadow-xl focus:outline-none ${classNames} `}
    >
      <p>{props.tile.letters}</p>
    </div>
  );
};

export default TileComponent;
