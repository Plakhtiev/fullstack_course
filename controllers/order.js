const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    const query = {
        user: req.user.id
    }

    // date of start
    if (req.query.start) {
        query.date = {
            // greate or equal
            $gte: req.query.start
        }
    }

    if (req.query.end) {
        if (!query.date) {
            query.date = {}
        }
        // less or equl
        query.date['$lte'] = req.query.end
    }

    if (req.query.order) {
        query.order = +req.query.order
    }

    try {
        const orders = await Order
            .find(query)
            .sort({ date: -1 })
            .skip(+req.query.offset)
            .limit(+req, query.limit)

        res.status(201).json(order)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.create = async function (req, res) {
    try {
        const lastOrder = await Order
            .findOne({ user: req.user.id })
            .sort({ date: -1 })

        const maxOrder = lastOrder ? lastOrder.order : 0

        const order = await new Order({
            list: req.body.list,
            user: req.user.id,
            order: maxOrder + 1
        }).save()
        res.status(201).json(order)
    } catch (e) {
        errorHandler(res, e)
    }
}