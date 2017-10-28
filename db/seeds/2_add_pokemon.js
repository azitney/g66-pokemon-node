exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('pokemon').del(),

    knex('pokemon').insert({id: 500, name: "Bulbasaur",
      cp: 15, in_gym: false, trainer_id: 1, pic_url: "https://cdn.bulbagarden.net/upload/thumb/2/21/001Bulbasaur.png/250px-001Bulbasaur.png"}),
    knex('pokemon').insert({id: 501, name: "Ivysaur",
      cp: 60, in_gym: false, trainer_id: 1, pic_url: 'https://cdn.bulbagarden.net/upload/thumb/7/73/002Ivysaur.png/250px-002Ivysaur.png'}),
    knex('pokemon').insert({id: 502, name: "Venasaur",
      cp: 100, in_gym: false, trainer_id: 2, pic_url: "https://cdn.bulbagarden.net/upload/thumb/a/ae/003Venusaur.png/250px-003Venusaur.png"}),
    knex('pokemon').insert({id: 503, name: "Charmander",
      cp: 15, in_gym: false, trainer_id: 2, pic_url: "https://cdn.bulbagarden.net/upload/thumb/7/73/004Charmander.png/250px-004Charmander.png"}),
    knex('pokemon').insert({id: 504, name: "Charmeleon",
      cp: 55, in_gym: false, trainer_id: 2, pic_url: "https://cdn.bulbagarden.net/upload/thumb/4/4a/005Charmeleon.png/250px-005Charmeleon.png"}),
    knex('pokemon').insert({id: 505, name: "Charizard",
      cp: 99, in_gym: false, trainer_id: 3, pic_url: "https://cdn.bulbagarden.net/upload/thumb/7/7e/006Charizard.png/250px-006Charizard.png"}),
    knex('pokemon').insert({id: 506, name: "Squirtle",
      cp: 19, in_gym: false, trainer_id: 4, pic_url: "https://cdn.bulbagarden.net/upload/thumb/3/39/007Squirtle.png/250px-007Squirtle.png"}),
    knex('pokemon').insert({id: 507, name: "Wartortle",
      cp: 22, in_gym: false, trainer_id: 4, pic_url: "https://cdn.bulbagarden.net/upload/thumb/0/0c/008Wartortle.png/250px-008Wartortle.png"}),
    knex('pokemon').insert({id: 508, name: "Blastoise",
      cp: 111, in_gym: false, trainer_id: 4, pic_url: "https://cdn.bulbagarden.net/upload/thumb/0/02/Blasty.png/230px-Blasty.png"}),
    knex('pokemon').insert({id: 509, name: "Caterpie",
      cp: 5, in_gym: false, trainer_id: 3, pic_url: "https://cdn.bulbagarden.net/upload/thumb/5/5d/010Caterpie.png/250px-010Caterpie.png"}),
    knex('pokemon').insert({id: 510, name: "Metapod",
      cp: 18, in_gym: false, trainer_id: 1, pic_url: "https://cdn.bulbagarden.net/upload/thumb/c/cd/011Metapod.png/250px-011Metapod.png"}),
    knex('pokemon').insert({id: 511, name: "Butterfree",
     cp: 104, in_gym: false, trainer_id: 1, pic_url: "https://cdn.bulbagarden.net/upload/thumb/d/d1/012Butterfree.png/250px-012Butterfree.png"})
  );
};
