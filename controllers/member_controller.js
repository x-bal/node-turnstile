const Member = require('../models/member');
const { Op } = require('sequelize');

async function get(req, res) {
    const page = parseInt(req.query.page) || 1;
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
        const members = await Member.findAll({
            offset,
            limit,
            where
        });

        const count = await Member.count({ where });

        res.status(200).json({
            "status": "success",
            "data": members,
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
        // const body = req.body;

        const member = await Member.create({
            name: req.body.name,
            rfid_tag: req.body.rfid_tag
        });

        res.status(200).json({
            "status": "success",
            "data": member
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
        const member = await Member.findByPk(req.params.id);
        res.status(200).json({
            "status": "success",
            "data": member
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
        const member = await Member.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        res.status(200).json({
            "status": "success",
            "data": member
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
        const member = await Member.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).json({        
            "status": "success",
            "data": member
        });
    } catch (error) {
        res.status(500).json({
            "status": "error",
            "message": error.message
        });
    }
}

async function check_member(req, res) {
    try {
        const rfid_tag = req.query.rfid_tag;

        const member = await Member.findOne({
            where: {
                rfid_tag: rfid_tag
            }
        });

        if(member) {
            res.status(200).json({
                "status": "success",
                "message": "found"
            });
        }else {
            res.status(200).json({
                "status": "error",
                "message": "not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            "status": "error",
            "message": error.message
        })
    }
    
}

async function change_status(req, res) {
    try {
        console.log(req.query.id);

        const member = await Member.findByPk(req.query.id);

        if(!member) {
            return res.status(404).json({
                "status": "error",
                "message": "Member not found"
            });
        }

        const status = !member.is_active;

        await member.update({
            is_active: status
        });

        res.status(200).json({
            "status": "success",
            "data": member
        });
    } catch (error) {
        if(error.message === "Cannot read properties of null (reading 'is_active')") {
            return res.status(404).json({
                "status": "error",
                "message": "Member not found"
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
    check_member,
    change_status
}