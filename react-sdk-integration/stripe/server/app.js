import express from 'express';
import axios from 'axios';
import cors from 'cors';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const PORT = 4000;
const CORRILY_API_KEY = process.env.CORRILY_API_KEY;
const STRIPE_API_KEY = process.env.STRIPE_API_KEY;

const app = express();
const stripe = Stripe(STRIPE_API_KEY);

app.use(express.json());
app.use(cors());

app.post('/create-checkout-session', async (req, res) => {
  const { product_api_id, user_id, country, success_url, cancel_url } = req.body;

  console.log("product_api_id: ", product_api_id);
  console.log("user_id: ", user_id);
  console.log("country: ", country);
  console.log("success_url: ", success_url);
  console.log("cancel_url: ", cancel_url);

  const { data: corrilyProduct } = await axios.get(`https://client.corrily.com/v1/products/${product_api_id}`, {
    headers: {
      'x-api-key': process.env.CORRILY_API_KEY
    }
  });
  console.log("Successfully fetched corrily product: ", corrilyProduct.id);

  const integration = corrilyProduct.integrations.find(integration => integration.type === "stripe_with_interval");
  const stripeProductId = integration ? integration.stripe_product_id : null;
  const stripeInterval = integration ? integration.interval : null;
  const stripeIntervalCount = integration ? integration.interval_count : null;

  const currency = "USD";
  const amount = 1234;

  // Here we don't pass Stripe Customer ID assuming customer is new and have to be created automatically by Stripe
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [{
      price_data: {
        currency: currency,
        product: stripeProductId,
        unit_amount: amount,
        recurring: {
          interval: stripeInterval,
          interval_count: stripeIntervalCount,
        },
      },
      quantity: 1,
    }],
    success_url: success_url,
    cancel_url: cancel_url,
    metadata: {
      user_id: user_id,
    },
  });

  res.send({
    session_url: session.url
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
