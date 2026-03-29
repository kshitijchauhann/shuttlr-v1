import { auth } from "./src/lib/auth";

async function create() {
    try {
        const res1 = await auth.api.signUpEmail({
            headers: new Headers(),
            body: {
                email: "test1@shuttlr.com",
                password: "Password123!",
                name: "Test User 1",
                username: "testuser1",
            },
        });
        console.log("Created user 1:", res1);

        const res2 = await auth.api.signUpEmail({
            headers: new Headers(),
            body: {
                email: "test2@shuttlr.com",
                password: "Password123!",
                name: "Test User 2",
                username: "testuser2",
            },
        });
        console.log("Created user 2:", res2);
    } catch (error) {
        console.error("Failed to create user:", error);
    }
}

create();
