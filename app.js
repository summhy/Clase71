//Paquetes
import express from "express";
import {pool} from "./conexion.js"
//variable
const app = express();

//configuraciones
app.use(express.static("public"));


//Rutas
app.get("/",(req, res)=>{
    res.render("index");
});
app.get("/getUsuarios", async (req, res)=>{
    const resultado = await pool.query("select * from usuarios");
    pool.release;
    res.json(resultado.rows);
})

//Servicio
app.listen(3000, ()=>console.log("servidor puerto 3000"));