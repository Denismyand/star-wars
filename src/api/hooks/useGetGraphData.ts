import { useEffect, useState } from "react";
import {
  Character,
  Film,
  GetFilmsApiResponseData,
  GetStarshipsApiResponseData,
  Starship,
} from "../types";
import axios from "axios";

export const useGetGraphData = (cid: string) => {
  const [characterData, setCharacterData] = useState<Character | null>(null);
  const [starshipsData, setStarshipsData] = useState<Starship[]>([]);
  const [filmsData, setFilmsData] = useState<Film[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      await axios
        .get(`/api/people/${cid}`)
        .then(async (characterResponse: { data: Character }) => {
          setCharacterData(characterResponse.data);
          const films = characterResponse?.data.films.join(",") || [];
          const starships = characterResponse?.data.starships.join(",") || [];

          if (films.length) {
            await axios
              .get(`/api/films/?id__in=${films}`)
              .then((res: { data: GetFilmsApiResponseData }) => {
                setFilmsData(res.data.results);
              });
          }

          if (starships) {
            await axios
              .get(`/api/starships/?id__in=${starships}`)
              .then((res: { data: GetStarshipsApiResponseData }) => {
                setStarshipsData(res.data.results);
              });
          }
        });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cid]);

  return {
    characterData,
    starshipsData,
    filmsData,
    isLoading,
  };
};
