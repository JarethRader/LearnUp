"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAudio = void 0;
const use_cases_1 = require("../use-cases");
const get_audio_1 = __importDefault(require("./get-audio"));
const getAudio = get_audio_1.default(use_cases_1.generateAudio);
exports.getAudio = getAudio;
const audioController = {
    getAudio
};
exports.default = audioController;
