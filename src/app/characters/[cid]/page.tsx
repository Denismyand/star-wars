"use client";

import { useGetGraphData } from "@/api/hooks/useGetGraphData";
import { NodeTypes, ReactFlow } from "@xyflow/react";
import { redirect, useParams } from "next/navigation";
import { Oval } from "react-loader-spinner";
import "@xyflow/react/dist/style.css";

import { useNodesAndEdges } from "@/utils/useNodesAndEdges";
import { useEffect } from "react";
import CharacterPageHeader from "./components/CharacterPageHeader/CharacterPageHeader";
import CustomNode from "./components/CustomNode/CustomNode";

const nodeTypes = {
  customNode: CustomNode,
};

const CharacterPage = () => {
  const { cid } = useParams();
  const { characterData, filmsData, starshipsData, isLoading } =
    useGetGraphData(cid as string);

  const { nodes, edges } = useNodesAndEdges({
    characterData,
    filmsData,
    starshipsData,
    isLoading,
  });

  useEffect(() => {
    if (isLoading || characterData) return;
    redirect("/");
  }, [isLoading, characterData]);

  if (isLoading || !characterData || !filmsData || !starshipsData)
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
      <CharacterPageHeader />
      <ReactFlow
        fitView
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes as unknown as NodeTypes}
        edgesFocusable={false}
        nodesConnectable={false}
        className="[&_.react-flow\_\_panel]:hidden"
      />
    </div>
  );
};

export default CharacterPage;
