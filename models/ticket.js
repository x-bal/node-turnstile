const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ticket = sequelize.define('Ticket', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ticket_code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    scanned: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    tableName: "tickets",
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    createdAt: 'created_at', // Rename createdAt field to created_at
    updatedAt: 'updated_at'  // Rename updatedAt field to updated_at
});

module.exports = Ticket;
