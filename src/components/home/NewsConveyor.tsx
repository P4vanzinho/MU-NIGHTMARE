import { InfiniteConveyor } from "@/components/shared/InfiniteConveyor";
import { NewsCard } from "./NewsCard";
import { news } from "@/data/seed";
export function NewsConveyor() {
  return (
    <InfiniteConveyor
      title="Notícias"
      items={news}
      getKey={(item) => item.title}
      renderItem={(item, duplicate) => (
        <NewsCard {...item} duplicate={duplicate} />
      )}
      pauseLabel="Pausar notícias"
      resumeLabel="Retomar notícias"
    />
  );
}
