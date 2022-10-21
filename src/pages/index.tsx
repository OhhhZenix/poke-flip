import Image from "next/image";
import Pokedex from "pokedex-promise-v2";
import { useEffect, useState } from "react";

const P = new Pokedex();

const getRandomPokemon = () => {
  // there are 905 pokemons
  return Math.floor(Math.random() * 905) + 1;
};

const duplicatePokemons = (ids: number[]) => {
  return [...ids].concat(ids);
};

const shufflePokemons = (ids: number[]) => {
  let array = [...ids];
  let currentIndex = array.length;
  while (0 !== currentIndex) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    let tmp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tmp;
  }
  return array;
};

const getBoardSize = (difficulty: Difficulty) => {
  switch (difficulty) {
    case Difficulty.EASY:
      // 4 x 4 table thats made up of 8 different pokemons
      return 4 * 4;
    case Difficulty.MEDIUM:
      // 6 x 6 table thats made up of 18 different pokemons
      return 6 * 6;
    case Difficulty.HARD:
      // 8 x 8 table thats made up of 32 different pokemons
      return 8 * 8;
  }
};

const getPokemonsByDifficulty = (difficulty: Difficulty) => {
  let ids = Array<number>();
  let boardSize = getBoardSize(difficulty);
  for (let i = 0; i < boardSize / 2; i++) {
    ids.push(getRandomPokemon());
  }
  ids = duplicatePokemons(ids);
  ids = shufflePokemons(ids);
  return ids;
};

const getBoardStyle = (difficulty: Difficulty) => {
  switch (difficulty) {
    case Difficulty.EASY:
      return "easyBoard";
    case Difficulty.MEDIUM:
      return "mediumBoard";
    case Difficulty.HARD:
      return "hardBoard";
  }
};

enum Difficulty {
  EASY,
  MEDIUM,
  HARD,
}

type BoardItem = {
  index: number;
  pokemon: Pokedex.Pokemon;
};

const Home = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.MEDIUM);
  const [board, setBoard] = useState<Array<BoardItem>>([]);
  const [selected, setSelected] = useState<Array<number>>([]);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      let pokemonIds = getPokemonsByDifficulty(difficulty);

      let pokemons = new Array<BoardItem>();
      for (let i = 0; i < pokemonIds.length; i++) {
        let id = pokemonIds[i];
        await P.getPokemonByName(id)
          .then((pokemon) =>
            pokemons.push({ index: i, pokemon: pokemon as Pokedex.Pokemon })
          )
          .catch((err) => console.error(`Could not fetch pokemon ${id}`, err));
      }
      setBoard(pokemons);
    };

    fetchAllPokemon();
  }, [setBoard, difficulty]);

  return (
    <div className={`gameBoard ${getBoardStyle(difficulty)}`}>
      {board &&
        board.map(({ index, pokemon }) => (
          <div
            key={Math.random()}
            className="gameCard"
            onClick={() => {
              if (selected.length == 2) {
                if (selected[0] == selected[1]) {
                  let copy = [...board];
                  copy.forEach((item) => {
                    
                  });
                }
                setSelected([]);
              } else {
                setSelected([index, ...selected]);
              }
            }}
          >
            <Image
              src={
                selected?.includes(index)
                  ? `https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png`
                  : "/pokecard.png"
              }
              alt={pokemon.name}
              layout="fill"
              objectFit="contain"
            />
          </div>
        ))}
    </div>
  );
};

export default Home;
