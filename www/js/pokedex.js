Handlebars.registerHelper('arrayify', function (obj) {
    result = [];
    for (var key in obj) result.push({ name: key, value: obj[key] });
    return result;
});

var pokedex = function (successCallback, errorCallback) {
    
    this.findById = function (id, callback) {
        callLater(callback, pokemon[id]);
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


    callLater(successCallback);

}

$("#pokedex-pokemon-detail").on("pagechange", function (event) { alert("test"); } )

pokedex.firstTimeView = false;
var PokedexPokemonView = function () {
    /*
    if (pokedex.firstTimeView) {
        var t = 0;
        var l = 120;
        var col = 0;
        for (var x = 0; x < pokedex.pokemon.length; x++) {
            pokedex.pokemon[x].description = pokedex.pokemon[x].name;
            pokedex.pokemon[x].area = 'Unknown';
            l -= 120;
            if (col > 14) {
                l = 0;
                t -= 120;
            }
            col += 1;
            pokedex.pokemon[x].imageTop = t;
            pokedex.pokemon[x].imageLeft = l;
        }
        console.log(pokedex.pokemon);
    }
    pokedex.firstTimeView = false;
    */    
    var template = Handlebars.compile($("#pokedex-pokemon-li-tpl").html());
    var html = template(pokedex.pokemon);
    $("#pokedex-pokemon-ul").html(html);
}

var PokedexPokemonDetailsView = function (id) {
    var p = new Array(pokedex.pokemon[id]);    
    console.log(p[0]);
    $('#pokedex-pokemon-detail-name').html(p[0].name);
    var template = Handlebars.compile($("#pokedex-pokemon-detail-tpl").html());
    var html = template(p);
    $("#pokedex-pokemon-detail-ul").html(html);
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
    /*
    if (pokedex.firstTimeView) {
        for (var x = 0; x < pokedex.moves.length; x++) {
            var pa = [];
            for (var propt in pokedex.moves[x]) {
                if (propt !== 'name') {
                    pa.push({ 'key': propt, 'value': pokedex.moves[x][propt] });
                }
            }
            pokedex.moves[x].details = pa;
        }
        console.log(pokedex.moves);
    }
    pokedex.firstTimeView = false;
    */
    var template = Handlebars.compile($("#pokedex-moves-li-tpl").html());
    var html = template(pokedex.moves);
    $("#pokedex-moves-ul").html(html);
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
            }
        }
	}
});