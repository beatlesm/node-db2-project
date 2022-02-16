const Car = require('./cars-model')
const vinValidator = require('vin-validator');
const db = require('../../data/db-config')

const checkCarId = (req, res, next) => {
  Car.getById(req.params.id)
    .then( car => {
      if ( car ) {
        req.car = car
        next()
      } else {
        next ({
          status: 404,
          message: `car not found`
        }) 
      }
    })
    .catch(next)
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body
  if (!vin) {
    res.status(400).json ({message: 'vin is missing'})
  } else if ( !make ) {
    res.status(400).json ({message: 'make is missing'})
  } else if ( !model ) {
    res.status(400).json ({message: 'model is missing'})
  } else if ( !mileage ) {
    res.status(400).json ({message: 'mileage is missing'})
  } else {
    next()
  }  
}

const checkVinNumberValid = (req, res, next) => {
  const isValidVin = vinValidator.validate(req.body.vin)
  if(!isValidVin){
    res.status(400).json({message: `vin ${req.body.vin} is invalid`})
  } else {
    next()
  }   
}

const checkVinNumberUnique = (req, res, next) => {
  db('cars').where({vin: req.body.vin}).first()
    .then (resp => {      
      if (resp ){
        next({
          status: 400,
          message: `vin ${req.body.vin} already exists`
        })
      } else {        
        next()
      }        
    })
    .catch(next)  

}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
}
