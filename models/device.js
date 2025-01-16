const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Device = sequelize.define('Device', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    device_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
}, {
    tableName: 'devices',
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    createdAt: 'created_at', // Rename createdAt field to created_at
    updatedAt: 'updated_at'  // Rename updatedAt field to updated_at
});

module.exports = Device;