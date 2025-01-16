const Ticket = require('../models/ticket');
const Member = require('../models/member');
const Device = require('../models/device');

async function open_gate(req, res) {
    try {
        // Check device
        const device = await Device.findOne({
            where: {
                device_id: req.query.iddev
            }
        });

        if (!device) {
            res.status(404).json({
                "status": "close",
                "message": "Device not found"
            });

            return;
        }

        if(device.is_active === false) {
            res.status(404).json({
                "status": "close",
                "message": "Device not active"
            });

            return;
        }

        const ticket = await Ticket.findOne({
            where: {
                ticket_code: req.query.ticket
            }
        });

        if (ticket) {
            if (ticket.scanned >= ticket.amount) {
                res.status(200).json({
                    "status": "close"
                });

                return;
            } else {
                await ticket.update({ scanned: ticket.scanned + 1 });

                res.status(200).json({
                    "status": "open",
                    "amount": ticket.amount - ticket.scanned
                });

                return;
            }
        }

        const member = await Member.findOne({
            where: {
                rfid_tag: req.query.ticket
            }
        });

        if (member.is_active === false) {
            res.status(404).json({
                "status": "close",
                "message": "Member not active"
            });

            return;
        }

        if(member) {
            res.status(200).json({
                "status": "open",
            });

            return;
        }

        res.status(200).json({
            "status": "close"
        });
    } catch (error) {
        res.status(500).json({
            "message": error.message
        })
    }
}


module.exports = {
    open_gate
}