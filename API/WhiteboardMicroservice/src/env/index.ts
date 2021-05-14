import path from "path";
import fs from "fs";
import dotenv from "dotenv";

interface IEnvironment {
  PORT: string;
  POSTGRES_URI: string;
  PUBLIC_PATH: string;
  SESS_LIFETIME: string;
  SESS_SECRET: string;
  SESS_NAME: string;
  COOKIE_SECRET: string;
  API_ROOT: string;
}

const nodeEnv = process.env.NODE_ENV! as string;

let envConfig: IEnvironment

const unwrapValue = (value: string | undefined, name: string): string => {
  if (value) {
    return value
  } else {
    throw new Error(`Missing environment value: ${name}`)
  }
}

const createConfig = (
  whiteboardPort: string | undefined,
  postgresURI: string | undefined,
  publicPath: string | undefined,
  sessLifetime: string | undefined,
  sessSecret: string | undefined,
  sessName: string | undefined,
  cookieSecret: string | undefined,
  apiRoot: string | undefined
): IEnvironment => {
  const PORT = unwrapValue(whiteboardPort, "PORT")
  const POSTGRES_URI = unwrapValue(postgresURI, "POSTGRES_URI")
  const PUBLIC_PATH = unwrapValue(publicPath, "PUBLIC_PATH")
  const SESS_LIFETIME = unwrapValue(sessLifetime, "SESS_LIFETIME")
  const SESS_SECRET = unwrapValue(sessSecret, "SESS_SECRET")
  const SESS_NAME = unwrapValue(sessName, "SESS_NAME")
  const COOKIE_SECRET = unwrapValue(cookieSecret, "COOKIE_SECRET")
  const API_ROOT = unwrapValue(apiRoot, "API_ROOT")
  
  return {
    PORT,
    POSTGRES_URI,
    PUBLIC_PATH,
    SESS_LIFETIME,
    SESS_SECRET,
    SESS_NAME,
    COOKIE_SECRET,
    API_ROOT
  }
}

// TODO: figure out how versioning should be handled, probably not in the env since it's
// going to be based on individual routes and not the whole app
const apiRoot="/api/v1"
try {
  const parentEnv = createConfig(
    process.env.PORT,
    process.env.POSTGRES_URI,
    process.env.PUBLIC_PATH,
    process.env.SESS_LIFETIME,
    process.env.SESS_SECRET,
    process.env.SESS_NAME,
    process.env.COOKIE_SECRET,
    apiRoot
  )
  envConfig = parentEnv
} catch (error) {
  console.log(`Unable to load parent environment: ${error}. Attempting to load from fallback env file`)
  let envPath;
  switch (nodeEnv) {
    case "test":
      envPath = path.resolve(__dirname, "./.env.test");
      break;
    case "production":
      envPath = path.resolve(__dirname, "./.env.production");
      break;
    case "development":
      envPath = path.resolve(__dirname, "./.env.development");
      break;
    case "docker":
      envPath = path.resolve(__dirname, "./.env.docker");
      break;
    default:
      throw new Error("Specify the NODE_ENV variable");
  }
  const envVals = dotenv.parse(fs.readFileSync(envPath));
  const localConfig = createConfig(
    envVals["PORT"],
    envVals["POSTGRES_URI"],
    envVals["PUBLIC_PATH"],
    envVals["SESS_LIFETIME"],
    envVals["SESS_SECRET"],
    envVals["SESS_NAME"],
    envVals["COOKIE_SECRET"],
    apiRoot
  )
  envConfig = localConfig
}

export default envConfig;
