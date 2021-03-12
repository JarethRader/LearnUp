import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { RootState } from "../../reducers/index";

import generateAudioHelper from "./functions/generateAudio";

import { AUDIO_BASE, API_SUFFIX, CSRFConfig } from "../utils/config";

const AUDIO_API = AUDIO_BASE + API_SUFFIX;

/**
 *  {
 *  index
 * }
 */

interface audioBody {
  index: number;
  tile: {
    letters: string;
  };
}

// export const playAudio = (wordList: IWordList[]): AudioThunk => async (
//   dispatch: ThunkDispatch<RootState, void, Action>
// ) => {
//   dispatch({ type: "AUDIO_LOADING" });

//   try {
//     let filteredList: audioBody[] = [];
//     wordList.map((word: IWordList) => {
//       filteredList = [
//         ...filteredList,
//         { index: word.index, tile: { letters: word.tile.letters } },
//       ];
//     });
//     await generateAudioHelper({ tiles: filteredList }, AUDIO_API, CSRFConfig)
//       .then((response) => {
//         dispatch({
//           type: "GENERATE_AUDIO_SUCCESS",
//           payload: response,
//         });
//       })
//       .catch((err) => {
//         throw new Error(err.message);
//       });
//   } catch (err) {
//     // console.log(err);
//     dispatch({ type: "GENERATE_AUDIO_FAILURE" });
//   }
// };

export function setAudioLoading(): AudioActionTypes {
  return {
    type: "AUDIO_LOADING",
  };
}
