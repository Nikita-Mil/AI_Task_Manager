const Router = require('express')

const router = new Router()

const taskController = require('../controllers/taskController')

router.get('/test', (req, res) => {
    res.json({
        message: 'САЛЕМ ДОСТАР'
    })
})

router.post('/', taskController.create)

router.get('/', taskController.getAll)

router.put('/:id', taskController.updateStatus)

router.delete('/:id', taskController.delete)

module.exports = router