import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import auth from "./routes/auth";

const app = new Hono();

// 1. Global Middleware
app.use("*", logger());
app.use("*", cors());

// 2. Route Mounting
app.route("/auth", auth);

// 3. Health Check / Root
app.get("/", (c) => {
  return c.text("Shuttlr API is running!");
});

export default app;
