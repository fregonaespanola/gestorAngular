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
app.get('/get-user', (req, res) => {
    fs.readFile(path.join(__dirname, '..', 'jsons', 'data.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return res.status(500).send(err.message);
        }

        const users = JSON.parse(data);

        res.json(users);
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

app.get('/chatbot', (req, res) => {
    fs.readFile(path.join(__dirname, '..', 'jsons', 'chatbot.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return res.status(500).send(err.message);
        }

        const users = JSON.parse(data);

        res.json(users);
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
    
    fs.readFile(path.join(__dirname, '..', 'jsons', 'data.json'), 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading JSON file:', err);
        return res.status(500).send(err.message);
      }
  
      let registers = JSON.parse(data);
      
      const indexToDelete = registers.findIndex(register => register.id === parseInt(idToDelete));
      if (indexToDelete !== -1) {
        registers.splice(indexToDelete, 1);
  
        fs.writeFile(path.join(__dirname, '..', 'jsons', 'data.json'), JSON.stringify(registers, null, 2), 'utf8', err => {
          if (err) {
            console.error('Error writing JSON file:', err);
            return res.status(500).send(err.message);
          }
    
          res.json({ message: 'Registro eliminado exitosamente' });
        });
      } else {
        res.status(404).send('Registro no encontrado');
      }
    });
  });

  app.get('/compare-data-with-admin-data', (req, res) => {
    // Leer el contenido de data.json y datos_admin.json
    fs.readFile(path.join(__dirname, '..', 'jsons', 'data.json'), 'utf8', (err, dataJson) => {
        if (err) {
            console.error('Error al leer data.json:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }

        fs.readFile(path.join(__dirname, '..', 'jsons', 'datos_admin.json'), 'utf8', (err, adminDataJson) => {
            if (err) {
                console.error('Error al leer datos_admin.json:', err);
                res.status(500).send('Error interno del servidor');
                return;
            }

            try {
                const data = JSON.parse(dataJson);
                const adminData = JSON.parse(adminDataJson);

                // Comparar los datos y encontrar discrepancias
                const discrepancies = [];
                adminData.forEach(adminItem => {
                    const matchingDataItem = data.find(dataItem => dataItem.id === adminItem.id);
                    if (matchingDataItem && (matchingDataItem.total !== adminItem.total || matchingDataItem.monthly_report !== adminItem.monthly_report)) {
                        discrepancies.push(adminItem);
                    }
                });

                // Devolver las discrepancias encontradas al cliente Angular
                res.json(discrepancies);
            } catch (parseError) {
                console.error('Error al analizar los datos JSON:', parseError);
                res.status(500).send('Error interno del servidor');
            }
        });
    });
});


  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


