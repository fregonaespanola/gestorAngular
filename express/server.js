
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Función de utilidad para leer y analizar archivos JSON
function readJsonFile(filePath, res, callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return res.status(500).send(err.message);
        }

        const jsonData = JSON.parse(data);
        callback(jsonData);
    });
}
// Función de utilidad para escribir en archivos JSON
function writeJsonFile(filePath, data, res, callback) {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', err => {
        if (err) {
            console.error('Error writing to JSON file:', err);
            return res.status(500).send(err.message);
        }

        callback();
    });
}
app.post('/login', (req, res) => {
    const user = req.body;
    readJsonFile(path.join(__dirname, '..', 'jsons', 'users.json'), res, (users) => {
        const foundUser = users.find(u => u.username === user.username && u.password === user.password);

        if (!foundUser) {
            res.status(401).send('Usuario o contraseña incorrectos');
            return;
        }

        res.send(foundUser);
    });
});

app.get('/get-user', (req, res) => {
    readJsonFile(path.join(__dirname, '..', 'jsons', 'data.json'), res, (users) => {
        res.json(users);
    });
});

app.get('/get-user/:username', (req, res) => {
    readJsonFile(path.join(__dirname, '..', 'jsons', 'data.json'), res, (users) => {
        const matchingUsers = users.filter(u => u.username === req.params.username);

        if (matchingUsers.length === 0) {
            return res.status(404).send('User not found');
        }

        res.json(matchingUsers);
    });
});

app.get('/get-user-promoter/:username', (req, res) => {
    readJsonFile(path.join(__dirname, '..', 'jsons', 'data.json'), res, (users) => {
        const matchingUsers = users.filter(u => u.promoter === req.params.username);

        if (matchingUsers.length === 0) {
            return res.status(404).send('User not found');
        }

        res.json(matchingUsers);
    });
});

app.get('/get-user-entity/:username', (req, res) => {
    readJsonFile(path.join(__dirname, '..', 'jsons', 'data.json'), res, (users) => {
        const matchingUsers = users.filter(u => u.entity === req.params.username);

        if (matchingUsers.length === 0) {
            return res.status(404).send('User not found');
        }

        res.json(matchingUsers);
    });
});

app.get('/chatbot', (req, res) => {
    readJsonFile(path.join(__dirname, '..', 'jsons', 'chatbot.json'), res, (users) => {
        res.json(users);
    });
});
app.post('/save-petition', (req, res) => {
    const filePath = path.join(__dirname, '..', 'jsons', 'petitions.json');
    const petitionData = req.body;

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '[]');
    }

    readJsonFile(filePath, res, (petitions) => {
        petitions.push(petitionData);

        writeJsonFile(filePath, petitions, res, () => {
            res.json({ message: 'Petition successfully saved' });
        });
    });
});

app.get('/compare-data-with-admin-data', (req, res) => {
    readJsonFile(path.join(__dirname, '..', 'jsons', 'data.json'), res, (data) => {
        readJsonFile(path.join(__dirname, '..', 'jsons', 'datos_admin.json'), res, (adminData) => {
            const discrepancies = [];
            adminData.forEach(adminItem => {
                const matchingDataItem = data.find(dataItem => dataItem.id === adminItem.id);
                if (matchingDataItem && (matchingDataItem.total !== adminItem.total || matchingDataItem.monthly_report !== adminItem.monthly_report)) {
                    discrepancies.push(adminItem);
                }
            });

            res.json(discrepancies);
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});