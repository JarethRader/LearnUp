import React from "react";
import { Link, Redirect } from "react-router-dom";

import {
  getUserBoards,
  getBoard,
} from "../actions/whiteboardAPI/whiteboardActions";

import CreateBoardModal from "./createBoard/createBoardModal";

interface props {
  Navbar: (props: any) => JSX.Element;
}

import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../reducers/index";

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.user.isAuthenticated,
  userInfo: state.user.userInfo,
  ownBoards: state.whiteboard.ownBoards,
  sharedBoards: state.whiteboard.sharedBoards,
  userLoading: state.user.userLoading,
  whiteboardLoading: state.whiteboard.whiteboardLoading,
});

const mapDispatchToProps = {
  getUserBoards,
  getBoard,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & props;

const Dashboard = (props: Props) => {
  React.useEffect(() => {
    props.getUserBoards(props.userInfo.id);
  }, []);

  const handleLoadBoard = (
    event: React.MouseEvent<HTMLButtonElement>,
    board: IWhiteboardModel
  ) => {
    event.preventDefault();
    props.getBoard(board.whiteboard_id);
  };

  const [showModal, setShowModal] = React.useState(false);
  const toggleModal = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    setShowModal(!showModal);
  };

  if (!props.isAuthenticated) {
    return <Redirect to="/login" />;
  } else {
    return (
      <div className="min-h-screen">
        {showModal && (
          <CreateBoardModal
            toggleModal={toggleModal}
            userID={props.userInfo.id}
          />
        )}
        <div>
          <props.Navbar />
          <div className="flex justify-left mt-20 mx-10">
            <div className="">
              <h1 className="font-bold text-2xl">
                Hello {props.userInfo.username}!
              </h1>
              <h1 className="font-bold text-2xl text-blue-500">
                Welcome to your LearnUp Dashboard
              </h1>
            </div>
          </div>
          <div className="bg-gray-300 mx-20 my-8 py-8 px-10 rounded-xl border-2 border-black shadow-2xl">
            <div>
              <h1 className="font-bold text-xl underline">
                Your whiteboards. No one else can see this whiteboard, only you
                can make changes to it.
              </h1>
              <div className="py-4">
                {props.ownBoards[0] === undefined ? (
                  <p>You currently have no boards</p>
                ) : (
                  <div className="flex flex-col">
                    {props.ownBoards.map(
                      (board: IWhiteboardModel, index: number) => (
                        <div key={index} className="my-2">
                          <button
                            onClick={(e) => {
                              handleLoadBoard(e, board);
                            }}
                            key={index}
                            className="px-4 py-2 bg-orange-400 hover:bg-orange-500 rounded text-white text-lg font-semibold stroke shadow-xl focus:outline-none"
                          >
                            <Link to="/whiteboard">
                              <p>{board.boardName}</p>
                            </Link>
                          </button>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
            <div>
              <h1 className="font-bold text-xl underline">
                Whiteboards that have been shared with you
              </h1>
              <div className="py-4">
                {props.sharedBoards[0] === undefined ? (
                  <p>No boards are currently shared with you</p>
                ) : (
                  <div>
                    {props.sharedBoards.map(
                      (board: IWhiteboardModel, index: number) => (
                        <button
                          onClick={(e) => {
                            handleLoadBoard(e, board);
                          }}
                          key={index}
                          className="px-4 py-2 bg-orange-400 hover:bg-orange-500 rounded text-white text-lg font-semibold stroke shadow-xl focus:outline-none"
                        >
                          <Link to="/whiteboard">
                            <p>{board.boardName}</p>
                          </Link>
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>
              <div className="py-4">
                <h1 className="font-bold text-xl underline">
                  Create a new whiteboard
                </h1>
                <div className="py-4">
                  <button
                    onClick={(e) => toggleModal(e)}
                    className=" px-4 py-2 bg-orange-400 hover:bg-orange-500 rounded text-white text-lg font-semibold stroke shadow-xl focus:outline-none"
                  >
                    Create new board
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default connector(Dashboard);
