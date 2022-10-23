import Image from "next/image";
import { BoardItem, ItemStatus } from "../common/board";

const Card = (props: {
  index: number;
  item: BoardItem;
  handleFn: Function;
}) => {
  return (
    <div className="gameCard" onClick={() => props.handleFn(props.index)}>
      <div className="cardImage">
        <Image
          src={
            props.item.status === ItemStatus.NONE
              ? "/pokecard.png"
              : props.item.pokemon.image
          }
          alt={props.item.pokemon.name}
          width={"200%"}
          height={"200%"}
          quality={"100%"}
        />
      </div>
    </div>
  );
};

export default Card;
