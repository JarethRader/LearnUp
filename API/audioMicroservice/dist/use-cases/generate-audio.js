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
const fs_1 = __importDefault(require("fs"));
const buildGenerateAudio = (extractLetters, generateTempFile, appendAudioFiles, sorted) => {
    const generateAudio = (tileList) => __awaiter(void 0, void 0, void 0, function* () {
        const sortTiles = sorted(tileList);
        const letters = extractLetters(sortTiles);
        const uniqueFileName = generateTempFile();
        // start write fileStream
        const fileStream = fs_1.default.createWriteStream(uniqueFileName);
        while (letters.length) {
            try {
                // @ts-ignore
                yield appendAudioFiles(letters.shift(), fileStream).catch((err) => {
                    throw new Error(err.message);
                });
            }
            catch (err) {
                throw new Error("Failed to generate audio");
            }
        }
        fileStream.end("Done");
        return uniqueFileName;
    });
    return generateAudio;
};
exports.default = buildGenerateAudio;
