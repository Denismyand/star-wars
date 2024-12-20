import axios from "axios";
import { skipToken, useQuery } from "@tanstack/react-query";
import { Character, Film, Starship } from "../types";

export const useGetGraphData = (cid: string) => {
  const fetchCharacterData = async () => {
    const response = await axios.get<Character>(`/api/people/${cid}`);
    return response.data;
  };

  const fetchFilmsData = async () => {
    const response = await axios.get<{ results: Film[] }>(
      `/api/films/?id__in=${films}`
    );
    return response.data.results;
  };

  const fetchStarshipsData = async () => {
    const response = await axios.get<{ results: Starship[] }>(
      `/api/starships/?id__in=${starships}`
    );
    return response.data.results;
  };

  const { isFetching: isLoadingCharacter, data: characterData } = useQuery({
    queryKey: ["character", cid],
    queryFn: fetchCharacterData,
  });

  const films = characterData?.films.join(",") || "";
  const starships = characterData?.starships.join(",") || "";
  const { isFetching: isLoadingFilms, data: filmsData } = useQuery({
    enabled: !!characterData?.films.length,
    queryKey: ["films", films],
    queryFn: !!characterData?.films.length ? () => fetchFilmsData() : skipToken,
  });

  const { isFetching: isLoadingStarships, data: starshipsData } = useQuery({
    enabled: !!characterData?.starships.length,
    queryKey: ["starships", starships],
    queryFn: !!characterData?.films.length
      ? () => fetchStarshipsData()
      : skipToken,
  });

  const isLoading = isLoadingCharacter || isLoadingFilms || isLoadingStarships;

  return {
    characterData: characterData || null,
    starshipsData: starshipsData || [],
    filmsData: filmsData || [],
    isLoading,
  };
};
