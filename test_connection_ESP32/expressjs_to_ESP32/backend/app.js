const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 9897;

app.use(bodyParser.json());

app.post('/api/data', (req, res) => {
  console.log(req.body);
  res.send('Data received');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;