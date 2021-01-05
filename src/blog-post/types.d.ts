import {BlogPost} from "./BlogPost";

interface BlogPostsByTag {
  tagSlug: Tag['slug'];
  blogPosts: BlogPost[];
  gradientWidthInPercent: number;
}

type YearAndMonth = string; // e.g. '2020-10'

interface BlogPostsByYearAndMonth {
  yearAndMonth: YearAndMonth;
  blogPosts: BlogPost[];
  gradientWidthInPercent: number;
}
