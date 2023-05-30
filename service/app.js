const express = require('express');
const cors = require('cors');

const initHabitats = require('./data/habitats.json');
const habitats = initHabitats;
const initSpecies = require('./data/species.json');
const species = initSpecies;
const initStations = require('./data/stations.json');
const stations = initStations;

const app = express();

app.use(cors());
app.use(express.json())

const port = 3000;

app.get('/habitats', (req, res) => res.send(habitats));
app.post('/habitats', (req, res) => habitats.push(req.body));

app.get('/species', (req, res) => res.send(species));
app.post('/species', (req, res) => species.push(req.body));

app.get('/stations', (req, res) => res.send(stations));
app.post('/stations', (req, res) => stations.push(req.body));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})