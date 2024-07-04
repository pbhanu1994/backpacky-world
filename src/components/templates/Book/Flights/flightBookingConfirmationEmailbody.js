import { fDate, formatISODuration } from "../../../../utils/formatTime";
import { formatCurrency } from "../../../../utils/formatCurrency";

export const flightBookingConfirmationEmailbody = (
  traveler,
  data,
  travelers,
  theme
) => {
  const {
    typography: { h3, h6 },
    palette: { text, primary, action },
  } = theme;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flight Booking Confirmation</title>
    <style>
        body {
            font-family: 'Public Sans', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
            color: #333;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: ${text.primary};
            font-family: 'Public Sans', sans-serif;
            text-align: center;
        }
        
        h2 {
            color: ${primary.main};
            font-family: 'Public Sans', sans-serif;
        }
         
        h4, h5 {
            color: ${text.primary};
            font-family: 'Public Sans', sans-serif;
        }

        p {
            color: ${text.primary};
            line-height: 1.6;
            font-family: 'Public Sans', sans-serif;
        }

        .subLabel {
          display: unset;
          line-height: 1.6;
          font-family: 'Public Sans', sans-serif;
          color: ${action.active};
        }

        .section-details {
            margin-top: 20px;
        }

        li {
          font-family: 'Public Sans', sans-serif;
        }

        .contact-info {
            margin-top: 20px;
            font-size: 14px;
            font-family: 'Public Sans', sans-serif;
            color: ${text.primary};
        }

        .footer {
            margin-top: 20px;
            text-align: center;
            color: #777;
        }
    </style>
</head>
<body>

    <div class="container">
        <h1>Booking Confirmed</h1>

        <p>Hi ${traveler.name.firstName
          .charAt(0)
          .toUpperCase()}${traveler.name.firstName.slice(1)},</p>

        <p>Thank you for booking your flight with us! We are delighted to confirm your reservation.</p>

        <!-- Booking Confirmation Details -->
        <div class="section-details">
            <h2>Confirmation Details</h2>
            <ul>
                <li><p class="subLabel"><strong>Reference:</strong></p> ${
                  data.associatedRecords[0].reference
                }</li>
                <li><p class="subLabel"><strong>Creation Date:</strong></p> ${fDate(
                  data.associatedRecords[0].creationDate
                )}</li>
                <li><p class="subLabel"><strong>Origin System Code:</strong></p> ${
                  data.associatedRecords[0].originSystemCode
                }</li>
            </ul>
        </div>

        <!-- Traveler Information -->
        <div class="section-details">
            <h2>${
              travelers.length === 1 ? "Traveler" : "Travelers"
            } Details</h2>
             ${travelers
               .map(
                 (traveler, index) => `<ul>
               <p><strong>${`Traveler ${index + 1}`}</strong></p>
                <li><p class="subLabel"><strong>Name:</strong></p> ${traveler.name.firstName
                  .charAt(0)
                  .toUpperCase()}${traveler.name.firstName.slice(
                   1
                 )} ${traveler.name.lastName
                   .charAt(0)
                   .toUpperCase()}${traveler.name.lastName.slice(1)}</li>
                <li><p class="subLabel"><strong>Date of Birth:</strong></p> ${fDate(
                  traveler.dateOfBirth
                )}</li>
                <li><p class="subLabel"><strong>Gender:</strong></p> ${
                  traveler.gender
                }</li>
                 <li><p class="subLabel"><strong>Phone:</strong></p> +${
                   traveler.contact.phones[0].countryCallingCode
                 } ${traveler.contact.phones[0].number}</li>
                <li><p class="subLabel"><strong>Email:</strong></p> ${
                  traveler.contact.emailAddress
                }</li>
                <p><strong>Document Information:</strong></p>
                <li><p class="subLabel"><strong>Document Type:</strong></p> ${
                  traveler.documents[0].documentType
                }</li>
                <li><p class="subLabel"><strong>Document Number:</strong></p> ${
                  traveler.documents[0].number
                }</li>
                <li><p class="subLabel"><strong>Expiry Date:</strong></p> ${fDate(
                  traveler.documents[0].expiryDate
                )}</li>
                <li><p class="subLabel"><strong>Issuance Country:</strong></p> ${
                  traveler.documents[0].issuanceCountry
                }</li>
                <li><p class="subLabel"><strong>Issuance Location:</strong></p> ${
                  traveler.documents[0].issuanceLocation
                }</li>
                <li><p class="subLabel"><strong>Nationality:</strong></p> ${
                  traveler.documents[0].nationality
                }</li>
            </ul>`
               )
               .join("")}
        </div>

        <!-- Flight Itinerary -->
        <div class="section-details">
            <h2>Flight Itinerary</h2>
            ${data.flightOffers[0].itineraries[0].segments
              .map(
                (segment, index) => `<ul>
                <p><strong>Segment ${index + 1}</strong></p>
                <li><p class="subLabel"><strong>Departure:</strong></p> ${new Date(
                  segment.departure.at
                ).toLocaleDateString([], {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}, ${new Date(segment.departure.at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })} from Terminal ${segment.departure.terminal}</li>
                <li><p class="subLabel"><strong>Arrival:</strong></p> ${new Date(
                  segment.arrival.at
                ).toLocaleDateString([], {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}, ${new Date(segment.arrival.at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })} at Terminal ${segment.arrival.terminal}</li>
                <li><p class="subLabel"><strong>Flight Number:</strong></p> ${
                  segment.carrierCode
                } ${segment.number}</li>
                <li><p class="subLabel"><strong>Aircraft:</strong></p> ${
                  segment.aircraft.code
                }</li>
                <li><p class="subLabel"><strong>Duration:</strong></p> ${formatISODuration(
                  segment.duration
                )}</li>
            </ul>`
              )
              .join("")}
        </div>

        <!-- Pricing Information -->
        <div class="section-details">
            <h2>Pricing Information</h2>
            <ul>
                <li><p class="subLabel"><strong>Total Price:</strong></p> ${formatCurrency(
                  data.flightOffers[0].price.total,
                  data.flightOffers[0].price.currency
                )}</li>
                <li><p class="subLabel"><strong>Base Price:</strong></p> ${formatCurrency(
                  data.flightOffers[0].price.base,
                  data.flightOffers[0].price.currency
                )}</li>
                <li><p class="subLabel"><strong>Fees:</strong></p> ${data.flightOffers[0].price.fees
                  .map(
                    (fee) =>
                      `${fee.type.replace(/_/g, " ")}: ${formatCurrency(
                        fee.amount,
                        data.flightOffers[0].price.currency
                      )}`
                  )
                  .join(", ")}</li>
                <li><p class="subLabel"><strong>Grand Total:</strong></p> ${formatCurrency(
                  data.flightOffers[0].price.grandTotal,
                  data.flightOffers[0].price.currency
                )}</li>
            </ul>
        </div>
        
        <h4><strong>Note</strong></h4>
        <ul>
          <li><p>To ensure a smooth boarding process, please present a valid ID upon arrival.</p></li>
        </ul>

        <div class="contact-info">
            <p>Warm regards,</p>
            <p><strong>Backpacky Team</strong></p>
        </div>

        <div class="footer">
            <p>&copy; 2024 Backpacky. All rights reserved.</p>
        </div>

    </div>

</body>
</html>`;
};
