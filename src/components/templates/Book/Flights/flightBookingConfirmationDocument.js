import React from "react";
import { View, Text, Image, StyleSheet, Font } from "@react-pdf/renderer";
import { fDate, formatISODuration } from "../../../../utils/formatTime";
import { formatCurrency } from "../../../../utils/formatCurrency";

export const flightBookingConfirmationDocument = (data, imageData, theme) => {
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

  // Create styles
  const styles = StyleSheet.create({
    container: { margin: 10 },
    section: { marginBottom: 16 },
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
    row: { flexDirection: "row", marginBottom: 10 },
    guestRow: {
      flexDirection: "row",
    },
    column: { flexDirection: "column", marginBottom: 10 },
    label: {
      fontSize: 12,
      fontFamily: h6.fontFamily,
      color: primary.main,
      fontWeight: "bold",
      marginRight: 5,
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
    FlightOutlined,
    AttachMoneyOutlined,
    EmailOutlined,
    PhoneIphoneOutlined,
    Book,
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
          <View style={styles.column}>
            <View style={styles.cell}>
              <Text style={styles.label}>Reference</Text>
              <Text style={styles.value}>
                {data.associatedRecords[0].reference}
              </Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.subLabel}>Creation Date</Text>
              <Text style={styles.value}>
                {fDate(data.associatedRecords[0].creationDate)}
              </Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.subLabel}>Origin System Code</Text>
              <Text style={styles.value}>
                {data.associatedRecords[0].originSystemCode}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        {/* Traveler Information */}
        <View style={styles.row}>
          <Image src={Person} style={styles.icon} />
          <Text style={styles.title}>Traveler Information</Text>
        </View>
        <View style={styles.column}>
          {data.travelers.map((traveler, index) => (
            <View key={index} style={styles.column}>
              <View style={styles.row}>
                <View>
                  <View>
                    <Text style={{ ...styles.label, marginBottom: 6 }}>
                      {`${traveler.name.firstName
                        .charAt(0)
                        .toUpperCase()}${traveler.name.firstName.slice(
                        1
                      )} ${traveler.name.lastName
                        .charAt(0)
                        .toUpperCase()}${traveler.name.lastName.slice(1)}`}
                    </Text>
                  </View>
                  <View style={styles.cell}>
                    <Text style={styles.subLabel}>Date of Birth</Text>
                    <Text style={styles.value}>
                      {fDate(traveler.dateOfBirth)}
                    </Text>
                  </View>
                  <View style={styles.cell}>
                    <Text style={styles.subLabel}>Gender</Text>
                    <Text style={styles.value}>{traveler.gender}</Text>
                  </View>
                  <View style={styles.guestRow}>
                    <Image src={EmailOutlined} style={styles.icon} />
                    <Text style={styles.value}>
                      {traveler.contact.emailAddress}
                    </Text>
                  </View>
                  <View style={styles.guestRow}>
                    <Image src={PhoneIphoneOutlined} style={styles.icon} />
                    <Text style={styles.value}>
                      +{traveler.contact.phones[0].countryCallingCode}{" "}
                      {traveler.contact.phones[0].number}
                    </Text>
                  </View>
                </View>
                <View style={{ marginLeft: 16 }}>
                  <View style={styles.row}>
                    <Image src={Book} style={styles.icon} />
                    <Text style={styles.title}>Document Information</Text>
                  </View>
                  <View style={styles.cell}>
                    <Text style={styles.subLabel}>Document Type</Text>
                    <Text style={styles.value}>
                      {traveler.documents[0].documentType}
                    </Text>
                  </View>
                  <View style={styles.cell}>
                    <Text style={styles.subLabel}>Document Number</Text>
                    <Text style={styles.value}>
                      {traveler.documents[0].number}
                    </Text>
                  </View>
                  <View style={styles.cell}>
                    <Text style={styles.subLabel}>Expiry Date</Text>
                    <Text style={styles.value}>
                      {fDate(traveler.documents[0].expiryDate)}
                    </Text>
                  </View>
                  <View style={styles.cell}>
                    <Text style={styles.subLabel}>Issuance Country</Text>
                    <Text style={styles.value}>
                      {traveler.documents[0].issuanceCountry}
                    </Text>
                  </View>
                  <View style={styles.cell}>
                    <Text style={styles.subLabel}>Issuance Location</Text>
                    <Text style={styles.value}>
                      {traveler.documents[0].issuanceLocation}
                    </Text>
                  </View>
                  <View style={styles.cell}>
                    <Text style={styles.subLabel}>Nationality</Text>
                    <Text style={styles.value}>
                      {traveler.documents[0].nationality}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        {/* Flight Itinerary */}
        <View style={styles.row}>
          <Image src={FlightOutlined} style={styles.icon} />
          <Text style={styles.title}>Flight Itinerary</Text>
        </View>
        <View style={styles.column}>
          {data.flightOffers[0].itineraries[0].segments.map(
            (segment, index) => (
              <View key={index} style={styles.column}>
                <View>
                  <Text style={{ ...styles.label, marginBottom: 8 }}>
                    {`Segment ${index + 1}: ${segment.departure.iataCode} to ${
                      segment.arrival.iataCode
                    }`}
                  </Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.subLabel}>Departure</Text>
                  <Text style={styles.value}>
                    {new Date(segment.departure.at).toLocaleDateString([], {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                    ,{" "}
                    {new Date(segment.departure.at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    from Terminal {segment.departure.terminal}
                  </Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.subLabel}>Arrival</Text>
                  <Text style={styles.value}>
                    {new Date(segment.arrival.at).toLocaleDateString([], {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                    ,{" "}
                    {new Date(segment.arrival.at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    at Terminal {segment.arrival.terminal}
                  </Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.subLabel}>Flight Number</Text>
                  <Text style={styles.value}>
                    {segment.carrierCode} {segment.number}
                  </Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.subLabel}>Aircraft</Text>
                  <Text style={styles.value}>{segment.aircraft.code}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.subLabel}>Duration</Text>
                  <Text style={styles.value}>
                    {formatISODuration(segment.duration)}
                  </Text>
                </View>
              </View>
            )
          )}
        </View>
      </View>

      <View style={styles.section}>
        {/* Pricing Information */}
        <View style={styles.row}>
          <Image src={AttachMoneyOutlined} style={styles.icon} />
          <Text style={styles.title}>Pricing Information</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <View style={styles.cell}>
              <Text style={styles.label}>Total Price</Text>
              <Text style={styles.value}>
                {formatCurrency(
                  data.flightOffers[0].price.total,
                  data.flightOffers[0].price.currency
                )}
              </Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.label}>Base Price</Text>
              <Text style={styles.value}>
                {formatCurrency(
                  data.flightOffers[0].price.base,
                  data.flightOffers[0].price.currency
                )}
              </Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.label}>Fees</Text>
              {data.flightOffers[0].price.fees.map((fee, index) => (
                <Text key={`price-${index}`} style={styles.value}>
                  {fee.type.replace(/_/g, " ")}:{" "}
                  {formatCurrency(
                    fee.amount,
                    data.flightOffers[0].price.currency
                  )}
                </Text>
              ))}
            </View>
            <View style={styles.cell}>
              <Text style={styles.label}>Grand Total</Text>
              <Text style={styles.value}>
                {formatCurrency(
                  data.flightOffers[0].price.grandTotal,
                  data.flightOffers[0].price.currency
                )}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
