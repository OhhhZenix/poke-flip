import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BoardItem, Difficulty, ItemStatus } from "../common/board";
import { getBoard } from "../common/pokemon";
import Card from "../components/card";

const Home = () => {
  const [difficulty, setDifficulty] = useState(Difficulty.EASY);
  const [board, setBoard] = useState<Array<BoardItem>>([]);
  const [selectedOne, setSelectedOne] = useState(-1);
  const [selectedTwo, setSelectedTwo] = useState(-1);
  const [timer, setTimer] = useState(Date.now());

  // sets up the board
  useEffect(() => {
    getBoard(difficulty)
      .then((board) => setBoard(board))
      .catch((err) => console.error("Failed to get a board...", err));
  }, [difficulty]);

  // checks if two selected items are a match
  useEffect(() => {
    if (selectedOne === -1 || selectedTwo === -1) return;

    const itemOne = board[selectedOne];
    const itemTwo = board[selectedTwo];

    if (itemOne.pokemon.id === itemTwo.pokemon.id) {
      itemOne.status = ItemStatus.FOUND;
      itemTwo.status = ItemStatus.FOUND;
      setBoard([...board]);
      setSelectedOne(-1);
      setSelectedTwo(-1);
    } else {
      setTimeout(() => {
        itemOne.status = ItemStatus.NONE;
        itemTwo.status = ItemStatus.NONE;
        setBoard([...board]);
        setSelectedOne(-1);
        setSelectedTwo(-1);
      }, 750);
    }
  }, [board, selectedOne, selectedTwo]);

  // callback to select a card
  const handleClick = (index: number) => {
    // ensure the user does not select a third card
    if (selectedOne !== -1 && selectedTwo !== -1) return;
    // ensure user does not select the same index
    if (selectedOne == index) return;
    selectedOne === -1 ? setSelectedOne(index) : setSelectedTwo(index);
    board[index].status = ItemStatus.ACTIVE;
    setBoard([...board]);
  };

  const getBoardClass = (difficulty: Difficulty) => {
    switch (difficulty) {
      case Difficulty.EASY:
        return "easyBoard";
      case Difficulty.MEDIUM:
        return "mediumBoard";
      case Difficulty.HARD:
        return "hardBoard";
    }
  };

  return (
    <>
      <Head>
        <title>PokeFlip</title>
        <link rel="shortcut icon" href="/pokeball.png" type="image/x-icon" />
      </Head>

      <header>
        <div className="brand">
          <div className="logo">
            <Image
              src="/pokeball.png"
              alt="logo"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <h1 className="name">PokeFlip</h1>
        </div>
        <div className="options"></div>
      </header>
      <main>
        <div className={`gameBoard ${getBoardClass(difficulty)}`}>
          {board.map((item, i) => {
            return (
              <Card key={i} index={i} item={item} handleFn={handleClick} />
            );
          })}
        </div>
      </main>
      <footer>
        <a
          href="https://github.com/OhhhZenix/poke-flip"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
        <a
          href="https://twitter.com/OhhhZenix"
          target="_blank"
          rel="noreferrer"
        >
          Twitter
        </a>
      </footer>
    </>
  );
};

export default Home;
