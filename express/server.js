const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// Middleware para permitir solicitudes CORS
app.use(cors());

app.use(cors({
    origin: 'http://localhost:4200' // Reemplaza con el origen de tu aplicación Angular
}));


app.get('/get-data', (req, res) => {
    const filePath = path.join(__dirname, '..', 'jsons', 'data.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return res.status(500).send(err.message);
        }
        res.json(JSON.parse(data));
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
