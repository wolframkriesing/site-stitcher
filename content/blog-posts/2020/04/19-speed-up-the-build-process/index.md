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
speed of the build process.\
Blame it on me having a Mac and [using a Docker setup][1], 0:1 against me, totally right, but that's a different
battle field, that I will come back to eventually.

The worst notable thing is that I start preventing to use `npm run dev:start` the automated rebuild on demand,
which is actually made for assisting me. Instead I went back to use `npm run start` which does one build
and start the webserver to serve my site locally, and I stop and restart this script once I want to see my
updates being built.

## Deciding what to fix
The above introduction shows that there is not only one thing I could optimize, there is not only the
speed of the build process. I could also:

1. get a computer where Docker runs faster and more natively, e.g. a Linux machine - that will happen some day
1. fix the "inotifywait" usage to use some throttling and build not on every file change but just at most once 
  a second or something like that
1. optimize the watcher to build just the changed files and finally
1. speeding up the build process itself.

Item 1. will happen sooner or later (I am saying that to myself for 10 years already, so I am confident, hehe).
Fixing 2. is something I looked up and did not find an option on "inotifywait" man pages, I might be able to
do it with linux tooling but I experience myself wasting a lot of time in digging into that, so I avoid this
rabbit hole now.

I am definitely not going to do 3. since this feels just counter intuitive to me. Why should I circumvent
the slow process by adding more code that might do it wrong. And that actually just tries to prevent running
the slow process. Just imagine all the dependencies that there
are across pages, when a tag changes the according tag pages need to be built, the month pages and others.
Nope that is the wrong
way, and I have seen live-reload/rebuild tools do bullshit that makes you either say 
"oh just restart, the live-reloading has gone mad" which is just another burden, or even worse you start digging
into your code to figure out what's broken until you realize the live-reload screwed it up. 

I am going with option 4., I am fixing the actual core of the build process to be faster, I will benefit
from that in many more ways.
Let's see how this turns out, since I am writing this before I actually do write any code.

## Rough Analysis

The time it takes to build my entire blog is also too long, I feel. The thing that really sucks is that
it will become slower with every new post I am writing (like this one) and every feature I add to the blog.
So I built in the simplest timing I know of, using `console.time()` and `console.timeEnd()`, see [the commit here][4].
The output was this:

```text
Load source files: 134.814ms
Load blog posts: 314.913ms
Relate and group posts: 134.019ms
All posts: 1.533s
All 301 pages: 537.786ms
About page: 27.615ms
Home page: 30.993ms
404 page: 14.434ms
Tags pages: 1.802s
Month pages: 207.332ms
```

At this point in time there are 142 blog posts and 224 tags. Each of them generates at least one page and there
are more pages generated. The following tasks are the most relevant and time consuming:

* A blog has a page each (`All posts: 1.533s`)
* a tag has a page each (`Tags pages: 1.802s`)
* every month has a page listing all posts of that month (`Month pages: 207.332ms`)
* some posts had a different URL on the old setup, so I generate 301 pages for the (`All 301 pages: 537.786ms`)
* before building any HTML page can be done all the blog posts are being loaded (`Load blog posts: 314.913ms`)

It is not surprising that the timings for those parts that really generate the most pages
(all the posts + all tags pages = 142 + 224 = 366 pages) are the slowest.
But as I had learned I must always just **optimize the slowest first, measure again and go again for the slowest than**
(and this time it might be something else that is slowest).

## Quick fixes?

Once I start having numbers I can't stop diving deeper into them.
So I start by looking at [the code that build the tag pages][5] 
(it is similarly structured to [the code that generates all posts][6]).
Both functions just do three "maybe slow" things:
```javascript
  const destDir = path.join(__dirname, '../_output', post.url); // fast
  await fs.promises.mkdir(destDir, {recursive: true});          // maybe slow
  const destFilename = path.join(destDir, 'index.html');        // fast
  const renderedFile = tundra.getRender('post.html', {...defaultRenderParams, post}); // maybe slow
  await fs.promises.writeFile(destFilename, renderedFile);      // maybe slow
```

### Optimize filesystem access
I will turn off the `fs.promises` things, since they go onto the filesystem and that can not be fast, right?
The time that it took just now (before I save this change to this blog posts markdown file)
to build all the tag pages was "2.293s". I ran it a couple of times, it was always around 2.4seconds.
Now let me comment out the fs operations. 

```javascript
  const destDir = path.join(__dirname, '../_output', post.url); // fast
//  await fs.promises.mkdir(destDir, {recursive: true});          // maybe slow
  const destFilename = path.join(destDir, 'index.html');        // fast
  const renderedFile = tundra.getRender('post.html', {...defaultRenderParams, post}); // maybe slow
//  await fs.promises.writeFile(destFilename, renderedFile);      // maybe slow
```

The last time after (of course) running it a couple of times
was "1.329s". Roughly each of them was around 1.4seconds. That means about 1 second faster. Nice learning.

### Optimize template rendering
Though with 1.4 second we are already much better, there is still a lot of beef left.
Let's look at the third "maybe slow" thing. The template rendering.
We know the numbers from before, 2.4 seconds it takes about to render all tags pages.
Now let me comment out only the template rendering code.

```javascript
  const destDir = path.join(__dirname, '../_output', post.url); // fast
  await fs.promises.mkdir(destDir, {recursive: true});          // maybe slow
  const destFilename = path.join(destDir, 'index.html');        // fast
//  const renderedFile = tundra.getRender('post.html', {...defaultRenderParams, post}); // maybe slow
  await fs.promises.writeFile(destFilename, 'renderedFile');      // maybe slow
```

<figure class="float-right">
    <img src="./renders-renderedFile-string.jpg" alt="no real output" width=200 class="sizeup-onhover-image scale4 origin-right-top" />
    <figcaption>Page really renders &quot;renderedFile&quot;</figcaption>
</figure>

It first failed because on the last line I referred to `renderedFile`. After I made this be `'renderedFile'`
we render files containing only that string, but for the measuring purpose, to understand the gross impact
that is fine, I would say.\
Running this a couple of times, the numbers did suprise me a little bit. Now the script measures
"671.773ms" for the last run, in average I saw always numbers around 700ms. There is a huge potential
here. Very interesting.


[1]: https://github.com/wolframkriesing/site-stitcher/tree/466ae04603a99f8d529ec3ec8c9811d27fe0823d#develop
[2]: https://github.com/wolframkriesing/site-stitcher/blob/466ae04603a99f8d529ec3ec8c9811d27fe0823d/build-on-file-change.sh#L5
[3]: https://github.com/wolframkriesing/site-stitcher
[4]: https://github.com/wolframkriesing/site-stitcher/commit/6c4e4fcd6e4e421d4aeae8877313c8b98cefa01a
[5]: https://github.com/wolframkriesing/site-stitcher/blob/6c4e4fcd6e4e421d4aeae8877313c8b98cefa01a/src/index.js#L77-L85
[6]: https://github.com/wolframkriesing/site-stitcher/blob/6c4e4fcd6e4e421d4aeae8877313c8b98cefa01a/src/index.js#L50-L57