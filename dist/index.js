"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: true,
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
mongoose_1.default.connect("mongodb+srv://almoma:Alimasoud2003@cluster0.0ykzcxs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log('MongoDB connected...'))
    .catch((err) => console.error(err));
const billingSchema = new mongoose_1.default.Schema({
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
const Billing = mongoose_1.default.model("Billing", billingSchema);
app.post("/api/billing", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBilling = new Billing(req.body);
        yield newBilling.save();
        res.status(200).json({ message: "Billing information saved successfully" });
    }
    catch (error) {
        console.error("Error saving billing information:", error);
        res.status(500).json({ error: "An error occurred while saving billing information" });
    }
}));
const PORT = parseInt(process.env.PORT || '3000', 10);
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on 0.0.0.0:${PORT}`);
});
