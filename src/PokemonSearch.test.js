import { fireEvent, render, screen } from "@testing-library/react";

import PokemonSearch from "./PokemonSearch";
import React from "react";
import axios from "axios";

jest.mock("axios");

describe("PokemonSearch", () => {
  test("Searches and displays a Pokémon", async () => {
    const mockResponse = {
      data: {
        name: "pikachu",
        id: 25,
        sprites: { front_default: "pikachu_sprite_url" },
      },
    };
    axios.get.mockResolvedValueOnce(mockResponse);

    render(<PokemonSearch />);

    const input = screen.getByPlaceholderText("Enter Pokémon Name or Partial Name");
    fireEvent.change(input, { target: { value: "pikachu" } });

    const searchButton = screen.getByText("Search");
    fireEvent.click(searchButton);

    const nameElement = await screen.findByText(/pikachu/i);
    expect(nameElement).toBeInTheDocument();
  });

  test("Shows 'Pokémon not found' when no match", async () => {
    axios.get.mockRejectedValueOnce(new Error("Not Found"));

    render(<PokemonSearch />);

    const input = screen.getByPlaceholderText("Enter Pokémon Name or Partial Name");
    fireEvent.change(input, { target: { value: "invalidpokemon" } });

    const searchButton = screen.getByText("Search");
    fireEvent.click(searchButton);

    const errorElement = await screen.findByText(/Pokémon not found/i);
    expect(errorElement).toBeInTheDocument();
  });
});
