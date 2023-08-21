const apps = require("./app");
const dotenv = require("dotenv");
import dataBaseConnected from "./config/dataBase";
dotenv.config({ path: "config/config.env" });

// HANDLE UNCAUGHT EXCEPTION

process.on("uncaughtException", (err: Error) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
});
dataBaseConnected();
const server = apps.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT} `);
});

// UNHANDLED PROMISE REJECTION

process.on("unhandledRejection", (err: Error) => {
  console.log(`Error: ${err.message}`);
  console.log(
    "Shutting down the server due to the unhandled Promise Rejection"
  );
  server.close(() => {
    process.exit(1);
  });
});
