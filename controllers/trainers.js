const knex = require("../db/knex.js");

module.exports = {

  index:function(req, res){
    res.render('trainers/index', {passedInData: "my passed in data"});
  }

}