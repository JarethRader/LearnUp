"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const buildAuthMiddleware = (envConfig) => {
    return Object.freeze({
        checkSignIn: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const accessToken = req.cookies.access;
                // Check for token
                if (!accessToken) {
                    return res.status(401).send("authorization denied");
                }
                else {
                    const userID = jsonwebtoken_1.default.verify(accessToken, envConfig["JWT_SECRET"]);
                }
                next();
            }
            catch (err) {
                next(err);
            }
        }),
    });
};
exports.default = buildAuthMiddleware;
