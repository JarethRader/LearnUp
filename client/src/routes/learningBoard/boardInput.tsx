import React from "react";
import { Sound, Erase } from "@styled-icons/entypo";

import DraggableDisplayTile from "./draggableDisplayTile";

import { playAudio } from "../../actions/audioAPI/audioActions";

import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../reducers/index";

declare global {
  interface IBoardInputProps {
    handleResetWord: (event: React.MouseEvent<HTMLButtonElement>) => void;
    wordList: IWordList[];
    setInputBounds: React.Dispatch<React.SetStateAction<IBounds | undefined>>;
  }
}

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.user.isAuthenticated,
  audio: state.audio.audio,
});

const mapDispatchToProps = {
  playAudio,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & IBoardInputProps;

const BoardInput = (props: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    ref.current &&
      props.setInputBounds(ref.current.getBoundingClientRect() as any);
  }, []);

  const handlePlayAudio = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.playAudio(props.wordList);
  };

  React.useEffect(() => {
    if (props.audio) {
      // @ts-ignore
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const src = audioCtx.createBufferSource();
      audioCtx.decodeAudioData(props.audio, (decoded) => {
        // console.log(decoded);
        src.buffer = decoded;
        src.connect(audioCtx.destination);
        src.start(0);
      });
    }
  }, [props.audio]);

  return (
    <div className="flex flex-row">
      <div
        ref={ref}
        className="border-4 border-black rounded-xl w-5/6 h-5/6 shadow-2xl bg-white overflow-auto"
        style={{
          height: "15vh",
        }}
      >
        <div className="h-full flex items-start ">
          <div className="flex flex-row flex-wrap relative">
            {props.wordList.map((word, index: number) => (
              <div key={index} className="absolute">
                <DraggableDisplayTile word={word} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div>
          <button
            onClick={(e) => props.handleResetWord(e)}
            className="bg-blue-600 hover:bg-blue-500 m-1 p-1 rounded"
          >
            <Erase width="32" />
          </button>
        </div>
        <div>
          <button
            onClick={(e) => handlePlayAudio(e)}
            className="bg-yellow-600 hover:bg-yellow-500 m-1 p-1 rounded"
          >
            <Sound width="32" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default connector(BoardInput);
