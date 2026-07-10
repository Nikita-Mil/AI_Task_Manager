require('dotenv').config()
const fs = require('fs')
const path = require('path')
const sequelize = require('./db')

const sql = fs.readFileSync(
  path.join(__dirname, '..', 'database', 'migrate.sql'),
  'utf8'
)

sequelize.query(sql).then(() => {
  console.log('Migration applied successfully')
  process.exit(0)
}).catch((err) => {
  console.error('Migration failed:', err.message)
  process.exit(1)
})
