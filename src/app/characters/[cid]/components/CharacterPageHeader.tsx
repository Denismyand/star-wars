import Link from "next/link";

const CharacterPageHeader = () => {
  return (
    <div className="relative flex flex-col md:flex-row justify-center items-center gap-2 md:h-10">
      <h1 className="text-center text-xl">Character page</h1>
      <Link href={"/"} className="w-fit">
        <button className="md:absolute md:right-0 md:top-0 px-4 h-8 md:h-full bg-foreground text-background rounded-lg select-none hover:bg-[#383838] dark:hover:bg-[#ccc]">
          Back to all characters
        </button>
      </Link>
    </div>
  );
};

export default CharacterPageHeader;
