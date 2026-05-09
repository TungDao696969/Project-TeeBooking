import "dotenv/config";
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

let mailTransporter: nodemailer.Transporter | null = null;

const requiredEnv = (name: string) => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is missing`);
  }

  return value;
};

const getMailTransporter = () => {
  if (mailTransporter) {
    return mailTransporter;
  }

  const smtpPort = Number(requiredEnv("SMTP_PORT"));

  mailTransporter = nodemailer.createTransport({
    host: requiredEnv("SMTP_HOST"),
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: requiredEnv("SMTP_USERNAME"),
      pass: requiredEnv("SMTP_PASSWORD"),
    },
  });

  return mailTransporter;
};

export const sendMail = async (
  to: string,
  subject: string,
  message: string,
) => {
  try {
    const info = await getMailTransporter().sendMail({
      from: `"${requiredEnv("SMTP_FROM_NAME")}" <${requiredEnv("SMTP_FROM_EMAIL")}>`,
      to,
      subject,
      html: message,
    });
    return info;
  } catch (error) {
    console.error("Send mail failed:", error);
    return false;
  }
};

export const sendMailTemplate = async (
  to: string,
  subject: string,
  template: string,
  context = {},
) => {
  const templatePath = path.join(
    process.cwd(),
    "src",
    "mails",
    `${template}.ejs`,
  );
  const html = await ejs.renderFile(templatePath, context);
  return sendMail(to, subject, html);
};
