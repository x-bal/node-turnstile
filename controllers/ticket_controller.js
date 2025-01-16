const Ticket = require('../models/ticket');
const { Op } = require('sequelize');

async function get(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const offset = (page - 1) * limit;
    const keyword = req.query.keyword;

    const where = {};
    if (keyword) {
        where.ticket_code = {
            [Op.like]: `%${keyword}%`
        }
    }

    try {
        const tickets = await Ticket.findAll({
            where,
            offset,
            limit,
        });

        const count = await Ticket.count({ where });

        res.status(200).json({
            "status": "success",
            "data": tickets,
            "meta": {
                "page": page,
                "limit": limit,
                "total": count,
                "total_pages": Math.ceil(count / limit),
            }
        });
    } catch (error) {
        res.status(500).json({
            "status": "error",
            "message": error.message
        });
    }
}

async function store(req, res) {
    try {
        const body = req.body;
        body.ticket_code = `TKT${Date.now()}${Math.floor(Math.random() * 100)}`
        
        const ticket = await Ticket.create(body);
        res.status(200).json({
            "status": "success",
            "data": ticket
        });
    } catch (error) {
        res.status(500).json({
            "status": "error",
            "message": error.message
        });
    }
}

module.exports = {
    get,
    store
}