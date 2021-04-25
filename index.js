//importing dependencies
const cors = require("cors");
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4, v4 } = require("uuid");
//initializing app
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.get("/", (req, res) => {
  res.send("IT WORKS");
});

//listen
const port = 8282;
app.listen(port, () =>
  console.log(`listening at port ${port}`, `visit http://localhost:${port}`)
);
