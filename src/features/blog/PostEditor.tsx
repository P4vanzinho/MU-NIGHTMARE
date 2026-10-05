import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Field } from "@/components/shared/Field";
import { Input } from "@/components/shared/LocalizedInput";
import { Textarea } from "@/components/ui/textarea";
import { FormSelect, SelectOption } from "@/components/shared/FormSelect";
import { updateBlog } from "./store";
import type { BlogPost, PostEditorProps } from "./blog.types";
export function PostEditor({ post }: PostEditorProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Button
        variant={post ? "secondary" : "default"}
        onClick={() => setOpen(true)}
      >
        {post ? "Editar postagem" : "Nova postagem"}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90svh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {post ? "Editar postagem" : "Publicar postagem"}
            </DialogTitle>
            <DialogDescription>
              A conta demo representa o dono do servidor. Publicação local neste
              protótipo.
            </DialogDescription>
          </DialogHeader>
          <form
            className="form-stack"
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              const slug = post?.slug ?? "post-" + crypto.randomUUID();
              const next: BlogPost = {
                slug,
                title: String(data.get("title")).trim(),
                category: String(data.get("category")),
                excerpt: String(data.get("excerpt")).trim(),
                body: String(data.get("body")).trim(),
                image: String(data.get("image")),
                author: "Equipe Nightmare",
                date: post?.date ?? new Date().toISOString(),
                likes: post?.likes ?? [],
                comments: post?.comments ?? [],
              };
              updateBlog((state) => ({
                posts: post
                  ? state.posts.map((item) =>
                      item.slug === slug ? next : item,
                    )
                  : [next, ...state.posts],
              }));
              setOpen(false);
              navigate("/news/" + slug);
            }}
          >
            <Field label="Título">
              <Input
                name="title"
                required
                minLength={5}
                maxLength={120}
                defaultValue={post?.title}
              />
            </Field>
            <Field label="Resumo">
              <Input
                name="excerpt"
                required
                minLength={10}
                maxLength={220}
                defaultValue={post?.excerpt}
              />
            </Field>
            <Field label="Categoria">
              <FormSelect name="category" defaultValue={post?.category}>
                {["Atualizações", "Eventos", "Servidor", "Loja"].map(
                  (value) => (
                    <SelectOption value={value} key={value}>
                      {value}
                    </SelectOption>
                  ),
                )}
              </FormSelect>
            </Field>
            <Field label="Imagem de capa">
              <FormSelect name="image" defaultValue={post?.image}>
                {[
                  ["Dark Knight", "dk"],
                  ["Dark Wizard", "dw"],
                  ["Dark Lord", "dl"],
                  ["Magic Gladiator", "mg"],
                ].map(([label, id]) => (
                  <SelectOption value={"/images/mu/" + id + ".jpg"} key={id}>
                    {label}
                  </SelectOption>
                ))}
              </FormSelect>
            </Field>
            <Field label="Conteúdo">
              <Textarea
                name="body"
                required
                minLength={30}
                rows={8}
                defaultValue={post?.body}
              />
            </Field>
            <Button type="submit">
              {post ? "Salvar postagem" : "Publicar"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
