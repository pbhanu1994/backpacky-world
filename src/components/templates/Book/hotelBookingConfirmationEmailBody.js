import { fDate } from "../../../utils/formatTime";
import { formatCurrency } from "../../../utils/formatCurrency";

export const hotelBookingConfirmationEmailbody = (
  guest,
  bookingConfirmation,
  hotelDetails,
  guests,
  payments,
  rooms,
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
    <title>Hotel Booking Confirmation</title>
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

        <p>Hi ${guest.name.firstName
          .charAt(0)
          .toUpperCase()}${guest.name.firstName.slice(1)},</p>

        <p>Thank you for choosing <strong>${
          hotelDetails.name
        }</strong> for your upcoming stay! We are delighted to confirm your reservation.</p>

        <!-- Booking Confirmation Details -->
        <div class="section-details">
            <h2>Confirmation Details</h2>
            ${bookingConfirmation
              .map(
                (result, index) => `<ul>
                <p><strong>${`Confirmation ${index + 1}`}</strong></p>
                <li><p class="subLabel"><strong>Confirmation ID:</strong></p> ${
                  result.providerConfirmationId
                }</li>
                <li><p class="subLabel"><strong>Reference:</strong></p> ${
                  result.associatedRecords[0].reference
                }</li>
                <li><p class="subLabel"><strong>Origin System Code:</strong></p> ${
                  result.associatedRecords[0].originSystemCode
                }</li>
            </ul>`
              )
              .join("")}
        </div>

        <!-- Hotel Booking Details -->
        <div class="section-details">
            <h2>Hotel Booking Details</h2>
            <ul>
                <li><p class="subLabel"><strong>Hotel ID:</strong></p> ${
                  hotelDetails.hotelId
                }</li>
                <li><p class="subLabel"><strong>Hotel Name:</strong></p> ${
                  hotelDetails.name
                }</li>
                <li><p class="subLabel"><strong>Check-In Date:</strong></p> ${fDate(
                  hotelDetails.checkInDate
                )}</li>
                <li><p class="subLabel"><strong>Check-Out Date:</strong></p> ${fDate(
                  hotelDetails.checkOutDate
                )}</li>
                <li><p class="subLabel"><strong>Total:</strong></p> ${formatCurrency(
                  hotelDetails.price.total,
                  hotelDetails.price.currency
                )}</li>
            </ul>
        </div>
        
        <!-- Guests Information -->
        <div class="section-details">
            <h2>${guests.length === 1 ? "Guest" : "Guests"} Details</h2>
            ${guests
              .map(
                (guest, index) => `<ul>
                <p><strong>${`Guest ${index + 1}`}</strong></p>
                <li><p class="subLabel"><strong>Guest Name:</strong></p> ${
                  guest.name.title
                }. ${guest.name.firstName
                  .charAt(0)
                  .toUpperCase()}${guest.name.firstName.slice(
                  1
                )} ${guest.name.lastName
                  .charAt(0)
                  .toUpperCase()}${guest.name.lastName.slice(1)}</li>
                <li><p class="subLabel"><strong>Email:</strong></p> ${
                  guest.contact.email
                }</li>
                <li><p class="subLabel"><strong>Phone:</strong></p> ${
                  guest.contact.phone
                }</li>
            </ul>`
              )
              .join("")}
        </div>
        
        <!-- Payment Information -->
        <div class="section-details">
            <h2>Payment Details</h2>
            ${payments
              .map(
                (payment, index) => `<ul>
                <p><strong>${`Payment ${index + 1}`}</strong></p>
                <li><p class="subLabel"><strong>Method:</strong></p> ${
                  payment.method
                }</li>
                <li><p class="subLabel"><strong>Card Number:</strong></p> ${
                  payment.card.cardNumber
                }</li>
            </ul>`
              )
              .join("")}
        </div>
        
        <!-- Room Information with Special Requests -->
        <div class="section-details">
            ${
              !rooms.every((room) =>
                Object.values(room).every((value) => value === undefined)
              ) && rooms.some((room) => !_.isEmpty(room))
                ? `<h2>${rooms.length === 1 ? "Room" : "Rooms"} Details</h2>`
                : ""
            }

             ${
               !rooms.every((room) =>
                 Object.values(room).every((value) => value === undefined)
               ) && rooms.some((room) => !_.isEmpty(room))
                 ? rooms
                     .map(
                       (room, index) =>
                         `<ul>
                            <p><strong>${`Room ${index + 1}`}</strong></p>
                            <div>
                              ${
                                room.guestIds && room.guestIds.length > 0
                                  ? `<li><p class="subLabel"><strong>Guests:</strong> ${
                                      room.guestIds && room.guestIds.length > 0
                                        ? room.guestIds
                                            .map(
                                              (guestId) =>
                                                guests.find(
                                                  (guest) =>
                                                    guest.id === guestId
                                                ).name.firstName
                                            )
                                            .map(
                                              (name) =>
                                                name.charAt(0).toUpperCase() +
                                                name.slice(1)
                                            )
                                            .join(", ")
                                        : ""
                                    }</p></li>`
                                  : ""
                              }
                              ${
                                room.specialRequest
                                  ? `<li><p class="subLabel"><strong>Special Request:</strong></p> ${room.specialRequest}</li>`
                                  : ""
                              }
                            </div>
                      </ul>`
                     )
                     .join("")
                 : ""
             }
        </div>
        
        <h4><strong>Note</strong></h4>
        <ul>
          <li><p>To ensure a smooth check-in process, please present a valid ID upon arrival.</p></li>
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
