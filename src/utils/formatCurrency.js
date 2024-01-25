export const formatCurrency = (amount, currencyCode) => {
  const currencyInfo = {
    AUD: { locale: "en-AU", symbol: "A$" },
    USD: { locale: "en-US", symbol: "$" },
    GBP: { locale: "en-GB", symbol: "£" },
    CAD: { locale: "en-CA", symbol: "CA$" },
    EUR: { locale: "fr-FR", symbol: "€" },
    // Add additional Currencies
  };

  const { locale, symbol } =
    currencyInfo[currencyCode.toUpperCase()] || currencyInfo["USD"];

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode.toUpperCase(),
  })
    .format(amount)
    .replace(currencyCode.toUpperCase(), symbol);
};
