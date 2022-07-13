const express = require('express')
const router = express.Router()
const { Likes } = require('../models')
const { validateToken } = require('../middlewares/AuthMiddleware')

router.post("/", validateToken, async (req, res) => {
  const { PostId } = req.body
  const UserId = req.user.id

  const found = await Likes.findOne({where: 
    { PostId: PostId, UserId: UserId }
  })
  
  if (!found) {
    await Likes.create({ PostId: PostId, UserId: UserId })
    return res.json({ success: true, message: 'You like the post'})
  } else {
    await Likes.destroy({
      where: {
        PostId: PostId, UserId: UserId
      }
    })
    return res.json({ success: true, message: 'You unlike the post' })
  }
})

module.exports = router