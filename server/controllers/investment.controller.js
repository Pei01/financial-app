import mongoose from "mongoose";
import Investment from "../models/investment.model.js";
import User from "../models/user.model.js";

export const createInvestment = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { assetType, symbol, tradeType, quantity, price, date } = req.body;
        const userId = req.user._id;

        const newInvestments = await Investment.create([{ userId, assetType, symbol, tradeType, quantity, price, date }], { session });
        await User.updateOne({ _id: userId }, { $push: { investments: newInvestments[0]._id } }, { session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'Investment created successfully',
            data: newInvestments[0],
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        next(error);
    }
}

export const getInvestments = async (req, res, next) => {

}

export const getInvestment = async (req, res, next) => {

}

export const updateInvestment = async (req, res, next) => {

}

export const deleteInvestment = async (req, res, next) => {

}