const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Task = sequelize.define('task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'new',
        validate: {
            isIn: [['new', 'in_progress', 'done']]
        }
    },

    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'tasks',
    timestamps: false
})

module.exports = {
    Task
}