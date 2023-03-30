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


app.listen(3001, ()=>{
    console.log("  Server running on port 3001 \n  ➜  Local:   http://localhost:3001/ ");
})