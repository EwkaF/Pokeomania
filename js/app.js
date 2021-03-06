$(function () {

    var url = 'https://pokeapi.co/api/v2/pokemon/?limit=10';
    var nextUrl = url + '/' + '?limit=10&offset=';
    var offset = 0;

    $('.pokemon-details').hide();

    let value = $('input').val();




    function loadContent() {

        function loadPagination(number) {
            $('#pagination').html('');
            for (var i = 0; i < number.count / 10; i++) {
                let paginationButton = $('<button></button>');
                paginationButton.text(i);
                paginationButton.addClass('paginationButton');
                paginationButton.attr('id', i);
                $('#pagination').append(paginationButton);

            }

        }

        function loadPokemon(pokemon) {

            for (var i = 0; i < pokemon.length; i++) {

                let pokemonId = pokemon[i].url.slice(34, -1)
                // console.log(pokemonId)
                let li = $('<li>');
                li.addClass('row')
                let name = $('<h3>, {class: "name"}');
                name.addClass('col');
                name.text("#" + (pokemonId) + ". " + pokemon[i].name);
                let moreInfo = $('<button>Pokaż</button>');
                moreInfo.addClass('showInfo col');
                moreInfo.attr('id', pokemonId);
                li.append(name);
                li.append(moreInfo);
                $('#pokemonList').append(li)
            }



            function loadPokemonDetails(onePokemon) {

                $('.name span').text("#" + onePokemon.id)
                let h1 = $('.name strong');
                h1.text(onePokemon.species.name);
                let img = $('.pokemon-image');
                img.attr("src", onePokemon.sprites.front_default);
                let type = $('.type strong');
                let typ = "";

                for (var i = 0; i < onePokemon.types.length; i++) {
                    let pokemonType = onePokemon.types[i].type.name
                    switch (pokemonType) {
                        case "grass":
                            pokemonType = "trawiasty"
                            break;
                        case "poison":
                            pokemonType = "trujący"
                            break;
                        case "fire":
                            pokemonType = "ognisty"
                            break;
                        case "flying":
                            pokemonType = "powietrzny"
                            break;
                        case "water":
                            pokemonType = "wodny"
                            break;
                        case "bug":
                            pokemonType = "robak"
                            break;
                        case "normal":
                            pokemonType = "normalny"
                            break;
                        case "electric":
                            pokemonType = "elektryczny"
                            break;
                        case "ground":
                            pokemonType = "ziemny"
                            break;
                        case "rock":
                            pokemonType = "kamienny"
                            break;
                        case "fairy":
                            pokemonType = "wróżka"
                            break;
                        case "fighting":
                            pokemonType = "walczący"
                            break;
                        case "psychic":
                            pokemonType = "psychiczny"
                            break;
                        case "steel":
                            pokemonType = "stalowy"
                            break;
                        case "ice":
                            pokemonType = "lodowy"
                            break;
                        case "ghost":
                            pokemonType = "duch"
                            break;
                        case "dragon":
                            pokemonType = "smok"
                            break;
                        case "dark":
                            pokemonType = "mroczny"
                            break;
                    }
                    typ += pokemonType + ' ';

                }
                type.text(typ);
                let hp = $('.hp strong');
                hp.text(onePokemon.stats[5].base_stat);
                let attack = $('.attack strong');
                attack.text(onePokemon.stats[4].base_stat);
                let defense = $('.defense strong');
                defense.text(onePokemon.stats[3].base_stat);
                let spAttack = $('.special-attack strong');
                spAttack.text(onePokemon.stats[2].base_stat);
                let spDefense = $('.special-defense strong');
                spDefense.text(onePokemon.stats[1].base_stat);
                let speed = $('.speed strong');
                speed.text(onePokemon.stats[0].base_stat);

                $('.pokemon-details').show('slow');

                $('.close').on('click', function (e) {
                    $('.pokemon-details').hide('slow');
                });


            }

            function loadError() {
                $('.name span').text("Brak danych");
                $('.pokemon-image').attr('src', "logo.png");
                $('.name strong').text("");
                $('.type strong').text("")
                $('.pokemon-details').show('slow');
                $('.hp strong').text("");
                $('.attack strong').text("");
                $('.defense strong').text("");
                $('.special-attack strong').text("");
                $('.special-defense strong').text("");
                $('.speed strong').text("");


                $('.close').on('click', function (e) {
                    $('.pokemon-details').hide('slow');
                });
            }

            $('#pokemonList').on('click', '.showInfo', function (e) {

                // console.log("pokazuje wiecej");
                // console.log($(this)[0].id);
                let pokemonId = $(this)[0].id;

                $.ajax({
                    url: 'https://pokeapi.co/api/v2/pokemon' + '/' + pokemonId

                }).done(function (response) {
                    console.log(response)
                    loadPokemonDetails(response);
                }).fail(function (message) {
                    loadError()
                    console.log(message);
                    console.log("brak danych")

                })
            })



            function loadSearchedPokemon(pokemon) {
                let li = $('<li>');
                li.addClass('row')
                let name = $('<h3>, {class: "name"}');
                name.addClass('col');
                let pokemonId = pokemon.species.url.slice(42, -1);
                name.text('#' + pokemonId + ". " + pokemon.name);
                let moreInfo = $('<button>Pokaż</button>');
                moreInfo.addClass('showInfo col');

                console.log(pokemon.species.url)
                moreInfo.attr('id', pokemonId);
                li.append(name);
                li.append(moreInfo);
                $('#pokemonList').append(li)
            }

            //search bar 
            $('.search-button').on('click', function (e) {
                e.preventDefault()
                let value = $('input').val();
                console.log("OK")
                $.ajax({
                    url: 'https://pokeapi.co/api/v2/pokemon' + '/' + $('input').val()

                }).done(function (response) {
                    $('#pokemonList').html("");
                    console.log(response)
                    loadSearchedPokemon(response);
                }).fail(function (message) {
                    console.log(message);
                    console.log("brak danych");

                })

            })
        }


        $.ajax({
            url: url

        }).done(function (response) {
            $('#pokemonList').html("");
            console.log(response.count)
            loadPagination(response)
            loadPokemon(response.results);
        }).fail(function (message) {
            console.log(message)
        })
    }



    $('#pagination').on('click', '.paginationButton', function (e) {
        console.log($(this).attr('id'));
        offset = $(this).attr('id') * 10;
        url = nextUrl + offset;
        loadContent();


    })



    loadContent();
})
