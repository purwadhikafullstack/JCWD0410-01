import { config } from 'dotenv';
import { resolve } from 'path';

export const NODE_ENV = process.env.NODE_ENV || 'development';

const envFile = '.env';

config({ path: resolve(__dirname, `../${envFile}`) });

// Load all environment variables from .env file

export const PORT = process.env.PORT || 8000;
export const DATABASE_URL = process.env.DATABASE_URL || '';
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_SECRET_PASSWORD = process.env.JWT_SECRET_PASSWORD;
export const JWT_SECRET_EMAIL = process.env.JWT_SECRET_EMAIL;
export const BASE_URL_FE = process.env.BASE_URL_FE;
export const GMAIL_EMAIL = process.env.GMAIL_EMAIL;
export const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const MIDTRANS_MERCHANT_ID = process.env.MIDTRANS_MERCHANT_ID;
export const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY;
export const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
