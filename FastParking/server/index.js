const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors")

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"password",
    database:"Fastparking"
});

app.use(cors());
app.use(express.json());

app.post("/register", (req, res)  => {
    const { email } = req.body;
    const { senha } = req.body;
    
    let SQL = "INSERT INTO clients (email, senha) VALUES (?,?)";

    db.query(SQL, [email, senha], (err, result) => {
        console.log(err);
    });
});

function dsadas()
app.listen(3001, () => {console.log("rodando servidor");
});

