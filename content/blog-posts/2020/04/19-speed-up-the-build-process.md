dateCreated: 2020-04-19 11:33 CET  
tags: speed, build process  
aboutProject: site-stitcher  

# Speed up the build process

The other day in a tweet I meant to say that thinking about how to partially build a project is 
time spent wrong. Speed up the entire build process instead. That's what I am starting now for 
[site-stitcher, the project that builds this blog][3].

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">If I start thinking about how to partially build my project my build process is too slow.<br><br>It would just be much more complexity added and try to cover up the actual flaw.</p>&mdash; @wolframkriesing <a href="https://twitter.com/wolframkriesing/status/1250736234189766657?ref_src=twsrc%5Etfw">April 16, 2020</a></blockquote>

Here I am. I got to the point that my fan just made my machine take off, at least it sounded like.
That was while I was running `npm run dev:start` which I use to continuously build the posts you are looking at, 
it uses a special [`inotifywait` setup][2] which runs the build process every time one file
changes, no throttling or anything. Now imagine you switch git branches :). That triggered me to dig into the
building speed.\
Blame it on me having a Mac and [using a Docker setup][1], 0:1 against me, totally right, but that's a different
battle field, that I will come back to eventually.
The time it takes to build my entire blog is also too long, I feel. The thing that really sucks is that
it will become slower with every new post I am writing and every feature I add to the blog.

```text
Load source files: 134.814ms
Load blog posts: 314.913ms
posts=  142
groupedBlogPosts=  224
Relate and group posts: 134.019ms
All posts: 1.533s
All 301 pages: 537.786ms
About page: 27.615ms
Home page: 30.993ms
404 page: 14.434ms
Tags pages: 1.802s
Month pages: 207.332ms
```

[1]: https://github.com/wolframkriesing/site-stitcher/tree/466ae04603a99f8d529ec3ec8c9811d27fe0823d#develop
[2]: https://github.com/wolframkriesing/site-stitcher/blob/466ae04603a99f8d529ec3ec8c9811d27fe0823d/build-on-file-change.sh#L5
[3]: https://github.com/wolframkriesing/site-stitcher
