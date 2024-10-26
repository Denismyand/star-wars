import axios from "axios";
import { Character, GetCharactersApiResponseData } from "../types";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteCharactersFetch = () => {
  const { data, fetchNextPage, isFetching } = useInfiniteQuery<
    GetCharactersApiResponseData | null,
    Error
  >({
    queryKey: ["data"],
    queryFn: async ({ pageParam }) => {
      const response = await axios.get<GetCharactersApiResponseData>(
        `${pageParam}`
      );
      return response.data;
    },
    getNextPageParam: (data: GetCharactersApiResponseData | null) =>
      data?.next || null,
    initialPageParam: "/api/people/",
  });

  const charactersData: Character[] = [];
  data?.pages.forEach((page) => {
    if (!page) return;
    page.results.forEach((character) => {
      charactersData.push(character);
    });
  });

  return {
    data: charactersData,
    isLoading: isFetching,
    fetchMore: fetchNextPage,
  };
};
