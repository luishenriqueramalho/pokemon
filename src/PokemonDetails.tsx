import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./App.css";
import { useNavigate } from "react-router-dom";
import {
  CardCharacter,
  Character,
  OptionMark,
  PokemonImage,
  PokemonName,
  Table,
} from "./global";

interface PokemonDetailsProps {
  name: string;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  weight: number;
  height: number;
  stats: { base_stat: number }[];
  // ... adicione outras propriedades conforme necessário
}

const PokemonDetails = () => {
  const navigate = useNavigate();
  const { pokemonName } = useParams();
  const [pokemonDetails, setPokemonDetails] =
    useState<PokemonDetailsProps | null>(null);

  useEffect(() => {
    // Substitua 'pokemonName' pelo nome do Pokémon na URL, se necessário
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        setPokemonDetails(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes do Pokémon", error);
      });
  }, [pokemonName]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div style={{ textAlign: "center" }}>
      {pokemonDetails ? (
        <>
          <PokemonImage
            src={pokemonDetails.sprites.front_default}
            alt={pokemonName}
          />
          <PokemonName>{pokemonDetails.name.toUpperCase()}</PokemonName>

          <Table>
            <tbody>
              <CardCharacter>
                <Character>TIPO(S)</Character>
                {pokemonDetails?.types.map((type) => (
                  <OptionMark>{type.type.name.toUpperCase()}</OptionMark>
                ))}
              </CardCharacter>
              <CardCharacter>
                <Character>HABILIDADE(S)</Character>
                {pokemonDetails.abilities.map((ability) => (
                  <OptionMark>{ability.ability.name.toUpperCase()}</OptionMark>
                ))}
              </CardCharacter>
              <CardCharacter>
                <Character>PESO</Character>
                <OptionMark>{pokemonDetails.weight / 10} kg</OptionMark>{" "}
              </CardCharacter>
              <CardCharacter>
                <Character>ALTURA</Character>
                <OptionMark>{pokemonDetails.height / 10} m</OptionMark>{" "}
              </CardCharacter>
              <CardCharacter>
                <Character>GÊNERO</Character>
                <OptionMark>♂️ ♀️</OptionMark>{" "}
              </CardCharacter>
            </tbody>
          </Table>
          <div className="stats-container">
            <h3>ESTATÍSTICAS</h3>
            <div className="stat-row">
              <div className="stat-label">HP</div>
              <div className="stat-bar">
                <div
                  className="stat-fill"
                  style={{ width: `${pokemonDetails.stats[0].base_stat}%` }}
                ></div>
              </div>
            </div>
            <div className="stat-row">
              <div className="stat-label">ATAQUE</div>
              <div className="stat-bar">
                <div
                  className="stat-fill"
                  style={{ width: `${pokemonDetails.stats[1].base_stat}%` }}
                ></div>
              </div>
            </div>
            <div className="stat-row">
              <div className="stat-label">DESEFA</div>
              <div className="stat-bar">
                <div
                  className="stat-fill"
                  style={{ width: `${pokemonDetails.stats[2].base_stat}%` }}
                ></div>
              </div>
            </div>
            <div className="stat-row">
              <div className="stat-label">ATAQUE ESPECIAL</div>
              <div className="stat-bar">
                <div
                  className="stat-fill"
                  style={{ width: `${pokemonDetails.stats[3].base_stat}%` }}
                ></div>
              </div>
            </div>
            <div className="stat-row">
              <div className="stat-label">DEFESA ESPECIAL</div>
              <div className="stat-bar">
                <div
                  className="stat-fill"
                  style={{ width: `${pokemonDetails.stats[4].base_stat}%` }}
                ></div>
              </div>
            </div>
            <div className="stat-row">
              <div className="stat-label">VELOCIDADE</div>
              <div className="stat-bar">
                <div
                  className="stat-fill"
                  style={{ width: `${pokemonDetails.stats[5].base_stat}%` }}
                ></div>
              </div>
            </div>
            {/* Repita as linhas para cada estatística */}
          </div>
          <button onClick={goBack}>VOLTAR</button>
        </>
      ) : (
        <p>Carregando detalhes do Pokémon...</p>
      )}
    </div>
  );
};

export default PokemonDetails;
