// This is your test secret API key.
require('dotenv').config();
const stripe = require('stripe')(process.env.PRIVATE_KEY);
const express = require('express');
const app = express();
const cors = require("cors")
app.use(express.static('public'));
app.use(express.json())
app.use(cors())


const YOUR_DOMAIN = 'https://react-eshop.onrender.com';

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
    line_items: lineItems,
    shipping_address_collection: {
      allowed_countries: ["SK", "CZ"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {amount: 0, currency: 'usd'},
          display_name: 'Free shipping',
          delivery_estimate: {
            minimum: {unit: 'business_day', value: 5},
            maximum: {unit: 'business_day', value: 7},
          },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {amount: 1500, currency: 'usd'},
          display_name: 'Next day air',
          delivery_estimate: {
            minimum: {unit: 'business_day', value: 1},
            maximum: {unit: 'business_day', value: 1},
          },
        },
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.json({ id: session.id });
});


const port = process.env.PORT || 4242 
app.listen(port, () => console.log('Running on ' + port));