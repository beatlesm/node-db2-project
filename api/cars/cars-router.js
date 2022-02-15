const router = require('express').Router()
const md = require('./cars-middleware')
const Car = require('./cars-model')

router.get('/', (req, res, next) => {
    Car.getAll()
        .then ( cars => {
            res.status(200).json(cars)
        })
        .catch (next)
})


module.exports = router;
