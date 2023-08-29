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

app.post("/login", (req, res) => {
    const { email, senha } = req.body;
    
    let SQL = "SELECT * FROM clients WHERE email = ? AND senha = ?";
    
    db.query(SQL, [email, senha], (err, result) => {
        if (err) {
            res.status(500).json({ error: "Erro no servidor" });
            console.log("Erro no servidor")
        } else if (result.length === 0) {
            res.status(401).json({ error: "Credenciais inválidas" });
            console.log("Credenciais inválidas")
        } else {
            // Login bem-sucedido
            res.status(200).json({ message: "Login bem-sucedido" });
            console.log("Login bem-sucedido")
        }
    });
});

app.listen(3001, () => {console.log("rodando servidor");
});

