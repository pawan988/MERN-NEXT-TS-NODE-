const apps = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/config.env" });

apps.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT} `);
});
