import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    assetType: {
        type: String,
        enum: ['usStock', 'twStock', 'crypto'],
        required: true,
    },
    symbol: {
        type: String,
        required: true,
        trim: true,
    },
    tradeType: {
        type: String,
        enum: ['buy', 'sell'],
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

const Investment = mongoose.model('Investment', investmentSchema);

export default Investment;