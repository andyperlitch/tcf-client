import { CodeBlock } from "@/components/CodeBlock";
import { useStageEvent } from "@/hooks/useStageEvent";

export function FunksGivingStage() {
  const { data } = useStageEvent("funksgiving");
  return (
    <div>
      <h2>FunksGivingStage</h2>
      <CodeBlock json={data} />
    </div>
  );
}
