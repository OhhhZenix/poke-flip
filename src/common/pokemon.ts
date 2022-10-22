import { BoardItem, Difficulty, getBoardSize, ItemStatus } from "./board";

const getRandomPokemon = () => {
  // there are 905 pokemons
  return Math.floor(Math.random() * 905) + 1;
};

export const getBoard = (difficulty: Difficulty) => {
  // generate a unique set of ids
  let pokemonIds = new Array<number>();
  for (let i = 0; i < getBoardSize(difficulty) / 2; i++) {
    pokemonIds.push(getRandomPokemon());
  }
  // make duplicates
  pokemonIds = pokemonIds.concat([...pokemonIds]);
  // shuffle the ids
  pokemonIds = pokemonIds.sort(() => Math.random() - 0.5);

  // generate the board based on ids
  let board = new Array<BoardItem>();
  for (let i = 0; i < pokemonIds.length; i++) {
    const pokemonId = pokemonIds[i];
    board.push({
      pokemon: {
        id: pokemonId,
        image: `https://cdn.traction.one/pokedex/pokemon/${pokemonId}.png`,
      },
      status: ItemStatus.NONE,
    });
  }
  return board;
};

export type Pokemon = {
  id: number;
  image: string;
};
