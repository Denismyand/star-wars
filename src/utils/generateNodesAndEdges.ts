import { Character, Film, Starship } from "@/api/types";
import { Edge, Node } from "@xyflow/react";
import { getYByIndex } from "./getYByIndex";
import {
  graphFilmsXOffset,
  graphFilmsYOffset,
  starshipsXOffset,
  starshipsYMutualOffset,
} from "@/constants/graphPositions";

type IProps = {
  characterData: Character | null;
  filmsData: Film[];
  starshipsData: Starship[];
  isLoading: boolean;
};

export const generateNodesAndEdges = ({
  characterData,
  filmsData,
  starshipsData,
  isLoading,
}: IProps) => {
  if (!characterData || !filmsData || !starshipsData || isLoading)
    return { nodes: [], edges: [] };

  // Helper function to create the main character node
  const createCharacterNode = (): Node => ({
    id: `character-${characterData.id}`,
    data: { label: characterData.name, output: true },
    position: { x: 0, y: 0 },
    type: "customNode",
  });

  // Helper function to create film nodes and their edges
  const createFilmNodesAndEdges = (characterNodeId: string) => {
    const filmNodes = filmsData.map((film, i) => ({
      id: `film-${film.id}`,
      data: { label: film.title, output: true, input: true },
      position: {
        x: graphFilmsXOffset * (-filmsData.length / 2 + i + 0.5),
        y: graphFilmsYOffset,
      },
      type: "customNode",
    }));

    const filmEdges = filmNodes.map((filmNode) => ({
      id: `character-${characterNodeId}-to-${filmNode.id}`,
      source: characterNodeId,
      target: filmNode.id,
    }));

    return { filmNodes, filmEdges };
  };

  // Helper function to get starships associated with each film
  const getStarshipsByFilm = () =>
    characterData.films.map((filmId) => {
      const filmData = filmsData.find((film) => film.id === filmId);
      return (
        filmData?.starships
          .filter((starship) => characterData.starships.includes(starship))
          .map((starshipId) =>
            starshipsData.find((starship) => starship.id === starshipId)
          )
          .filter((starship): starship is Starship => !!starship) || []
      );
    }) || [];

  // Helper function to create starship nodes and their edges for each film
  const createStarshipNodesAndEdges = (
    starshipsByFilms: Starship[][],
    filmNodes: Node[]
  ) => {
    const starshipNodes: Node[] = [];
    const starshipEdges: Edge[] = [];

    starshipsByFilms.forEach((starshipsInFilm, filmIndex) => {
      const filmNode = filmNodes[filmIndex];
      if (!filmNode) return;
      const baseX = filmNode.position.x;

      starshipsInFilm.forEach((starship, i) => {
        const starshipNode = {
          id: `starship-${starship.id}-from-film-${filmNode.id}`,
          data: { label: starship.name, input: true },
          position: {
            x:
              baseX * 1.25 +
              starshipsXOffset * (-starshipsInFilm.length / 2 + i + 0.5),
            y: getYByIndex({
              index: filmIndex,
              initialY:
                i % 2 === 0
                  ? starshipsYMutualOffset.bottom
                  : starshipsYMutualOffset.top,
            }),
          },
          type: "customNode",
        };

        const starshipEdge = {
          id: `film-${filmNode.id}-to-starship-${i}`,
          source: filmNode.id,
          target: starshipNode.id,
        };

        starshipNodes.push(starshipNode);
        starshipEdges.push(starshipEdge);
      });
    });

    return { starshipNodes, starshipEdges };
  };

  const characterNode = createCharacterNode();
  const { filmNodes, filmEdges } = createFilmNodesAndEdges(characterNode.id);
  const starshipsByFilms = getStarshipsByFilm();
  const { starshipNodes, starshipEdges } = createStarshipNodesAndEdges(
    starshipsByFilms,
    filmNodes
  );

  // Disable output for films with no starships
  const updatedFilmNodes = filmNodes.map((film, i) =>
    starshipsByFilms[i].length > 0
      ? film
      : { ...film, data: { ...film.data, output: false } }
  );

  return {
    nodes: [characterNode, ...updatedFilmNodes, ...starshipNodes],
    edges: [...filmEdges, ...starshipEdges],
  };
};
