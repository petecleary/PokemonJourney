var app = angular.module('pokemonJourney', []);

app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
          templateUrl: 'partials/home.html',
          controller: 'MainCtrl'
      })
      .when('/new', {
          templateUrl: 'partials/new.html',
          controller: 'GameNewCtrl'
      })
      .when('/game/:id', {
          templateUrl: 'partials/game-home.html',
          controller: 'GameHomeCtrl'
      })
      .when('/game/:id/:index', {
          templateUrl: 'partials/game-player.html',
          controller: 'GamePlayerCtrl'
      })
      .when('/rules', {
          templateUrl: 'partials/rules.html',
          controller: 'MainCtrl'
      })
      .when('/pokedex', {
          templateUrl: 'partials/pokedex.html',
          controller: 'MainCtrl'
      })
      .when('/pokedex/pokemon/:id', {
          templateUrl: 'partials/pokedex-pokemon-detail.html',
          controller: 'PokedexPokemonDetailCtrl'
      })
      .when('/pokedex/pokemon', {
          templateUrl: 'partials/pokedex-pokemon.html',
          controller: 'PokedexPokemonCtrl'
      })
      .when('/pokedex/pokeballs', {
          templateUrl: 'partials/pokedex-pokeballs.html',
          controller: 'PokedexCtrl'
      })
      .when('/pokedex/types', {
          templateUrl: 'partials/pokedex-types.html',
          controller: 'PokedexCtrl'
      })
      .when('/pokedex/moves/:id', {
          templateUrl: 'partials/pokedex-moves-detail.html',
          controller: 'PokedexCtrl'
      })
      .when('/pokedex/moves', {
          templateUrl: 'partials/pokedex-moves.html',
          controller: 'PokedexCtrl'
      })
      .when('/about', {
          templateUrl: 'partials/about.html',
          controller: 'MainCtrl'
      })
      .when('/settings', {
          templateUrl: 'partials/settings.html',
          controller: 'SettingsCtrl'
      })
      .otherwise({
          redirectTo: '/'
      });
});

app.styles = {
    // appear from right
    front: '.enter-setup {   position:absolute;   -webkit-transition: 0.3s ease-out all;   -moz-transition: 0.3s ease-out all;  -o-transition: 0.3s ease-out all; -webkit-transform:translate3d(100%,0,0)  }  .enter-setup.enter-start {   position:absolute;  -webkit-transform:translate3d(0,0,0)}  .leave-setup {   position:absolute;   -webkit-transition: 0.3s ease-out all;   -moz-transition: 0.3s ease-out all;   -o-transition: 0.3s ease-out all; -webkit-transform:translate3d(0,0,0)} .leave-setup.leave-start {   position:absolute;  -webkit-transform:translate3d(-100%,0,0) };',
    // appear from left
    back: '.enter-setup {   position:absolute;   -webkit-transition: 0.3s ease-out all;  -moz-transition: 0.3s ease-out all;  -o-transition: 0.3s ease-out all; -webkit-transform:translate3d(-100%,0,0)}  .enter-setup.enter-start {   position:absolute;   -webkit-transform:translate3d(0,0,0) }  .leave-setup {   position:absolute;   -webkit-transition: 0.3s ease-out all;   -moz-transition: 0.3s ease-out all;  -o-transition: 0.3s ease-out all; -webkit-transform:translate3d(0,0,0)} .leave-setup.leave-start {   position:absolute;  -webkit-transform:translate3d(100%,0,0) };'

};


app.controller('OmniNavCtrl', function ($scope, $rootScope, $location) {

    //Navigation elements
    $scope.direction = function (dir) {
        // update the animations classes
        $rootScope.style = app.styles[dir];
    }

    $scope.go = function (path) {
        $location.path(path);
    }
    $scope.direction('front');

    $scope.goBack = function () {
        window.history.back();
    };
    //Navigation elements
});

app.controller('MainCtrl', function ($scope, $rootScope, $location, pokedexService) {

    //Navigation elements
    $scope.direction = function (dir) {
        // update the animations classes
        $rootScope.style = app.styles[dir];
    }

    $scope.go = function (path) {
        $location.path(path);
    }
    $scope.direction('front');

    $scope.goBack = function () {
        window.history.back();
    };
    //Navigation elements

    init();
    function init() {
        $scope.games = pokedexService.games;
    };
});

app.controller('SettingsCtrl', function ($scope, $rootScope, $location, pokedexService) {

    //Navigation elements
    $scope.direction = function (dir) {
        // update the animations classes
        $rootScope.style = app.styles[dir];
    }

    $scope.go = function (path) {
        $location.path(path);
    }
    $scope.direction('front');

    $scope.goBack = function () {
        window.history.back();
    };
    //Navigation elements

    init();
    function init() {
        $scope.music = localStorage["pokemonjourney.music"];
    };

    $scope.changeMusic = function () {
        if (localStorage["pokemonjourney.music"] === 'true') {
            localStorage["pokemonjourney.music"] = false;
            pokedexService.musicStop();
        } else {
            localStorage["pokemonjourney.music"] = true;
            pokedexService.musicPlay();
        };
    };
});

