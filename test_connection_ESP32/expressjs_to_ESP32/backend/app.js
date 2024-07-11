const express = require('express');
const app = express();
const port = 9897;

let dataToSend = 'Hey Scott Hirano';

app.get('/send-to-esp32', (req, res) => {
  dataToSend = 'Yo Tatsuya Hirano'; // Set the data you want to send to ESP32
  res.send('Data is ready to be polled by ESP32');
});

app.get('/get-data', (req, res) => {
  res.send(dataToSend);
});

app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}`);
});
