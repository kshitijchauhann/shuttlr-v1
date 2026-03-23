import { Hono } from "hono";
import { ZodError } from "zod";
import {
  signUpValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} from "../validators/auth";
import {
  addUser,
  loginUser,
  requestPasswordReset,
  resetPassword,
} from "../services/auth";

const auth = new Hono();

auth.post("/signup", async (c) => {
  try {
    const body = await c.req.json();
    const validated = signUpValidation.parse(body);

    const { confirmPassword, ...input } = validated;
    const user = await addUser(input.name, input.email, input.password);

    return c.json({ success: true, user }, 201);
  } catch (err) {
    // Validation errors → 422
    if (err instanceof ZodError) {
      return c.json(
        {
          success: false,
          error: "Validation failed",
          issues: err.issues.map((e: any) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        422,
      );
    }

    // Duplicate email / username (postgres unique-constraint violation code 23505)
    if (
      err instanceof Error &&
      "code" in err &&
      (err as any).code === "23505"
    ) {
      const detail = (err as any).detail ?? "";
      const field = detail.includes("email") ? "email" : "username";
      return c.json(
        {
          success: false,
          error: `An account with this ${field} already exists`,
        },
        409,
      );
    }

    // Unexpected errors → 500
    console.error("[POST /signup]", err);
    return c.json({ success: false, error: "Internal server error" }, 500);
  }
});

auth.post("/login", async (c) => {
  try {
    const body = await c.req.json();
    const validated = loginValidation.parse(body);

    const user = await loginUser(validated.identifier, validated.password);

    if (!user) {
      // 401 Unauthorized for invalid creds
      return c.json({ success: false, error: "Invalid credentials" }, 401);
    }

    return c.json({ success: true, user }, 200);
  } catch (err) {
    if (err instanceof ZodError) {
      return c.json(
        {
          success: false,
          error: "Validation failed",
          issues: err.issues.map((e: any) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        422,
      );
    }

    console.error("[POST /login]", err);
    return c.json({ success: false, error: "Internal server error" }, 500);
  }
});

auth.post("/forgot-password", async (c) => {
  try {
    const body = await c.req.json();
    const validated = forgotPasswordValidation.parse(body);

    await requestPasswordReset(validated.email);

    // Always return 200 OK to prevent email enumeration attacks
    return c.json(
      { success: true, message: "If an account exists, a reset link has been sent." },
      200
    );
  } catch (err) {
    if (err instanceof ZodError) {
      return c.json(
        {
          success: false,
          error: "Validation failed",
          issues: err.issues.map((e: any) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        422,
      );
    }
    console.error("[POST /forgot-password]", err);
    return c.json({ success: false, error: "Internal server error" }, 500);
  }
});

auth.post("/reset-password", async (c) => {
  try {
    const body = await c.req.json();
    const validated = resetPasswordValidation.parse(body);

    const success = await resetPassword(
      validated.token,
      validated.newPassword,
    );

    if (!success) {
      return c.json(
        { success: false, error: "Invalid or expired reset token" },
        400
      );
    }

    return c.json({ success: true, message: "Password updated successfully" }, 200);
  } catch (err) {
    if (err instanceof ZodError) {
      return c.json(
        {
          success: false,
          error: "Validation failed",
          issues: err.issues.map((e: any) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        422,
      );
    }
    console.error("[POST /reset-password]", err);
    return c.json({ success: false, error: "Internal server error" }, 500);
  }
});

export default auth;
