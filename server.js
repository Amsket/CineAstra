const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Cambia esto si usas un usuario diferente
    password: 'topo1301', // Contraseña de tu base de datos
    database: 'Cine' // Nombre de tu base de datos
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para registrar usuarios
app.post('/register', (req, res) => {
    const { nombre_usuario, correo, contrasena } = req.body;
    const sql = 'INSERT INTO usuarios (nombre_usuario, correo, contrasena) VALUES (?, ?, ?)';
    db.query(sql, [nombre_usuario, correo, contrasena], (err, result) => {
        if (err) {
            console.error('Error al registrar usuario:', err);
            res.status(500).send('Error al registrar usuario');
            return;
        }
        res.send('Usuario registrado con éxito');
    });
});

// Ruta para iniciar sesión
app.post('/login', (req, res) => {
    const { correo, contrasena } = req.body;
    const sql = 'SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?';
    db.query(sql, [correo, contrasena], (err, results) => {
        if (err) {
            console.error('Error al iniciar sesión:', err);
            res.status(500).send('Error al iniciar sesión');
            return;
        }
        if (results.length > 0) {
            res.send('Inicio de sesión exitoso');
        } else {
            res.status(401).send('Credenciales inválidas');
        }
    });
});

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
