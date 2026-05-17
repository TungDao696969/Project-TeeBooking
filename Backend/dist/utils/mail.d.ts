import "dotenv/config";
export declare const sendMail: (to: string, subject: string, message: string) => Promise<any>;
export declare const sendMailTemplate: (to: string, subject: string, template: string, context?: {}) => Promise<any>;
export declare const sendInvoiceEmail: ({ to, pdfPath, }: {
    to: string;
    pdfPath: string;
}) => Promise<void>;
//# sourceMappingURL=mail.d.ts.map