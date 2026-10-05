import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Input } from "@/components/shared/LocalizedInput";
import { FormSelect, SelectOption } from "@/components/shared/FormSelect";
import type { BlogFeedProps } from "./blog.types";
export function BlogFeed({ posts }: BlogFeedProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const filtered = posts.filter(
    (post) =>
      (category === "Todas" || post.category === category) &&
      post.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
  );
  return (
    <>
      <div className="blog-filters">
        <Input
          placeholder="Buscar postagem"
          aria-label="Buscar postagem"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <FormSelect
          value={category}
          onValueChange={setCategory}
          aria-label="Categoria da postagem"
        >
          {["Todas", "Atualizações", "Eventos", "Servidor", "Loja"].map(
            (value) => (
              <SelectOption key={value} value={value}>
                {value}
              </SelectOption>
            ),
          )}
        </FormSelect>
      </div>
      <div className="blog-feed">
        {filtered.map((post) => (
          <Link
            className="blog-preview"
            key={post.slug}
            to={"/news/" + post.slug}
          >
            <img src={post.image} alt="" loading="lazy" />
            <div>
              <p className="blog-meta">
                {post.category} ·{" "}
                {new Date(post.date).toLocaleDateString("pt-BR")}
              </p>
              <h2>{post.title}</h2>
              <p className="muted my-4">{post.excerpt}</p>
              <span className="inline-flex items-center gap-2 font-semibold">
                Ler postagem <ArrowUpRight className="size-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
      {!filtered.length && (
        <p className="muted py-8">Nenhuma postagem encontrada.</p>
      )}
    </>
  );
}
