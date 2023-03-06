const cors = require("cors");
const express = require("express");
const conexionDB = require("./db/config");

const authRouter = require("./routes/auth");
const Tareasrouter = require("./routes/tareas");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

conexionDB();

app.use("/", express.static(__dirname + "/public"));
app.use("/auth", authRouter);
app.use("/tarea", Tareasrouter);
//conexionDB.then(()=>{console.log("conectado")})

app.listen(process.env.PORT, () => {
  //console.log(`${process.env.PORT}`)
});
