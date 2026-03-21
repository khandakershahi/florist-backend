import dotenv from 'dotenv';
import path from 'path';

const envFile = process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.local';

dotenv.config({ path: path.join(process.cwd(), envFile) });

export default {
    port: process.env.PORT || 5000,
    database_url: process.env.MONGODB_URI,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS || 12,
    jwt_secret: process.env.JWT_SECRET,
    jwt_expires_in: process.env.JWT_EXPIRES_IN,
    gemini_api_key: process.env.GEMINI_API_KEY,
};