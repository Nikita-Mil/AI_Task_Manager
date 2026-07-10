require('dotenv').config()

const express = require('express')
const cors = require('cors')

const sequelize = require('./db')
require('./models/models')

const router = require('./routes')

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())

app.use('/', router)

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' })
})

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({ message: 'Internal server error', error: err.message })
})

const start = async () => {
    try {

        await sequelize.authenticate()

        console.log('Database connected')

        await sequelize.sync()

        console.log('Database synchronized')

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })

    } catch (e) {
        console.log(e)
    }
}

start()