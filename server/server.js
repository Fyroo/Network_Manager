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
app.get("/blocks/:metroid", (req,res) => {
    const metroid = req.params.metroid
    db.query("SELECT * FROM blocks WHERE metroid=?", metroid, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });
});

app.post("/createblock", (req, res) => {
    const name = req.body.name;
    const metroid = req.body.metroid;
    const state = req.body.state;
    const slot = req.body.slot;
    const length = req.body.length;

    db.query(
        "INSERT INTO blocks (name, metroid, state, slot, length) VALUES (?,?,?,?,?)",
        [name, metroid, state, slot,length],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Block created successfully");
            }
        }
    );
});

app.get("/ports/:blockid", (req,res) => {
    const blockid = req.params.blockid
    db.query("SELECT * FROM ports WHERE blockid=?", blockid, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });
});

app.get("/port/:id", (req,res) => {
    const id = req.params.id
    db.query("SELECT * FROM ports WHERE id=?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });
});

app.post("/createport", (req, res) => {
    
    const blockid = req.body.blockid;
    const slot = req.body.slot;

    db.query(
        "INSERT INTO ports (blockid, slot) VALUES (?,?)",
        [blockid, slot],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Port created successfully");
            }
        }
    );
});
app.put("/updateblocks/:id", (req, res) => { // Update the URL parameter to ':id'
    const id = req.params.id; // Retrieve 'id' from URL parameters
    const state = req.body.state;

    db.query(
        "UPDATE blocks SET state=? WHERE id=?",
        [state, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Block state updated successfully");
            }
        }
    );
});

app.post("/createLSW", (req, res) => {
    const name = req.body.name;
    const uplink = req.body.uplink;
    const model = req.body.model;

  
    db.query(
      "INSERT INTO lsw (name, uplink, model) VALUES (?,?,?)",
      [name, uplink, model],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  });

app.put("/updateLSW/:id",(req,res)=>{
    const id = req.params.id;
    const name = req.body.name;
    const uplink = req.body.uplink;
    const model = req.body.model;

    db.query("UPDATE lsw SET  uplink=?, model=?,name=? WHERE id=?"
    ,[uplink,model,name,id],(err,result)=>{
        if (err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.delete("/deleteLSW/:id",(req,res)=>{
    const id = req.params.id
    db.query("DELETE FROM lsw WHERE id=?",id,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})


app.put("/updateport/:id", (req, res) => { // Update the URL parameter to ':id'
    const id = req.params.id; // Retrieve 'id' from URL parameters
    const address = req.body.address;
    const affport = req.body.affport;
    const breakout = req.body.breakout;
    const opthead = req.body.opthead;
    const observ= req.body.observ;

    db.query(
        "UPDATE ports SET address=?, affport=?, breakout=?, opthead=?, observ=? WHERE id=?",
        [address, affport,breakout,opthead,observ,id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Port updated successfully");
            }
        }
    );
});






app.listen(3001, ()=>{
    console.log("  Server running on port 3001 \n  ➜  Local:   http://localhost:3001/ ");
})