const express = require('express')
const router = express.Router()
const { Likes } = require('../models')
const { validateToken } = require('../middlewares/AuthMiddleware')

router.post("/", validateToken, async (req, res) => {
  const { PostId } = req.body
  const UserId = req.user.id

  await Likes.create({ PostId: PostId, UserId: UserId })
  return res.json({success: true})
})

module.exports = router