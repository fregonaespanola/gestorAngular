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
        const matchingUsers = users.filter(u => u.username === req.params.username);

        if (matchingUsers.length === 0) {
            return res.status(404).send('User not found');
        }

        res.json(matchingUsers);
    });
});
app.get('/get-user-promoter/:username', (req, res) => {
    fs.readFile(path.join(__dirname, '..', 'jsons', 'data.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return res.status(500).send(err.message);
        }

        const users = JSON.parse(data);
        const matchingUsers = users.filter(u => u.promoter === req.params.username);

        if (matchingUsers.length === 0) {
            return res.status(404).send('User not found');
        }

        res.json(matchingUsers);
    });
});
app.get('/get-user-entity/:username', (req, res) => {
    fs.readFile(path.join(__dirname, '..', 'jsons', 'data.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return res.status(500).send(err.message);
        }

        const users = JSON.parse(data);
        const matchingUsers = users.filter(u => u.entity === req.params.username);

        if (matchingUsers.length === 0) {
            return res.status(404).send('User not found');
        }

        res.json(matchingUsers);
    });
});
app.post('/save-petition', (req, res) => {
    const filePath = path.join(__dirname, '..', 'jsons', 'petitions.json');
    const petitionData = req.body;

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '[]');
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        let petitions = [];

        if (!err) {
            try {
                petitions = JSON.parse(data);
            } catch (parseError) {
                console.error('Error parsing petitions JSON:', parseError);
                return res.status(500).send(parseError.message);
            }
        }

        petitions.push(petitionData);

        fs.writeFile(filePath, JSON.stringify(petitions, null, 2), 'utf8', err => {
            if (err) {
                console.error('Error writing to petitions JSON file:', err);
                return res.status(500).send(err.message);
            }
            res.json({ message: 'Petition successfully saved' });
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

