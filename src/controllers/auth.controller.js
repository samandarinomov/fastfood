const Joi = require('joi');
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');

const { sendMail } = require('../utils/mail');

const User = require('../models/user.model');
const Otp = require('../models/otp.model');
const { createToken } = require('../utils/jwt');

const register = async (req, res, next) => {
    try {
        const { email } = req.body;
        const schema = Joi.object({
            email: Joi.string().email().required()
        });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).json({ error: error.message });

        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ error: 'Email already exists' });

        const otp = otpGenerator.generate(6, {
            digits: true,
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false
        });

        await sendMail(email, otp);

        await Otp.create({
            email,
            otp
        });

        res.json({ message: 'Confirmation code has been sent to your email' });

    } catch (error) {
        next(error);
    }
}

const verify = async (req, res, next) => {
    try {
        const { fullname, email, password, code, address } = req.body;
        const schema = Joi.object({
            fullname: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(4).required(),
            code: Joi.number().required(),
            address: Joi.string().required()
        });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).json({ error: error.message });

        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ error: 'User already exists' });

        const findOtp = await Otp.findOne({
            email,
            otp: code,
            createdAt: { $gt: new Date(Date.now() - 60000) }
        });
        if (!findOtp) return res.status(400).json({ error: 'Invalid confirmation code' });

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            fullname,
            email,
            password: hashedPassword,
            address
        });
        await Otp.deleteOne({ _id: findOtp._id });

        const token = createToken({ id: newUser._id, isAdmin: newUser.isAdmin });

        res.status(201).json({ message: "Success", token })

    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(4).required()
        });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).json({ error: error.message });

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid email or password' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });
        const token = createToken({ id: user._id, isAdmin: user.isAdmin });
        res.json({ message: "Success", token });
    } catch (error) {
        next(error);
    }
}

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-__v");
        res.json(users);
    } catch (error) {
        next(error);
    }
}

module.exports = { register, verify, login, getUsers };
