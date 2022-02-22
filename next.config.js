module.exports = {
  trailingSlash: true,
  future: {
    webpack5: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { and: [/\.(js|ts|md)x?$/] },
      use: ["@svgr/webpack"],
    });
    return config;
  },
};
