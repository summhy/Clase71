//Paquetes
import express from "express";
import {pool} from "./conexion.js"
//variable
const app = express();

//configuraciones
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false })) // envio de post
app.use(express.json()) // envío de post


//Rutas
app.get("/",(req, res)=>{
    res.render("index");
});
app.get("/getUsuarios", async (req, res)=>{
    const resultado = await pool.query("select * from usuarios");
    pool.release;
    //console.log(resultado.rows);
    res.json(resultado.rows);
});

app.post("/addUsuario", async(req,res)=>{
    console.log(req.body);
    try{
        await pool.query("insert into usuarios (nombre, apellido, password) values ($1,$2,$3)",
        [req.body.nombre, req.body.apellido, req.body.password]);
        res.sendStatus(201);
    }catch(err){
        res.sendStatus(400);
    }
})

app.delete("/deleteUsuario/:id", async(req, res)=>{
    console.log(req.params.id);
    try{
        const resultado = await pool.query("delete from usuarios where id = $1 RETURNING id",
        [req.params.id]);
        if(resultado.rowCount>0){
            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
        
    }catch(err){
        res.sendStatus(400);
    }
});

app.put("/editUsuario",async(req,res)=>{
    console.log(req.body);
    try{
        const resultado = await pool.query("update usuarios set nombre=$1, apellido=$2, password=$3 where id=$4",
        [req.body.nombre, req.body.apellido, req.body.password, req.body.id]);
        if(resultado.rowCount>0){
            res.sendStatus(200);
        }else{
            res.sendStatus(404);            
        }
    }catch(err){
        res.sendStatus(400);
    }
    

});

//Servicio
app.listen(3000, ()=>console.log("servidor puerto 3000"));