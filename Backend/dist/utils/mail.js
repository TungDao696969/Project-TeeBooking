"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendInvoiceEmail = exports.sendMailTemplateWithAttachments = exports.sendMailWithAttachments = exports.sendMailTemplate = exports.sendMail = void 0;
require("dotenv/config");
const nodemailer_1 = __importDefault(require("nodemailer"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
let mailTransporter = null;
let transporterVerified = false;
const requiredEnv = (name) => {
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
    mailTransporter = nodemailer_1.default.createTransport({
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
const sendMail = async (to, subject, message) => {
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
    }
    catch (error) {
        console.error("Send mail failed:", error);
        return false;
    }
};
exports.sendMail = sendMail;
const sendMailTemplate = async (to, subject, template, context = {}) => {
    const templatePath = path_1.default.join(process.cwd(), "src", "mails", `${template}.ejs`);
    const html = await ejs_1.default.renderFile(templatePath, context);
    return (0, exports.sendMail)(to, subject, html);
};
exports.sendMailTemplate = sendMailTemplate;
/**
 * Send an email with CID inline attachments (e.g., embedded QR code images).
 * Attachments should follow nodemailer format: { filename, content, cid, contentType }
 */
const sendMailWithAttachments = async (to, subject, html, attachments = []) => {
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
    }
    catch (error) {
        console.error("Send mail with attachments failed:", error);
        return false;
    }
};
exports.sendMailWithAttachments = sendMailWithAttachments;
/**
 * Render an EJS template and send it with CID inline attachments.
 */
const sendMailTemplateWithAttachments = async (to, subject, template, context = {}, attachments = []) => {
    const templatePath = path_1.default.join(process.cwd(), "src", "mails", `${template}.ejs`);
    const html = await ejs_1.default.renderFile(templatePath, context);
    return (0, exports.sendMailWithAttachments)(to, subject, html, attachments);
};
exports.sendMailTemplateWithAttachments = sendMailTemplateWithAttachments;
// email invoice
const sendInvoiceEmail = async ({ to, pdfPath, }) => {
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
exports.sendInvoiceEmail = sendInvoiceEmail;
//# sourceMappingURL=mail.js.map