const path = require("path");

module.exports = {
  // ... other Webpack configuration
  resolve: {
    fallback: {
      url: false,
    },
  },
};
