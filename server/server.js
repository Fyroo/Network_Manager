const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const DbAdmin = require("./DbAdmin");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(cors({
  origin: "http://client", // Replace with your React app's URL
  methods: ["GET", "POST","DELETE","PUT"],
  credentials: true,
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "id",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 1000,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'mysql_db', 
  user: 'root', 
  password: 'MYSQL_ROOT_PASSWORD', 
  database: 'optidocdb' 
})

////////////////////
const login = DbAdmin.info;
// const db = mysql.createConnection({
//   user: login.user,
//   host: login.host,
//   password: login.password,
//   database: login.database,
//   insecureAuth: login.insecureAuth,
// });

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO user (username, password) VALUES (?,?)",
      [username, hash],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.sendStatus(200);
        }
      }
    );
  });
});

app.get("/logincheck", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
    console.log({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
    console.log({ loggedIn: false });
  }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM user WHERE username = ?",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            console.log(req.session.user);
            res.send(result);
          } else {
            res.send({ message: "Wrong username/password combination!" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.sendStatus(200);
    }
  });
});
///////////////////
app.get("/users", (req, res) => {
  db.query("SELECT * FROM user", (err, result) => {
    if (err) {
      res.status(500).send({ error: "Failed to fetch users from the database" });
    } else {
      res.status(200).send(result);
    }
  });
});

app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const newRole = req.body.role;

  db.query(
    "UPDATE user SET role = ? WHERE id = ?",
    [newRole, userId],
    (err, result) => {
      if (err) {
        res.status(500).send({ error: "Failed to update the user's role" });
      } else {
        res.status(200).send({ message: "User role updated successfully" });
      }
    }
  );
});
app.put("/user/:id", (req, res) => {
  const userId = req.params.id;
  const { username, email, gender, birthday } = req.body;

  db.query(
    "UPDATE user SET username = ?, email = ?, gender = ?, birthday = ? WHERE id = ?",
    [username, email, gender, birthday, userId],
    (err, result) => {
      if (err) {
        res.status(500).send({ error: "Failed to update the user's information" });
      } else {
        res.status(200).send({ message: "User information updated successfully" });
      }
    }
  );
});

//////////////////
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
    "  Server running on port 3001 \n  ➜  Local:   /api/ "
  );
});
