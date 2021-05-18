import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

const nodeEnv = process.env.NODE_ENV! as string;

interface IEnvironment {
  PORT: string;
  API_ROOT: string;
  SESS_LIFETIME: string;
  PUBLIC_PATH: string;
}

let envConfig: IEnvironment

const unwrapValue = (value: string | undefined, name: string): string => {
  if (value) {
    return value
  } else {
    throw new Error(`Missing environment value: ${name}`)
  }
}

const createConfig = (
  port: string | undefined,
  apiRoot: string | undefined,
  sessLifetime: string | undefined,
  publicPath: string | undefined,
): IEnvironment => {
  const PORT = unwrapValue(port, "PORT")
  const API_ROOT = unwrapValue(apiRoot, "API_ROOT")
  const SESS_LIFETIME = unwrapValue(sessLifetime, "SESS_LIFETIME")
  const PUBLIC_PATH = unwrapValue(publicPath, "PUBLIC_PATH")
  
  return {
    PORT,
    API_ROOT,
    SESS_LIFETIME,
    PUBLIC_PATH
  }
}

// TODO: figure out how versioning should be handled, probably not in the env since it's
// going to be based on individual routes and not the whole app
const apiRoot="/api/v1"
try {
  const parentEnv = createConfig(
    process.env.PORT,
    apiRoot,
    process.env.SESS_LIFETIME,
    process.env.PUBLIC_PATH
  )
  envConfig = parentEnv
} catch (error) {
  console.log(`Unable to load parent environment: ${error}. Attempting to load from fallback env file`)
  let envPath;
  switch (nodeEnv) {
    case "test":
      envPath = path.resolve(__dirname, "../../env/.env.test");
      break;
    case "production":
      envPath = path.resolve(__dirname, "../../env/.env.production");
      break;
    case "development":
      envPath = path.resolve(__dirname, "../../env/.env.development");
      break;
    case "docker":
      envPath = path.resolve(__dirname, "../../env/.env.docker");
      break;
    default:
      throw new Error("Specify the NODE_ENV variable");
  }
  const envVals = dotenv.parse(fs.readFileSync(envPath));
  const localConfig = createConfig(
    envVals["PORT"],
    apiRoot,
    envVals["SESS_LIFETIME"],
    envVals["PUBLIC_PATH"]
  )
  envConfig = localConfig
}

export default envConfig;
