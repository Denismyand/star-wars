import { Metadata } from "next";
import CharactersList from "./components/CharactersList";

export const metadata: Metadata = {
  title: "Star Wars characters",
  description: "List of Star Wars characters",
};

const MainPage = () => {
  return (
    <div className="flex flex-col p-10 gap-10 h-full">
      <p className="text-center text-xl">Characters list</p>
      <CharactersList />
    </div>
  );
};

export default MainPage;
