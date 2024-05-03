const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/");

const billingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  phone: {
    type: String,
    required: true
  },
  addressLine1: {
    type: String,
    required: true
  },
  addressLine2: String,
  city: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  companyName: String,
  termsAccepted: {
    type: Boolean,
    required: true
  },
  marketingAccepted: Boolean,
  orderComment: String,
  vatNumber: String,
  totalPriceInfo: [
    {discountOver300: Number,
      orderDiscount: Number,
      subtotal: Number,
      totalPrice: Number,
    }
  ],
  productsInCart: [
    {
      id: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      currency: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      rebatePercent: Number,
      rebateQuantity: Number,
      upsellProductId: String,
      imageUrl: String,
    },
  ],
});

const Billing = mongoose.model("Billing", billingSchema);

app.post("/billing", async (req, res) => {
  try {
    const newBilling = new Billing(req.body);

    await newBilling.save();

    res.status(200).json({ message: "Billing information saved successfully" });
  } catch (error) {
    console.error("Error saving billing information:", error);
    res
      .status(500)
      .json({ error: "An error occurred while saving billing information" });
  }
});

const PORT = process.env.PORT || 3000; 
const IP_ADDRESS = "localhost"; 

app.listen(PORT, IP_ADDRESS, () => {
  console.log(`Server running on ${IP_ADDRESS}:${PORT}`);
});
