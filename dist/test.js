// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
const sendThankYouEmail = require('./emailService'); // Tilføj denne linje

const app = express();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://almoma:Alimasoud2003@cluster0.0ykzcxs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.error(err));

const billingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  phone: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: String,
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true },
  companyName: String,
  termsAccepted: { type: Boolean, required: true },
  marketingAccepted: Boolean,
  orderComment: String,
  vatNumber: String,
  totalPriceInfo: [
    {
      discountOver300: Number,
      orderDiscount: Number,
      subtotal: Number,
      totalPrice: Number,
    }
  ],
  productsInCart: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      currency: { type: String, required: true },
      quantity: { type: Number, required: true },
      rebatePercent: Number,
      rebateQuantity: Number,
      upsellProductId: String,
      imageUrl: String,
    },
  ],
  emailSent: { type: Boolean, default: false } // Tilføj dette felt
});

const Billing = mongoose.model("Billing", billingSchema);

app.post("/api/billing", async (req, res) => {
  try {
    const newBilling = new Billing(req.body);
    await newBilling.save();

    res.status(200).json({ message: "Billing information saved successfully" });
  } catch (error) {
    console.error("Error saving billing information:", error);
    res.status(500).json({ error: "An error occurred while saving billing information" });
  }
});

// Planlæg cron-job til at køre hvert 5. minut
cron.schedule('*/5 * * * *', async () => {
  console.log('Running cron job');
  
  try {
    const unsentEmails = await Billing.find({ emailSent: false });
    unsentEmails.forEach(async (order) => {
      // Send tak-email
      sendThankYouEmail(order.email, JSON.stringify(order.productsInCart));

      // Opdater ordre for at angive, at e-mail er sendt
      order.emailSent = true;
      await order.save();
    });
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});

const PORT = parseInt(process.env.PORT || '3000', 10);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on 0.0.0.0:${PORT}`);
});
