const typeColors = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#FFA700',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};

const minWidth = 450; 
const minHeight = 450; 

const body = document.getElementById("body");
const adjustHeader = document.getElementById("adjust-vp");

function checkViewport() {
if (window.innerWidth < minWidth || window.innerHeight < minHeight) {
		body.classList.add('hidden');
		adjustHeader.classList.remove("hidden");
} else {
		body.classList.remove('hidden');
		adjustHeader.classList.add("hidden");
}
}


window.addEventListener('load', checkViewport);
window.addEventListener('resize', checkViewport);

const findBtn = document.getElementById("search-button");
const inputName = document.getElementById("search-input");

const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const imgDiv = document.getElementById("img-div");

const typesDiv = document.getElementById("types");


function fetchPokemonData() {
	const pokemonName = inputName.value.toLowerCase();
	fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonName}`)
	.then((res) => res.json())
	.then((data) => {
		displayDetails(data);
  })
	.catch((err) => {
		alert("Pokémon not found");
	});
}


function displayDetails(data) {
	pokemonName.textContent = data.name[0].toUpperCase() + data.name.substring(1);
	pokemonId.textContent = `#${data.id}`;
	weight.textContent = `Weight: ${data.weight}`;
	height.textContent = `Height: ${data.height}`;
	hp.textContent = data.stats[0].base_stat;
	attack.textContent = data.stats[1].base_stat;
	defense.textContent = data.stats[2].base_stat;
	specialAttack.textContent = data.stats[3].base_stat;
	specialDefense.textContent = data.stats[4].base_stat;
	speed.textContent = data.stats[5].base_stat;

	imgDiv.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" />`;
	
	for (let i = 0; i < data.types.length; i++) {
		let typeName = data.types[i].type.name;
		typesDiv.innerHTML += `<p class="type" style="background-color: ${typeColors[typeName.toLowerCase()]};">${typeName.toUpperCase()}</p>`;
	}
}


findBtn.addEventListener("click", () => {
	typesDiv.innerHTML = "";
	fetchPokemonData();
	inputName.value = "";
});
inputName.addEventListener("keydown", (e) => {
	if (e.key === 'Enter') {
		typesDiv.innerHTML = "";
		fetchPokemonData();
		inputName.value = "";
	}
})
