import { Metadata } from "next";
import CharactersList from "./components/CharactersList/CharactersList";

export const metadata: Metadata = {
  title: "Star Wars characters",
  description: "List of Star Wars characters",
};

const MainPage = () => {
  return (
    <div className="flex flex-col p-8 gap-8 h-full">
      <h1 className="text-center text-2xl font-bold">Characters list</h1>
      <CharactersList />
    </div>
  );
};

export default MainPage;
