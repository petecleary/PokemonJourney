var app = angular.module('pokemonJourney', []);

app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
          templateUrl: 'partials/home.html',
          controller: 'MainCtrl'
      })
      .when('/new', {
          templateUrl: 'partials/new.html',
          controller: 'MainCtrl'
      })
      .when('/load', {
          templateUrl: 'partials/load.html',
          controller: 'MainCtrl'
      })
      .when('/rules', {
          templateUrl: 'partials/rules.html',
          controller: 'MainCtrl'
      })
      .when('/pokedex', {
          templateUrl: 'partials/pokedex.html',
          controller: 'MainCtrl'
      })
      .when('/pokedex/pokemon', {
          templateUrl: 'partials/pokedex-pokemon.html',
          controller: 'PokedexPokemonCtrl'
      })
      .when('/pokedex/pokemon/:id', {
          templateUrl: 'partials/pokedex-pokemon-detail.html',
          controller: 'PokedexPokemonDetailCtrl'
      })
      .when('/about', {
          templateUrl: 'partials/about.html',
          controller: 'MainCtrl'
      })
      .when('/settings', {
          templateUrl: 'partials/settings.html',
          controller: 'MainCtrl'
      })
      .otherwise({
          redirectTo: '/'
      });
});

app.styles = {
    // appear from right
    front: '.enter-setup {   position:absolute;   -webkit-transition: 0.3s ease-out all;   -webkit-transform:translate3d(100%,0,0)  }  .enter-setup.enter-start {   position:absolute;  -webkit-transform:translate3d(0,0,0)}  .leave-setup {   position:absolute;   -webkit-transition: 0.3s ease-out all;   -webkit-transform:translate3d(0,0,0)} .leave-setup.leave-start {   position:absolute;  -webkit-transform:translate3d(-100%,0,0) };',
    // appear from left
    back: '.enter-setup {   position:absolute;   -webkit-transition: 0.3s ease-out all; -webkit-transform:translate3d(-100%,0,0)}  .enter-setup.enter-start {   position:absolute;   -webkit-transform:translate3d(0,0,0) }  .leave-setup {   position:absolute;   -webkit-transition: 0.3s ease-out all;  -webkit-transform:translate3d(0,0,0)} .leave-setup.leave-start {   position:absolute;  -webkit-transform:translate3d(100%,0,0) };'
};


app.controller('MainCtrl', function ($scope, $rootScope, $location) {

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
        $scope.pokemons = pokedexService.getPokemon();
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
        console.log(id);
        if (id >= 0) {
            $scope.pokemon = pokedexService.getPokemon(id);
        }
    };
});