//importing dependencies
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//initializing app
const app = express();

//middlewares
app.use(
  cors({
    origin: true,
  })
);
app.use(express.json());

//routes
app.post('/payments/create', async (req, res) => {
  try {
    //getting info from the client
    const { amount, shipping } = req.body;
    //sending payment intent
    const paymentIntent = await stripe.paymentIntents.create({
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
const port = process.env.PORT;
app.listen(port, () =>
  console.log(`listening at port ${port}`, `visit http://localhost:${port}`)
);
