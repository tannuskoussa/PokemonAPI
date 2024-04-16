'use client'

import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import PokemonCard from "../components/PokemonCard/Index";
import axios, { AxiosError } from "axios";


export default function page() {
  const [state, setState] = useState<'loading' | 'error' | 'done' | null>(
    null
  );
  const [pokemon, setPokemon] = useState<Pokemon | null>();

  useEffect(() => {
    setState('loading');
    fetchPokemon('3')
      .then((p) => setPokemon(p))
      .then(() => setState('done'))
      .catch((e: Error | AxiosError) => setState('error'));
  }, []);

  if (!pokemon || state === 'loading')
    return (
      <div className="flex h-screen w-full items-center justify-center bg-stone-900 text-white">
        <a>Loading</a>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
        </svg>
      </div>
    );
  if (state === 'error')
    return (
      <div className="flex h-screen w-full items-center justify-center bg-stone-900 text-white">
        <a>Error</a>
      </div>
    );
  return (
    <div className="flex h-screen w-full items-center justify-center bg-stone-900 text-white">
      <PokemonCard {...pokemon} />
    </div>
  );
}

const fetchPokemon = async (pokemon: string) => {
  const res = await axios.get<SinglePokemonResponse>(
    'https://pokeapi.co/api/v2/pokemon/' + pokemon
  );
  return {
    name: res.data.name,
    types: res.data.types,
    sprite: res.data.sprites.front_default,
  };
};

class SinglePokemonResponse {
  name: any;
  types: any;
  sprites: any;
}

class Pokemon {
  name: any;
  types: type | undefined;
  sprite: sprites | undefined;
}

class sprites {
  front_default: any;
}

class type {
  name: any;
}