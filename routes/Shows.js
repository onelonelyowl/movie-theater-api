const {Show, User} = require('../models/index.js')
const express = require('express')
const shows_router = express.Router()
const {check, validationResult} = require('express-validator')

shows_router.get('/', async (req, res) => {
    res.json(await Show.findAll())
})
shows_router.get('/:id', async (req, res) => {
    res.json(await Show.findOne({where: {id: req.params.id}}))
})
shows_router.get('/genres/:genre', async (req, res) => {
    res.json(await Show.findAll({where: {genre: req.params.genre}}))
})
shows_router.put('/:id/rating', [check("rating").isNumeric(), check("rating").not().isEmpty().trim(), check("title").isEmpty(), check("genre").isEmpty(), check("available").isEmpty()], async (req, res) => { // checks only rating is being changed
    const errors = validationResult(req) 
    if(!errors.isEmpty()){
        res.json({errors: errors.array()})
    }
    else{
        const showToUpdate = await Show.findByPk(req.params.id) 
        res.json(await showToUpdate.update(req.body))
    }
})
shows_router.put('/:id/available', [check("available").isBoolean(), check("available").not().isEmpty().trim(), check("title").isEmpty(), check("genre").isEmpty(), check("rating").isEmpty()], async (req, res) => { // check that req.body is boolean first
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({errors: errors.array()})
    }
    else{
        const showToUpdate = await Show.findByPk(req.params.id)
        res.json(await showToUpdate.update(req.body))
    }
})
shows_router.put('/:id/watchedByUser:userid', async (req, res) => { 
    const showToUpdate = await Show.findByPk(req.params.id)
    const userToAdd = await User.findByPk(req.params.userid)
    res.json(await showToUpdate.addUser(userToAdd))
})
shows_router.put('/:id/status', [check("status").isIn(['canceled', 'on-going']), check("status").isLength({min: 5, max: 25}), check("status").not().isEmpty(), check("available").isEmpty(), check("title").isEmpty(), check("genre").isEmpty(), check("rating").isEmpty()], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({errors: errors.array()})
    }
    else{   
        const showToUpdate = await Show.findByPk(req.params.id)
        res.json(await showToUpdate.update(req.body))
    }
})
shows_router.delete('/:id', async (req, res) => {
    const showToDelete = await Show.findByPk(req.params.id)
    await showToDelete.destroy()
    res.send(`Show #${req.params.id} deleted`)
})

module.exports = shows_router