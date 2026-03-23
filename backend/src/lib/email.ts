import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(email: string, token: string) {
    // In a real app, you would construct a full URL to your frontend's reset page:
    // e.g. `https://yourdomain.com/reset-password?token=${token}`
    // For the API, we'll just send the raw token to illustrate the flow.

    const resetLink = `http://localhost:3000/reset-password?token=${token}`; // Adjust to your actual frontend URL

    return await resend.emails.send({
        from: "Shuttlr <noreply@resend.dev>", // replace with your verified domain
        to: email,
        subject: "Reset your password",
        html: `
      <p>Hello,</p>
      <p>Here is your password reset link. It will expire in 5 minutes.</p>
      <p><a href="${resetLink}">Reset Password</a></p>
      <p>Or use this token directly: <strong>${token}</strong></p>
      <p>If you did not request this, please ignore this email.</p>
    `,
    });
}
