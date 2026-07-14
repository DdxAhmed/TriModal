import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, './.env') });

let rawURI = process.env.MONGODB_URI || process.env.MONGO_URI;

// Clean the URI from any potential quotes or whitespace pasted by the user in environment variables
const MONGODB_URI = rawURI ? rawURI.trim().replace(/^["']|["']$/g, '') : null;

export async function connectDB() {
  if (!MONGODB_URI) {
    console.error('ERROR: MONGODB_URI or MONGO_URI environment variable is not defined.');
    console.error('Please ensure the MongoDB connection string is set in your Environment Variables.');
    return false;
  }

  const maxRetries = 5;
  const retryDelay = 3000;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Connecting to MongoDB... (Attempt ${attempt}/${maxRetries})`);
      const maskedURI = MONGODB_URI.replace(/:([^@]+)@/, ':****@');
      console.log(`Using Connection URI: ${maskedURI}`);
      
      await mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
      });
      
      console.log('MongoDB connected successfully.');
      return true;
    } catch (error) {
      console.error(`MongoDB connection attempt ${attempt} failed:`, error.message);
      
      if (error.message.includes('querySrv ECONNREFUSED')) {
        console.error('DNS Resolution error. This often indicates the DNS server cannot resolve MongoDB Atlas SRV records, or there is a local firewall issue.');
      } else if (error.message.includes('IP') || error.message.includes('not allowed to connect')) {
        console.error('IP access error. Please verify that your MongoDB Atlas cluster has 0.0.0.0/0 allowed in its IP Access List.');
      } else if (error.message.includes('Authentication failed')) {
        console.error('Authentication failed. Please verify your MongoDB Atlas username and password.');
      }
      
      if (attempt < maxRetries) {
        console.log(`Waiting ${retryDelay / 1000}s before retrying...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }
  }

  console.error('All MongoDB connection attempts failed. The server will continue running to prevent Cloud Run 503 crash loops, but database operations will fail.');
  return false;
}

