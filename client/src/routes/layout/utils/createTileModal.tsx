import React from "react";
const tileset: {
  tiles: [{ letters: string; color: string }];
} = require("../../../components/tiles/defaultTileSets/tileSet.json");
import TileComponent from "../../../components/tiles/tileComponent";

import { useLayout } from "../../../context/layoutContext";

import { Cross } from "@styled-icons/entypo";

interface ICreateTileModal {
  toggleModal: () => void;
}

const CreateTileModal = (props: ICreateTileModal) => {
  const { state, dispatch } = useLayout();

  const [search, setSearch] = React.useState("");

  const findTile = (letters: string) => {
    const foundTile = tileset.tiles.find((tile) => tile.letters === letters);
    foundTile
      ? dispatch({
          type: "SET_TILE",
          payload: foundTile,
        })
      : dispatch({
          type: "CLEAR_TILE",
        });
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    props.toggleModal();
    dispatch({
      type: "CLEAR_TILE",
    });
  };

  React.useEffect(() => {
    findTile(search);
  }, [search]);

  return (
    <div className="bg-white p-2 rounded-lg border-black border-2 shadow-xl absolute">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="letters"
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-200 rounded-lg p-1"
        />
        <button
          onClick={(e) => handleClose(e)}
          className="bg-red-500 hover:bg-red-700 rounded-md cursor-pointer focus:outline-none ml-1"
        >
          <Cross width="36" />
        </button>
      </div>
      <div className="flex justify-left">
        {state.selectedTile && <TileComponent tile={state.selectedTile} />}
      </div>
    </div>
  );
};

export default CreateTileModal;
