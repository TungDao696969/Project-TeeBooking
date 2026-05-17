export declare const createInvoiceService: (bookingId: string) => Promise<{
    id: string;
    total: number;
    bookingId: string;
    invoiceNumber: string;
    subtotal: number;
    discount: number;
    pdfUrl: string | null;
    issuedAt: Date;
}>;
//# sourceMappingURL=invoice.service.d.ts.map