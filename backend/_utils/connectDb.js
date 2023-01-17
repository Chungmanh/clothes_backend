const mongoose = require("mongoose");
const db = require("../_config/db");

async function connect() {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connect cuccessfully!!!");
  } catch (error) {
    console.log("connect failure!!!");
  }
}

module.exports = connect;
