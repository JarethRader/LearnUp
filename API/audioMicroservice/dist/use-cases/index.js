"use strict";
/// <reference path='../types/index.d.ts' />
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAudio = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const generate_audio_1 = __importDefault(require("./generate-audio"));
const extractLetters = (tileList) => {
    let letterList = [];
    tileList.map((element) => {
        letterList = [...letterList, element.tile.letters];
    });
    return letterList;
};
const generateTempFile = () => path_1.default.join(__dirname, `../tempAudio/${uuid_1.v1()}.mp3`);
const appendAudioFiles = (letters, fileStream) => {
    return new Promise((resolve, reject) => {
        const currentFile = path_1.default.join(__dirname, `../audio/${letters}.mp3`);
        const stream = fs_1.default.createReadStream(currentFile);
        stream.pipe(fileStream, { end: false });
        stream.on("end", () => {
            resolve(true);
        });
    });
};
const sortTiles = (tileList) => tileList.sort((a, b) => Math.hypot(a.delta.x, a.delta.y) - Math.hypot(b.delta.x, b.delta.y));
const generateAudio = generate_audio_1.default(extractLetters, generateTempFile, appendAudioFiles, sortTiles);
exports.generateAudio = generateAudio;
const audioServices = Object.freeze({
    generateAudio,
});
exports.default = audioServices;
