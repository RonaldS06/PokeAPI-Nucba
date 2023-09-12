const pokemonInput = document.getElementById("pokemonInput");
const busquedaPokemon = document.getElementById("busquedaPokemon");
const pokemonCard = document.getElementById("pokemonCard");

busquedaPokemon.addEventListener("click", () => {
    const pokemonId = pokemonInput.value;

    // Verificar si se ingresó un número válido
    if (!pokemonId || isNaN(pokemonId) || pokemonId < 1) {
        pokemonCard.innerHTML = `<p class="noValid">Por favor ingrese un número válido.</p>`;
        return;
    }

    // Hacer una solicitud a la API de Pokémon
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Pokemon no encontrado");
            }
            return response.json();
        })
        .then((data) => {
            // Procesar los datos y crear la tarjeta
            const pokemonNombre = data.name;
            const pokemonTipo = data.types.map((type) => type.type.name).join(", ");
            const pokemonAltura = (data.height / 10).toFixed(1); // Convertir a metros
            const pokemonPeso = (data.weight / 10).toFixed(1); // Convertir a kilogramos
            const pokemonImageUrl = data.sprites.front_default;

            const cardHTML = `
                <div class="pokemon-card">
                    <img src="${pokemonImageUrl}" alt="${pokemonNombre}" class="img-pokemon">
                    <h2 class="title-pokemon">${pokemonNombre}</h2>
                    <p>Tipo: ${pokemonTipo}</p>
                    <p>Altura: ${pokemonAltura} m</p>
                    <p>Peso: ${pokemonPeso} kg</p>
                </div>
            `;

            pokemonCard.innerHTML = cardHTML;
        })
        .catch((error) => {
            pokemonCard.innerHTML = `<p>${error.message}</p>`;
        });
});
