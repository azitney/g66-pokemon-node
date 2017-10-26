const knex = require("../db/knex.js");

module.exports = {

  index:function(req, res){
    knex('pokemon')
    .then((result)=>{
      res.render('pokemon/index', {passedInData: "my passed in data", pokemon: result});
    })
  },

  getOne: function(req, res){
    knex('pokemon')
    .join('trainers', 'trainers.id', '=', 'pokemon.trainer_id')
    .select('pokemon.name', 'pokemon.cp', 'pokemon.in_gym', 'trainers.name as trainersname')
    .where('pokemon.id', req.params.id)
    .then((result)=>{
      res.render('pokemon/pokemonProfile', {pokemon: result[0]})
    })
  },

  add:function(req, res){
    knex('trainers')
    .then((result)=>{
      res.render('pokemon/addPokemon', {trainers: result});

    })
  },

  create: function(req, res){
    knex('pokemon')
    .insert({
      name: req.body.name,
      trainer_id: req.body.trainer_id,
      cp: req.body.cp,
      in_gym: req.body.in_gym
    }, "*")
    .then((result)=>{
      res.redirect('pokemon');
    })
    .catch((err)=>{
      console.error(err)
    });
  },

  delete: function(req, res){
    knex('pokemon')
    .del()
    .where('id', req.params.id)
    .then(()=>{
      res.redirect('/pokemon')
    })
    .catch((err)=>{
      console.error(err)
    });
  },

  edit: function(req, res){
    knex('pokemon')
    .where('id', req.params.id)
    .then((result)=>{
      knex('trainers')
      .then((resultTwo)=>{
        res.render('pokemon/editPokemon', {pokemon: result[0], trainers: resultTwo})
      })

    })
    .catch((err)=>{
      console.error(err)
    });
  },

  update: function(req, res){
    knex('pokemon')
    .update({
      name: req.body.name,
      trainer_id: req.body.trainer_id,
      cp: req.body.cp,
      in_gym: req.body.in_gym
    })
    .where('id', req.params.id)
    .then(()=>{
      res.redirect('/pokemon');
    })
    .catch((err)=>{
      console.error(err)
    })
  }

}
