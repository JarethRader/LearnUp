import Cookies from "universal-cookie";

export const config: any = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const PUBLIC_PATH =
  process.env.NODE_ENV === "production"
    ? "https://phonics-learningboard.jarethrader.com/"
    : "http://localhost";
// const PUBLIC_PATH = "http://localhost";

// TODO: figure out how we want to handle fallback urls
fix this
export const USER_BASE = process.env.REACT_APP_USER_BASE_URL ?? "http://localhost:5000"
export const WHITEBOARD_BASE = process.env.REACT_APP_WHITEBOARD_BASE_URL ?? "http://localhost:5001"
export const AUDIO_BASE = process.env.REACT_APP_AUDIO_BASE_URL ?? "http://localhost:5002"

export const API_SUFFIX = "/api/v1";

export const setCSRF = async () => {
  return new Promise<boolean>(async (resolve, reject) => {
    if (localStorage.getItem("csrfToken")) {
      resolve(true);
    } else {
      await fetch(USER_BASE + API_SUFFIX + "/user/", {
        method: "GET",
        headers: config,
        credentials: "include",
      })
        .then(async (response) => {
          const cookies = new Cookies();
          if (cookies.getAll()["CSRF-Token"]) {
            localStorage.setItem("csrfToken", cookies.getAll()["CSRF-Token"]);
            resolve(true);
          }
        })
        .catch((err) => reject());
    }
  });
};

export const CSRFConfig: () => {
  Accept: string;
  "Content-Type": string;
  "CSRF-Token": string | null;
} = () => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "CSRF-Token": localStorage.getItem("csrfToken"),
  };
  return headers;
};

export default config;
