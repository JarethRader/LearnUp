"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buildCookieConfig = (envConfig) => {
    const cookieConfig = {
        /* tslint:disable */
        maxAge: parseInt(envConfig["SESS_LIFETIME"], 10),
        sameSite: true,
        secure: envConfig["NODE_ENV"] === "production" ? true : false,
    };
    return cookieConfig;
};
exports.default = buildCookieConfig;
