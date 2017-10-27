const knex = require("../db/knex.js");

module.exports = {

  index:function(req, res){
    knex('trainers')
    .then((result)=>{
      res.render('trainers/index', {trainers: result});
    })
  },

  getOne: function(req, res){
    knex('trainers')
    .where('id', req.params.id)
    .then((result)=>{
      console.log(result[0])
      knex('pokemon')
      .where('trainer_id', req.params.id)
      .then((resultTwo)=>{
        res.render('trainers/trainerProfile', {trainer: result[0], pokemon: resultTwo})
      })
    })
  }

}
