import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

interface Pokemon {
  name: string;
  url: string;
}

const App = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchField, setSearchField] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => {
        if (response.data && response.data.results) {
          setPokemons(response.data.results);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da API Pokémon", error);
      });
  }, []);

  useEffect(() => {
    const filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchField.toLowerCase())
    );
    setFilteredPokemons(filtered);
  }, [searchField, pokemons]);

  const getPokemonImageUrl = (url: string) => {
    const pokemonId = url.split("/").filter(Boolean).pop();
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
  };

  console.log(">>>>", filteredPokemons);

  return (
    <div className="App">
      <h1>Listagem de Pokemons</h1>
      <input
        type="search"
        placeholder="Buscar Pokémon"
        onChange={(e) => setSearchField(e.target.value)}
      />
      <div className="pokemon-grid">
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon) => (
            <div className="pokemon-card" key={pokemon.name}>
              <img src={getPokemonImageUrl(pokemon.url)} alt={pokemon.name} />
              <h3>{pokemon.name}</h3>
            </div>
          ))
        ) : (
          <p>Carregando Pokémons...</p>
        )}
      </div>
    </div>
  );
};

export default App;
