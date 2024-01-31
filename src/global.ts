import styled from "styled-components";

export const Title = styled.h1`
  font-size: 50px;
  color: black;
  font-weight: 500;
  margin-bottom: 30px;
`;

export const Search = styled.input`
  width: 30%;
  padding: 8px;
  border-radius: 8px;
  margin-right: 10px;
  margin-bottom: 20px;
`;

export const SelectType = styled.select`
  width: 30%;
  padding: 8px;
  border-radius: 8px;
`;

export const PokemonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  padding: 20px;
`;

export const PokemonCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

export const PokemonImage = styled.img`
  max-width: 100%;
  height: auto;
`;

export const PokemonName = styled.text`
  font-size: 30px;
  text-align: center;
  margin-top: 20px;
`;

export const PokemonNameInitial = styled.text`
  color: black;
  font-weight: 500;
`;

export const Container = styled.div`
  text-align: center;
  padding-top: 50px;
`;

export const Table = styled.table`
  margin: auto;
  margin-top: 15px;
`;

export const CardCharacter = styled.tr`
  padding-left: 20px;
`;

export const Character = styled.th`
  font-size: 15px;
  font-weight: 500;
`;

export const OptionMark = styled.td`
  width: 100px;
  padding: 10px;
  background-color: #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
`;
