const express = require('express')
const router = express.Router()
const { Users } = require('../models')
const bcrypt = require('bcrypt')

router.post('/', async (req, res) => {
  const { username, password } = req.body
  await bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash
    })
    res.json({ 'success': true })
  })
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body

  const user = await Users.findOne({ where: { username: username } })
  if (!user) return res.status(400).json({ 'success': false, 'error': 'Usuário não existe' })

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) return res.status(400).json({ 'success': false, 'error': 'Usuário e Senha não correspondem' })
    return res.json({ 'success': true })
  })
})

module.exports = router