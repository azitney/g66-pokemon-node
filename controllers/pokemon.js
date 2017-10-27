const knex = require("../db/knex.js");

module.exports = {

  index: function(req, res) {
    knex('pokemon')
      .then((result) => {
        if (req.session.playerone && req.session.playertwo) {
          res.render('pokemon/index', {
            open: "no",
            pokemon: result
          });
        } else {
          res.render('pokemon/index', {
            open: "yes",
            pokemon: result
          });
        }

      })
  },

  getOne: function(req, res) {
    knex('pokemon')
      .join('trainers', 'trainers.id', '=', 'pokemon.trainer_id')
      .select('pokemon.name', 'pokemon.cp', 'pokemon.in_gym', 'trainers.name as trainersname')
      .where('pokemon.id', req.params.id)
      .then((result) => {
        res.render('pokemon/pokemonProfile', {
          pokemon: result[0]
        })
      })
  },

  add: function(req, res) {
    knex('trainers')
      .then((result) => {
        res.render('pokemon/addPokemon', {
          trainers: result
        });

      })
  },

  create: function(req, res) {
    knex('pokemon')
      .insert({
        name: req.body.name,
        trainer_id: req.body.trainer_id,
        cp: req.body.cp,
        in_gym: false
      }, "*")
      .then((result) => {
        res.redirect('pokemon');
      })
      .catch((err) => {
        console.error(err)
      });
  },

  delete: function(req, res) {

    knex('pokemon')
      .del()
      .where('id', req.params.id)
      .then(() => {
        if(req.session.playerone){
          if(req.session.playerone.id == req.params.id){
            delete req.session.playerone
            req.session.save(()=>{
              res.redirect('/pokemon')
            })
          }
        }
        else if(req.session.playertwo){
          if(req.session.playertwo.id == req.params.id){
            delete req.session.playertwo
            req.session.save(()=>{
              res.redirect('/pokemon')
            })
          }
        }
        else{
          req.session.save(()=>{
            res.redirect('/pokemon')
          })
        }


      })
      .catch((err) => {
        console.error(err)
      });
  },

  edit: function(req, res) {
    knex('pokemon')
      .where('id', req.params.id)
      .then((result) => {
        knex('trainers')
          .then((resultTwo) => {
            res.render('pokemon/editPokemon', {
              pokemon: result[0],
              trainers: resultTwo
            })
          })

      })
      .catch((err) => {
        console.error(err)
      });
  },

  update: function(req, res) {
    knex('pokemon')
      .update({
        name: req.body.name,
        trainer_id: req.body.trainer_id,
        cp: req.body.cp,
        in_gym: req.body.in_gym
      })
      .where('id', req.params.id)
      .then(() => {
        res.redirect('/pokemon');
      })
      .catch((err) => {
        console.error(err)
      })
  },

  ingym: function(req, res) {
    if (req.params.ingym === "true") {
      if(req.session.playerone){
      if (req.session.playerone.id == req.params.id) {
        knex('pokemon')
          .update({
            in_gym: false
          })
          .where('id', req.params.id)
          .then(() => {
            delete req.session.playerone
            req.session.save(()=>{
              res.redirect('/pokemon');
            })

            console.log("playerone")

          })
      }
    }
     else if (req.session.playertwo) {
      if (req.session.playertwo.id == req.params.id) {
        knex('pokemon')
          .update({
            in_gym: false
          })
          .where('id', req.params.id)
          .then(() => {
            delete req.session.playertwo
            req.session.save(()=>{
              res.redirect('/pokemon');
            })

            console.log("playertwo")
            //req.session.playertwo = {}

          })
      }
    }
    } else {
      knex('pokemon')
        .update({
          in_gym: true
        })
        .where('id', req.params.id)
        .then(() => {
          knex('pokemon')
            .where('id', req.params.id)
            .then((result) => {
              if (req.session.playerone) {
                req.session.playertwo = result[0]
              } else {
                req.session.playerone = result[0]
              }
              req.session.save(()=>{
                res.redirect('/pokemon');
              })

            })
        })
    }
  },

  restart: function(req, res){
    knex('pokemon')
    .update({
      in_gym: false
    })
    .then(()=>{
      delete req.session.playerone
      delete req.session.playertwo
      req.session.save(()=>{
        res.redirect('/pokemon');
      })



    })


  }


}
