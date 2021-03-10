import React from "react";
import { Link, Redirect } from "react-router-dom";

import Board from "./whiteboard/board";

interface Props {}

const Whiteboard = (props: Props) => {
  return (
    <div>
      <div className="w-full min-h-screen flex items-center flex-col bg-gray-300 py-4">
        <div className="w-7/12 flex flex-col">
          <div className="flex self-center">
            <h1 className="text-yellow-500 font-bold text-5xl">
              Learning Board
            </h1>
          </div>
          <div className="flex flex-row justify-around py-2">
            <div className="flex self-center">
              <p className="text-xl font-semibold flex justify-center">
                Board Name
              </p>
            </div>
            <div>
              <button
                // onClick={(e) => toggleBoardSide(e)}
                className="px-4 py-2 mx-1 rounded bg-yellow-500 hover:bg-yellow-600 focus:outline-none text-white font-semibold stroke"
              >
                Flip Board
              </button>
              <Link to="/dashboard">
                <button className="px-4 py-2 mx-1 rounded bg-blue-500 hover:bg-blue-600 focus:outline-none text-white font-semibold stroke">
                  Dashboard
                </button>
              </Link>
            </div>
          </div>
        </div>
        <hr className="my-2" />
        <Board />
      </div>
    </div>
  );
};

export default Whiteboard;
