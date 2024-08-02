const Joi = require('joi');
const Order = require('../models/order.model');

const create = async (req, res, next) => {
    try {
        const { foodId, count } = req.body;

        const schema = Joi.object({
            foodId: Joi.string().required(),
            count: Joi.number().required(),
        });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).json({ error: error.message });

        const newOrder = await Order.create({
            foodId,
            userId: req.user.id,
            count,
        })
        res.status(201).json({ message: 'Order created successfully' });

    } catch (error) {
        next(error);
    }
}

const show = async (req, res, next) => {
    try {
        if (req.user.isAdmin) {
            const orders = await Order.find().populate('foodId').populate('userId');
            return res.json(orders);
        }
        const userOrders = await Order.find({ userId: req.user.id }).populate('foodId').select(["-updatedAt", "-__v"]);
        return res.json(userOrders);
    } catch (error) {
        next(error);
    }
}

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await Order.findByIdAndDelete(id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        next(error);
    }
}


module.exports = {
    create,
    show,
    remove,
}