import dayjs from "dayjs";

export const generateInvoiceNumber = () => {
  const randomSuffix = Math.random().toString(36).slice(2, 8).toUpperCase();

  return `INV-${dayjs().format("YYYYMMDDHHmmssSSS")}-${randomSuffix}`;
};
