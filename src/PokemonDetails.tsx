import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./App.css";
import { useNavigate } from "react-router-dom";

const PokemonDetails = () => {
  const navigate = useNavigate();
  const { pokemonName } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);

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
          <img
            src={pokemonDetails.sprites.front_default}
            alt={pokemonName}
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <h2>{pokemonDetails.name}</h2>

          <table style={{ margin: "auto" }}>
            <tbody>
              <tr>
                <th>Tipo(s)</th>
                {pokemonDetails?.types.map((type) => (
                  <td className="option-mark">{type.type.name}</td>
                ))}
              </tr>
              <tr>
                <th>Habilidade(s)</th>
                {pokemonDetails.abilities.map((ability) => (
                  <td className="option-mark">{ability.ability.name}</td>
                ))}
              </tr>
              <tr>
                <th>Peso</th>
                <td className="option-mark">
                  {pokemonDetails.weight / 10} kg
                </td>{" "}
              </tr>
              <tr>
                <th>Altura</th>
                <td className="option-mark">
                  {pokemonDetails.height / 10} m
                </td>{" "}
              </tr>
              <tr>
                <th>Genero</th>
                <td className="option-mark">♂️ ♀️</td>{" "}
              </tr>
            </tbody>
          </table>
          <div className="stats-container">
            <h3>Estatísticas</h3>
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
              <div className="stat-label">Ataque</div>
              <div className="stat-bar">
                <div
                  className="stat-fill"
                  style={{ width: `${pokemonDetails.stats[1].base_stat}%` }}
                ></div>
              </div>
            </div>
            <div className="stat-row">
              <div className="stat-label">Defesa</div>
              <div className="stat-bar">
                <div
                  className="stat-fill"
                  style={{ width: `${pokemonDetails.stats[2].base_stat}%` }}
                ></div>
              </div>
            </div>
            <div className="stat-row">
              <div className="stat-label">Ataque especial</div>
              <div className="stat-bar">
                <div
                  className="stat-fill"
                  style={{ width: `${pokemonDetails.stats[3].base_stat}%` }}
                ></div>
              </div>
            </div>
            <div className="stat-row">
              <div className="stat-label">Defesa especial</div>
              <div className="stat-bar">
                <div
                  className="stat-fill"
                  style={{ width: `${pokemonDetails.stats[4].base_stat}%` }}
                ></div>
              </div>
            </div>
            <div className="stat-row">
              <div className="stat-label">Velocidade</div>
              <div className="stat-bar">
                <div
                  className="stat-fill"
                  style={{ width: `${pokemonDetails.stats[5].base_stat}%` }}
                ></div>
              </div>
            </div>
            {/* Repita as linhas para cada estatística */}
          </div>
          <button onClick={goBack}>Voltar</button>
        </>
      ) : (
        <p>Carregando detalhes do Pokémon...</p>
      )}
    </div>
  );
};

export default PokemonDetails;
