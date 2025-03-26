import mongoose from "mongoose";
import Investment from "../models/investment.model.js";
import User from "../models/user.model.js";
import { getExchangeRate } from "../services/exchangeRateService.js";

export const createInvestment = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { assetType, symbol, tradeType, quantity, price, currency, date } = req.body;
        const userId = req.user._id;
        
        const exchangeRate = await getExchangeRate(currency);
        const convertedPrice = price * exchangeRate;

        const newInvestments = await Investment.create([{ 
            userId, 
            assetType, 
            symbol, 
            tradeType, 
            quantity, 
            price, 
            currency, 
            exchangeRate, 
            convertedPrice, 
            date 
        }], { session });

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
    try {
        const userId = req.user._id;
        const data = await User.findById(userId).populate('investments');
        const investments = data.investments;

        res.status(200).json({
            success: true,
            message: 'Investments retrieved successfully',
            data: investments,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const deleteInvestment = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const investmentId = req.params.id;
        const user = req.user;

        const deletedInvestment = await Investment.findByIdAndDelete(investmentId);

        if (!deletedInvestment) {
            res.status(404).json({
                success: false,
                message: 'Investment not found',
            });
        }

        await User.updateOne({ _id: user._id }, { $pull: { investments: investmentId } }, { session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            success: true,
            message: 'Investment deleted successfully',
            data: deletedInvestment,
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });

        await session.abortTransaction();
        session.endSession();
    }
}

export const getInvestment = async (req, res, next) => {

}

export const updateInvestment = async (req, res, next) => {

}