# Ideas
- show all internal links in the right sidebar

# v3 - use the wide screen better
- [ ] show a page-load stats widgets in the space right and left
  - [ ] repost blog ResourceTiming posts from techblog
    - [x] copy and adjust post 1
      - [ ] add image to site
      - [ ] make fallback image work
    - [x] copy and adjust post 2
    - [x] copy and adjust post 3
  - [ ] build a widget to show the stats OR reuse the widget from the post
- [ ] show a widget with the page dimensions stats in the space on a widescreen
  - [ ] show it on the right of the page, only when enough space (maybe 300px, or better 10em, ...)
- [ ] show some beautiful tag cloud/overview in the space right or left
- [ ] show tags, related articles, tweets, assets, TOC, to the right of the article
- [ ] move the hc-charts to my own repos, <pico-bar-chart>, <pico-waterfall-chart>, <pico-resource-timing-stats>
- [x] make the site use full width
  - [x] render footer nicely
  - [x] h1 on home page should render in the center
  - [x] ensure the 50em width of <main> text
    - [x] split main and .content CSS ONLY on the page specific css files, never on _global.css, 
          so it HAS to be configured for each page
      - [x] make the tpl code more reusable and allow extending blocks more flexible with default content
            and allow flexible extending of the tpls _empty, _focus, _allFeatures (as they are called now)
            and make code more reusable and content driven (e.g. if X content exists render tag Y)    
      - [x] need to upgrade to a proper template engine, tundrajs has too many drawbacks and flaws
            I invested too much time already, and I dont want to (help to) build all parts of this blog, there are enough good tpl engines
        - [x] choose a new tpl engine
          - [x] make the tidbits tests work again, they actually use the tpl engine
          - [x] use it and make all pages work again
          - [x] remove tundra
  - [x] breadcrumb shows (left aligned, ~~or centered~~) - only on huge screens it feel a little off, but only as long as the 
        left space stays empty
- [x] remove using pico-tester, since mocha is the better alternative and it is fast
- [x] use `{strict as assert}`
- [x] refactor tags to be slugs when used as URL and to create pages    
  - [x] sluggify all tags, React => react, React Native => react-native, ...
  - [x] create one page per tag slug only
  - [x] store tag-object and provide tag: slug, value, ... extend the current tag object that exists in tidbits
    - [x] refactor blog tags to use the new tag object, with `value` prop, etc. (mainly to learn how the grouping is done currently and adapt for tidbits later)
      - [x] use the slugs to group by tags
        - [x] add slugs to blog tags
    - [x] add tests to verify rendering the tpls, like in tidbits
    - [x] render tag pages using slugs (not the tag itself anymore)
- [x] show tags for tidbits overview page
  - [x] generate tidbits tags pages
  - [x] show the tags in the sidebar on the tidbits-index page  
  - [x] make the grouping function generic (currently blog group functions are used with tidbits)
    - [x] move them to a _shared place
    - [x] rename the prop `blogPosts` to `articles`
      - [x] adjust all usages (tpls, code, etc.)
    - [x] make each group have a prop `url`, so we can remove `urlPrefix` from the macro
- [x] show tags as on blog page
  - [x] tabs: top-tags, alphabetical (no all is needed, it adds no value, thanks Nick)
    - [x] show tags alphabetically sorted 
  - [x] show bar in bg with amount of tags
    - [x] provide counts to grouped data
  - [x] use the most count as 90% and adjust the others, so the widest bar looks "filled"
- [x] show bg bar for posts count on month+year too
- [ ] solidify tag usage
  - [ ] aliases: map multiple (same) tags to one slug, 
        e.g. js, javascript, JavaScript => javascript
        or: jscc, jscc17, jscc20 => JSCraftCamp
       (see the genreated pages)
  - [ ] enhance: generate additional tags, e.g. if "ruby" is given also add "programming language"
- [ ] generate tidbits date pages

# v2
- [ ] rename tidbits/post.html to something more meaningful
- [x] show tidbits+posts on home page
  - [x] intro home.css file, where the two col layout is defined
  - [x] create a _nav.css, which is included on the page as needed, e.g. the home.css
        goal: i want to get to a home.css that really consists of the things that it NEEDs, not all possible css
  - [x] remove the style.css from the HTML file, so that every xxx.css file manages that themselves
