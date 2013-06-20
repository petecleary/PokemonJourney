'use strict';

var pokedex = { data: {} };

app.service('pokedexService', function () {

    console.log('pokedexService');

    this.getPokemon = function (id) {
        if (id > -1 && id < pokedex.data.pokemon.length) {
            console.log(pokedex.data.pokemon[id]);
            return pokedex.data.pokemon[id];
        }
        return pokedex.data.pokemon;
    };

});