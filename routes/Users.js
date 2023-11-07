const {Show, User} = require('../models/index.js')
const express = require('express')
const users_router = express.Router()

users_router.get('/', async (req, res) => {
    res.json(await User.findAll())
})
users_router.get('/:id', async (req, res) => {
    res.json(await User.findOne({where: {id: req.params.id}}))
})
users_router.get('/:id/shows', async (req, res) => {
    res.json(await User.findOne({where: {id: req.params.id}, include: Show}))
})
users_router.put('/:id/show:showid', async (req, res) => { // add a check that the value passed in req.body is integer for this one
    const userToUpdate = await User.findByPk(req.params.id)
    const showToAdd = await Show.findByPk(req.params.showid)
    await userToUpdate.addShow(showToAdd)
    res.json(await User.findByPk(req.params.id))
})
// users_router.put('/:id/status', async (req, res) => { // check that req.body is boolean first
//     const showToUpdate = await User.findByPk(req.params.id)
//     res.json(await showToUpdate.update({available: req.body}))
// })
// users_router.delete('/:id', async (req, res) => {
//     const showToDelete = await User.findByPk(req.params.id)
//     await showToDelete.destroy()
//     res.send(`User #${req.params.id} deleted`)
// })

module.exports = users_router