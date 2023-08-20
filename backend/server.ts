const apps = require("./app");
const dotenv = require("dotenv");
import dataBaseConnected from "./config/dataBase";
dotenv.config({ path: "config/config.env" });

dataBaseConnected();
apps.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT} `);
});
