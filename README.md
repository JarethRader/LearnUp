# LearnUp

A website for LearnUp Centers to help teach dyslexic children how to read.
It is currently still in development.

## Environment Variables 
Each microservice can be run in isolation by specifying the environment vars needed for that particualar service. The neccessary values can be found in src/env/.env.example of each service.

When using docker you must pass all the environment values for the docker-compose file. It is best to create an environment file that is passed to docker-compose with the --env-file argument. The neccessary values can be found in /config-example/.env.dev. An example of how to do this can be found below.

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

If you want to run the app in docker, you can build and run the images with docker-compose. When doing so you must specify the environment values that will be used.

Build: 
docker-compose --env-file config-example/.env.dev build

Run: 
docker-compose --env-file config-example/.env.dev up

You should not store your real config in source control. The config-example/.env.dev file shows what environment values are needed. 

## Traefik

For reverse proxy we are using Traefik. Instead of adding the configuation to the docker-compose.yml file we have a separate file that focuses solely on the Traefik configuation. This helps keep things a bit cleaner since Traefik is just an implementation detail for the server.

In order to run with Traefik you can specify the two docker-compose files to merge them together: 

docker-compose -f docker-compose.yml -f docker-compose-traefik.yml --env-file config-example/.env.dev up