- [ ] cleanup: use per-category css files, like home.css, tidbit.css, ... not the hard to maintain layout.css, etc.
- [ ] dark theme switch
- [ ] show upcoming events on my page, like https://developer.mozilla.com/events/compiler-compiler-yulia-startsev/ every friday
- [ ] rename `dateCreated` into `createdAt`, having been influenced by the schema.org names was not such a good thing imho
- [ ] more-link all headlines on  about and project  pages
- [ ] use `headlineAsHtml` for blog too
- [x] make `is=more-h1` work, to allow linking any headline
- [ ] create a real start page (not just the blog list as now)- Why? to show on one sight what this site is about and what is going on
  - [x] move templates into one folder, to not clash with current index.html, which is actually blog/index.html
    - [x] upgrade tundra first, i want to get rid of the path in @extends
    - [x] ~~simplify @extends path (I hope the base path is used for it)~~ not possible, opened a bug
    - [x] move blog, projects, about templates into one dir
    - [x] ~~use spreads (tundra feature) to reuse code blocks, which there are a couple of~~ not possible across multiple files yet
          I stick to dups for now
  - [ ] add `dateLastUpdated`
  - [ ] collect last updated articles, pages, tidbits - to show them in one section "Last Updates"
  - [ ] Show a section "JavaScript" with all latest JS stuff
  - [ ] a section "Web Components", "CSS", "Web", etc.
  - [ ] just show a small number of sections/boxes so that people see what's going on here
        and what I care about and what this page is mainly about
  - [ ] hide the left aside navigation
  - [ ] use the data/boxes created as a left-side navigation instead of the useless tags (maybe just move them down)
  - [ ] collect tags across tidbits, posts, projects, etc.      
- [ ] make `is=more-h1` work, to allow linking any headline
- [x] render the headlineAsHtml, so <code> outlines are done, also id-attributes get generated, etc.
      makes it unified
- [ ] add my web components content to the site (mostly from twitter, some is also in repos)
  - [ ] add the content
  - [ ] unify the tags across blog posts and tidbits, so the tag "#Web Components" will show 
        content of both parts  
- [x] make `blogPostsDirectory` come from the ENV (and use the right one for dev/test)
- [x] add emojis to the site, makes it friendlier
- [x] move the text following a headline closer to the headline, as learned in "Dont make me think"
- [x] rename links to "Continue Reading ->"
- [x] add "Continue Reading ->" to every abstract on home
- [x] show draft posts somewhere
  - [x] add `isDraft` attribute to BlogPost
  - [x] show no drafts on the home page, but everywhere else it's fine, they will be marked
  - [x] ~~show the draft posts (somewhere) on the page~~ not needed, they will just NOT be on home 
  - [x] mark the draft posts, so one can clearly see they are draft!
- [x] fix the slug, i want headlines like "<details> element" to be a slug like so "details-element"
      currently its "-element", and "unicode ❤️" should become something useful "unicode-heart" or alike
      also if URLs can do unicode, i would not trust that this is totally safe yet everywhere
  - [x] fix all headlines that have <> in them and special chars, that HTML would want escaped
  - [x] maybe generate a slug and the attribute `urlSlug: slug-bla` so we can also change URLs, which happens
        and slugs are only used for tidbits ... sounds like the better solution
    - [x] add a `slug` attribute to all tidbits
    - [x] use the `slug` to generate the URLs
    - [x] use the `slug` also for the heading-id attribute    
- [x] move my microblog stuff here, these were just tidbits (small things)
- [x] **improve tidbits** (to become my source to feed twitter)
  - [x] handle `tags` and `dateCreated` metadata (see 2019)
  - [x] make tidbits have a page each
    - [x] separate them into files per month
    - [x] create a page per tidbit, to have a link to each and show related ones on the page too
    - [x] revamp the /tidbits page to have just the tidbit headlines and tags
    - [x] ~~make the tidbit on the overview page colapsable, just show the first paragraph/line (without JS it links to the tidbit page)~~ nope
- [ ] use semantic html
  - [x] use <main>
  - [x] use <article> in post
  - [x] use <aside>
  - [x] use <header> for an article
  - [x] each article on the frontpage is an <article>
  - [x] add a breadcrumb navigation
  - [x] make tag.html use semantic 
  - [ ] make tidbits.html use semantic 
  - [ ] make about.html use semantic 
  - [x] ~~make 301.html use semantic~~ not necessary 
  - [x] make 404.html use semantic 
  - [x] make month.html use semantic 
- [x] see learnings branch, there is always many of those little toolies that I learn every day
      and i keep forgetting them, maybe a section on the site for them? https://github.com/wolframkriesing/site-stitcher/pull/2/files
      done with tidbits
