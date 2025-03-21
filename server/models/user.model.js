import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        trim: true,
        minLength: 2,
    },
    email: {
        type: String,
        required: [true, 'User email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: [true, 'User password is required'],
        minLength: 6,
    },
    investments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Investment',
    }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;