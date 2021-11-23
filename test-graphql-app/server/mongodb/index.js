/* /mongodb/index.js */

const mongoose = require("mongoose");
const { dbUrl } = require("../config");
// const dbUrl = 'mongodb://127.0.0.1:27017/Movie'; // 数据库地址

const connect = () => {
  // mongoose.set('debug', true)
  mongoose.connect(dbUrl);

  mongoose.connection.on("disconnected", () => {
    mongoose.connect(dbUrl);
  });

  mongoose.connection.on("error", (err) => {
    console.error('Connect Failed: ', err);
  });

  mongoose.connection.on("open", async () => {
    console.log('🚀 Connecting MongoDB Successfully 🚀');
  });
};

connect();
