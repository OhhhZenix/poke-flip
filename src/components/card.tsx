import Image from "next/image";
import { BoardItem, ItemStatus } from "../common/board";

const Card = (props: {
  index: number;
  item: BoardItem;
  handleFn: Function;
}) => {
  return (
    <div className="gameCard" onClick={() => props.handleFn(props.index)}>
      <div className={props.item.status === ItemStatus.NONE ? "" : "flipped"}>
        <div className="cardImage front">
          <Image
            src={props.item.pokemon.image}
            alt={props.item.pokemon.name}
            width={"200%"}
            height={"200%"}
            quality={"100%"}
          />
        </div>
        <div className="back">
          <Image
            src="/pokecard.png"
            alt={props.item.pokemon.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
