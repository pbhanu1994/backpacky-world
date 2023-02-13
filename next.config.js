const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@fullcalendar/list",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
  "@fullcalendar/timegrid",
  "@fullcalendar/timeline",
]);

module.exports = withTM({
  trailingSlash: true,
  webpack: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { and: [/\.(js|ts|md)x?$/] },
      use: ["@svgr/webpack"],
    });
    return config;
  },
});
