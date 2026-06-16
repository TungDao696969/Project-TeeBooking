import "dotenv/config";
import nodemailer from "nodemailer";
export declare const sendMail: (to: string, subject: string, message: string) => Promise<any>;
export declare const sendMailTemplate: (to: string, subject: string, template: string, context?: {}) => Promise<any>;
/**
 * Send an email with CID inline attachments (e.g., embedded QR code images).
 * Attachments should follow nodemailer format: { filename, content, cid, contentType }
 */
export declare const sendMailWithAttachments: (to: string, subject: string, html: string, attachments?: nodemailer.SendMailOptions["attachments"]) => Promise<any>;
/**
 * Render an EJS template and send it with CID inline attachments.
 */
export declare const sendMailTemplateWithAttachments: (to: string, subject: string, template: string, context?: {}, attachments?: nodemailer.SendMailOptions["attachments"]) => Promise<any>;
export declare const sendInvoiceEmail: ({ to, pdfPath, }: {
    to: string;
    pdfPath: string;
}) => Promise<void>;
//# sourceMappingURL=mail.d.ts.map