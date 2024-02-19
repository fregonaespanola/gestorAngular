const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const path = require('path');
const port = 3100;

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
const corsOptions = {
    origin: 'http://localhost:4200', 
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.post('/login', (req, res) => {
    const user = req.body;



    fs.readFile(path.join(__dirname, '..', 'jsons', 'users.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }

        const users = JSON.parse(data);
        const foundUser = users.find(u => u.username === user.username && u.password === user.password);

        if (!foundUser) {
            res.status(401).send('Usuario o contraseña incorrectos');
            return;
        }

        res.send(foundUser);
    });
});
app.get('/get-user/:username', (req, res) => {
    fs.readFile(path.join(__dirname, '..', 'jsons', 'data.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return res.status(500).send(err.message);
        }

        const users = JSON.parse(data);
        const user = users.find(u => u.username === req.params.username);

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.json(user);
    });
});

