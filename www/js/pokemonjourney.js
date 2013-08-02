'use strict';

var pokedex = { data: {} };

app.service('pokedexService', function () {

    var musicUrls = new Array();
    musicUrls[0] = 'Pokemon_Center';
    musicUrls[1] = 'pokemon';
    var musicNext = 0;

    this.musicNextTune = function () {
        var audioPlayer = document.getElementsByTagName('audio')[0];

        //clear sources
        audioPlayer.innerHTML = '';
        //add new source
        var source = document.createElement('source');
        if (audioPlayer.canPlayType('audio/mpeg;')) {
            source.src = "music/" + musicUrls[musicNext] + '.mp3';
            source.type = 'audio/mpeg';
        } else {
            source.src = "music/" + musicUrls[musicNext] + '.ogg';
            source.type = 'audio/ogg';
        }
        audioPlayer.appendChild(source);
        audioPlayer.load();
        if (localStorage["pokemonjourney.music"] === 'true') {
            audioPlayer.play();
        }
        console.log(audioPlayer);
        audioPlayer.play();
        musicNext++;
        if (musicNext >= musicUrls.length) musicNext = 0;
        return audioPlayer;
    };

    this.musicPlay = function () {
        var audioPlayer = document.getElementsByTagName('audio')[0];
        if (localStorage["pokemonjourney.music"] === 'true') {
            audioPlayer.play();
        }
        return audioPlayer;
    };

    this.musicStop = function () {
        var audioPlayer = document.getElementsByTagName('audio')[0];
        audioPlayer.pause();
    };

    this.pokedexGetPokemon = function (id) {
        var col = 0;
        var row = 0;
        for (var x = 0; x < pokedex.data.pokemon.length; x++) {
            pokedex.data.pokemon[x].imageLeft = (col * -120);
            pokedex.data.pokemon[x].imageTop = (row * -120);
            col += 1;
            if (col > 14) {
                col = 0;
                row += 1;
            }
        }
        console.log(JSON.stringify(pokedex.data.pokemon));
        if (id > -1 && id < pokedex.data.pokemon.length) {
            return pokedex.data.pokemon[id];
        }
        return pokedex.data.pokemon;
    };

    this.pokedexGetPokeballs = function (id) {
        if (id > -1 && id < pokedex.data.pokeballs.length) {
            return pokedex.data.pokeballs[id];
        }
        return pokedex.data.pokeballs;
    };

    this.pokedexGetTypes = function (id) {
        if (id > -1 && id < pokedex.data.types.length) {
            return pokedex.data.types[id];
        }
        return pokedex.data.types;
    };

    this.pokedexGetMoves = function (id) {
        if (id > -1 && id < pokedex.data.moves.length) {
            return pokedex.data.moves[id];
        }
        return pokedex.data.moves;
    };

    this.games = [];

    this.init = function () {
        //set up local store
        if (!localStorage["pokemonjourney.games"]) {
            //save to local store
            localStorage["pokemonjourney.games"] = JSON.stringify(this.games);
        }
        this.games = JSON.parse(localStorage["pokemonjourney.games"]);

        //set up local store
        if (!localStorage["pokemonjourney.music"]) {
            //save to local store
            localStorage["pokemonjourney.music"] = true;
        }
        //call music
        this.musicNextTune().addEventListener('ended', this.musicNextTune, false);

    }
    this.init();

    this.createGame = function (name, players) {
        var game = {};
        game.name = name;
        game.players = players;
        this.games.push(game);
        localStorage["pokemonjourney.games"] = JSON.stringify(this.games);
        return this.games.length;
    }

    this.createPlayer = function (name) {
        var player = {};
        player.name = name;
        player.remove = false;
        player.pokemon = [];
        player.bag = { money: 100, pokemon: [], pokeballs: [], badges: [] };

        player.addPokeball = function (id) {
            player.bag.pokeballs.push({ name: pokedex.data.pokeballs[id].name, value: pokedex.data.pokeballs[id].value, valueType: pokedex.data.pokeballs[id].valueType, 'imagetop': pokedex.data.pokeballs[id].imagetop, 'imageleft': pokedex.data.pokeballs[id].imageleft });
        }

        player.addPokemon = function (id, level, inbag) {
            var p = pokedex.data.pokemon[id];
            var newPokemon = { id: p.id, name: p.name, level: level };
            newPokemon.stats = { 'hp': p.baseStats.hp, 'atk': p.baseStats.atk, 'def': p.baseStats.def, 'spAtk': p.baseStats.spAtk, 'spDef': p.baseStats.spDef, 'speed': p.baseStats.speed };
            newPokemon.moves = [];
            for (var x = 0; x < p.learnset.length; x++) {
                if (p.learnset[x].level <= level) newPokemon.moves.push({ 'level': p.learnset[x].level, 'move': p.learnset[x].move });
            }
            newPokemon.inbag = inbag;
            player.pokemon.push(newPokemon);
        }
        return player;

    }

});