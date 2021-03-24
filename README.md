# LearnUp

A website for LearnUp Centers to help teach dyslexic children how to read.
It is currently still in development.

## Installation

To run the application, clone this repository then follow the proceeding steps...

1. Client
   1. navigate to /client/
   2. install dependencies by running `npm install`
   3. build main css file by running `npm run css`
   4. start the react app by running `npm run start` 2. User Microservice
2. navigate each folder under /API/
   1. install dependencies by running `npm install`
   2. naviate to /API/UserMicroservice/env and create `.env.development`, copying the environment variables from the example file into it. You will need to connect a Mongo and Redis database to the service for it to run properly. You can use cloud solutions or use docker.
   3. start the node server by running `npm run start`

## Docker

If you want to run the app in docker, you can build the images with `docker-compose build`, and then run the app with `docker-compose up`.
