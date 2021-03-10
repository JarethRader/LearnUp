import React from "react";
import CreateTileModal from "./utils/createTileModal";
import TileComponent from "../../components/tiles/tileComponent";
import DraggableDisplayTile from "../../components/tiles/draggableDisplayTile";

import { useLayout } from "../../context/layoutContext";

import { SquaredPlus } from "@styled-icons/entypo";

interface Props {}

const Layout = (props: Props) => {
  const { state, dispatch } = useLayout();

  const [showCreate, setShowCreate] = React.useState(false);
  const toggleShowCreate = () => setShowCreate(!showCreate);

  const LayoutRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    console.log(LayoutRef.current?.getBoundingClientRect());
    dispatch({
      type: "SET_OFFSET",
      payload: {
        x: LayoutRef.current?.getBoundingClientRect().x,
        y: LayoutRef.current?.getBoundingClientRect().y,
      },
    });
  }, []);

  return (
    <div>
      <div>
        <div className="h-screen w-full flex justify-center items-center flex-col pt-4">
          <h1 className="text-yellow-500 font-bold text-2xl">
            Create a New Layout
          </h1>
          <div className="flex justify-left w-1/2 mb-2">
            <button
              className="text-blue-500 hover:text-blue-700 cursor-pointer focus:outline-none"
              title="Add a new tile"
              onClick={toggleShowCreate}
            >
              <SquaredPlus size="36" />
            </button>
            {showCreate && <CreateTileModal toggleModal={toggleShowCreate} />}
          </div>
          <div
            className="bg-white w-11/12 h-11/12 rounded-xl shadow-xl  border-black border-4"
            ref={LayoutRef}
          >
            {state.tileList.map((tile) => (
              <div className="relative flex h-0 w-0">
                <DraggableDisplayTile tile={tile.tile} delta={tile.delta} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
