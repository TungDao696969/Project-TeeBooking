import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generateInvoicePDF = async (invoice: any, booking: any) => {
  const doc = new PDFDocument();
  const uploadDir = path.join(process.cwd(), "uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, `${invoice.invoiceNumber}.pdf`);
  const stream = fs.createWriteStream(filePath);

  doc.pipe(stream);

  doc.fontSize(20).text("MOVIE INVOICE");

  doc.moveDown();
  doc.text(`Invoice: ${invoice.invoiceNumber}`);
  doc.text(`Booking Code: ${booking.bookingCode}`);
  doc.text(`Subtotal: ${invoice.subtotal}`);
  doc.text(`Discount: ${invoice.discount}`);
  doc.text(`Total: ${invoice.total}`);

  doc.end();

  await new Promise<void>((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });

  return filePath;
};
