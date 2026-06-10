export const generateVietQR = (amount: number, bookingCode: string) => {
  const bankBin = process.env.BANK_BIN;
  const accountNumber = process.env.BANK_ACCOUNT;

  return `https://img.vietqr.io/image/${bankBin}-${accountNumber}-compact2.png?amount=${amount}&addInfo=${bookingCode}`;
};
