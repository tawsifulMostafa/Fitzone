import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

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
      }, status: {
        type: "string",
        defaultValue: "active"
      },
    }
  },
  emailAndPassword: {
    enabled: true
  },
  plugins: [
    jwt({
      jwt: {
        definePayload: ({ user }) => ({
          userId: user.id
        }),
        expirationTime: "15m"
      }
    })
  ]
  ,
  database: mongodbAdapter(db, {
    client,
  }),
});
