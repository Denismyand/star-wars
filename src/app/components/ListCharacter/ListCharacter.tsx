import { FC } from "react";
import { Character } from "@/api/types";
import { useRouter } from "next/navigation";

type IListCharacterProps = {
  character: Character;
};

const ListCharacter: FC<IListCharacterProps> = ({ character }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/characters/${character.id}`);
  };
  return (
    <div
      className="p-6 border-foreground border-2 rounded-lg cursor-pointer"
      onClick={handleClick}
    >
      <p>Name: {character.name}</p>
      <p>Birth year: {character.birth_year}</p>
      <p>Gender: {character.gender}</p>
      <p>Height: {character.height}</p>
      <p>Weight: {character.mass}</p>
      <p>Hair color: {character.hair_color}</p>
      <p>Eye color: {character.eye_color}</p>
      <p>Skin color: {character.skin_color}</p>
      <p>Created: {new Date(character.created).toLocaleDateString()}</p>
      <p>Edited: {new Date(character.edited).toLocaleDateString()}</p>
    </div>
  );
};

export default ListCharacter;
