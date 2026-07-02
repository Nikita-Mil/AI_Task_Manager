const { Task } = require('../models/models')

class TaskController {

    // Создание новой задачи
    async create(req, res) {
        try {
            const { title, description } = req.body

            if (!title || !description) {
                return res.status(400).json({
                    message: 'Title and description are required'
                })
            }

            const task = await Task.create({
                title,
                description
            })

            return res.status(201).json(task)

        } catch (error) {
            return res.status(500).json({
                message: 'Error creating task',
                error: error.message
            })
        }
    }

    // Получение всех задач
    async getAll(req, res) {
        try {
            const tasks = await Task.findAll({
                order: [['created_at', 'DESC']]
            })

            return res.json(tasks)

        } catch (error) {
            return res.status(500).json({
                message: 'Error getting tasks',
                error: error.message
            })
        }
    }

    // Изменение статуса задачи
    async updateStatus(req, res) {
        try {
            const { id } = req.params
            const { status } = req.body

            if (!['new', 'in_progress', 'done'].includes(status)) {
                return res.status(400).json({
                    message: 'Invalid status'
                })
            }

            const task = await Task.findByPk(id)

            if (!task) {
                return res.status(404).json({
                    message: 'Task not found'
                })
            }

            task.status = status

            await task.save()

            return res.json(task)

        } catch (error) {
            return res.status(500).json({
                message: 'Error updating task',
                error: error.message
            })
        }
    }

    // Удаление задачи
    async delete(req, res) {
        try {
            const { id } = req.params

            const task = await Task.findByPk(id)

            if (!task) {
                return res.status(404).json({
                    message: 'Task not found'
                })
            }

            await task.destroy()

            return res.json({
                message: 'Task deleted successfully'
            })

        } catch (error) {
            return res.status(500).json({
                message: 'Error deleting task',
                error: error.message
            })
        }
    }

}

module.exports = new TaskController()