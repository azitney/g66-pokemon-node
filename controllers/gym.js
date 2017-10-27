const knex = require("../db/knex.js");

module.exports = {

  index: function(req, res) {
    if (req.session.playerone && req.session.playertwo) {
      knex('pokemon')
        .where('id', req.session.playerone.id)
        .then((result) => {
          knex('pokemon')
            .where('id', req.session.playertwo.id)
            .then((resultTwo) => {
              res.render('gym/index', {
                playerone: result[0],
                playertwo: resultTwo[0],
                battle: 'yes'
              })
            })
        })
    } else if (req.session.playerone && !req.session.playertwo) {
      knex('pokemon')
        .where('id', req.session.playerone.id)
        .then((result) => {
          knex('pokemon')
            .where('in_gym', false)
            .then((resultTwo) => {
              res.render('gym/index', {
                playerone: result[0],
                playertwo: 'no',
                battle: 'no',
                pokemon: resultTwo
              })
            })
        })
    } else if (!req.session.playerone && req.session.playertwo) {
      knex('pokemon')
        .where('id', req.session.playertwo.id)
        .then((result) => {
          knex('pokemon')
            .where('in_gym', false)
            .then((resultTwo) => {
              res.render('gym/index', {
                playerone: 'no',
                playertwo: result[0],
                battle: 'no',
                pokemon: resultTwo
              })
            })
        })
    } else {
      knex('pokemon')
        .where("in_gym", false)
        .then((result) => {
          res.render('gym/index', {
            playerone: 'no',
            playertwo: 'no',
            battle: 'no',
            pokemon: result
          });
        })
    }
  },

  addToGym: function(req, res) {
    knex('pokemon')
      .update({
        in_gym: true
      })
      .where('id', req.body.id)
      .then(() => {
        knex('pokemon')
          .where('id', req.body.id)
          .then((result) => {
            if (req.params.player === 'one') {
              req.session.playerone = result[0];
            } else {
              req.session.playertwo = result[0]
            }
            req.session.save(() => {
              res.redirect('/gym');
            })
          })
      })
  },

  battle: function(req, res) {
    let message = "WINNER!"
    let pokemon = ""

    if (req.session.playerone.cp > req.session.playertwo.cp) {
      knex('pokemon')
        .update({
          cp: req.session.playerone.cp + 20
        })
        .where('id', req.session.playerone.id)
        .then(() => {
          pokemon = req.session.playerone
          res.render('gym/winner', {
            pokemon: pokemon,
            message: message
          })
        })
    } else if (req.session.playertwo.cp > req.session.playerone.cp) {
      knex('pokemon')
        .update({
          cp: req.session.playertwo.cp + 20
        })
        .where('id', req.session.playertwo.id)
        .then(() => {
          pokemon = req.session.playertwo
          res.render('gym/winner', {
            pokemon: pokemon,
            message: message
          })
        })
    } else {
      message = "TIE!"
      pokemon = [req.session.playerone, req.session.playertwo];
      res.render('gym/winner', {
        pokemon: pokemon,
        message: message
      })
    }
  }


}
