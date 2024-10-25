import { Character, Film, Starship } from "@/api/types";
import { Edge, Node } from "@xyflow/react";
import { useEffect, useState } from "react";
import { getYByIndex } from "./getYByIndex";

type IHookProps = {
  characterData: Character | null;
  filmsData: Film[];
  starshipsData: Starship[];
  isLoading: boolean;
};

export const useNodesAndEdges = ({
  characterData,
  filmsData,
  starshipsData,
  isLoading,
}: IHookProps) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const handleUpdateNodesAndEdges = () => {
    if (!characterData || !filmsData || !starshipsData) return;

    const characterNode = {
      id: `character-${characterData?.id}`,
      data: { label: characterData?.name, output: true },
      position: { x: 0, y: 0 },
      type: "customNode",
    };

    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];

    let filmsNodes = filmsData.map((film, i) => ({
      id: `film-${film.id}`,
      data: { label: film.title, output: true, input: true },
      position: { x: 250 * (-filmsData.length / 2 + i + 0.5), y: 100 },
      type: "customNode",
    }));

    const filmEdges = filmsNodes.map((filmNode) => ({
      id: `character-${characterData.id}-to-${filmNode.id}`,
      source: characterNode.id,
      target: filmNode.id,
    }));

    const starshipsByFilms = characterData?.films.map((filmId) => {
      const filmData = filmsData.find((film) => film.id === filmId);

      const starshipsInFilm =
        filmData?.starships.filter((starship) =>
          characterData?.starships.includes(starship)
        ) || [];

      const fullFilmStarshipsData = starshipsInFilm
        .map((starshipId) =>
          starshipsData.find((starship) => starship.id === starshipId)
        )
        .filter((starship) => !!starship);

      return fullFilmStarshipsData;
    });

    starshipsByFilms.forEach((starshipsInFilm, filmIndex) => {
      const parentNodePosition = {
        x: 250 * (-filmsData.length / 2 + filmIndex + 0.5),
        y: 100,
      };

      const starshipsNodes = starshipsInFilm.map((starship, i) => ({
        id: `starship-${starship.id}-from-film-${filmsNodes[filmIndex].id}`,
        data: { label: starship.name, input: true },
        position: {
          x:
            parentNodePosition.x * 1.25 +
            100 * (-starshipsInFilm.length / 2 + i + 0.5),
          y: getYByIndex({
            index: filmIndex,
            initialY: i % 2 === 0 ? 150 : 100,
          }),
        },
        type: "customNode",
      }));
      const starshipsEdges = starshipsNodes.map(
        (starshipNode, starshipIndex) => ({
          id: `film-${filmsNodes[filmIndex].id}-to-starship-${starshipIndex}`,
          source: filmsNodes[filmIndex].id,
          target: starshipNode.id,
        })
      );

      newEdges.push(...starshipsEdges);
      newNodes.push(...starshipsNodes);
    });
    filmsNodes = filmsNodes.map((film, i) => {
      if (starshipsByFilms[i].length > 0) return film;
      return { ...film, data: { ...film.data, output: false } };
    });

    newNodes.push(characterNode);
    newNodes.push(...filmsNodes);
    newEdges.push(...filmEdges);
    setNodes(newNodes);
    setEdges(newEdges);
  };
  useEffect(() => {
    handleUpdateNodesAndEdges();
  }, [isLoading, characterData, filmsData, starshipsData]);

  return { nodes, edges };
};
