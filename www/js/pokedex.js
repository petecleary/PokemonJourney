Handlebars.registerHelper('arrayify', function (obj) {
    result = [];
    for (var key in obj) result.push({ name: key, value: obj[key] });
    return result;
});



var pokedex = function () {

    pokedex.pokemon = {};

    pokedex.pokemon.findAll = function (callback) {
        var pokemon = JSON.parse(localStorage["pokemonjourney.pokedex.pokemon"]);
        callLater(callback, pokemon);
    }

    pokedex.pokemon.findById = function (id, callback) {
        var pokemon = JSON.parse(localStorage["pokemonjourney.pokedex.pokemon"]);
        callLater(callback, pokemon[id]);
    }

    pokedex.pokemon.save = function () {
        var pokemon = JSON.parse(localStorage["pokemonjourney.pokedex.pokemon"]);
        var id = $('#pokedex-pokemon-id').val() - 1;
        pokemon[id].area = $('#pokedex-pokemon-area').val();
        pokemon[id].description = $('#pokedex-pokemon-description').val();
        localStorage["pokemonjourney.pokedex.pokemon"] = JSON.stringify(pokemon);
        $.mobile.navigate('#pokedex-pokemon-detail?' + pokemon[id].id);
    }

    pokedex.showsync = function () {
        var networkState = navigator.connection.type;
        console.log(networkState);
        var syncFrame = $('#syncFrame');
        syncFrame.src = "http://www.piandmash.com";

        //pd = encodeURI(localStorage["pokemonjourney.pokedex.pokemon"]);
        //console.log('mailto:pete.cleary@gmail.com?subject=Pokemon%20Journey%20Pokedex&body=' + pd);
        //document.location = 'mailto://pete.cleary@gmail.com?subject=Pokemon%20Journey%20Pokedex&body=' + pd;
    }

    // Used to simulate async calls. This is done to provide a consistent interface with stores (like WebSqlStore)
    // that use async data access APIs
    var callLater = function (callback, data) {
        if (callback) {
            setTimeout(function () {
                callback(data);
            });
        }
    }

    if (!localStorage["pokemonjourney.pokedex"]) {
        //save to local store
        localStorage["pokemonjourney.pokedex.pokemon"] = JSON.stringify(pokedex.data.pokemon);

        localStorage["pokemonjourney.pokedex"] = true;
    }

    //remove data to speed things up
    delete pokedex.data.pokemon;

    //create views
    PokedexPokemonView();
    PokedexTypesView();
    PokedexBallsView();
    PokedexMovesView();

}
pokedex.data = {};

pokedex.firstTimeView = false;
var PokedexPokemonView = function () {
    pokedex.pokemon.findAll(function (pokemon) {
        var template = Handlebars.compile($("#pokedex-pokemon-li-tpl").html());
        var html = template(pokemon);
        $("#pokedex-pokemon-ul").html(html);
    });
}

var PokedexPokemonDetailsView = function (id) {
    pokedex.pokemon.findById(id, function (pokemon) {
        var p = new Array(pokemon);
        console.log(pokemon);
        $('#pokedex-pokemon-detail-name').html(pokemon.name);
        $('#pokedex-pokemon-detail-editId').attr('href', '#pokedex-pokemon-detail-edit?' + p[0].id);
        var template = Handlebars.compile($("#pokedex-pokemon-detail-tpl").html());
        var html = template(p);
        $("#pokedex-pokemon-detail-ul").html(html).trigger('create');;
    });
}

var PokedexPokemonDetailsEditView = function (id) {
    pokedex.pokemon.findById(id, function (pokemon) {
        var p = new Array(pokemon);
        $('#pokedex-pokemon-detail-diaplyId').attr('href', '#pokedex-pokemon-detail?' + p[0].id);
        var template = Handlebars.compile($("#pokedex-pokemon-detail-edit-tpl").html());
        var html = template(p);
        $("#pokedex-pokemon-detail-edit-ul").html(html).trigger('create');
    });
}

var PokedexTypesView = function () {
    var template = Handlebars.compile($("#pokedex-types-li-tpl").html());
    var html = template(pokedex.types);
    $("#pokedex-types-ul").html(html);
}


var PokedexBallsView = function () {
    var template = Handlebars.compile($("#pokedex-pokeballs-li-tpl").html());
    var html = template(pokedex.pokeballs);
    $("#pokedex-pokeballs-ul").html(html);
}

var PokedexMovesView = function () {
    var template = Handlebars.compile($("#pokedex-moves-li-tpl").html());
    var html = template(pokedex.moves);
    $("#pokedex-moves-ul").html(html);
}

document.addEventListener("deviceready", onDeviceReady, false);

var connectionType = 'none';

function onDeviceReady() {
    connectionType = navigator.network.connection.type;
    document.addEventListener("online", setConnection);
    document.addEventListener("offline", setConnection);
}

function setConnection(){
    connectionType = navigator.network.connection.type;
}

$(document).bind("pagebeforechange", function (event, data) {
    if (typeof data.toPage === "string") {
        var parts = data.toPage.split('#');
        if (parts.length > 1) {
            parts = parts[1].split('?');
            switch (parts[0]) {
                case "pokedex-pokemon-detail":
                    PokedexPokemonDetailsView(parts[1] - 1);
                    break;
                case "pokedex-pokemon-detail-edit":
                    PokedexPokemonDetailsEditView(parts[1] - 1);
                    break;
                case "sync":
                    var syncFrame = $('#syncFrame');
                    switch (connectionType) {
                        case "ethernet":
                        case "wifi":
                            syncFrame.attr("src", "http://www.piandmash.com");
                            break;
                        default:
                            syncFrame.attr("src", "noconnection.html");
                            break;
                    }
                    console.log(syncFrame.attr("src"));
                    break;
            }
        }
	}
});

