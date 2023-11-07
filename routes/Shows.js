const {Show} = require('../models/index.js')
const express = require('express')
const shows_router = express.Router()
const {check, validationResult} = require('express-validator')

shows_router.get('/', async (req, res) => {
    res.json(await Show.findAll())
})
shows_router.get('/:id', async (req, res) => {
    res.json(await Show.findOne({where: {id: req.params.id}}))
})
shows_router.get('/genre/:genre', async (req, res) => {
    res.json(await Show.findAll({where: {genre: req.params.genre}}))
})
shows_router.put('/:id/rating', [check("rating").isNumeric()], async (req, res) => { // add a check that the value passed in req.body is integer for this one
    const errors = validationResult(req) // check that the body is only changing the rating, not sure how to do that
    if(!errors.isEmpty()){
        res.json({errors: errors.array()})
    }
    else{
        const showToUpdate = await Show.findByPk(req.params.id) // the two put functions can both alter any field they want, not sure how to disable this
        res.json(await showToUpdate.update(req.body))
    }
})
shows_router.put('/:id/status', [check("available").isBoolean()], async (req, res) => { // check that req.body is boolean first
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