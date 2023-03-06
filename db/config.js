const mongoose = require("mongoose");

const conexionDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONECCIONS);
    console.log("conectado a db");
  } catch (error) {
    console.log("error al conectarse" + error);
  }
};

//const Cat = mongoose.model('Cat', { name: String });

module.exports = conexionDB;
