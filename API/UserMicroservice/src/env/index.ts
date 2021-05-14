import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

interface IEnvironment {
  PORT: string;
  MONGO_URI: string;
  API_ROOT: string;
  REDIS_HOST: string;
  REDIS_PORT: string;
  REDIS_PASSWORD: string;
  SESS_LIFETIME: string;
  SESS_SECRET: string;
  SESS_NAME: string;
  COOKIE_SECRET: string;
  PUBLIC_PATH: string;
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
  port: string | undefined,
  mongoURI: string | undefined,
  apiRoot: string | undefined,
  redisHost: string | undefined,
  redisPort: string | undefined,
  redisPassword: string | undefined,
  sessLifetime: string | undefined,
  sessSecret: string | undefined,
  sessName: string | undefined,
  cookieSecret: string | undefined,
  publicPath: string | undefined
): IEnvironment => {
  const PORT = unwrapValue(port, "PORT")
  const MONGO_URI = unwrapValue(mongoURI, "MONGO_URI")
  const API_ROOT = unwrapValue(apiRoot, "API_ROOT")
  const REDIS_HOST = unwrapValue(redisHost, "REDIS_HOST")
  const REDIS_PORT = unwrapValue(redisPort, "REDIS_PORT")
  const REDIS_PASSWORD = unwrapValue(redisPassword, "REDIS_PASSWORD")
  const SESS_LIFETIME = unwrapValue(sessLifetime, "SESS_LIFETIME")
  const SESS_SECRET = unwrapValue(sessSecret, "SESS_SECRET")
  const SESS_NAME = unwrapValue(sessName, "SESS_NAME")
  const COOKIE_SECRET = unwrapValue(cookieSecret, "COOKIE_SECRET")
  const PUBLIC_PATH = unwrapValue(publicPath, "PUBLIC_PATH")
  
  return {
    PORT,
    MONGO_URI,
    API_ROOT,
    REDIS_HOST,
    REDIS_PORT,
    REDIS_PASSWORD,
    SESS_LIFETIME,
    SESS_SECRET,
    SESS_NAME,
    COOKIE_SECRET,
    PUBLIC_PATH
  }
}

// TODO: figure out how versioning should be handled, probably not in the env since it's
// going to be based on individual routes and not the whole app
const apiRoot="/api/v1"

try {
  const parentEnv = createConfig(
    process.env.PORT,
    process.env.MONGO_URI,
    apiRoot,
    process.env.REDIS_HOST,
    process.env.REDIS_PORT,
    process.env.REDIS_PASSWORD,
    process.env.SESS_LIFETIME,
    process.env.SESS_SECRET,
    process.env.SESS_NAME,
    process.env.COOKIE_SECRET,
    process.env.PUBLIC_PATH
  )
  envConfig = parentEnv
} catch (error) {
  console.log(`Unable to load parent environment: ${error}. Attempting to load from fallback env file`)
  let envPath;
  switch (nodeEnv) {
    case 'test':
      envPath = path.resolve(__dirname, './.env.test');
      break;
    case 'production':
      envPath = path.resolve(__dirname, './.env.production');
      break;
    case 'development':
      envPath = path.resolve(__dirname, './.env.development');
      break;
    case 'docker':
      envPath = path.resolve(__dirname, './.env.docker');
      break;
    default:
      throw new Error('Specify the NODE_ENV variable');
  }
  const envVals = dotenv.parse(fs.readFileSync(envPath));
  const localConfig = createConfig(
    envVals["PORT"],
    envVals["MONGO_URI"],
    apiRoot,
    envVals["REDIS_HOST"],
    envVals["REDIS_PORT"],
    envVals["REDIS_PASSWORD"],
    envVals["SESS_LIFETIME"],
    envVals["SESS_SECRET"],
    envVals["SESS_NAME"],
    envVals["COOKIE_SECRET"],
    envVals["PUBLIC_PATH"]
  )
  envConfig = localConfig
}

export default envConfig;
