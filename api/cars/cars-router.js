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

router.get('/:id', md.checkCarId, (req, res) => {
    res.status(200).json(req.car)
})

router.post('/', md.checkCarPayload, md.checkVinNumberValid, md.checkVinNumberUnique,  (req, res, next) => {
    
    Car.create(req.body)
      .then ( resp => {      
        res.status(201).json({
          id: resp[0],
          vin: req.body.vin,
          make: req.body.make,
          model: req.body.model,
          mileage: req.body.mileage,
          title: req.body.title,
          transmission: req.body.transmission
          
        })
      })
      .catch(next)
  })


module.exports = router;
