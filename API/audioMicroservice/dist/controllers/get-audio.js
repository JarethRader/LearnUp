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
Object.defineProperty(exports, "__esModule", { value: true });
const buildGetAudio = (generateAudio) => {
    const GetAudio = (request) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const audioFile = yield generateAudio(request.body.tiles);
            return {
                headers: {
                    "Accepted-Ranges": "bytes",
                    "Content-Type": "audio/mpeg",
                },
                statusCode: 200,
                audioFile: audioFile,
            };
        }
        catch (err) {
            return {
                headers: {
                    "Content-Type": "application/json",
                },
                statusCode: 400,
                body: {
                    error: err.message,
                },
            };
        }
    });
    return GetAudio;
};
exports.default = buildGetAudio;
