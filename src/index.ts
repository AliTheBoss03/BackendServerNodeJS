import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';

const app = express();

const corsOptions = {
  origin: "http://130.225.170.52",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://almoma:Alimasoud2003@cluster0.0ykzcxs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log('MongoDB connected...'))
  .catch((err: any) => console.error(err));

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
    {
      discountOver300: Number,
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

app.post("/api/billing", async (req: Request, res: Response) => {
  try {
    const newBilling = new Billing(req.body);
    await newBilling.save();

    res.status(200).json({ message: "Billing information saved successfully" });
  } catch (error) {
    console.error("Error saving billing information:", error);
    res.status(500).json({ error: "An error occurred while saving billing information" });
  }
});

const PORT = parseInt(process.env.PORT || '3000', 10);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on 0.0.0.0:${PORT}`);
});
