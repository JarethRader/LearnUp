import Cookies from "universal-cookie";

export const config: any = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const USER_BASE =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://phonetics-learnup.com";

export const WHITEBOARD_BASE =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001"
    : "https://phonetics-learnup.com";

export const AUDIO_BASE =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5002"
    : "https://phonetics-learnup.com";

export const API_SUFFIX = "/api/v1";

export const setCSRF = async () => {
  return new Promise<boolean>(async (resolve, reject) => {
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
      .catch((err) => {
        reject();
      });
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
