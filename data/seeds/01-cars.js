exports.seed = function (knex) {
    return knex('cars').truncate()
      .then(function () {
        return knex('cars').insert([
          { vin: '1FTYR14U72A67071', make: 'FORD', model: 'RANGE', mileage: 170000, title: 'clean', transmission: 'automatic' },
          
        ]);
      });
  };
