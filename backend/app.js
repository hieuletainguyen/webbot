var express = require("express");
const cors = require('cors');

const app = express();

const init_routes = require("./routes/init_routes")
const account_routes = require("./routes/accounts_route")
const controll_routes = require("./routes/controll_route")
const booking_routes = require("./routes/booking_route")
const image_routes = require("./routes/image_route")

const port = 9897;

// 'http://localhost:3000'|| 'http://127.0.0.1:3000'
var corsOptions = {
  origin: 'http://localhost:3000'|| 'http://127.0.0.1:3000',
  optionsSuccessStatus: 204,
  credentials: true
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(init_routes);
app.use(account_routes);
app.use(controll_routes);
app.use(booking_routes);
app.use(image_routes);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  });

module.exports = app;