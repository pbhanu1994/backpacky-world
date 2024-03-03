import { fDate } from "../../../utils/formatTime";

export const hotelBookingConfirmationSMSBody = (
  firstName,
  reference,
  hotelDetails
) =>
  `Hi ${firstName.charAt(0).toUpperCase()}${firstName.slice(1)},
Your Hotel Booking Confirmation REF: # ${reference}
We are delighted to confirm your reservation at ${hotelDetails.name}.

Booking Details:
- Hotel: ${hotelDetails.name}
- Check-In Date: ${fDate(hotelDetails.checkInDate)}
- Check-Out Date: ${fDate(hotelDetails.checkOutDate)}

Your confirmation details are attached in the PDF document here:`;
