"use client";

import { Oval } from "react-loader-spinner";
import { useInfiniteCharactersFetch } from "@/api/hooks/useInfiniteCharactersFetch";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import ListCharacter from "../ListCharacter/ListCharacter";

const CharactersList = () => {
  const { data, fetchMore, isLoading } = useInfiniteCharactersFetch();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (!inView || isLoading) return;
    fetchMore();
  }, [inView, isLoading]);

  if (!data.length && isLoading)
    return (
      <Oval
        visible={true}
        height="80px"
        width="80px"
        color="#ffffff"
        ariaLabel="oval-loading"
        wrapperClass="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    );
  if (!data.length)
    return <p className="text-center pt-6 text-xl">No characters found</p>;
  return (
    <div className="flex flex-col overflow-auto flex-[1_1_0px] mx-auto w-fit custom-scrollbar ">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 p-4 gap-4">
        {data.map((character) => (
          <ListCharacter character={character} key={character.id} />
        ))}
      </div>
      {isLoading && (
        <Oval
          visible={true}
          height="80px"
          width="80px"
          color="#ffffff"
          ariaLabel="oval-loading"
          wrapperClass="m-auto"
        />
      )}
      <div className="h-[1px]" ref={ref} />
    </div>
  );
};

export default CharactersList;
