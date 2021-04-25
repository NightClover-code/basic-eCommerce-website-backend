//importing dependencies
const cors = require('cors');
const express = require('express');
const stripe = require('stripe')('');
const uuid = require('uuid/dist/v4');
//initializing app
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.get('/', (req, res) => {
  res.send('It works yep!');
});

//listen
const port = 8000;
app.listen(port, () => console.log(`listenning at port ${port}`));
