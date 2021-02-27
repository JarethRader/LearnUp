/**
 * @description These are the redux action types. While it is possible to use strings instead of defining constants, I like to have a reference of all the action types I'm using in one file.
 */

// USER API types
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const USER_LOADING = "USER_LOADING";
export const AUTH_ERROR = "AUTH_ERROR";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";
export const USER_LOADED = "USER_LOADED";
export const GET_SELF_SUCCESS = "GET_SELF_SUCCESS";
export const GET_SELF_FAILED = "GET_SELF_FAILED";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILED = "DELETE_USER_FAILED";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

//WHITEBOARD API types
export const UPLOAD_BOARD_SUCCESS = "UPLOAD_BOARD_SUCCESS";
export const UPLOAD_BOARD_FAILURE = "UPLOAD_BOARD_FAILURE";
export const UPDATE_BOARD_SUCCESS = "UPDATE_BOARD_SUCCESS";
export const UPDATE_BOARD_FAILURE = "UPDATE_BOARD_FAILURE";
export const GET_BOARD_SUCCESS = "GET_BOARD_SUCCESS";
export const GET_BOARD_FAILURE = "GET_BOARD_FAILURE";
export const DELETE_BOARD_SUCCESS = "DELETE_BOARD_SUCCESS";
export const DELETE_BOARD_FAILURE = "DELETE_BOARD_FAILURE";
export const SET_CURRENT_BOARD = "SET_CURRENT_BOARD";
export const CLEAR_CURRENT_BOARD = "CLEAR_CURRENT_BOARD";
export const BOARD_STATE_LOADING = "BOARD_STATE_LOADING";

//AUDIO API types
export const AUDIO_LOADING = "AUDIO_LOADING";
export const GENERATE_AUDIO_SUCCESS = "GENERATE_AUDIO_SUCCESS";
export const GENERATE_AUDIO_FAILURE = "GENERATE_AUDIO_FAILURE";

// ERROR types
export const GET_ERRORS = "GET_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
