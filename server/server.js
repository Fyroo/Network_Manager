const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const DbAdmin = require("./DbAdmin");

app.use(cors());
app.use(express.json());
const login = DbAdmin.info;
const db = mysql.createConnection({
  user: login.user,
  host: login.host,
  password: login.password,
  database: login.database,
  insecureAuth: login.insecureAuth,
});

app.get("/metro", (req, res) => {
  db.query("SELECT * FROM metro", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
app.get("/lsw", (req, res) => {
  db.query("SELECT * FROM lsw", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
app.get("/portsmetro", (req, res) => {
  db.query("SELECT * FROM portsmetro", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
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

app.put("/updatemetro", (req, res) => {
  const name = req.body.name;
  const ip = req.body.ip;
  const model = req.body.model;

  db.query(
    "UPDATE metro SET  ip=?, model=? WHERE name=?",
    [ip, model, name],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/deletemetro/:name", (req, res) => {
  const name = req.params.name;
  db.query("DELETE FROM metro WHERE name=?", name, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.get("/blocks/:metroid", (req, res) => {
  const metroid = req.params.metroid;
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
    [name, metroid, state, slot, length],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Block created successfully");
      }
    }
  );
});

app.get("/ports/:blockid", (req, res) => {
  const blockid = req.params.blockid;
  db.query("SELECT * FROM ports WHERE blockid=?", blockid, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.get("/port/:id", (req, res) => {
  const id = req.params.id;
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
app.put("/updateblocks/:id", (req, res) => {
  // Update the URL parameter to ':id'
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

app.put("/updateLSW/:id", (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const uplink = req.body.uplink;
  const model = req.body.model;

  db.query(
    "UPDATE lsw SET  uplink=?, model=?,name=? WHERE id=?",
    [uplink, model, name, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/deleteLSW/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM lsw WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/updateport/:id", (req, res) => {
  // Update the URL parameter to ':id'
  const id = req.params.id; // Retrieve 'id' from URL parameters
  const address = req.body.address;
  const affport = req.body.affport;
  const breakout = req.body.breakout;
  const opthead = req.body.opthead;
  const observ = req.body.observ;

  db.query(
    "UPDATE ports SET address=?, affport=?, breakout=?, opthead=?, observ=? WHERE id=?",
    [address, affport, breakout, opthead, observ, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Port updated successfully");
      }
    }
  );
});

///////////////////////////////

app.get("/lswblocks/:lswid", (req, res) => {
  const lswid = req.params.lswid;
  db.query("SELECT * FROM lswblocks WHERE lswid=?", lswid, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/createlswblock", (req, res) => {
  const name = req.body.name;
  const lswid = req.body.lswid;
  const state = req.body.state;
  const slot = req.body.slot;
  const length = req.body.length;

  db.query(
    "INSERT INTO lswblocks (name, lswid, state, slot, length) VALUES (?,?,?,?,?)",
    [name, lswid, state, slot, length],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Block created successfully");
      }
    }
  );
});

app.get("/lswports/:blockid", (req, res) => {
  const blockid = req.params.blockid;
  db.query("SELECT * FROM lswports WHERE blockid=?", blockid, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.get("/lswport/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM lswports WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/createlswport", (req, res) => {
  const blockid = req.body.blockid;
  const slot = req.body.slot;

  db.query(
    "INSERT INTO lswports (blockid, slot) VALUES (?,?)",
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

app.put("/updatelswblocks/:id", (req, res) => {
  // Update the URL parameter to ':id'
  const id = req.params.id; // Retrieve 'id' from URL parameters
  const state = req.body.state;

  db.query(
    "UPDATE lswblocks SET state=? WHERE id=?",
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

app.put("/updatelswport/:id", (req, res) => {
  // Update the URL parameter to ':id'
  const id = req.params.id; // Retrieve 'id' from URL parameters
  const address = req.body.address;
  const client = req.body.client;
  const breakout = req.body.breakout;
  const otfo = req.body.otfo;
  const pos = req.body.pos;

  db.query(
    "UPDATE lswports SET address=?, client=?, breakout=?, otfo=?, pos=? WHERE id=?",
    [address, client, breakout, otfo, pos, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Port updated successfully");
      }
    }
  );
});
////////////////////////////////////////////////////////////////////////////////////
app.get("/fo/:FO", (req, res) => {
  const FO = req.params.FO;
  db.query("SELECT * FROM fo WHERE FO=?", FO, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/createfo", (req, res) => {
  const name = req.body.name;
  const client = req.body.client;
  const pos = req.body.pos;
  const ref = req.body.ref;
  const breakout = req.body.breakout;
  const FO = req.body.FO;

  db.query(
    "INSERT INTO fo (name, client, pos,ref,breakout,FO) VALUES (?,?,?,?,?,?)",
    [name, client, pos, ref, breakout, FO],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.put("/updatefo/:id", (req, res) => {
  // Update the URL parameter to ':id'
  const id = req.params.id;
  const name = req.body.name;
  const client = req.body.client;
  const pos = req.body.pos;
  const ref = req.body.ref;
  const breakout = req.body.breakout;

  db.query(
    "UPDATE fo SET name=?, client=?, breakout=?, ref=?, pos=? WHERE id=?",
    [name, client, breakout, ref, pos, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("fo updated successfully");
      }
    }
  );
});
app.delete("/deleteFO/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM fo WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
/////////////////////////////////////////////////////////////////////////////////////
app.get("/central", (req, res) => {
  db.query("SELECT * FROM central", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.get("/regdata/:centralid", (req, res) => {
  const centralid = req.params.centralid;
  const armoirid = req.query.armoirid; // retrieve from query parameters
  const regid = req.query.regid; // retrieve from query parameters

  db.query(
    "SELECT * FROM regdata WHERE centralid=? AND armoirid=? AND regid=?",
    [centralid, armoirid, regid],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.json(result);
      }
    }
  );
});

app.post("/createcentral/:name", (req, res) => {
  const name = req.params.name;
  db.query("INSERT INTO central (name) VALUES (?)", [name], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const newId = result.insertId;
      console.log("New central ID:", newId);
      res.send(newId.toString());
    }
  });
});

app.post("/createregdata", (req, res) => {
    const name = req.body.name;
    const centralid = req.body.centralid;
    const armoirid = req.body.armoirid;
    const regid = req.body.regid;
    db.query(
      "INSERT INTO regdata (name,centralid,armoirid,regid) VALUES (?,?,?,?)",
      [name, centralid, armoirid, regid],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  });

  app.put("/updateReg/:id", (req, res) => {
    // Update the URL parameter to ':id'
    const id = req.params.id;
    const A = req.body.A;
    const B = req.body.B;
    const FO = req.body.FO;
    const dest = req.body.dest;
    const obs = req.body.obs;
  
    db.query(
      "UPDATE regdata SET A=?, B=?, FO=?, dest=?, obs=? WHERE id=?",
      [A, B, FO, dest, obs, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Reg updated successfully");
        }
      }
    );
  });
/////////////////////////////////////////////////////////////////////////////////////
app.listen(3001, () => {
  console.log(
    "  Server running on port 3001 \n  ➜  Local:   http://localhost:3001/ "
  );
});
