import { sendBookingConfirmationEmail } from './services/send-booking-email.service';
sendBookingConfirmationEmail('4a6779aa-38ab-4b39-bd33-00817ab005bf').then(() => console.log('Done')).catch(console.error);
