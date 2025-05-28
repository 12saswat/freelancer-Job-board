const mongoose = require("mongoose");

const connectToDb = () => {
  mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => {
      console.log("Connected successefully to DB");
    })
    .catch((err) => console.log(err));
};

module.exports = connectToDb;
