import React from "react";
import { useParams } from "react-router-dom";

const PokemonDetails = () => {
  let { pokemonName } = useParams();

  return (
    <div>
      <h2>{pokemonName}</h2>
    </div>
  );
};

export default PokemonDetails;
