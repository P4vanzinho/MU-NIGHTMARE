import "@/features/blog/blog.css";
import { useParams, Link } from "react-router-dom";
import { PageHeading } from "@/components/shared/PageHeading";
import { useGame } from "@/store/useGame";
import { useBlog } from "@/features/blog/store";
import { BlogFeed } from "@/features/blog/BlogFeed";
import { PostEditor } from "@/features/blog/PostEditor";
import { PostInteractions } from "@/features/blog/PostInteractions";
export function NewsPage() {
  const { slug } = useParams();
  const { user } = useGame();
  const { posts } = useBlog();
  const owner = user?.username === "demo";
  if (!slug)
    return (
      <div className="page">
        <PageHeading
          title="Notícias"
          action={owner ? <PostEditor /> : undefined}
        />
        <BlogFeed posts={posts} />
      </div>
    );
  const post = posts.find((item) => item.slug === slug);
  if (!post)
    return (
      <div className="page">
        <PageHeading title="Postagem não encontrada" />
        <Link to="/news" className="underline">
          Voltar às notícias
        </Link>
      </div>
    );
  return (
    <div className="page">
      <article className="blog-article">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link to="/news" className="muted hover:underline">
            ← Notícias
          </Link>
          {owner && <PostEditor post={post} />}
        </div>
        <header>
          <p className="blog-meta">
            {post.category} · {new Date(post.date).toLocaleDateString("pt-BR")}{" "}
            · {post.author}
          </p>
          <h1 className="page-title mt-4">{post.title}</h1>
        </header>
        <img className="blog-cover" src={post.image} alt="" />
        <div className="blog-body">
          {post.body.split(/\n\s*\n/).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <PostInteractions post={post} />
      </article>
    </div>
  );
}
