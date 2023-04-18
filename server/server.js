// This is your test secret API key.
require('dotenv').config();
const stripe = require('stripe')(process.env.PRIVATE_KEY);
const express = require('express');
const app = express();
const cors = require("cors")
app.use(express.static('public'));
app.use(express.json())
app.use(cors())


const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/create-checkout-session', async (req, res) => {
  const cartItems = req.body.cartItems;

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ message: 'No items in cart' });
  }

  const lineItems = cartItems.map(item => {
    return {
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.title,
          images: [item.image],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.json({ id: session.id });
});



app.listen(4242, () => console.log('Running on port 4242'));