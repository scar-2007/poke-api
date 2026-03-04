const searchBtn = document.getElementById('searchBtn');
const pokemonInput = document.getElementById('pokemonInput');
const pokeCard = document.getElementById('pokeCard');
const errorMsg = document.getElementById('errorMsg');

searchBtn.addEventListener('click', () => {
    const name = pokemonInput.value.toLowerCase().trim();
    if (!name) return;

    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => {
            if (!response.ok) throw new Error('Not found');
            return response.json();
        })
        .then(data => {
            displayPokemon(data);
        })
        .catch(err => {
            pokeCard.classList.add('hidden');
            errorMsg.classList.remove('hidden');
        });
});

function displayPokemon(data) {
    errorMsg.classList.add('hidden');
    pokeCard.classList.remove('hidden');

    // Set Name and Image
    document.getElementById('pokeName').textContent = data.name.toUpperCase();
    document.getElementById('pokeImage').src = data.sprites.front_default;

    // Clear and Fill Stats
    const statsContainer = document.getElementById('statsContainer');
    statsContainer.innerHTML = ''; // Reset previous stats

    data.stats.forEach(s => {
        const statElement = document.createElement('div');
        statElement.className = 'stat-item';
        statElement.innerHTML = `<strong>${s.stat.name}:</strong> ${s.base_stat}`;
        statsContainer.appendChild(statElement);
    });
}