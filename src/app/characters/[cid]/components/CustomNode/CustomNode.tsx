import { Handle, Node, Position } from "@xyflow/react";

type ICustomNodeProps = Node<{
  label: string;
  output: boolean;
  input: boolean;
}>;

const CustomNode = ({
  data: { label, output = false, input = false },
}: ICustomNodeProps) => {
  return (
    <div className="max-w-[150px] p-2 bg-foreground text-background rounded-md">
      <p className="text-center leading-[1.25]">{label}</p>
      {input && (
        <Handle
          type="target"
          position={Position.Top}
          style={{ cursor: "inherit" }}
        />
      )}
      {output && (
        <Handle
          type="source"
          position={Position.Bottom}
          style={{ cursor: "inherit" }}
        />
      )}
    </div>
  );
};

export default CustomNode;
