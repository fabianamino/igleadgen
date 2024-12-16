import { Resend } from "resend";
import { createEmailTemplate } from "./email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `https://app.igleadgen.com/auth/new-password?token=${token}`;
  const emailHtml = createEmailTemplate(
    "Reset Your Password",
    "You've requested to reset your password. Click the button below to set a new password:",
    "RESET PASSWORD",
    resetLink
  );

  await resend.emails.send({
    from: "support@igleadgen.com",
    to: email,
    subject: "Reset Your Password",
    html: emailHtml,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  try {
    const confirmLink = `https://app.igleadgen.com/auth/new-verification?token=${token}`;
    const emailHtml = createEmailTemplate(
      "Verify Your Email",
      "Thank you for signing up with IgLeadGen. Please click the button below to verify your email address:",
      "VERIFY EMAIL",
      confirmLink
    );

    const data = await resend.emails.send({
      from: "support@igleadgen.com",
      to: email,
      subject: "Verify Your Email",
      html: emailHtml,
    });
    
    console.log('Email sent successfully:', data);
    return data;
  } catch (error) {
    console.error('Failed to send verification email:', error);
    throw error;
  }
};