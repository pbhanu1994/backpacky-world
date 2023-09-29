export const getCardIssuerCode = (cardType) => {
  const cardTypes = {
    Mastercard: "CA",
    Visa: "VI",
    "American Express": "AX",
    "Diners Club": "DC",
    "Carte Aurore": "AU",
    Cofinoga: "CG",
    Discover: "DS",
    "Lufthansa GK Card": "GK",
    "Japanese Credit Bureau": "JC",
    "Torch Club": "TC",
    "Universal Air Travel Card": "TP",
    "Bank Card": "BC",
    Delta: "DL",
    Maestro: "MA",
    "China UnionPay": "UP",
    "Visa Electron": "VE",
  };

  return cardTypes[cardType] || "Unknown";
};
