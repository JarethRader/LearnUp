# Application Architecture

This describes the structure of the whole project in hopes that it will help any future developer understand how all the code works together and to help learn how the app as a whole works faster.

## Tech stack

### Client-Side

Stack: ReactJS, babel and webpack; TailwindCSS, React-Router-Dom, Typescript

Scripts:

1. start - Runs react app on webpack dev server
2. dev - Creates a development version of the react App, outputs to ./dist
3. build - Creates a production version of the React app, outputs to ./build
4. analyze - Runs webpack with BundleAnalyzerPlugin to see how large the dependencies after building the project
5. css - compiles tailwindcss and outputs to ./src/style.css; I don't like saving this css file to github because it is usually 40k lines long if it isn't minified

### Server-Side

**User API**

Stack: NodeJS, ExpressJS, MongoDB, Mongoose, typescript, Jest

Scripts:

1. state - Start the User API server 
2. build - Compile with typescript (This probably isn't very useful. You should ever compile or minify serverside code as it makes it harder to modify in the future)
3. test - Run jest tests

**Whiteboard API**

Stack: NodeJS, ExpressJS, MongoDB, Mongoose, typescript, Jest

Scripts:

1. state - Start the User API server
2. build - Compile with typescript
3. test - Run jest tests

## Server Overview

This applicaiton uses a microserver based architecture. The API is segmented into different groups depending on the data it deals with, and those groups each have their own Nodejs server. Each API server is built following Uncle Bob's Clean Architecture design philosphy; the main idea is that 'code dependencies can only move from the outer levels inward.' This means that dependencies are injected from the top level downwards; this should make updating dependencies if they become unsupported or changing implementations for helper funtctions a lot easier, and should not break anything other than the code you're actively working on. This in theory will also help with debugging code, since it should be intuitive to quicjly pinpoint exactly which code has broken.

## Folder Structure

```
Learnup
|   README.md - Basic introduction to the repository and resources used, how to get started with runing the application
|   ARCHITECTURE.md - Explains the tech stack and folder structure used
|   **client**
|   |
|   └── Top level contains configuration files for webpack, babel, tailwindcss, postcss, typescript, docker...
|   |
|   └── **assets** - containes .ejs template for generating index.html with webpack for development and production builds
|   |
|   └── **public** - contained index.html, this is only used for development, and is the main entry point for the frontend app
|   |
|   └── **tailwind** - contains tailwind.css for adding custom css rules, if this is changed you must run ```npm run css``` to updated styles.css
|   |
|   └── **src** - contains all the .jsx/.tsx files that build up the front end.
|   |   |
|   |   └── App.tsx - Top level of the React app
|   |   |
|   |   └── index.tsx - entry point for the react app; this is what index.html loads
|   |   |
|   |   └── **actions** - contains redux actions for interaction with the API and updating the redux store
|   |   |   |
|   |   |   └── **types** - defines redux aciton types as well as typescript types for each API
|   |   |   |
|   |   |   └── **userAPI** - actions for interacting with the user API
|   |   |   |
|   |   |   └── **whiteboardAPI** - actions for interacting with the whiteboard API
|   |   |   |
|   |   |   └── **utils** - utility functions for making HTTP requests to the API (setting up cookies for authentication, cors, and CSRF)
|   |   |
|   |   └── **components** - contains .jsx/.tsx elements that are reused multiple times on the top level of the app
|   |   |
|   |   └── **context** - contains context elements for React Context API
|   |   |
|   |   └── **reducers** - contains reducers for modifying the redux store locally
|   |   |   |
|   |   |   └── index - combines all separate reducers and export it for the app to subscribe to
|   |   |
|   |   └── **routes** - contains different pages you can navigate to on the frontend, along with sub folders with individual components used by the different pages
|   |   |   |
|   |   |   └── **authentication** - contains login and registration forms
|   |   |   |
|   |   |   └── **createBoard** - contains the Create Board modal accessible form the dashboard
|   |   |   |
|   |   |   └── **learningBoard** - contains all the relavent components for making the whiteboard interface
|
└── API
|   └── **UserMicroService** (This handles use registration, login, updates, deletions, and to get user information)
|   |   |
|   |   └── __test__ - contains Jest test related utility functions
|   |   |
|   |   └── **src** -- All the code related to the actual API server
|   |   |   |
|   |   |   └── server.ts - main entry point for the microserver
|   |   |   |
|   |   |   └── **auth** - check if the user making a request is authenticated by checking for an authentication cookie
|   |   |   |
|   |   |   └── **cache** - handles cacheing session cookies in redis
|   |   |   |
|   |   |   └── **controllers** - 
|   |   |   |
|   |   |   └── **cookie** - sets authentication and CSRF cookies
|   |   |   |
|   |   |   └── **data-access** - defines methods for accessing the Mongo Database (insert, remove, updated, findOneByID, findOneByEmail)
|   |   |   |
|   |   |   └── **db** - defines the MongoDB schema and the schema to connect to
|   |   |   |
|   |   |   └── **env** - creates the proper environment variables depending on the build type (development, test, production)
|   |   |   |
|   |   |   └── **express-callback** - handles sending request data to the controller, and building a standardized response to send back to the client
|   |   |   |
|   |   |   └── **Id** - middleware for creating collisonless UID's and verifying UID's
|   |   |   |
|   |   |   └── **types** - define all the typescript interfaces and types used throughout the code
|   |   |   |
|   |   |   └── **use-cases** - contains the business logic for modifying the user data stored on Mongo
|   |   |   |
|   |   |   └── **user** - defines the object structure that the API works with
|   |
|   └── **WhiteboardMicroservice** (This handles persisting learning board states; Initial save, update, delete, and getting saved states from the past)
|   |   |
|   |   └── (Similar structure to the UserMicroservice seen above)
|   |
|   └── **AudioMicroservice** (This handles generating the audio that is played from the Learning Board input)
|   |   |
|   |   └── (Similar structure to the UserMicroservice seen above)
|   |
|   └── **SignallingServer** (This is a websocker server that helps set up the WebRTC connection between browsers)
|   |   |
|   |   └── **src** - All the code related to server
|   |   |   |
|   |   |   └── server.ts - main entry point for the server
|   |   |   |
|   |   |   └── **broadcast** - defines broadcast functions for websocket, for sending messages to one user, and to all users
|   |   |   |
|   |   |   └── **messages** - defines all functions for handling different messages recieved by the socket server
|   |   |   |
|   |   |   └── **types** - defines all types for typescript
|   |   |   |
|   |   |   └── **users** - temporarily stores users that are connected, and will send their info to other connecting peers (This could potentially use redis or memcached, but I'm not sure how much more optimal that would be)
```