import { Link } from "react-router-dom";
import { Heart, Share2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useGame } from "@/store/useGame";
import { updateBlog } from "./store";
import type { BlogPostProps } from "./blog.types";
export function PostInteractions({ post }: BlogPostProps) {
  const { user } = useGame();
  const liked = !!user && post.likes.includes(user.username);
  return (
    <section className="post-interactions">
      <div className="flex flex-wrap gap-3">
        <Button
          variant={liked ? "default" : "secondary"}
          aria-pressed={liked}
          onClick={() => {
            if (!user) {
              toast.info("Entre para curtir esta postagem.");
              return;
            }
            updateBlog((state) => ({
              posts: state.posts.map((item) =>
                item.slug === post.slug
                  ? {
                      ...item,
                      likes: liked
                        ? item.likes.filter((name) => name !== user.username)
                        : [...item.likes, user.username],
                    }
                  : item,
              ),
            }));
          }}
        >
          <Heart className={liked ? "fill-current" : ""} />
          Curtir · {post.likes.length}
        </Button>
        <Button
          variant="ghost"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(location.href);
              toast.success("Link copiado.");
            } catch {
              toast.error("Não foi possível copiar o link.");
            }
          }}
        >
          <Share2 />
          Compartilhar
        </Button>
      </div>
      <h2 className="mt-8 mb-4 text-2xl font-bold">
        Comentários · {post.comments.length}
      </h2>
      {user ? (
        <form
          className="form-stack"
          onSubmit={(event) => {
            event.preventDefault();
            const form = event.currentTarget;
            const content = String(new FormData(form).get("comment")).trim();
            if (!content) return;
            updateBlog((state) => ({
              posts: state.posts.map((item) =>
                item.slug === post.slug
                  ? {
                      ...item,
                      comments: [
                        ...item.comments,
                        {
                          id: crypto.randomUUID(),
                          author: user.username,
                          content,
                          date: new Date().toISOString(),
                        },
                      ],
                    }
                  : item,
              ),
            }));
            form.reset();
          }}
        >
          <Textarea
            name="comment"
            aria-label="Seu comentário"
            placeholder="Seu comentário"
            required
            minLength={3}
            maxLength={1500}
            rows={3}
          />
          <Button type="submit" className="w-fit">
            Publicar comentário
          </Button>
        </form>
      ) : (
        <p className="muted">
          <Link
            className="underline"
            to={"/login?next=" + encodeURIComponent("/news/" + post.slug)}
          >
            Entre na sua conta
          </Link>{" "}
          para comentar e curtir.
        </p>
      )}
      <div className="mt-6 space-y-5">
        {post.comments.map((comment) => (
          <article className="blog-comment" key={comment.id}>
            <div className="flex items-center justify-between gap-4">
              <p className="font-semibold">
                {comment.author}{" "}
                <time className="muted ml-2 text-xs">
                  {new Date(comment.date).toLocaleDateString("pt-BR")}
                </time>
              </p>
              {user &&
                (comment.author === user.username ||
                  user.username === "demo") && (
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Excluir comentário"
                    onClick={() =>
                      updateBlog((state) => ({
                        posts: state.posts.map((item) =>
                          item.slug === post.slug
                            ? {
                                ...item,
                                comments: item.comments.filter(
                                  (c) => c.id !== comment.id,
                                ),
                              }
                            : item,
                        ),
                      }))
                    }
                  >
                    <Trash2 />
                  </Button>
                )}
            </div>
            <p className="mt-2 whitespace-pre-wrap">{comment.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
