// FORMAT CARD NUMBER
export const formatCardNumber = (cardNumber) => {
  // Adding spaces after every 4 digits
  const formattedCardNumber = cardNumber.replace(/(\d{4})/g, "$1 ");

  return formattedCardNumber.trim();
};

// FORMAT EXPIRY DATE
export const formatExpiryDate = (expiryDate) => {
  // Use regular expressions to split and format the date
  const formattedDate = expiryDate.replace(
    /^(\d{0,2})(\d{0,2})$/,
    (match, month, year) => {
      let result = "";
      if (month.length > 0) {
        result += month;
        if (month.length === 2 && year.length > 0) {
          result += "/";
        }
      }
      if (year.length > 0) {
        result += year;
      }
      return result;
    }
  );

  return formattedDate;
};
