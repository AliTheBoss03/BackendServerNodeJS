const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/backEnd");

const billingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  addressLine1: String,
  addressLine2: String,
  city: String,
  zipCode: String,
  country: String,
  companyName: String,
  termsAccepted: Boolean,
  receiveMarketing: Boolean,
  orderComment: String,
  vatNumber: String,
  totalPrice: Number,
  cart: [
    {
      id: String,
      name: String,
      price: Number,
      currency: String,
      quantity: Number,
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

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
