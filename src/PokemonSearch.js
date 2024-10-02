import './PokemonSearch.css';

import React, { useEffect, useState } from "react";

import axios from "axios";

// Import the CSS file

const PokemonSearch = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);
  const [cache, setCache] = useState({});  // For caching previously searched Pokémon
  const [pokemonList, setPokemonList] = useState([]); // List of all Pokémon for partial name search

  useEffect(() => {
    // Fetch the complete list of Pokémon for partial search
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10000");
        setPokemonList(response.data.results);
      } catch (err) {
        console.error("Error fetching Pokémon list");
      }
    };
    fetchPokemonList();
  }, []);

  const searchPokemon = async () => {
    let match = pokemonList.find(pokemon => pokemon.name.includes(pokemonName.toLowerCase()));
    
    if (!match) {
      setError("Pokémon not found");
      setPokemonData(null);
      return;
    }

    // Use cached data if available
    if (cache[match.name]) {
      setPokemonData(cache[match.name]);
      setError(null);
    } else {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${match.name}`);
        setCache({ ...cache, [match.name]: response.data });  // Update cache
        setPokemonData(response.data);
        setError(null);
      } catch (err) {
        setError("Pokémon not found");
        setPokemonData(null);
      }
    }
  };

  const fetchPreviousPokemon = async () => {
    if (pokemonData && pokemonData.id > 1) {
      let prevId = pokemonData.id - 1;
      if (cache[prevId]) {
        setPokemonData(cache[prevId]);
        setError(null);
      } else {
        try {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${prevId}`);
          setCache({ ...cache, [prevId]: response.data });
          setPokemonData(response.data);
          setError(null);
        } catch (err) {
          setError("Pokémon not found");
        }
      }
    }
  };

  const fetchNextPokemon = async () => {
    if (pokemonData) {
      let nextId = pokemonData.id + 1;
      if (cache[nextId]) {
        setPokemonData(cache[nextId]);
        setError(null);
      } else {
        try {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nextId}`);
          setCache({ ...cache, [nextId]: response.data });
          setPokemonData(response.data);
          setError(null);
        } catch (err) {
          setError("Pokémon not found");
        }
      }
    }
  };

  return (
    <div className="pokemon-search-container">
      <h1>Pokémon Search</h1>
      <input
        className="pokemon-input"
        type="text"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
        placeholder="Enter Pokémon Name or Partial Name"
      />
      <button className="search-button" onClick={searchPokemon}>Search</button>

      {error && <p className="error-message">{error}</p>}

      {pokemonData && (
        <div className="pokemon-details">
          <h2>{pokemonData.name} (#{pokemonData.id})</h2>
          <img className="pokemon-image" src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          <div>
            <button className="navigation-button" onClick={fetchPreviousPokemon}>Previous</button>
            <button className="navigation-button" onClick={fetchNextPokemon}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonSearch;
