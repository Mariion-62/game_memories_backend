const express = require('express');
const cors = require('cors');
const { backPort, db } = require('./config');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/cards', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM cards ORDER BY RAND()');

    res.status(200).json(rows);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/cards/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [card] = await db.query(
      `SELECT id, picture, name, type
      FROM cards
      WHERE id=?
      `,
      [id]
    );
    if (card.length) res.json(card);
    else throw new Error('Pas de carte!');
  } catch (err) {
    console.warn(err);
    res.status(404).send('ERROR');
  }
});

app.post('/cards', async (req, res) => {
  const { picture, name, type } = await req.body;
  await db.query(
    `INSERT INTO cards (picture, name, type)
      VALUES (?,?,?)`,
    [picture, name, type]
  );
  res.status(204).send('Tu as ajouté une nouvelle carte !');
});

app.put('/cards/:id', async (req, res) => {
  const { picture, name, type } = req.body;
  const { id } = req.params;
  await db.query(
    `
    UPDATE cards
    SET picture=?, name=?, type=?
    WHERE id=?
    `,
    [picture, name, type, id]
  );
  res.status(204).send('Tu as mis à jour cette carte');
});

app.delete('/cards/:id', async (req, res) => {
  const { id } = req.params;
  await db.query(
    `
  DELETE FROM cards
  WHERE id=?
  `,
    [id]
  );
  res.status(204).send('Tu as supprimé une carte');
});

app.use('/', (req, res) => {
  res.status(404).send('Route not found ! ');
});

app.listen(backPort, () => {
  console.log(`API now available on http://localhost:${backPort} !`);
});
