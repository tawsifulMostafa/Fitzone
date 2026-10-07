import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("FitZone");

export const auth = betterAuth({
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "member"
      }
    }
  },
  emailAndPassword: {
    enabled: true
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
