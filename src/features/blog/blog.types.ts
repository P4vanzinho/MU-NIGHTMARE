export interface BlogComment {
  id: string;
  author: string;
  content: string;
  date: string;
}
export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  body: string;
  image: string;
  author: string;
  date: string;
  likes: string[];
  comments: BlogComment[];
}
export interface BlogState {
  posts: BlogPost[];
}

export interface BlogPostProps {
  post: BlogPost;
}
export interface PostEditorProps {
  post?: BlogPost;
}
export interface BlogFeedProps {
  posts: BlogPost[];
}
