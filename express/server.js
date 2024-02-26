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


app.get('/get-all-users', (req, res) => {
    fs.readFile(path.join(__dirname, '..', 'jsons', 'data.json'), 'utf8', (err, data) => {
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
});

app.post('/add-register', (req, res) => {
    const filePath = path.join(__dirname, '..', 'jsons', 'data.json');
    const petitionData = req.body;

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '[]');
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data JSON file:', err);
            return res.status(500).send(err.message);
        }

        let dataJson = [];

        try {
            dataJson = JSON.parse(data);
        } catch (parseError) {
            console.error('Error parsing data JSON:', parseError);
            return res.status(500).send(parseError.message);
        }
        const filteredData = dataJson.filter(item => item.username === petitionData.username);

        if (filteredData.length === 0) {
            return res.status(404).send('No hay registros para el username especificado');
        }

        const lastId = dataJson.length > 0 ? dataJson[dataJson.length - 1].id : 0;
        const newId = lastId + 1;
        const lastRecord = filteredData[filteredData.length - 1];

        const newRecord = {
            id: newId,
            name: lastRecord.name,
            username: petitionData.username,
            surname: lastRecord.surname,
            promoter: petitionData.promoter,
            entity: petitionData.entity,
            month: petitionData.month,
            total: (parseInt(lastRecord.total) + parseInt(petitionData.monthly_report)).toString(),
            monthly_report: petitionData.monthly_report
        };        

        dataJson.push(newRecord);

        fs.writeFile(filePath, JSON.stringify(dataJson, null, 2), 'utf8', err => {
            if (err) {
                console.error('Error writing to data JSON file:', err);
                return res.status(500).send(err.message);
            }
            res.json({ message: 'Petition successfully saved' });
        });
    });
});

app.put('/update-register', (req, res) => {
    const updatedRegister = req.body;
  
    fs.readFile(path.join(__dirname, '..', 'jsons', 'data.json'), 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading JSON file:', err);
        return res.status(500).send(err.message);
      }
  
      let registers = JSON.parse(data);
  
      const index = registers.findIndex(register => register.id === updatedRegister.id);
      if (index !== -1) {
        const act = {
            name: updatedRegister.id,
            username: updatedRegister.username,
            surname: registers[index].surname,
            promoter: updatedRegister.promoter,
            entity: updatedRegister.entity,
            month: updatedRegister.month,
            total: (parseInt(registers[index].total) - parseInt(registers[index].monthly_report)  + parseInt(updatedRegister.monthly_report)).toString(), // Convertir la suma a string
            monthly_report: updatedRegister.monthly_report
        }; 
        registers[index] = act;
  
        var updatedTotal = parseInt(registers[index].total);

            registers.forEach((record, idx) => {
                if (record.username === updatedRegister.username && parseInt(record.total) > updatedTotal) {
                    console.log("entra "+record.month)
                    const newTotal = parseInt(record.monthly_report) + updatedTotal;
                    updatedTotal = newTotal;
                    registers[idx].total = newTotal.toString();
                }
            });

        fs.writeFile(path.join(__dirname, '..', 'jsons', 'data.json'), JSON.stringify(registers, null, 2), 'utf8', err => {
          if (err) {
            console.error('Error writing JSON file:', err);
            return res.status(500).send(err.message);
          }
  
          res.json(updatedRegister);
        });
      } else {
        res.status(404).send('Registro no encontrado');
      }
    });
});

app.delete('/delete-register/:id', (req, res) => {
    const idToDelete = req.params.id;
    
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

