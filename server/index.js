const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./models')

app.use(cors())
app.use(express.json())

// Routers
const postRouter = require('./routes/Posts')
app.use("/posts", postRouter)

db.sequelize.sync().then(() => {
    console.log("Database is synced right now")
    app.listen(3001, () => {
        console.log('The server is running in the port 3001')
    })
})
