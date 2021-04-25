//importing dependencies
const cors = require('cors');
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4, v4 } = require('uuid');
//initializing app
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.get('/', (req, res) => {
  res.send('IT WORKS');
});

app.get('/payment/create', async (req, res) => {
  try {
    //getting info from the client
    const { amount, shipping } = req.body;
    //sending payment intent
    const paymentIntent = await stripe.paymentIntent.create({
      shipping,
      amount,
      currency: 'usd',
    });
    //resolving
    res.status(200).send(paymentIntent.client_secret);
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: err.message,
    });
  }
});

app.get('*', (req, res) => {
  res.status(404).send('404, not found');
});

//listen
const port = 8282;
app.listen(port, () =>
  console.log(`listening at port ${port}`, `visit http://localhost:${port}`)
);