- [x] add related articles, because I have multiple articles of "Me discovering Ruby ..." for example
  - [x] find related articles automatically by name
- [x] rebuild when a content file changes (not just when code changes doh)
- [x] group by month
- [x] show month-pages and link them
- [x] tags in the sidebar seem unsorted, introduce "Top tags" and "All tags" where they appear sorted, i would say

# v1 - page up - finished: 15th April 2020
- [x] make it run using docker
- [x] use schema.org types from the beginning, no need to invent any structure, reuse and make discoverable content easy, e.g. https://schema.org/BlogPosting
- [x] copy all picostitch posts here
- [x] if no 1st paragraph show nothing as abstract 
      see `20-bookmark-collect-may-2015.md` and files where abstract and headline is the same
- [x] add plausible
- [x] provide meta data
  - [x] use multimarkdown style, just key-value pairs at the top
  - [x] update all posts to use it
  - [x] add the metadata to BlogPost
  - [x] render the metadata if needed (e.g. on the post page)
- [x] make it deploy on GH
- [x] add footer and imprint
- [x] generate index page from md files
  - [x] make it work on mobile
  - [x] dont fail on invalid files in blog post dirs
  - [x] sort newest to top
  - [x] render the markdown of the abstract properly into HTML
  - [x] show the date like this "24 Jan, 2002"
  - [x] allow dirs not only md files 04-blog-post/index.md
        see: `2015/05/11-alan-kay-on-messaging`
  - [x] copy the assets from the dirs too, like images        
- [x] `npm run new-post` script to create dir and file
  - [x] create a BlogPost instance
  - [x] write markdown file to disk
  - [x] implement date fn
- [x] instead of BlogPost.preload() extract it to BlogPostSourceFile.*()
- [x] build the post page
  - [x] provide the old URLs as used on picostitch now
  - [x] 301 from the old url to the new one
        maybe can give a 301 list to the server, so we wont need a page for each ... lets see what/if hetzner can do it
  - [x] render [x][y] links properly, seems not to work - newline before was missing
- [x] add all oldUrls to the md files
- [x] add licensing on the page!
- [x] provide all sites that exist on the current picostitch.com (about, tags, links)
  - [x] does https://picostitch.com/blog/tag/jscoderetreat/ work? linked on the about page!
- [x] move domain to GH
- [x] ensure it runs on HTTPS by default
- [x] a 404 page
- [x] deploy site on git push
- [x] publish the last post about jscamp

# Ideas
- [ ] fix types in /load-tidbit
- [ ] rendering a tidbit-page is split into 1) rendering header+metadata and 2) rendering the body
      both are done in different places (render-page and load-tidbit) but stitched together
      in the page.html template. Shouldn't this be unified into one place?
