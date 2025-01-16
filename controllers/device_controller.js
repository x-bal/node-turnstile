const Device = require('../models/device');
const { Op } = require('sequelize');

async function get(req, res) {
    const page = req.params.page || 1;
    const limit = parseInt(req.query.limit) || 15;
    const offset = (page - 1) * limit;
    const keyword = req.query.keyword;

    const where = {};
    if(keyword) {
        where.name = {
            [Op.like]: `%${keyword}%`
        }
    }

    try {
        const devices = await Device.findAll({
            where,
            offset,
            limit
        });

        const count = await Device.count({ where });

        res.status(200).json({
            "status": "success",
            "data": devices,
            "meta" : {
                "page": page,
                "limit": limit,
                "total": count,
                "total_pages": Math.ceil(count / limit)
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
        const device = await Device.create({
            name: req.body.name,
            device_id: req.body.device_id
        });

        res.status(200).json({
            "status": "success",
            "data": device
        });
    } catch (error) {
        res.status(500).json({
            "status": "error",
            "message": error.message
        });
    }
}

async function show(req, res) {
    try {
        const device = await Device.findByPk(req.params.id);
        res.status(200).json({
            "status": "success",
            "data": device
        });
    } catch (error) {
        res.status(500).json({
            "status": "error",
            "message": error.message
        });
    }
}

async function update(req, res) {
    try {
        const device = await Device.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        res.status(200).json({
            "status": "success",
            "data": device
        });
    } catch (error) {
        res.status(500).json({
            "status": "error",
            "message": error.message
        });
    }
}

async function destroy(req, res) {
    try {
        const device = await Device.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).json({
            "status": "success",
            "data": device
        });
    } catch (error) {
        res.status(500).json({
            "status": "error",
            "message": error.message
        });
    }
}

async function change_status(req, res) {
    try {
        console.log(req.query.id);

        const device = await Device.findByPk(req.query.id);

        if(!device) {
            return res.status(404).json({
                "status": "error",
                "message": "Device not found"
            });
        }

        const status = !device.is_active;

        await Device.update({
            is_active: status
        },{
            where: {
                id: req.query.id
            }
        });

        res.status(200).json({
            "status": "success",
            "data": device
        });
    } catch (error) {
        if(error.message === "Cannot read properties of null (reading 'is_active')") {
            return res.status(404).json({
                "status": "error",
                "message": "Device not found"
            });
        }

        res.status(500).json({
            "status": "error",
            "message": error.message
        })
    }
}

module.exports = {
    get, 
    store, 
    show, 
    update, 
    destroy,
    change_status
};