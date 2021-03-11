import React from "react";
import DraggableDisplayTile from "../../components/tiles/draggableDisplayTile";

interface Props {}

const frontTileSet = require("../../components/tiles/defaultTileSets/front.json");

const Board = (props: Props) => {
  return (
    <div className="flex flex-1 bg-white rounded-xl shadow-xl  border-black border-4 ">
      {frontTileSet.tiles.map((tile: any) => (
        <div className="relative flex h-0 w-0">
          <DraggableDisplayTile tile={tile} />
        </div>
      ))}
    </div>
  );
};

export default Board;
