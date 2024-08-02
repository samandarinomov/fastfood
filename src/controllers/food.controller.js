const path = require('path');
const Joi = require('joi');
const { v4: uuid } = require('uuid');
const Food = require('../models/food.model');
const Category = require('../models/category.model');

const create = async (req, res, next) => {
    try {
        const { name, price, categoryId } = req.body;
        const { image } = req.files;

        const schema = Joi.object({
            name: Joi.string().required(),
            price: Joi.string().required(),
            categoryId: Joi.string().required(),
        });

        const { error } = schema.validate(req.body);
        if (error) return res.status(400).json({ error: error.message });

        const findCategory = await Category.findById(categoryId);
        if (!findCategory) return res.status(404).json({ message: "Category not found" });

        const imageName = `${uuid()}${path.extname(image.name)}`;
        image.mv(`${process.cwd()}/uploads/${imageName}`);

        const newFood = await Food.create({
            name,
            price,
            image: imageName,
            categoryId,
        });

        res.json({ message: "Success", newFood });
    } catch (error) {
        next(error);
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, price, categoryId } = req.body;
        const { image } = req.files;

        const schema = Joi.object({
            name: Joi.string().required(),
            price: Joi.string().required(),
            categoryId: Joi.string().required(),
        });

        const { error } = schema.validate(req.body);
        if (error) return res.status(400).json({ error: error.message });

        const findCategory = await Category.findById(categoryId);
        if (!findCategory) return res.status(404).json({ message: "Category not found" });

        const findFood = await Food.findById(id);
        if (!findFood) return res.status(404).json({ message: "Food item not found" });

        let imageName;
        if (image) {
            imageName = `${uuid()}${path.extname(image.name)}`;
            image.mv(`${process.cwd()}/uploads/${imageName}`);
        } else {
            imageName = findFood.image;
        }

        const updatedFood = await Food.findByIdAndUpdate(id, {
            name,
            price,
            image: imageName,
            categoryId,
        }, { new: true });

        res.json({ message: "Success", updatedFood });
    } catch (error) {
        next(error);
    }
}

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const food = await Food.findByIdAndDelete(id);
        if (!food) return res.status(404).json({ message: "Food item not found" });

        res.json({ message: "Food item deleted successfully" });
    } catch (error) {
        next(error);
    }
}

const show = async (req, res, next) => {
    try {
        const foods = await Food.find().populate('categoryId', 'name').select("-__v");
        res.json(foods);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    create,
    update,
    remove,
    show,
}
