# Ideas
- [ ] add all posts from
  - [x] picostitch  
  - [ ] https://techblog.holidaycheck.com/author/wolframkriesing/
  - [ ] http://www.uxebu.com/blog/index.html
  - [ ] https://web.archive.org/web/20110102022119/http://wolfram.kriesing.de/blog/index.php/2009/04
  - [ ] https://github.com/wolframkriesing/wolfram.kriesing.de/blob/use-react/content/tech.md
  - [ ] microblog
- [ ] add all my 
  - [ ] conference talks
  - [ ] conference visits
  - [ ] open source projects
  - [ ] events I ran (jscc, jscr, jslang, ...)
  - [ ] the jobs i had  
- [ ] make useful (and talk about)
  - [ ] tests2text (tests-stitcher)
  - [ ] to-do-list-checker (todo-stitcher)
  - [ ] kavun (test-stitcher)
- [ ] show content at the top of the blog post
- [ ] generate dates (started, published, last changed) from commits
- [ ] deploy site on git push
- [ ] publish the last post about jscamp
- [ ] setup
  - [ ] ADRs
  - [ ] type linting JS files using TS
  - [ ] todo-stitcher
- [ ] add og meta tags (https://ogp.me/)
- [ ] verify the syntax of a blog post (must start with headline, has an abstract next, ...)

# v1 - my website
- [x] make it run using docker
- [x] use schema.org types from the beginning, no need to invent any structure, reuse and make discoverable content easy, e.g. https://schema.org/BlogPosting
- [x] copy all picostitch posts here
- [x] if no 1st paragraph show nothing as abstract 
      see `20-bookmark-collect-may-2015.md` and files where abstract and headline is the same
- [x] add plausible
- [ ] indieweb auth of my page
- [ ] move domain to GH, works smoothly
- [ ] `npm run new-post` script to create dir and file
- [ ] generate index page from md files
  - [ ] make it work on mobile
  - [x] dont fail on invalid files in blog post dirs
  - [x] sort newest to top
  - [ ] add all posts
  - [ ] show "load more" or pagination on first page
  - [ ] render the schema attributes
  - [ ] render the markdown of the abstract properly into HTML
  - [x] show the date like this "24 Jan, 2002"
  - [ ] allow dirs not only md files 04-blog-post/index.md
        see: `2015/05/11-alan-kay-on-messaging`        
