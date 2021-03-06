import React from "react";
import CreateTileModal from "./utils/createTileModal";
import DraggableDisplayTile from "./tiles/draggableDisplayTile";

import { useLayout } from "../../context/layout/layoutContext";

import { SquaredPlus } from "@styled-icons/entypo";

interface Props {}

// TODO: add a way to remove tiles from the layout
const Layout = (props: Props) => {
  const { state, dispatch } = useLayout();

  const [showCreate, setShowCreate] = React.useState(false);
  const toggleShowCreate = () => setShowCreate(!showCreate);

  const LayoutRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    dispatch({
      type: "SET_OFFSET",
      payload: {
        x: LayoutRef.current?.getBoundingClientRect().x,
        y: LayoutRef.current?.getBoundingClientRect().y,
        width: LayoutRef.current?.getBoundingClientRect().width,
        height: LayoutRef.current?.getBoundingClientRect().height,
      },
    });
  }, []);

  return (
    <div className="h-screen w-full flex justify-center items-center flex-col py-4">
      <h1 className="text-yellow-500 font-bold text-2xl">
        Create a New Layout
      </h1>
      <div className="flex justify-left w-1/2 mb-6">
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
        ref={LayoutRef}
        className="flex flex-1 w-11/12 bg-white rounded-xl shadow-xl  border-black border-4 my-4"
      >
        {state.tileList.map((tile) => (
          <div className="relative flex h-0 w-0">
            <DraggableDisplayTile tile={tile} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Layout;
