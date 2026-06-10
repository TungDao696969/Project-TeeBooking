export const generateBookingCode = () => {
  return "BK" + Date.now().toString().slice(-8);
};
