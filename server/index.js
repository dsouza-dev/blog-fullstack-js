const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./models')

app.use(cors())
app.use(express.json())

// Routers
const postRouter = require('./routes/Posts')
app.use("/posts", postRouter)
const commentsRouter = require('./routes/Comments')
app.use("/comments", commentsRouter)
const usersRouter = require('./routes/Users')
app.use("/auth", usersRouter)

db.sequelize.sync().then(() => {
  console.log("Database is synced right now")
  app.listen(3001, () => {
    console.log('The server is running in the port 3001')
  })
})
