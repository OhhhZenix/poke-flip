import Image from "next/image";
import { BoardItem, ItemStatus } from "../common/board";

const Card = (props: {
  index: number;
  item: BoardItem;
  handleFn: Function;
}) => {
  return (
    <div className="gameCard" onClick={() => props.handleFn(props.index)}>
      <div
        className={
          "cardImage " + (props.item.status !== ItemStatus.NONE ? "" : "hide")
        }
      >
        <Image
          src={props.item.pokemon.image}
          alt=""
          width={"200%"}
          height={"200%"}
        />
      </div>
    </div>
  );
};

export default Card;
