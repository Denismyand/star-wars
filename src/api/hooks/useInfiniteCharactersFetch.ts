import axios from "axios";
import { GetCharactersApiResponseData } from "../types";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteCharactersFetch = () => {
  const { data, fetchNextPage, isFetching } = useInfiniteQuery<
    GetCharactersApiResponseData,
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

  return {
    data: data?.pages.map((p) => p.results).flat() || [],
    isLoading: isFetching,
    fetchMore: fetchNextPage,
  };
};
