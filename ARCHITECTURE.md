# Application Architecture

This describes the structure of the whole project in hopes that it will help any future developer understand how all the code works together and to help learn how the app as a whole works faster.

## Tech stack

**Client-Side**
Stack: ReactJS, babel and webpack; TailwindCSS, React-Router-Dom, Typescript
scripts: 1. start - Runs react app on webpack dev server 2. dev - Creates a development version of the react App, outputs to ./dist 3. build - Creates a production version of the React app, outputs to ./build 4. analyze - Runs webpack with BundleAnalyzerPlugin to see how large the dependencies after building the project 5. css - compiles tailwindcss and outputs to ./src/style.css; I don't like saving this css file to github because it is usually 40k lines long if it isn't minified
**Server-Side**
User API:
Stack: NodeJS, ExpressJS, MongoDB, Mongoose, typescript, Jest
Scripts: 1. state - Start the User API server 2. build - Compile with typescript (This probably isn't very useful. You should ever compile or minify serverside code as it makes it harder to modify in teh future) 3. test - Run jest tests
Whiteboard API:
Stack: NodeJS, ExpressJS, MongoDB, Mongoose, typescript, Jest
Scripts: 1. state - Start the User API server 2. build - Compile with typescript 3. test - Run jest tests

## Server Overview

This applicaiton uses a microserver based architecture. The API is segmented into different groups depending on the data it deals with, and those groups each have their own Nodejs server. Each API server is built following Uncle Bob's Clean Architecture design philosphy; the main idea is that 'code dependencies can only move from the outer levels inward.' This means that dependencies are injected from the top level downwards; this should make updating dependencies if they become unsupported or changing implementations for helper funtctions a lot easier, and should not break anything other than the code you're actively working on.

## Folder Structure

Learnup
| - client
| | - React App
| | - API
| | - UserMicroService (This handles use registration, login, updates, deletions, and to get user information)
| | - WhiteboardMicroservice (This handles persisting learning board states; Initial save, update, delete, and getting saved states from the past)
| | - AudioMicroservice (This handles generating the audio that is played from the Learning Board input) - still a WIP
