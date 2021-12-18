// const express = require('express');
// const db = require('./config');

// const app = express();

// app.use(express.json());

// app.get('/cards', async (req, res) => {
//   await db.query('SELECT * FROM cards', (err, result) => {
//     if (err) {
//       res.status(500).send('Error retrieving data from database');
//     } else {
//       res.status(200).json(result);
//     }
//     console.log(result);
//   });
// });

// // app.listen(port, () => {
// //   console.log(`Server listening on port`);
// // });
