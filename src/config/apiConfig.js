const isProduction = process.env.NODE_ENV === "production";

// Add all the baseUrls here from different services..
const baseUrls = {
  // AMADEUS
  test: "https://test.api.amadeus.com",

  // AMADEUS
  //TODO: Uncomment below once the production is ready!
  //   live: "https://api.amadeus.com",
  live: "https://test.api.amadeus.com", // Using test url for now until the production is ready
};

export const amadeusApiUrl = isProduction ? baseUrls.live : baseUrls.test;
