const app = require("./app");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const connectDB = require("./config/dbConfig");

// Config
const PORT = process.env.PORT || 3010;
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled Rejection`);
});

// Connect Database
connectDB();

// Listen
app.listen(PORT, () => {
  console.log(`Server is listening on => http://localhost:${PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err}`);
  console.log(`Shutting down the server due to unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
