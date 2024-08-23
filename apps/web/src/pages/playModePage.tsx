import { PageCard } from "@/components/pageCard";
import { useSessionStore } from "@/store";

export const PlayModePage = () => {
  const sessionStore = useSessionStore();
  return (
    <div className="grid size-full">
      <div className="items-center grid grid-cols-2 gap-big p-big m-auto">
        <PageCard
          title="Training"
          imageSrc=""
          onClick={() => {
            sessionStore.setPageLocation("training");
          }}
        ></PageCard>
        <PageCard
          title="Player Vs Machine"
          imageSrc=""
          onClick={() => {}}
        ></PageCard>
        <PageCard
          title="Player Vs Player"
          imageSrc=""
          onClick={() => {}}
        ></PageCard>
        <PageCard title="Ranking" imageSrc="" onClick={() => {}}></PageCard>
      </div>
    </div>
  );
};

