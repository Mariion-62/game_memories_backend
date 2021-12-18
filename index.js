const express = require('express');
const cors = require('cors');
const { backPort, db } = require('./config');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/cards', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM cards');

    res.status(200).json(rows);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/toto', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id FROM cards');
    res.status(200).send(rows);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.use('/', (req, res) => {
  res.status(404).send('Route not found ! ');
});

app.listen(backPort, () => {
  console.log(`API now available on http://localhost:${backPort} !`);
});
