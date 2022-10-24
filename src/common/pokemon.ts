import { BoardItem, Difficulty, getBoardSize, ItemStatus } from "./board";

const getRandomPokemon = () => {
  // generates pokemon from 1-898 pokedex
  // Limited currently due to the api only having images up to 898th pokemon
  return Math.floor(Math.random() * 898) + 1;
};

export const getBoard = async (difficulty: Difficulty) => {
  // generate a unique set of ids
  let pokemonIds = new Array<number>();
  for (let i = 0; i < getBoardSize(difficulty) / 2; i++) {
    pokemonIds.push(getRandomPokemon());
  }
  // make duplicates
  pokemonIds = [...pokemonIds, ...pokemonIds];
  // shuffle the ids
  pokemonIds = pokemonIds.sort(() => Math.random() - 0.5);

  // generate the board based on ids
  let board = new Array<BoardItem>();
  for (let i = 0; i < pokemonIds.length; i++) {
    const pokemonId = pokemonIds[i];
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then((res) => res.json())
      .catch((err) => console.error("Something went wrong...", err));
    board.push({
      pokemon: {
        id: pokemonId,
        name: data.name as string,
        image: data.sprites.front_default as string,
      },
      status: ItemStatus.NONE,
    });
  }
  return board;
};

export type Pokemon = {
  id: number;
  name: string;
  image: string;
};
