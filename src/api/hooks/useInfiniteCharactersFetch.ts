import axios from "axios";
import { useEffect, useState } from "react";
import { GetCharactersApiResponseData } from "../types";

type RequestProps = {
  next?: string;
};

export const useInfiniteCharactersFetch = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [charactersData, setCharactersData] =
    useState<GetCharactersApiResponseData | null>(null);

  const fetchMore = ({ next }: RequestProps) => {
    if (charactersData && !charactersData.next) return;
    setIsLoading(true);
    axios
      .get<GetCharactersApiResponseData>(
        next || `${process.env.NEXT_PUBLIC_API_ENDPOINT}/people/`
      )
      .then((res) => {
        if (!charactersData) {
          setCharactersData(res.data);
          return;
        }
        setCharactersData({
          ...res.data,
          results: [...charactersData.results, ...res.data.results],
        });
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchMore({});
  }, []);

  return {
    data: charactersData,
    isLoading,
    fetchMore,
  };
};
