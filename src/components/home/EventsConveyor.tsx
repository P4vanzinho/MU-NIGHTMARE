import { InfiniteConveyor } from "@/components/shared/InfiniteConveyor";
import { NewsCard } from "./NewsCard";
import { events } from "@/data/seed";
export function EventsConveyor() {
  return (
    <InfiniteConveyor
      className="section events-conveyor"
      title="O mundo não espera."
      items={events}
      getKey={(item) => item.name}
      renderItem={(item, duplicate) => (
        <NewsCard
          title={item.desc}
          poster={item.name}
          tag={item.time + " · hoje"}
          color={item.color}
          image={item.image}
          to="/events"
          duplicate={duplicate}
        />
      )}
      pauseLabel="Pausar eventos"
      resumeLabel="Retomar eventos"
    />
  );
}
