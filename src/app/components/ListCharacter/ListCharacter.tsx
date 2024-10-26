import { FC } from "react";
import { Character } from "@/api/types";
import Link from "next/link";

type IListCharacterProps = {
  character: Character;
};
type IInfoItemProps = {
  label: string;
  value: string;
};

const ListCharacter: FC<IListCharacterProps> = ({ character }) => {
  return (
    <Link href={`/characters/${character.id}`}>
      <div className="mx-auto rounded-lg border shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer max-w-md p-4  w-full">
        <h2 className="text-2xl font-bold mb-4">{character.name}</h2>
        <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
          <InfoItem label="Birth year" value={character.birth_year} />
          <InfoItem label="Gender" value={character.gender} />
          <InfoItem label="Height" value={character.height} />
          <InfoItem label="Weight" value={character.mass} />
          <InfoItem label="Hair color" value={character.hair_color} />
          <InfoItem label="Eye color" value={character.eye_color} />
          <InfoItem label="Skin color" value={character.skin_color} />
        </div>
        <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2 md:flex-row justify-between text-sm text-muted-foreground">
          <InfoItem
            label="Created"
            value={new Date(character.created).toLocaleDateString()}
          />
          <InfoItem
            label="Edited"
            value={new Date(character.edited).toLocaleDateString()}
          />
        </div>
      </div>
    </Link>
  );
};

const InfoItem: FC<IInfoItemProps> = ({ label, value }) => {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
};

export default ListCharacter;
