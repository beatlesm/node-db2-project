const Car = require('./cars-model')

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
  // DO YOUR MAGIC
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
}
