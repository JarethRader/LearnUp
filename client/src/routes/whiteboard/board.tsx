import React from "react";

interface Props {}

const Board = (props: Props) => {
  return (
    <div className="h-auto 2xl:w-9/12 xl:10/12 md:w-11/12 border-4 border-black rounded-xl bg-gray-100 shadow-xl p-4">
      <div className="">Board</div>
    </div>
  );
};

export default Board;
