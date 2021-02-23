import {
  AUDIO_LOADING,
  GENERATE_AUDIO_SUCCESS,
  GENERATE_AUDIO_FAILURE,
} from "./types";

declare global {
  interface IAudioState {
    audio: any;
    audioLoading: boolean;
  }

  interface LoadingAudioAction {
    type: typeof AUDIO_LOADING;
    payload?: null;
  }

  interface generateAudioSuccess {
    type: typeof GENERATE_AUDIO_SUCCESS;
    payload: any;
  }

  interface generateAudioFailure {
    type: typeof GENERATE_AUDIO_FAILURE;
    payload: null;
  }

  type generateAudioActionTypes = generateAudioSuccess | generateAudioFailure;

  type AudioActionTypes = LoadingAudioAction | generateAudioActionTypes;
}
