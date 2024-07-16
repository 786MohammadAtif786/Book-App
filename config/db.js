

const mongoose = require("mongoose");
const colors = require("colors");
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected To Database ${mongoose.connection.host} `.bgGreen);
  } catch (error) {
    console.log("DB Error", error);
  }
};
module.exports = connectDb;