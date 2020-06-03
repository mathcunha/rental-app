require("dotenv").config();
module.exports = {
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    API_HOST: process.env.API_HOST,
    API_URI: process.env.API_URI,
    API_URL: process.env.API_URL,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    SERVER_HOST: process.env.SERVER_HOST,
    KEY: process.env.KEY,
  },
};
