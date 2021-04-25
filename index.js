//importing dependencies
const cors = require('cors');
const express = require('express');
const stripe = require('stripe')(
  'sk_test_51IjZuuL7ToTGVysx0cm8p89HV8pU7ir17P3g3a3sVbGeDi3G4q8q7g9opJmEUUXFq9aR7ZKRVrZWWCqKJism727Z00Ho0cL6J0'
);
const { v4: uuidv4, v4 } = require('uuid');
//initializing app
const app = express();

//middleware
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
const port = 8282;
app.listen(port, () =>
  console.log(`listening at port ${port}`, `visit http://localhost:${port}`)
);
