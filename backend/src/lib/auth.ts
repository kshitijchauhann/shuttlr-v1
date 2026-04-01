import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import { username, openAPI } from "better-auth/plugins";
import * as schema from "../db/schema/auth";
import { generateUsername } from "./username";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
    }),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        username(),
        openAPI()
    ],
    databaseHooks: {
        user: {
            create: {
                before: async (user) => {
                    const generatedUsername = generateUsername(user.name);
                    return {
                        data: {
                            ...user,
                            username: generatedUsername
                        }
                    }
                }
            }
        }
    }
});