- [ ] how can all more-html related code go into one place? in case it changes, or is not needed anymore I want to one click remove it. Is that a good goal?
- [ ] add meta tags
  - [ ] add og meta tags (https://ogp.me/)
  - [ ] for twitter https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/abouts-cards
  - [ ] add <meta name="twitter:description" content="{{abstract}}" />
  - [ ] <meta property="og:description" content="{{abstract}}">
  - [ ] add <meta name="keywords" content="{{tags}}">
  - [ ] image per post? 
- [ ] generate tweets, and add the tags a post/tidbit has
- [ ] add tddbin, katas and jskatas files on the site (files=ADRs, README, etc.)
- [ ] link the tags
- [ ] move tidbits tpls into tidits folder
- [ ] really need error handling
  - [ ] start with basic validation of the input, parsing, etc. along the way
      try to remove tags from a tidbit, all fails
  - [ ] error handling for copying assets, when this fails (see commit where i added this line)     
- [ ] **improve tidbits** (to become my source to feed twitter)
  - [ ] find tags in the text (and use them)? see 2019/11.md (no need for `tags:` metadata)
  - [ ] render image in md as figure, currently done by hand all the time
- [ ] move blog post code into /src/load-blog-post maybe even /src/render-blog-post' ...
- [ ] add tags to the tidbits and render them on the page for easier reading and grouping
  - [ ] maybe even a page per tag
- [ ] add this project's pages to the site (like ADRs, README, test descriptions, ...)  
- [ ] syntax highlight code, build a CBE <code is=more-code>
- [ ] are there schema outlines for related posts?
- [x] show the tags in a left column
    - [ ] consolidate tags
    - [ ] group doubles with different casing or spacing (open source = OpenSource)
    - [ ] coderetreat, jscoderetreat, jscc, jscraftcamp, browsers, chrome, npm, nodejs, package.json, clean code, software design
          simply reduce the number of used tags imho
    - [ ] when grouped sort them in the group by name
    - [ ] link each tag in the posts headline to the tag page
- [ ] initial load grows with every post, show just first 100 and load more on scroll, or paginate, ...
- [ ] add follow button for twitter
- [ ] render the schema attributes
- [ ] add all posts from
  - [x] picostitch  
  - [ ] https://techblog.holidaycheck.com/author/wolframkriesing/
  - [ ] http://www.uxebu.com/blog/index.html
  - [ ] https://web.archive.org/web/20110102022119/http://wolfram.kriesing.de/blog/index.php/2009/04
    - [ ] redirect the old URL to the new one
  - [ ] https://github.com/wolframkriesing/wolfram.kriesing.de/blob/use-react/content/tech.md
  - [x] microblog
- [ ] setup
  - [x] ADRs
  - [ ] type linting JS files using TS
  - [ ] todo-stitcher
- [ ] show mini stats at the bottom of every page (maybe later as a chart over time)
  - [ ] word count, lines of code, programming language, etc.
  - [ ] download size of the page
  - [ ] amount of HTML, CSS, JS on the page
  - [ ] 3rd party URLs loaded on the page
  - [ ] number of requests, etc.
- [ ] render a page with the output of test-stitcher for all the tests that built this site
- [ ] fix BlogPost types and Metadata
- [ ] if a post has `datePublished` respect it and dont publish before, meaning dont build it
- [ ] #SEO create a sitemap.xml
- [ ] the image size up jumps at the end of the anim, fix it
- [ ] 301 /tidbits/ to /tidbit/ all URLs are singular
- [ ] BUG H1s have no id, since I manually render them :(
- [ ] see `npm run build:images:gif` it only builds for tidbits, unify and simplify building assets for all dirs
- [ ] webcomponent to show last changes to the content, load it from gh, just pass it a url like so
      <pico-changelog source="https://github.com/wolframkriesing/site-stitcher/content/tidbits.md" />
- [ ] provide data for rich snippets https://search.google.com/test/rich-results 
- [ ] the tidbits are not SEO indexed
- [ ] video links could have a video-icon behind it, would be cool
- [ ] show embedded code that "commit" link links to, if possible
      sounds like a nice web component
- [ ] TOC
  - [ ] generate an index, see "Build, Measure, Speed, Repeat" post, that index could be auto generated
        auto-create a <ol id=toc> in a post with the table of contents, see also SEO hints about it
  - [ ] put the toc on the right side of the article, sticky
- [ ] allow linking headline, esp useful on long article more-html ftw ;)
- [ ] when selected some text open a "tweet this" or "share this" button
- [ ] use a different font, to also be able to outline and distinguish source code better
- [ ] learn and apply a11y properly
- [ ] show "load more" or pagination on first page
- [ ] add all my 
  - [ ] conference talks
  - [ ] conference visits
  - [ ] open source projects
  - [ ] events I ran (jscc, jscr, jslang, ...)
  - [ ] the jobs i had  
- [ ] make useful (and talk about)
  - [ ] tests-stitcher
  - [ ] to-do-list-checker (todo-stitcher)
  - [ ] kavun (pico-test)
- [ ] generate dates (started, published, last changed) from commits
- [ ] lint/verify the syntax of a blog post
  - [ ] can have meta tags at the top only
  - [ ] the syntax of the metadata is defined, see BlogPostMetadata type 
  - [ ] must start with headline, has an abstract next
  - [ ] even dates with time MUST end in "... CET" and be formatted like so "2000-01-01 10:00 CET"
  - [ ] end metadata line with two spaces
  - [ ] has youtube/vimeoId and must have tag #video 
- [ ] a stats page which sums all the mini-stats from above and shows it for ALL pages of this site
- [ ] provide thumbnailUrl (see schema) for a post
- [ ] handle or remove `related_tweets:` which some posts still have
- [ ] indieweb auth of my page
- [ ] what about URL incompatible chars in a markdownFilename?
- [ ] rename `BlogPost#markdownFilename` to `sourceFile`?
- [x] ~~should the new-post tests really be soo specific and detailled? it tests underlying function, currently ...~~ removed it, since i dont use it
- [ ] crawl all pages put them in a DB (or alike) and make sure all exist in the new setup