app.controller('PokedexCtrl', function ($scope, $rootScope, $location, $routeParams, pokedexService) {

    //Navigation elements
    $scope.direction = function (dir) {
        // update the animations classes
        $rootScope.style = app.styles[dir];
    }

    $scope.go = function (path) {
        $location.path(path);
    }
    $scope.direction('front');

    $scope.goBack = function () {
        window.history.back();
    };
    //Navigation elements

    init();
    function init() {
        $scope.pokemons = pokedexService.pokedexGetPokemon();
        $scope.pokeballs = pokedexService.pokedexGetPokeballs();
        $scope.types = pokedexService.pokedexGetTypes();
        $scope.moves = pokedexService.pokedexGetMoves();
        var id = ($routeParams.id) ? parseInt($routeParams.id) : -1;
        if (id >= 0) {
            $scope.move = pokedexService.pokedexGetMoves(id);
        }
    };

    $scope.toggleHidden = function (i) {
        var chevron = document.getElementById('pokedex-move-chevron-' + i);
        var div = document.getElementById('pokedex-move-details-' + i);
        if (div.className === 'hidden') {
            div.className = 'show';
            div.style.display = 'block;'
            chevron.style.display = 'none;'
        }
        else {
            div.className = 'hidden';
            div.style.display = 'none;'
            chevron.style.display = 'block;'
        }
    }
});

app.controller('PokedexPokemonCtrl', function ($scope, $rootScope, $location, pokedexService) {
    
    //Navigation elements
    $scope.direction = function (dir) {
        // update the animations classes
        $rootScope.style = app.styles[dir];
    }

    $scope.go = function (path) {
        $location.path(path);
    }
    $scope.direction('front');

    $scope.goBack = function () {
        window.history.back();
    };
    //Navigation elements

    init();
    function init() {
        $scope.pokemons = pokedexService.pokedexGetPokemon();
    };
});

app.controller('PokedexPokemonDetailCtrl', function ($scope, $rootScope, $location, $routeParams, pokedexService) {
    
    //Navigation elements
    $scope.direction = function (dir) {
        // update the animations classes
        $rootScope.style = app.styles[dir];
    }

    $scope.go = function (path) {
        $location.path(path);
    }
    $scope.direction('front');

    $scope.goBack = function () {
        window.history.back();
    };
    //Navigation elements

    init();
    function init() {
        var id = ($routeParams.id) ? parseInt($routeParams.id) : 0;
        if (id >= 0) {
            $scope.pokemon = pokedexService.pokedexGetPokemon(id);
        }
    };
});

app.controller('GameNewCtrl', function ($scope, $rootScope, $location, pokedexService) {

    //Navigation elements
    $scope.direction = function (dir) {
        // update the animations classes
        $rootScope.style = app.styles[dir];
    }

    $scope.go = function (path) {
        $location.path(path);
    }
    $scope.direction('front');

    $scope.goBack = function () {
        window.history.back();
    };
    //Navigation elements

    init();
    function init() {
        $scope.pokemons = pokedexService.pokedexGetPokemon();
    };

    $scope.selectedStarter = 0;
    $scope.players = [];

    $scope.startingPokemon = [{
        "id": 0,
        "name": "Bulbasaur"
    }, {
        "id": 3,
        "name": "Charmander"
    }, {
        "id": 6,
        "name": "Squirtle"
    }];

    $scope.addPlayer = function () {
        if ($scope.playerName === undefined || $scope.playerName === '') return;
        var newPlayer = pokedexService.createPlayer($scope.playerName);
        newPlayer.addPokemon($scope.selectedStarter, 5, true);
        for (var x = 0; x < 6; x++) { newPlayer.addPokeball(0); }
        $scope.players.push(newPlayer);
        console.log($scope.players);
        $scope.playerName = '';
    };

    $scope.removePlayer = function (i) {
        $scope.players.splice(i,1);
    };

    $scope.createGame = function () {
        if ($scope.gameName === undefined || $scope.gameName === '') return;
        var id = pokedexService.createGame($scope.gameName, $scope.players);
        $scope.gameName = '';
        $location.path("/game/" + id);
    };
});

app.controller('GameHomeCtrl', function ($scope, $rootScope, $location, $routeParams, pokedexService) {

    //Navigation elements
    $scope.direction = function (dir) {
        // update the animations classes
        $rootScope.style = app.styles[dir];
    }

    $scope.go = function (path) {
        $location.path(path);
    }
    $scope.direction('front');

    $scope.goBack = function () {
        window.history.back();
    };
    //Navigation elements

    $scope.game = {};

    init();
    function init() {
        var id = ($routeParams.id) ? parseInt($routeParams.id) : 0;
        if (id >= 0) {
            $scope.game = pokedexService.games[id];
            $scope.game.index = id;
        }
    };
    
    $scope.addPlayer = function () {
        $scope.game.players.push(pokedexService.createPlayer($scope.playerName));
        $scope.playerName = '';
    };

    $scope.removePlayer = function (i) {
        $scope.game.players.splice(i, 1);
    };

});

app.controller('GamePlayerCtrl', function ($scope, $rootScope, $location, $routeParams, pokedexService) {

    //Navigation elements
    $scope.direction = function (dir) {
        // update the animations classes
        $rootScope.style = app.styles[dir];
    }

    $scope.go = function (path) {
        $location.path(path);
    }
    $scope.direction('front');

    $scope.goBack = function () {
        window.history.back();
    };
    //Navigation elements

    $scope.game = {};
    $scope.player = {};

    init();
    function init() {
        var id = ($routeParams.id) ? parseInt($routeParams.id) : 0;
        var index = ($routeParams.index) ? parseInt($routeParams.index) : 0;
        if (id >= 0) {
            $scope.game = pokedexService.games[id];
            $scope.player = $scope.game.players[index];
            console.log($scope.player);
        }
    };

    $scope.addPlayer = function () {
        $scope.game.players.push(pokedexService.createPlayer($scope.playerName));
        $scope.playerName = '';
    };

    $scope.removePlayer = function (i) {
        $scope.game.players.splice(i, 1);
    };

});