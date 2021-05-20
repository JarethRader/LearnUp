"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
const nodeEnv = process.env.NODE_ENV;
let envPath;
switch (nodeEnv) {
    case 'test':
        envPath = path_1.default.resolve(__dirname, './.env.test');
        break;
    case 'production':
        envPath = path_1.default.resolve(__dirname, './.env.production');
        break;
    case 'development':
        envPath = path_1.default.resolve(__dirname, './.env.development');
        break;
    case 'docker':
        envPath = path_1.default.resolve(__dirname, './.env.docker');
        break;
    default:
        throw new Error('Specify the NODE_ENV variable');
}
const envConfig = dotenv_1.default.parse(fs_1.default.readFileSync(envPath));
exports.default = envConfig;
