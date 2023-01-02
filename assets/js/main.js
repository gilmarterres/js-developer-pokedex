const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

// const criada para remover barra de rolaglem ao abrir modal
const body = document.getElementById("body").style

function convertPokemonToLi(pokemon) {
    return `
        <li onclick="displayModal('${pokemon.number}')" class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})






const displayModal = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const details = await res.json()
    displayPopup(details)
}

const displayPopup = (details) => {
    const type = details.types.map( type =>
    type.type.name).join(', ')
    const img = details.sprites.other.dream_world.front_default
    const typeColor = details.types[0].type.name
    const kg = details.weight / 10
    const cm = details.height * 10

        const htmlString = `
            <div id="popup1" >
                <div class="popup ${typeColor}">
                    <div class="top">
                        <img id="arrow_back" onclick="closePopoup()" src="assets/img/arrow.svg" alt="Seta">
                        <h1>${details.name}</h1>
                        <p>#${details.id}</p>
                    </div>

                    <div class="detail">
                        <ol class="types">
                            ${details.types.map(type =>`<li class="type ${type.type.name}">${type.type.name}</li>`).join('')}
                        </ol>
                    </div>

                    <div class="card" >
                        <img class="img" src="${img}" />
                    </div>

                    <div class="about">
                        <h3>About</h3>
                        <div >
                            <li>
                                <ol class="li0">Abilities: </ol>
                                <ol class="li0">Height: </ol>
                                <ol class="li0">Weight: </ol>
                            </li>
                            <li>
                            ${details.abilities.map(ability => ability.ability.name).join(', ')}
                                <ol class="li1">${cm}cm</ol>
                                <ol class="li1">${kg}kg</ol>
                            </li>
                        </div>
                        <h3>Base Stats</h3>
                        <div>
                            <li class="li0">
                                <ol>${details.stats[0].stat.name}:</ol>
                                <ol>${details.stats[1].stat.name}:</ol>
                                <ol>${details.stats[2].stat.name}:</ol>
                                <ol>${details.stats[3].stat.name}:</ol>
                                <ol>${details.stats[4].stat.name}:</ol>
                                <ol>${details.stats[5].stat.name}:</ol>
                            </li>
                            <li class="li1">
                                <ol>${details.stats[0].base_stat}</ol>
                                <ol>${details.stats[1].base_stat}</ol>
                                <ol>${details.stats[2].base_stat}</ol>
                                <ol>${details.stats[3].base_stat}</ol>
                                <ol>${details.stats[4].base_stat}</ol>
                                <ol>${details.stats[5].base_stat}</ol>
                            </li>
                        </div>


                    </div>
            </div>
        `
        document.getElementById("popup0").innerHTML = htmlString
        body.overflow = "hidden" // Esconde a barra de rolagem
        console.log(details)
}

const closePopoup = () => {
    document.getElementById("popup1").remove() // Fecha modal
    body.overflow = "auto" // Aplica novamente barra de rolagem ao fechar modal
}