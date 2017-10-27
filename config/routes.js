//Update the name of the controller below and rename the file.
const index = require("../controllers/index.js")
const pokemon = require("../controllers/pokemon.js")
const trainers = require("../controllers/trainers.js")
const gym = require("../controllers/gym.js")
module.exports = function(app){

  app.get('/', index.index);

  app.get('/pokemon', pokemon.index);

  app.get('/pokemonProfile/:id', pokemon.getOne);

  app.get('/addPokemon', pokemon.add);

  app.post('/addPokemon', pokemon.create);

  app.get('/deletePokemon/:id', pokemon.delete);

  app.get('/editPokemon/:id', pokemon.edit);

  app.post('/editPokemon/:id', pokemon.update);

  app.get('/inGymPokemon/:id/:ingym', pokemon.ingym);

  app.get('/trainers', trainers.index);

  app.get('/trainerProfile/:id', trainers.getOne);

  app.get('/gym', gym.index);

  app.post('/addToGym/:player', gym.addToGym);

  app.get('/battle', gym.battle);

  app.get('/restart', pokemon.restart)




}
