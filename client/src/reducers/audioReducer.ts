const initialState: IAudioState = {
  audio: null,
  audioLoading: false,
};

export default function (
  state = initialState,
  action: AudioActionTypes
): IAudioState {
  switch (action.type) {
    case "GENERATE_AUDIO_SUCCESS":
      return {
        ...state,
        audio: action.payload,
        audioLoading: false,
      };
    case "GENERATE_AUDIO_FAILURE":
      return {
        ...state,
        audio: null,
        audioLoading: false,
      };
    case "AUDIO_LOADING":
      return {
        ...state,
        audioLoading: true,
      };
    default:
      return state;
  }
}
