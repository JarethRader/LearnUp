import express from "express";
import fs from "fs";
import path from "path";
import envConfig from "./env";

import morgan from "morgan";
import helmet from "helmet";

import { getAudio } from "./controllers";
import MakeExpressCallback from "./expressCallback";

const app = express();

const port = process.env.PORT || 5002;

// http request logger
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

app.post(
  `${envConfig["API_ROOT"]}/audio/generate`,
  MakeExpressCallback(getAudio)
);

// app.post(`${envConfig["API_ROOT"]}/audio/generate`, async (req, res) => {
//   // get list of tiles from request
//   const tiles = req.body.tiles;
//   // separate the letters out from each element of the body
//   const letterList = tiles.map((element: any) => {
//     let acc: any = [];
//     acc = [...acc, element.tile.letters];
//     return acc;
//   });

//   // create new temporary audio file to store all pronunciations together
//   const pronounce = fs.createWriteStream(
//     path.join(__dirname, "./tempAudio/spoken.mp3")
//   );
//   // loop through each letter from the request, find its audio file, and append it to the tmp file we created above
//   while (letterList.length) {
//     try {
//       await appendAudioFiles(letterList.shift(), pronounce)
//         .then((success) => {
//           console.log("Appended");
//         })
//         .catch((err: Error) => {
//           throw new Error(err.message);
//         });
//     } catch (err) {
//       console.log(err);
//       throw new Error("Failed to generate audio");
//     }
//   }

//   console.log("Finished generating audio");

//   // // this works and returns an mp3 to the client
//   // // read in audio file
//   // const testAudio = fs.createReadStream(path.join(__dirname, './audio/a.mp3'));

//   // // create response with headers and stream mp3 to client
//   // testAudio.on('open', () => {
//   //     res.statusCode = 200;
//   //     res.setHeader("Accept-Ranges", "bytes");
//   //     res.setHeader('Content-Type', "audio/mpeg");
//   //     testAudio.pipe(res);
//   // }).on("end", () => {
//   //     res.end();
//   //     console.log("Done")
//   // })

//   res.sendStatus(200);
// });

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send({ error: "An unknown error occurred." });
  }
);

app.listen(port, () => console.log(`Audio API started on port ${port}`));

export default app;
