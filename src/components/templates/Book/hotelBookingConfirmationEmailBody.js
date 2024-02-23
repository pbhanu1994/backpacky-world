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

        h1, h2 {
            color: ${text.primary};
            font-family: 'Public Sans', sans-serif;
        }

        p {
            line-height: 1.6;
            font-family: 'Public Sans', sans-serif;
        }

        .section-details {
            margin-top: 20px;
        }

        .contact-info {
            margin-top: 20px;
            font-size: 14px;
            font-family: 'Public Sans', sans-serif;
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

        <div class="section-details">
            <h2>Confirmation Details</h2>
            ${bookingConfirmation.map(
              (result) => `<ul>
                <li><strong>Confirmation ID:</strong> ${result.providerConfirmationId}</li>
                <li><strong>Reference:</strong> ${result.associatedRecords[0].reference}</li>
                <li><strong>Origin System Code:</strong> ${result.associatedRecords[0].originSystemCode}</li>
            </ul>`
            )}
        </div>

        <div class="section-details">
            <h2>Hotel Booking Details</h2>
            <ol>
                <li><strong>Hotel ID:</strong> ${hotelDetails.hotelId}</li>
                <li><strong>Hotel Name:</strong> ${hotelDetails.name}</li>
                <li><strong>Check-In Date:</strong> ${fDate(
                  hotelDetails.checkInDate
                )}</li>
                <li><strong>Check-Out Date:</strong> ${fDate(
                  hotelDetails.checkOutDate
                )}</li>
                <li><strong>Total:</strong> ${formatCurrency(
                  hotelDetails.price.total,
                  hotelDetails.price.currency
                )}</li>
            </ol>
        </div>
        
        <div class="section-details">
            <h2>${guests.length === 1 ? "Guest" : "Guests"} Details</h2>
            ${guests.map(
              (guest) => `<ol>
                <li><strong>Guest Name:</strong> ${
                  guest.name.title
                }. ${guest.name.firstName
                .charAt(0)
                .toUpperCase()}${guest.name.firstName.slice(
                1
              )} ${guest.name.lastName
                .charAt(0)
                .toUpperCase()}${guest.name.lastName.slice(1)}</li>
                <li><strong>Email:</strong> ${guest.contact.email}</li>
                <li><strong>Phone:</strong> ${guest.contact.phone}</li>
            </ol>`
            )}
        </div>
        
        <div class="section-details">
            <h2>Payment Details</h2>
            ${payments.map(
              (payment, index) => `<ol>
                <li><strong>${`Payment ${index + 1}`}</strong></li>
                <li><strong>Method:</strong> ${payment.method}</li>
                <li><strong>Card Number:</strong> ${
                  payment.card.cardNumber
                }</li>
            </ol>`
            )}
        </div>
        
        <div class="section-details">
            ${
              !rooms.every((room) =>
                Object.values(room).every((value) => value === undefined)
              ) &&
              rooms.some((room) => !_.isEmpty(room)) &&
              `<h2>${rooms.length === 1 ? "Room" : "Rooms"} Details</h2>`
            }

             ${
               !rooms.every((room) =>
                 Object.values(room).every((value) => value === undefined)
               ) &&
               rooms.some((room) => !_.isEmpty(room)) &&
               rooms.map(
                 (room, index) =>
                   `<div>
                        <h2>${`Room ${index + 1}`}</h2>
                   <div>
                     ${
                       room.guestIds &&
                       room.guestIds.length > 0 &&
                       `<h3>Guests:</h3> `
                     }
                     ${
                       room.guestIds &&
                       room.guestIds.length > 0 &&
                       `<h3>
                           ${room.guestIds
                             .map(
                               (guestId) =>
                                 guests.find((guest) => guest.id === guestId)
                                   .name.firstName
                             )
                             .map(
                               (name) =>
                                 name.charAt(0).toUpperCase() + name.slice(1)
                             )
                             .join(", ")}
                         </h3>`
                     }
                     ${room.guestIds && room.guestIds.length > 0 && `<br>`}
                     ${
                       room.specialRequest &&
                       `<h2><strong>Special Request:</strong></h2>
                        <h3>${room.specialRequest}</h3>`
                     }
                   </div>
                 </div>`
               )
             }
        </div>

        <p>To ensure a smooth check-in process, please present a valid ID upon arrival.</p>

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
