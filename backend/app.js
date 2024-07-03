var express = require("express");
const cors = require('cors');

const app = express();

const init_routes = require("./routes/init_routes")
const account_routes = require("./routes/account_routes")
const controll_routes = require("./routes/controll_route")

const port = 9897;

app.use(cors());
app.use(express.json());
app.use(init_routes);
app.use(account_routes);
app.use(controll_routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  });

module.exports = app;