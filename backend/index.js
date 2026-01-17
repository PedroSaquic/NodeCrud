const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbusuarios'
});

//CREATE
app.post('/usuarios', (req, res)=>{
    const { nombre, email } = req.body;
    db.query('INSERT INTO usuarios (nombre, email) VALUES (?, ?)', [nombre, email],(err, result)=>{
        if (err) return res.json(err);
        res.json('Usuario creado');
    });
})
//READ
app.get('/usuarios', (req, res)=>{
    db.query('SELECT * FROM usuarios', (err, result)=>{
        if (err) return res.json(err);
        res.json(result);
    });
});
//UPDATE
app.put('/usuarios/:id', (req, res)=>{
    const {id} = req.params;
    const {nombre, email} = req.body;
    db.query('UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?', [nombre, email, id], (err, result)=>{
        if(err) return res.json(err);
        res.json(result);
    });
});

//DELETE
app.delete('/usuarios/:id', (req, res)=>{
    const {id} = req.params;
    db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result)=>{
        if(err) return res.json(err);
        res.json(result);
    });
});

app.listen(port, ()=>{
    console.log('Servidor en puerto ' + port);
});