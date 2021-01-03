import {BlogPost} from "./BlogPost";

interface BlogPostsByTag {
  tagSlug: Tag['slug'];
  blogPosts: BlogPost[];
}