const express = require('express')
const router = express.Router()
const { Posts, Likes } = require('../models')
const { validateToken } = require('../middlewares/AuthMiddleware')

router.get("/",  validateToken, async (req, res) => {
  const listPosts = await Posts.findAll({ include: [Likes] })
  const likedPosts = await Likes.findAll({where: { UserId: req.user.id}})
  return res.json({ listPosts: listPosts, likedPosts: likedPosts })
})

router.get('/byId/:id', async (req, res) => {
  const { id } = req.params
  const post = await Posts.findByPk(id)
  return res.json(post)
})

router.post("/", async (req, res) => {
  const post = req.body
  await Posts.create(post)
  return res.json(post)
})

module.exports = router
