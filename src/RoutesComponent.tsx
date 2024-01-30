// Arquivo: RoutesComponent.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import PokemonDetails from "./PokemonDetails";
// Importe outros componentes conforme necessário

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/pokemon/:pokemonName" element={<PokemonDetails />} />
      {/* Defina outras rotas conforme necessário */}
    </Routes>
  );
};

export default RoutesComponent;
