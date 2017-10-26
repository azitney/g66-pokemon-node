//Update the name of the controller below and rename the file.
const index = require("../controllers/index.js")
const pokemon = require("../controllers/pokemon.js")
const trainers = require("../controllers/trainers.js")
module.exports = function(app){

  app.get('/', index.index);

  app.get('/pokemon', pokemon.index);

  app.get('/pokemonProfile/:id', pokemon.getOne);

  app.get('/addPokemon', pokemon.add);

  app.post('/addPokemon', pokemon.create);

  app.get('/deletePokemon/:id', pokemon.delete);

  app.get('/editPokemon/:id', pokemon.edit);

  app.post('/editPokemon/:id', pokemon.update);

  app.get('/trainers', trainers.index);




}
