import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

const generatePokemon = () => {
  // generates pokemon from 1-898 pokedex
  // Limited currently due to the api only having images up to 898th pokemon
  return Math.floor(Math.random() * 898) + 1;
};

const generateBoard = (boardSize: number) => {
  if (boardSize <= 0) return [];

  let board = [];
  for (let i = 0; i < (boardSize * boardSize) / 2; i++) {
    board.push(generatePokemon());
  }

  // duplicate board
  board = [...board, ...board];

  // shuffle board
  board = board.sort(() => Math.random());

  return board;
};

export default component$(async () => {
  const board = generateBoard(4);

  console.log(board);

  return (
    <div class="h-screen flex flex-col">
      <nav class="w-full bg-gray-400 flex flex-wrap justify-between items-center">
        <img
          src="pokeball.png"
          alt="PokeFlip Logo"
          width={48}
          height={48}
          class="p-2 cursor-pointer p-2"
        />

        <li class="flex flex-wrap gap-2 p-2">
          <ul class="cursor-pointer p-1 hover:rounded hover:bg-gray-500">
            My Profile
          </ul>
          <ul class="cursor-pointer p-1 hover:rounded hover:bg-gray-500">
            Scoreboard
          </ul>
          <ul class="cursor-pointer p-1 hover:rounded hover:bg-gray-500">
            Logout
          </ul>
        </li>
      </nav>

      <div class="flex justify-center items-center flex-grow">
        <li class="grid grid-cols-4 items-center gap-2">
          {board.map(async (pokemon) => {
            const data = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${pokemon}`
            )
              .then((res) => {
                if (!res.ok) {
                  switch (res.status) {
                    case 400:
                      break;
                    case 401:
                      break;
                    case 404:
                      break;
                    case 500:
                      break;
                  }
                }
                return res.json();
              })
              .catch((err) => console.error("Something went wrong...", err));

            return (
              <ul key={Math.random()} class="bg-gray-200 rounded">
                <img
                  src={data.sprites.front_default}
                  alt={data.name}
                  width={"100%"}
                  height={"100%"}
                />
              </ul>
            );
          })}
        </li>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to PokeFlip!",
  links: [
    {
      rel: "icon",
      href: "pokeball.png",
    },
  ],
};
