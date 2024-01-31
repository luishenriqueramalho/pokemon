import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  PokemonCard,
  PokemonGrid,
  PokemonNameInitial,
  Search,
  SelectType,
  Title,
} from "./global";

interface Pokemon {
  name: string;
  url: string;
  types?: string[];
}

const App = () => {
  const navigate = useNavigate();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchField, setSearchField] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/type")
      .then((response) => {
        if (response.data && response.data.results) {
          const types = response.data.results.map(
            (type: { name: string }) => type.name
          );
          setPokemonTypes(types);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar tipos de Pokémon", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then(async (response) => {
        if (response.data && response.data.results) {
          const pokemonDetailsPromises = response.data.results.map(
            (pokemon: Pokemon) => axios.get(pokemon.url)
          );
          try {
            const pokemonDetailsResponses = await Promise.all(
              pokemonDetailsPromises
            );
            const detailedPokemons = pokemonDetailsResponses.map(
              (response) => ({
                name: response.data.name,
                url: response.config.url,
                types: response.data.types.map(
                  (typeEntry: any) => typeEntry.type.name
                ), // Mapeia os tipos corretamente
              })
            );

            setPokemons(detailedPokemons);
          } catch (error) {
            console.error("Erro ao buscar detalhes dos Pokémons", error);
          }
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da API Pokémon", error);
      });
  }, []);

  useEffect(() => {
    const filtered = pokemons.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(searchField.toLowerCase()) &&
        (!typeFilter || pokemon.types?.includes(typeFilter))
    );
    setFilteredPokemons(filtered);
  }, [searchField, typeFilter, pokemons]);

  const getPokemonImageUrl = (url: string) => {
    const pokemonId = url.split("/").filter(Boolean).pop();
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
  };

  const goToAboutPage = () => {
    navigate("/PokemonDetails"); // Use a rota desejada aqui
  };

  return (
    <Container>
      <Title>LISTAGEM DE POKEMONS</Title>
      <Search
        type="search"
        placeholder="BUSCAR POKEMÓN"
        onChange={(e) => setSearchField(e.target.value)}
      />
      <SelectType onChange={(e) => setTypeFilter(e.target.value)}>
        <option value="">TODOS OS TIPOS</option>
        {pokemonTypes.map((type) => (
          <option key={type} value={type}>
            {type.toUpperCase()}
          </option>
        ))}
      </SelectType>
      <PokemonGrid>
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon) => (
            <Link
              style={{ textDecoration: "none" }}
              to={`/pokemon/${pokemon.name}`}
              key={pokemon.name}
            >
              <PokemonCard className="pokemon-card">
                <img src={getPokemonImageUrl(pokemon.url)} alt={pokemon.name} />
                <PokemonNameInitial>
                  {pokemon.name.toUpperCase()}
                </PokemonNameInitial>
              </PokemonCard>
            </Link>
          ))
        ) : (
          <p>Carregando Pokémons...</p>
        )}
      </PokemonGrid>{" "}
    </Container>
  );
};

export default App;
