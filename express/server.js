const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const cors = require('cors');

app.use(cors());
app.use(express.json());

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
