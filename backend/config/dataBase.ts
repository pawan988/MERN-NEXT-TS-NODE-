import mongoose from "mongoose";

const dataBaseConnected = (): void => {
  const options: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose
    .connect(process.env.DB_URI as string, options)
    .then((data) => {
      console.log(`mongodb connected with server: ${data.connection.host}`);
    })
    .catch((err) => console.error(err));
};

export default dataBaseConnected;
