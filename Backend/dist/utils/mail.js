"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendInvoiceEmail = exports.sendMailTemplate = exports.sendMail = void 0;
require("dotenv/config");
const nodemailer_1 = __importDefault(require("nodemailer"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
let mailTransporter = null;
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
        const info = await getMailTransporter().sendMail({
            from: `"${requiredEnv("SMTP_FROM_NAME")}" <${requiredEnv("SMTP_FROM_EMAIL")}>`,
            to,
            subject,
            html: message,
        });
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
// email invoice
const sendInvoiceEmail = async ({ to, pdfPath, }) => {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    await transporter.sendMail({
        to,
        subject: "Booking Confirmation Invoice",
        text: "Booking confirmed successfully",
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