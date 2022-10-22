import { useEffect, useState } from "react";
import { BoardItem, Difficulty, ItemStatus } from "../common/board";
import { getBoard } from "../common/pokemon";
import Card from "../components/card";

const Home = () => {
  const [difficulty, setDifficulty] = useState(Difficulty.EASY);
  const [board, setBoard] = useState<Array<BoardItem>>([]);
  // -1 = not selected otherwise is a index of the board
  const [previousIndex, setPreviousIndex] = useState(-1);

  useEffect(() => {
    getBoard(difficulty)
      .then((board) => setBoard(board))
      .catch((err) => console.error("Failed to get a board...", err));
  }, [difficulty, setBoard]);

  const handleClick = (index: number) => {
    // ensure user does not select same index
    if (index === previousIndex || board[index].status !== ItemStatus.NONE)
      return;

    board[index].status = ItemStatus.ACTIVE;
    setBoard([...board]);

    if (previousIndex === -1) {
      setPreviousIndex(index);
    } else {
      let current = board[index];
      let previous = board[previousIndex];
      if (current.pokemon.id === previous.pokemon.id) {
        current.status = ItemStatus.FOUND;
        previous.status = ItemStatus.FOUND;
        setBoard([...board]);
        setPreviousIndex(-1);
      } else {
        setTimeout(() => {
          current.status = ItemStatus.NONE;
          previous.status = ItemStatus.NONE;
          setBoard([...board]);
          setPreviousIndex(-1);
        }, 750);
      }
    }
  };

  return (
    <div className={`gameBoard easyBoard`}>
      {board.map((item, index) => {
        return (
          <Card key={index} index={index} item={item} handleFn={handleClick} />
        );
      })}
    </div>
  );
};

export default Home;
