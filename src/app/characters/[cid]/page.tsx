"use client";

import { useGetGraphData } from "@/api/hooks/useGetGraphData";
import { useParams, useRouter } from "next/navigation";
import { Oval } from "react-loader-spinner";

const CharacterPage = () => {
  const { cid } = useParams();
  const { characterData, filmsData, starshipsData, isLoading } =
    useGetGraphData(cid as string);
  const router = useRouter();

  const handleBackClick = () => {
    router.push(`/`);
  };

  if (isLoading)
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

  return (
    <div className="flex flex-col p-10 gap-10 h-full">
      <div className="relative flex justify-center h-10">
        <h1 className="text-center text-xl m-auto">Character page</h1>
        <button
          className="absolute right-0 px-4 h-full bg-foreground text-background rounded-lg hover:bg-[#383838] dark:hover:bg-[#ccc]"
          onClick={handleBackClick}
        >
          Back to all characters
        </button>
      </div>
    </div>
  );
};

export default CharacterPage;
