const express = require('express');
const cors = require('cors');

const habitatData = require('./data/habitats.json');
const species = require('./data/species.json');
const stations = require('./data/stations.json');

const app = express();
app.use(cors());
const port = 3000;

app.get('/habitats', (req, res) => {
  res.send(habitatData);
})

app.get('/species', (req, res) => {
  res.send(species);
})

app.get('/stations', (req, res) => {
  res.send(stations);
})

app.post('/session', (req, res) => {
  console.log(req.body);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})