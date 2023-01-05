const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_LIVE_URL, {
      useNewUrlparser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log(
        `MongoDb Database connected with HOST: ${con.connection.host}`
      );
    });
};

module.exports = connectDatabase;
