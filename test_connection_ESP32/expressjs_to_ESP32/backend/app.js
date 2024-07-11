const express = require('express');
const app = express();
const port = 9897;

let dataToSend = 'Hey Scott Hirano';

app.get('/get-data', (req, res) => {
  res.send(dataToSend);
});

app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}`);
});

module.exports = app;