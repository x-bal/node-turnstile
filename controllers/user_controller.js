const User = require('../models/user');
const bcrypt = require('bcrypt');

async function get(req, res) {
    try {
        const users = await User.findAll();
        res.status(200).json({
            "status": "success",
            "data": users
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
        body.password = await bcrypt.hash(body.password, 10);

        const user = await User.create(body);

        res.status(200).json({
            "status": "success",
            "data": user
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
        const user = await User.findByPk(req.params.id);

        res.status(200).json({
            "status": "success",
            "data": user
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
        const body = req.body;
        const user = await User.findByPk(req.params.id);

        body.password = body.password ? await bcrypt.hash(body.password, 10) : user.password;

        await user.update(body);

        res.status(200).json({        
            "status": "success",
            "data": user
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
        const user = await User.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).json({
            "status": "success",
            "data": user
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
    store,
    show,
    update,
    destroy
}