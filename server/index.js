const express = require('express')
const app = express()

const db = require('./models')

db.sequelize.sync().then(() => {
  console.log("Database is synced right now")
  app.listen(3001, () => {
    console.log('The server is running in the port 3001')
  })
})
