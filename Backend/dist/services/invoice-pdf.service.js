"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInvoicePDF = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const generateInvoicePDF = async (invoice, booking) => {
    const doc = new pdfkit_1.default();
    const uploadDir = path_1.default.join(process.cwd(), "uploads");
    if (!fs_1.default.existsSync(uploadDir)) {
        fs_1.default.mkdirSync(uploadDir, { recursive: true });
    }
    const filePath = path_1.default.join(uploadDir, `${invoice.invoiceNumber}.pdf`);
    const stream = fs_1.default.createWriteStream(filePath);
    doc.pipe(stream);
    doc.fontSize(20).text("MOVIE INVOICE");
    doc.moveDown();
    doc.text(`Invoice: ${invoice.invoiceNumber}`);
    doc.text(`Booking Code: ${booking.bookingCode}`);
    doc.text(`Subtotal: ${invoice.subtotal}`);
    doc.text(`Discount: ${invoice.discount}`);
    doc.text(`Total: ${invoice.total}`);
    doc.end();
    await new Promise((resolve, reject) => {
        stream.on("finish", resolve);
        stream.on("error", reject);
    });
    return filePath;
};
exports.generateInvoicePDF = generateInvoicePDF;
//# sourceMappingURL=invoice-pdf.service.js.map