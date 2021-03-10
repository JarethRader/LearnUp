import React from "react";
import DraggableTile from "../../components/tiles/draggableTile";
import CreateTileModal from "./utils/createTileModal";

import { LayoutProvider } from "../../context/layoutContext";

import { SquaredPlus } from "@styled-icons/entypo";

interface Props {}

const Layout = (props: Props) => {
  const [mouseDelta, setMouseDelta] = React.useState({ x: 0, y: 0 });
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    setMouseDelta({
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY,
    });
  };

  //   React.useEffect(() => {
  //     console.log(mouseDelta);
  //   }, [mouseDelta]);

  const [showCreate, setShowCreate] = React.useState(false);
  const toggleShowCreate = () => setShowCreate(!showCreate);

  return (
    <div>
      <LayoutProvider>
        <div>
          <div>{/* <DraggableTile tile={}> */}</div>
          <div className="h-screen w-full flex justify-center items-center flex-col pt-4">
            <h1 className="text-yellow-500 font-bold text-2xl">
              Create a New Layout
            </h1>
            <div className="flex justify-left w-1/2">
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
              className="bg-white w-11/12 h-11/12 rounded-xl shadow-xl  border-black border-4 mt-3"
              onMouseMove={(e) => handleMouseMove(e)}
            >
              <div className="w-0">
                {/* <DraggableTile
            tile={{ letters: "a", color: "bg-white" }}
            // delta={{ x: mouseDelta.x, y: mouseDelta.y }}
          /> */}
              </div>
            </div>
          </div>
        </div>
      </LayoutProvider>
    </div>
  );
};

export default Layout;
