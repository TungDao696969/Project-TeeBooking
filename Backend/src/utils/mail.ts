import "dotenv/config";
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

let mailTransporter: nodemailer.Transporter | null = null;
let transporterVerified = false;

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
    const transporter = getMailTransporter();

    if (!transporterVerified) {
      await transporter.verify();
      transporterVerified = true;
      console.log("SMTP connection verified");
    }

    const info = await transporter.sendMail({
      from: `"${requiredEnv("SMTP_FROM_NAME")}" <${requiredEnv("SMTP_FROM_EMAIL")}>`,
      to,
      subject,
      html: message,
    });

    const accepted = Array.isArray(info.accepted) ? info.accepted : [];
    const rejected = Array.isArray(info.rejected) ? info.rejected : [];

    console.log("Mail sent:", {
      messageId: info.messageId,
      accepted,
      rejected,
      response: info.response,
    });

    if (!accepted.length || rejected.includes(to)) {
      console.error("Mail was not accepted by SMTP server:", {
        to,
        accepted,
        rejected,
      });
      return false;
    }

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

/**
 * Send an email with CID inline attachments (e.g., embedded QR code images).
 * Attachments should follow nodemailer format: { filename, content, cid, contentType }
 */
export const sendMailWithAttachments = async (
  to: string,
  subject: string,
  html: string,
  attachments: nodemailer.SendMailOptions["attachments"] = [],
) => {
  try {
    const transporter = getMailTransporter();

    if (!transporterVerified) {
      await transporter.verify();
      transporterVerified = true;
      console.log("SMTP connection verified");
    }

    const info = await transporter.sendMail({
      from: `"${requiredEnv("SMTP_FROM_NAME")}" <${requiredEnv("SMTP_FROM_EMAIL")}>`,
      to,
      subject,
      html,
      attachments,
    });

    const accepted = Array.isArray(info.accepted) ? info.accepted : [];
    const rejected = Array.isArray(info.rejected) ? info.rejected : [];

    console.log("Mail sent:", {
      messageId: info.messageId,
      accepted,
      rejected,
      response: info.response,
    });

    if (!accepted.length || rejected.includes(to)) {
      console.error("Mail was not accepted by SMTP server:", {
        to,
        accepted,
        rejected,
      });
      return false;
    }

    return info;
  } catch (error) {
    console.error("Send mail with attachments failed:", error);
    return false;
  }
};

/**
 * Render an EJS template and send it with CID inline attachments.
 */
export const sendMailTemplateWithAttachments = async (
  to: string,
  subject: string,
  template: string,
  context = {},
  attachments: nodemailer.SendMailOptions["attachments"] = [],
) => {
  const templatePath = path.join(
    process.cwd(),
    "src",
    "mails",
    `${template}.ejs`,
  );
  const html = await ejs.renderFile(templatePath, context);
  return sendMailWithAttachments(to, subject, html as string, attachments);
};

// email invoice
export const sendInvoiceEmail = async ({
  to,
  pdfPath,
}: {
  to: string;
  pdfPath: string;
}) => {
  const transporter = getMailTransporter();

  if (!transporterVerified) {
    await transporter.verify();
    transporterVerified = true;
    console.log("SMTP connection verified");
  }

  await transporter.sendMail({
    from: `"${requiredEnv("SMTP_FROM_NAME")}" <${requiredEnv("SMTP_FROM_EMAIL")}>`,
    to,
    subject: "Hóa Đơn Đặt Vé - TEE BOOKING",
    text: "Cảm ơn bạn đã đặt vé tại Tee Booking. Hóa đơn chi tiết được đính kèm trong email này.",
    attachments: [
      {
        filename: "invoice.pdf",
        path: pdfPath,
      },
    ],
  });
};

