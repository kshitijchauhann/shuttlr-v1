import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { auth } from "./lib/auth";

const app = new OpenAPIHono();

// 1. Global Middleware
app.use("*", logger());
app.use("*", cors());

// 2. Swagger UI for Custom Routes
app.get("/swagger", swaggerUI({ url: "/doc" }));

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Shuttlr API (Custom Endpoints)",
  },
});

// 3. Better Auth Mounting
// Better Auth has its own OpenAPI Reference UI generated automatically at /api/auth/reference
app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

// 4. Sample OpenAPI Route (Health Check)
const rootRoute = createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      content: {
        "text/plain": {
          schema: z.string().openapi({
            example: "Shuttlr API is running!",
          }),
        },
      },
      description: "Health Check Endpoint",
    },
  },
});

app.openapi(rootRoute, (c) => {
  return c.text("Shuttlr API is running!");
});

export default app;
