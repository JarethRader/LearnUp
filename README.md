# LearnUp

A website for LearnUp Centers to help teach dyslexic children how to read.
It is currently still in development.

## Installation

To run the application, clone this repository then follow the proceeding steps... 1. Client
1.1 navigate to /client/
1.2 install dependencies by running `npm install`
1.2 build main css file by running `npm run css`
1.3 start the react app by running `npm run start` 2. User Microservice
2.1 navigate to /API/UserMicroservice/
2.2 install dependencies by running `npm install`
2.3 naviate to /API/UserMicroservice/env and create `.env.development`, copying the environment variables from the example file into it. You will need to connect a Mongo and Redis database to the service for it to run properly. Currently how you do this is up to you. In the future I will probably end up implementing Docker or something, that will handle all this better.
2.4 start the node server by running `npm run start`
