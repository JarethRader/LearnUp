"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const env_1 = __importDefault(require("./env"));
const auth_1 = __importDefault(require("./auth"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const controllers_1 = require("./controllers");
const expressCallback_1 = __importDefault(require("./expressCallback"));
const auth = auth_1.default(env_1.default);
const app = express_1.default();
const port = process.env.PORT || 5002;
// create tempAudio folder if it doens't exist
if (!fs_1.default.existsSync("./src/tempAudio")) {
    fs_1.default.mkdirSync("./src/tempAudio");
}
// http request logger
app.use(morgan_1.default(":method :url :status :res[content-length] - :response-time ms"));
// Middleware
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(helmet_1.default());
const corsOptions = cors_1.default({
    credentials: true,
    // origin: "*",
    origin: env_1.default["PUBLIC_PATH"],
    maxAge: parseInt(env_1.default["TIMETOLIVE"], 10),
});
app.options(env_1.default["PUBLIC_PATH"], corsOptions);
app.use(corsOptions);
app.use(cookie_parser_1.default(env_1.default["COOKIE_SECRET"]));
app.post(`${env_1.default["API_ROOT"]}/audio/generate`, auth.checkSignIn, expressCallback_1.default(controllers_1.getAudio));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: "An unknown error occurred." });
});
app.listen(port, () => console.log(`Audio API started on port ${port}`));
exports.default = app;
