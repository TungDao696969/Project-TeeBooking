"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const send_booking_email_service_1 = require("./services/send-booking-email.service");
(0, send_booking_email_service_1.sendBookingConfirmationEmail)('4a6779aa-38ab-4b39-bd33-00817ab005bf').then(() => console.log('Done')).catch(console.error);
//# sourceMappingURL=test-email.js.map