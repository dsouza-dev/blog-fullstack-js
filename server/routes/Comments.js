const express = require('express')
const { validateToken } = require('../middlewares/AuthMiddleware')
const router = express.Router()
const { Comments } = require('../models')

router.get('/:postId', async (req, res) => {
  const { postId } = req.params
  const comments = await Comments.findAll({ where: { PostId: postId } })
  return res.json(comments)
})

router.post('/', validateToken, async (req, res) => {
  const comment = req.body
  const username = req.user.username
  comment.username = username
  await Comments.create(comment)
  res.json(comment)
})

router.delete('/:commentId', validateToken, async (req, res) => {
  const { commentId } = req.params
  
  await Comments.destroy({where: {
    id: commentId
  }})

  return res.json("Deleted Successfully")
})

module.exports = router