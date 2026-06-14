"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBookingCode = void 0;
const generateBookingCode = () => {
    return "BK" + Date.now().toString().slice(-8);
};
exports.generateBookingCode = generateBookingCode;
//# sourceMappingURL=booking-code.js.map