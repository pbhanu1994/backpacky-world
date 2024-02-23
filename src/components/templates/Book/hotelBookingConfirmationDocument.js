import React from "react";
import { View, Text, Image, StyleSheet, Font } from "@react-pdf/renderer";
import { fDate } from "../../../utils/formatTime";
import { formatCurrency } from "../../../utils/formatCurrency";

export const hotelBookingConfirmationDocument = (
  bookingConfirmation,
  hotelDetails,
  guests,
  payments,
  rooms,
  imageData,
  theme
) => {
  const {
    typography: { h3, h6 },
    palette: { text, primary, action },
  } = theme;

  // Registering the fonts (Custom) here
  Font.register({
    family: "Public Sans, sans-serif",
    fonts: [
      {
        src: "http://fonts.gstatic.com/s/publicsans/v15/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymu8Z65ww0pX189fg.ttf",
        fontWeight: "ultrabold",
      },
      {
        src: "http://fonts.gstatic.com/s/opensans/v40/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0C4nY1M2xLER.ttf",
      },
    ],
  });

  const styles = StyleSheet.create({
    container: { margin: 10 },
    section: {
      marginBottom: 16,
    },
    heading: {
      textAlign: "center",
      fontFamily: h3.fontFamily,
      fontWeight: "ultrabold",
      fontSize: 20,
      color: text.primary,
      lineHeight: h3.lineHeight,
      marginBottom: 10,
    },
    title: {
      display: "flex",
      alignItems: "center",
      fontFamily: h6.fontFamily,
      fontSize: 12,
      fontWeight: "bold",
      color: text.primary,
      marginBottom: 8,
    },
    row: {
      flexDirection: "row",
      marginBottom: 10,
    },
    guestRow: {
      flexDirection: "row",
    },
    column: { width: "50%", flexDirection: "column", marginBottom: 10 },
    label: {
      fontSize: 12,
      fontFamily: h6.fontFamily,
      color: primary.main,
      fontWeight: "bold",
      marginRight: 5,
    },
    sectionLabel: {
      marginBottom: 8,
    },
    subLabel: {
      fontSize: 12,
      fontFamily: h6.fontFamily,
      color: action.active,
      fontWeight: "bold",
      marginRight: 5,
    },
    value: { color: action.active, fontSize: 12, fontFamily: h6.fontFamily },
    icon: { width: 16, height: 16, marginRight: 5 },
  });

  const {
    Receipt,
    Person,
    Hotel,
    Room,
    Payment,
    EmailOutlined,
    PhoneIphoneOutlined,
  } = imageData;

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.heading}>Booking Confirmed</Text>
      </View>
      <View style={styles.section}>
        {/* Booking Confirmation Details */}
        <View style={styles.row}>
          <Image src={Receipt} style={styles.icon} />
          <Text style={styles.title}>Confirmation Details</Text>
        </View>
        <View style={styles.row}>
          {bookingConfirmation.map((result, index) => (
            <View key={index} style={styles.column}>
              <View style={styles.cell}>
                <Text style={styles.label}>Confirmation ID</Text>
                <Text style={{ ...styles.label, fontWeight: "light" }}>
                  {result.providerConfirmationId}
                </Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.subLabel}>Reference:</Text>
                <Text style={styles.value}>
                  {result.associatedRecords[0].reference}
                </Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.subLabel}>Origin System Code:</Text>
                <Text style={styles.value}>
                  {result.associatedRecords[0].originSystemCode}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        {/* Hotel Booking Details */}
        <View style={styles.row}>
          <Image src={Hotel} style={styles.icon} />
          <Text style={styles.title}>Hotel Booking Details</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <View style={styles.cell}>
              <Text style={styles.label}>Hotel ID:</Text>
              <Text style={styles.value}>{hotelDetails.hotelId}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.label}>Hotel Name:</Text>
              <Text style={styles.value}>{hotelDetails.name}</Text>
            </View>
          </View>
          <View style={styles.column}>
            <View style={styles.cell}>
              <Text style={styles.subLabel}>Check-In Date:</Text>
              <Text style={styles.value}>
                {fDate(hotelDetails.checkInDate)}
              </Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.subLabel}>Check-Out Date:</Text>
              <Text style={styles.value}>
                {fDate(hotelDetails.checkOutDate)}
              </Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.subLabel}>Total:</Text>
              <Text style={styles.value}>
                {formatCurrency(
                  hotelDetails.price.total,
                  hotelDetails.price.currency
                )}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        {/* Guests Information */}
        <View style={styles.row}>
          <Image src={Person} style={styles.icon} />
          <Text style={styles.title}>
            {guests.length === 1 ? "Guest" : "Guests"} Details
          </Text>
        </View>
        <View style={styles.row}>
          {guests.map((guest, index) => (
            <View key={index} style={styles.column}>
              <View>
                <Text style={styles.label}>
                  {`${guest.name.title}. ${guest.name.firstName
                    .charAt(0)
                    .toUpperCase()}${guest.name.firstName.slice(
                    1
                  )} ${guest.name.lastName
                    .charAt(0)
                    .toUpperCase()}${guest.name.lastName.slice(1)}`}
                </Text>
              </View>
              <View style={styles.guestRow}>
                <Image src={EmailOutlined} style={styles.icon} />
                <Text style={styles.value}>{guest.contact.email}</Text>
              </View>
              <View style={styles.guestRow}>
                <Image src={PhoneIphoneOutlined} style={styles.icon} />
                <Text style={styles.value}>{guest.contact.phone}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        {/* Payment Information */}
        <View style={styles.row}>
          <Image src={Payment} style={styles.icon} />
          <Text style={styles.title}>Payment Details</Text>
        </View>
        <View style={styles.row}>
          {payments.map((payment, index) => (
            <View key={index} style={styles.column}>
              <View style={styles.sectionLabel}>
                <Text style={styles.label}>{`Payment ${index + 1}`}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.subLabel}>Method:</Text>
                <Text style={styles.value}>{payment.method}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.subLabel}>Card Number:</Text>
                <Text style={styles.value}>{payment.card.cardNumber}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View>
        {/* Room Information with Special Requests */}
        {!rooms.every((room) =>
          Object.values(room).every((value) => value === undefined)
        ) &&
          rooms.some((room) => !_.isEmpty(room)) && (
            <View style={styles.row}>
              <Image src={Room} style={styles.icon} />
              <Text style={styles.title}>
                {rooms.length === 1 ? "Room" : "Rooms"} Details
              </Text>
            </View>
          )}

        {!rooms.every((room) =>
          Object.values(room).every((value) => value === undefined)
        ) &&
          rooms.some((room) => !_.isEmpty(room)) && (
            <View style={styles.row}>
              {rooms.map((room, index) => (
                <View key={index} style={styles.column}>
                  <View style={styles.sectionLabel}>
                    <Text style={styles.label}>{`Room ${index + 1}`}</Text>
                  </View>
                  <View style={styles.cell}>
                    {room.guestIds && room.guestIds.length > 0 && (
                      <Text style={styles.subLabel}>Guests:</Text>
                    )}{" "}
                    {room.guestIds && room.guestIds.length > 0 && (
                      <Text style={styles.value}>
                        {room.guestIds
                          .map(
                            (guestId) =>
                              guests.find((guest) => guest.id === guestId).name
                                .firstName
                          )
                          .map(
                            (name) =>
                              name.charAt(0).toUpperCase() + name.slice(1)
                          )
                          .join(", ")}
                      </Text>
                    )}
                    {room.guestIds && room.guestIds.length > 0 && <br />}
                    {room.specialRequest && (
                      <View style={styles.cell}>
                        <Text style={styles.subLabel}>Special Request:</Text>
                        <Text style={styles.value}>{room.specialRequest}</Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}
      </View>
    </View>
  );
};
