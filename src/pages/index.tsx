import { useEffect, useState } from "react";
import { BoardItem, Difficulty, ItemStatus } from "../common/board";
import { getBoard } from "../common/pokemon";
import Card from "../components/card";

const Home = () => {
  const [difficulty, setDifficulty] = useState(Difficulty.EASY);
  const [board, setBoard] = useState<Array<BoardItem>>([]);
  const [selectedOne, setSelectedOne] = useState(-1);
  const [selectedTwo, setSelectedTwo] = useState(-1);

  // sets up the board
  useEffect(() => {
    getBoard(difficulty)
      .then((board) => setBoard(board))
      .catch((err) => console.error("Failed to get a board...", err));
  }, [difficulty, setBoard]);

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

  return (
    <div>
      <h1>PokeFlip</h1>
      <div className={`gameBoard easyBoard`}>
        {board.map((item, i) => {
          return <Card key={i} index={i} item={item} handleFn={handleClick} />;
        })}
      </div>
    </div>
  );
};

export default Home;
