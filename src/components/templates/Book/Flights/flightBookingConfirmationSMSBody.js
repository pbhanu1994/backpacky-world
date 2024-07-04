import { formatCurrency } from "../../../../utils/formatCurrency";
import { formatISODuration } from "../../../../utils/formatTime";

export const flightBookingConfirmationSMSBody = (
  firstName,
  reference,
  travelData
) => {
  const flightOffer = travelData.flightOffers[0];
  const segments = flightOffer.itineraries[0].segments;
  const price = flightOffer.price;

  let smsContent = `Hi ${firstName.charAt(0).toUpperCase()}${firstName.slice(
    1
  )},\n\n`;

  smsContent += `Your Flight Booking Confirmation REF: # ${reference}\n\n`;

  segments.forEach((segment, index) => {
    smsContent += `Flight ${index + 1}: ${segment.departure.iataCode} to ${
      segment.arrival.iataCode
    }\n`;
    smsContent += `Departure: ${new Date(
      segment.departure.at
    ).toLocaleDateString([], {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    })}, ${new Date(segment.departure.at).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })} from Terminal ${segment.departure.terminal || ""}\n`;
    smsContent += `Arrival: ${new Date(segment.arrival.at).toLocaleDateString(
      [],
      {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    )}, ${new Date(segment.arrival.at).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })} at Terminal ${segment.arrival.terminal || ""}\n`;
    smsContent += `Carrier: ${segment.carrierCode} ${segment.number}\n`;
    smsContent += `Aircraft: ${segment.aircraft.code}\n`;
    smsContent += `Duration: ${formatISODuration(segment.duration)}\n\n`;
  });

  smsContent += `Total Price: ${formatCurrency(
    price.total,
    price.currency
  )} \n\n`;
  smsContent += "Safe travels!";

  return smsContent;
};
