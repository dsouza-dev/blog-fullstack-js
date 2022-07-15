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

router.get('/byuserId/:userId', async (req, res) => {
  const { userId } = req.params
  const listOfPosts = await Posts.findAll({ where: { UserId: userId },
  include: [Likes]
})
  return res.json(listOfPosts)
})

router.post("/", validateToken ,async (req, res) => {
  const post = req.body
  post.username = req.user.username
  post.UserId = req.user.id
  await Posts.create(post)
  return res.json(post)
})

router.delete("/:postId", validateToken, async (req, res) => {
  const { postId } = req.params
  await Posts.destroy({where: {
    id: postId 
  }})
  return res.json('deleted')
})

module.exports = router
