const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const DbAdmin = require('./DbAdmin')


app.use(cors());
app.use(express.json());
const login = DbAdmin.info;
const db =mysql.createConnection({
    user : login.user,
    host: login.host,
    password: login.password,
    database: login.database,
    insecureAuth : login.insecureAuth
});

app.get("/metro", (req,res) =>{
    db.query("SELECT * FROM metro", (err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.json(result)
        }
    })
});
app.get("/lsw", (req,res) =>{
    db.query("SELECT * FROM lsw", (err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.json(result)
        }
    })
});
app.get("/portsmetro", (req,res) =>{
    db.query("SELECT * FROM portsmetro", (err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.json(result)
        }
    })
});

app.post("/createmetro", (req, res) => {
    const name = req.body.name;
    const ip = req.body.ip;
    const model = req.body.model;

  
    db.query(
      "INSERT INTO metro (name, ip, model) VALUES (?,?,?)",
      [name, ip, model],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  });

app.put("/updatemetro",(req,res)=>{
    const name = req.body.name;
    const ip = req.body.ip;
    const model = req.body.model;

    db.query("UPDATE metro SET  ip=?, model=? WHERE name=?"
    ,[ip,model,name],(err,result)=>{
        if (err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.delete("/deletemetro/:name",(req,res)=>{
    const name = req.params.name
    db.query("DELETE FROM metro WHERE name=?",name,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.listen(3001, ()=>{
    console.log("  Server running on port 3001 \n  ➜  Local:   http://localhost:3001/ ");
})