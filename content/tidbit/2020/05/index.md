# CSS `writing-mode` Property

slug: css-writing-mode
dateCreated: 2020-05-30 17:03 CET
tags: web, css

[MDN says](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode)
about CSS property `writing-mode`:
> The writing-mode CSS property sets whether lines of text are laid out horizontally or vertically, 
> as well as the direction in which blocks progress.

Each of the below has the following CSS properties, to visualize the boxes better.
```css
width: 10rem;
border: 1px solid grey;
writing-mode: <different values>;
```

## vertical-rl

<div style="writing-mode: vertical-rl; width: 10rem; border: 1px solid grey;">
style="writing-mode: vertical-rl;"
</div>

## vertical-lr

<div style="writing-mode: vertical-lr; width: 10rem; border: 1px solid grey;">
style="writing-mode: vertical-lr;"
</div>

# Lets Make the JavaScript World Accessible (Again)

slug: lets-make-the-js-world-accessible-again
dateCreated: 2020-05-26 18:13 CET
tags: javascript, web

Lea's article [Today’s Javascript, from an outsider’s perspective](http://lea.verou.me/2020/05/todays-javascript-from-an-outsiders-perspective/)
states yet another time that our JavaScript environment needs a reboot.
I also mentioned the topic a couple of times.
But what shall we do?

Use ES modules only. That would be a good start, and it works there are people doing it, just not the masses.
Try to develop with ESMs only and without a bundler. You will see how far you can actually get.

Lea ends her article, where she tries to install an npm package with a friend, with the final result why nothing works:

> This is not Javascript, it’s Typescript!! With a .js extension!!

# hq - Static Server, No Bundling

slug: hq
dateCreated: 2020-05-23 14:56 CET
tags: javascript, web

Lately I am coming a across a couple of those tools that promise to remove the
bundling overhead and pain from our projects. 
I already mentioned [snowpack](/tidbits/2020/05/snowpackdev---bundler-free-development/).

This "hq" just looks like it is a preconfigured bundler, I didn't try it, but it
sounds like every framework "play by its rules and you are fine" but when you leave the
paths laid out you are on your own.

hq states:

> Lightning fast, zero configuration, web application development server https://hqjs.org

> 🎁️ No bundling  
> To reflect project structure in the browser and make it easier to understand and develop
>
> 🏂 Zero configuration

```
> npm install -g @hqjs/hq
...
> hq
```

## Besides hq

Google also seems to work on something like that too, sounds like a Cloud9 clone to me.

<blockquote class="twitter-tweet" data-partner="tweetdeck">
    <p lang="en" dir="ltr">
        What if you could have a full dev setup + server in a single 150kb JS module?<br><br>
        What if that setup included ~instant Hot Module Replacement, JSX support, sourcemaps &amp; friendly errors?<br><br>
        What if you never had to run `npm install` and your node_modules directory was 0 bytes? 
        <a href="https://t.co/QotoWLQh65">pic.twitter.com/QotoWLQh65</a>
    </p>
    &mdash; @_developit
    <a href="https://twitter.com/_developit/status/1263552118012751874?ref_src=twsrc%5Etfw">May 21, 2020</a>
</blockquote>

# Correcting the Line Length

slug: correcting-line-length
dateCreated: 2020-05-21 20:43 CET
tags: design

[I asked this morning](https://twitter.com/wolframkriesing/status/1263420825081970688) 
what I can improve on jskatas.org.
[Daniel answered](https://twitter.com/d_ir/status/1263440986698637313) 
with something that I can apply to picostitch too: use the "correct line length".
He pointed me to [practicaltypography.com](https://practicaltypography.com/line-length.html)
which states:

> Overly long lines are a common problem, but they’re easy to correct. Shorter lines will make a big 
> difference in the legibility and professionalism of your layout. [...]
>
> Shorter lines are more comfortable to read than longer lines. [...]
>
> Aim for an average line length of 45–90 characters, including spaces.

Sounds easy, just do `width: 80rem` right?
Should be fixed when you read this 😉.

The site also states

> Newspaper columns are very tall, so they also have to be very narrow to make vertical tracking easy.

To be honest, I have been thinking about that a lot before, but never thought of it
to be such an issue until today, when I got 
[that response](https://twitter.com/d_ir/status/1263428553506525184) 
[twice](https://twitter.com/kit_son/status/1263434064377393162) 
that I should limit the page width
of the jskatas.org site. So I acted right away, since this seems to be important to people.
I still want to make sure to not waste too much space on people's wide screens.
Wouldn't it be an aweful waste of space? Now I will just think the other way around, I make the
side narrower and will think about how to use the whitespace.
So I flip the priorities.

## A Note on practicaltypography.com
Since these notes are just for me, I have to note the following:
on the practicaltypography.com page the first kinda table "How to use Word Count" confused me totally.
It took me a while to understand what it was for. On the left it said "Word", "Mac OS Word" and "Pages"
and I had no idea what was meant. They also used < and > for menu items that I should click.
I had to read the table three times until I understood what it was. I didn't expect that on
a site that teaches me about what my site should look like. Surprise.\
I also missed headlines on that page, which I learned in 
[Don't make me think](/tidbits/2020/05/learned-from-dont-make-me-think/)
make reading easier.\
I don't mean to rant. I am just writing down my observations and learnings, reflecting on them.

Reading through other sites like [Block Quotations](https://practicaltypography.com/block-quotations.html)
and [Page Margins](https://practicaltypography.com/page-margins.html)
on practicaltypography.com, I see that not all sources agree on everything,
I don't understand inches well enough and not everything makes sense to me.
Also I see some rules from "Don't make me think" are not applied on his page.
So in the end, I still have to think, hehe.

Thanks for free resource and the learnings [@Matthew Butterick](https://practicaltypography.com/about-matthew-butterick.html)!

# Learning reddit

slug: learning-reddit
dateCreated: 2020-05-21 16:31 CET
tags: web

I posted the following on reddit, finding out that the bot does not permit it.
Read how I discovered reddit, finally.

<figure>
    <img src="../reddit-forbid.gif" alt="The forbid message from the reddit bot" width="150" class="sizeup-onhover-image scale4 origin-left-top" />
    <figcaption>The forbid message from the reddit bot</figcaption>
</figure>

> Self-posts (text) must follow the `[AskJS]` guidelines

## What is Self-Post?

A self post is one that "doesn't link outside of reddit. It can also be called a 'text post'".\
https://www.reddit.com/r/help/comments/16secs/what_is_a_self_post/

## What do the [AskJS] Guidelines say?

What does `[AskJS]` mean at all?\
The [`[AskJS]` guidelines say](https://www.reddit.com/r/javascript/wiki/index/askjs):

> Generally speaking, it's for the types of posts that StackOverflow doesn't allow. 
> If your topic can have a "correct" answer, or it can be answered with code, then it should 
> be posted to r/LearnJavascript or a Q&A site like StackOverflow.

Regarding the last sentence "your topic can have a "correct" answer",
I would say "No". I am just trying to share knowledge, because I think it's useful.
No ads on my page, nothing to win for me, just a bit of joy when seeing people use jskatas.org
and hope to spread the joy of learning.

A bit later it says:

> soliciting advice, sharing opinions, or debating best practices, `[AskJS]` is intended as an 
> outlet for each of those, and more.

The "and more" makes me hopeful :).

But reading more it gives examples like "Which IDE is your favorite, and why?" and my post is
definitely not of that type.

## What are "Posts that StackOverflow doesn't allow"?
At the beginning of the [AskJS] guidelines it said 
> it's for the types of posts that StackOverflow doesn't allow

Which I have to [look up on stackoverflow](https://stackoverflow.com/help/dont-ask) :).

> You should only ask practical, answerable questions based on actual problems that you face.

So, my post is not of that type.

## "Anything other than a subjective question is also considered off-topic"

The `[AskJS]` guidelines say this a bit further down.
So I assume my post has no place on reddit.

> All other posts must use the "Submit a new link" option; if additional text is required, add a comment to your post.
> [...]
> Learning, Support & Help questions are still off-topic for `[AskJS]`, and should be posted to r/LearnJavascript

Oh maybe my post has a place on reddit. I will try there.

Oh yes, it says on [reddit.com/r/learnjavascript](https://www.reddit.com/r/learnjavascript/)

> This subreddit is for anyone who wants to learn JavaScript or help others do so. 

That's it.\
So I learned reddit, finally 😎.

And here is the post
[Discover `Array.prototype.includes()` in depth, through a #jskata](https://www.reddit.com/r/learnjavascript/comments/gny8fr/discover_arrayprototypeincludes_in_depth_through/)
in r/learnjavascript (whatever the `r/` means).

# Disclosure Widgets - by Adrian Roselli

slug: disclosure-widgets-by-adrian-roselli  
dateCreated: 2020-05-20 15:42 CET  
tags: a11y, web, browser, link  

A disclosure widget is a simple control whose sole purpose is to hide or show stuff.
See his article for very in depth content on how to use `<details>` and `<summary>` tags. 
https://adrianroselli.com/2020/05/disclosure-widgets.html

# How Does JavaScript Behave when Cookies are Disabled?

slug: how-does-javascript-behave-when-cookies-are-disabled  
dateCreated: 2020-05-20 11:14 CET  
tags: web, browser, javascript  

With latest privacy awareness I believe cookies are also one sensitive topic. I have no numbers,
but I guess there are more people who have cookies disabled then we believe. If not, I learned something here.

I turned cookies off in Brave, I wanted to see what we need to take care of when cookies are
turned off. My interpretation of that is now, that browsers just transparently handle that.
The only difference is that you always get an empty cookie when they are turned off, no matter how many you set.

See what I tried on the browser console:
```
> // cookies turned OFF (in browser settings)
> document.cookie                // read cookies
""
> document.cookie = 'whatever=1' // set the cookie
> document.cookie                // read cookies
""

> // cookies turned ON (in browser settings)
> document.cookie                // read cookies
"<cookies of the current site, if there are any>"
> document.cookie = 'whatever=1' // set the cookie
> document.cookie                // read cookies
"whatever=1; <cookies of the current site, if there are any>"
```

# Setting a Cookie: use Max-Age!

slug: setting-a-cookie-use-max-age  
dateCreated: 2020-05-20 10:14 CET  
tags: web, browser, javascript  

[@Peter Coles](https://twitter.com/lethys) wrote 
["HTTP Cookies: What's the difference between Max-age and Expires?"](https://mrcoles.com/blog/cookies-max-age-vs-expires/)
in 2009, but he has updated the article later and there is the answer for wether to use "expires" and/or "max-age" 
when you set cookies.

**What is "max-age"?**
> Max-age sets the time in seconds for when a cookie will be deleted (use this, it’s no longer 2009)
> [...]
> expires was deprecated and replaced with the easier-to-use max-age

About **browser compatibility**, he states:

> Unfortunately, none of the current versions of Internet Explorer support max-age

MDN does [not confirm that](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie).
[caniuse.com states](https://caniuse.com/#search=max-age) that IE 7 did not support it, but IEs after that do.

Not sure when Peter updated his post last, but he closes it with

> UPDATE: just use Max-Age, the web has improved since this was written.

**If you don't write IE7 apps use "max-age"!**

# Flow Infers Types "Local" to Modules ❤️

slug: flow-infers-types-local-to-modules
dateCreated: 2020-05-16 17:22 CET
tags: JavaScript, flow, type checking, typing

I wish to have a type system where I only need to type-hint the published parts (of a module/file)
and let the type system infer all internal types. Though, I learned that even in Haskell land it is referred to
as good practice to still type **every** function, no matter if public or private.
[Flow sounds to be doing what I want](https://flow.org/en/docs/lang/#toc-what-makes-flow-fast).

> Fortunately, JavaScript is already written using files as modules, so we modularize our analysis simply 
> by asking that modules have explicitly typed signatures. (We still infer types for the vast majority of 
> code “local” to modules.) Coincidentally, developers consider this good software engineering practice anyway.

# The Unicode Character for the Hamburger Menu Icon ☰

slug: the-unicode-character-for-the-hamburger-menu-icon
dateCreated: 2020-05-16 14:48 CET
tags: web

In short `&#9776; <!-- Results in ☰ -->`\
See it in use, here is [the commit](https://github.com/wolframkriesing/site-stitcher/commit/63e6e6159b551df7ab121ec6406cde90276055f4) 
I just made for this site. Look at the bottom right 
or top left on smaller screens.
found at https://www.abeautifulsite.net/the-unicode-character-for-menu-icons

# My new friend: WebStorm's "Split vertically" for the Terminal

slug: my-new-friend-webstorms-split-vertically-for-the-terminal
dateCreated: 2020-05-15 15:48 CET
tags: tools, WebStorm

It is a bit more than a month ago that WebStorm has shipped the feature
[Displaying terminal sessions side by side](https://blog.jetbrains.com/webstorm/2020/04/webstorm-2020-1/#split-terminal-sessions)
and I am using it every day now.

<figure>
    <img src="../webstorm-split-vertically.gif" alt="The split terminal view in WebStorm" width="600" class="sizeup-onhover-image scale2 origin-left-top" />
    <figcaption>The split terminal view in WebStorm</figcaption>
</figure>

On the left I have my tests running, and on the right the typechecker (TypeScript) is doing it's job.\
Thanks JetBrains!

# mov to gif converter

slug: mov-to-gif-converter
dateCreated: 2020-05-15 15:37 CET
tags: tools

Since QuickTime on Mac is great for short screen recordings, but the web can handle animated
gifs better, I need https://cloudconvert.com/mov-to-gif it's a simple and awesome service!\
**Pricing**: "absolutely free for up to 25 conversions per day", totally cool. Thanks!

# TypeScript for JavaScript

slug: typescript-for-javascript  
dateCreated: 2020-05-14 22:19 CET  
tags: JavaScript, TypeScript, ts4js 

Looking around for resource for JavaScript developers that get into TypeScript I found this
[TypeScript for JavaScript Programmers](https://www.typescriptlang.org/v2/docs/handbook/typescript-in-5-minutes.html)
in the TypeScript handbook.

The quote that sums up TypeScript quite well:

> TypeScript sits as a layer on-top of JavaScript, offering the features of JavaScript and then adds its 
> own layer on top of that. This layer is the TypeScript type system.

# Deno 1.0, TypeScript 3.9

slug: deno-10-typescript-39  
dateCreated: 2020-05-14 10:19 CET  
tags: javascript, tools, web, typescript  

TypeScript 3.9 was released. Since I am basically a fan of making code safer and better to understand,
that's what I use types for, I see nothing interesting to me in this release. But I also use TypeScript
in a much simpler way than the cracks and fans. 
https://devblogs.microsoft.com/typescript/announcing-typescript-3-9/

The PR for 1.0.0 got merged https://github.com/denoland/deno/pull/5273

> Deno is a simple, modern and secure runtime for JavaScript and TypeScript that uses V8 and is built in Rust.
> 
> - Secure by default. No file, network, or environment access, unless explicitly enabled.
> - Supports TypeScript out of the box.
> - Ships only a single executable file.
> - Has built-in utilities like a dependency inspector (deno info) and a code formatter (deno fmt).
> - Has a set of reviewed (audited) standard modules that are guaranteed to work with Deno: deno.land/std

from [deno.land](https://deno.land/)

# Clone Behavior of `<script>` Tag

slug: clone-behavior-of-script-tag
dateCreated: 2020-05-12 00:53 CET
tags: web, javascript, DOM, knowledgebase  

I wanted to `scriptNode.cloneNode(true)` and expected it to re-evaluate the JS
of the node, but it didn't.

> Each &lt;script&gt; element has a property flag called "already started".

This flag is already true, so a clone won't reevaluate the script.
Solution: copy it manually.

Read it all on https://stackoverflow.com/questions/28771542/why-dont-clonenode-script-tags-execute/28771829#28771829

# CSS Reset

slug: css-reset
dateCreated: 2020-05-11 22:36 CET
tags: web, CSS, knowledgebase  

First search result for "CSS reset" is by the mighty Eric Meyer
https://meyerweb.com/eric/tools/css/reset/ from quite some time ago.
And looking up the source of his site I see the reset is not really included, also no modified version
as far as I saw it.
Next I came across https://cssreset.com/what-is-a-css-reset/ which nicely explains the whys
and also states the cons. Unfortunately the latter article is missing a date, so I can't say how old 
this knowledge is. That's why I was so very keen on having all items properly dated on my blog.

Since it had been quiet around CSS reset lately in my bubble, I needed to refresh my knowledge a bit.
I take away:

> However, there are multiple benefits of this technique that outweigh any drawbacks, not least the 
> more logical development progression that it afford: paste in your CSS Reset, paste in your base 
> styles (if needed), then define everything else from there. It’s also nice to know that you’ve got 
> your bases covered.

**I will use a CSS Reset only for padding and margin** for the start, to adhere to most of what the
user agent defined.

**[UPDATE]**:\
I found out why the site cssreset.com has no dates, it's a pure SEO site where someone wants
to make money with ads. This decreases my trust in what's written there. Mmmmh.
Reading on https://cssreset.com/privacy/
"SURESWIFT CAPITAL INC., the owner and provider of this Website https://cssreset.com"
I think you can get a picture of the trustworthiness of this site.


# Learned From "Don't Make Me Think"

slug: learned-from-dont-make-me-think
dateCreated: 2020-05-11 19:09 CET  
tags: web, design, UX, knowledgebase  

The things I took away for me until now, while I am still reading [the book](https://www.goodreads.com/book/show/18197267-don-t-make-me-think-revisited):
* Use more headlines "even if the paragraph is just one sentence".
* Move the content closer to the according headline (I [did that yesterday](https://github.com/wolframkriesing/site-stitcher/commit/80bfda03f6ab445618ff50fc4e5d9436cefe7971), made a HUGE diff).
* Make sure the different headlines are easily distinguishable (see [my commit](https://github.com/wolframkriesing/site-stitcher/commit/63fdd25f399398ab2cee11ba0a4f1cd477a5e04d).
* Add a breadcrumb, so users of your page know where they are.
* Remove ~~useless~~ words (I like that one).

<a href="https://www.goodreads.com/book/show/18197267-don-t-make-me-think-revisited">
    <figure>
        <img src="../dontmakemethink.jpeg" alt="Dont Make me Think - by Steve Krug" />
        <figcaption>Dont Make me Think, by Steve Krug</figcaption>
    </figure>
</a>

I learned about this book from Uku, [as I wrote in "A Developer Designs"](/blog/2020/04/16-a-developer-designs/).

# We don’t give people a website any more
slug: we-dont-give-people-a-website-any-more
dateCreated: 2020-05-11 16:46 CET  
tags: web  

The headline is a quote from [Hammer and Nails](https://www.kryogenix.org/days/2020/05/06/hammer-and-nails/) by [Stuart Langridge](https://twitter.com/sil) where he states how we make every user's browser a "fat client" (I called it that) by making them work far beyond rendering some HTML+CSS.

> Instead of an HTML page, you get some templates and some JSON data and some build tools, and then that compiler 
> runs in your browser and assembles a website out of the component parts. That’s what a “framework” does… it builds 
> the website, in real time, from separate machine-readable pieces, on the user’s computer, every time they visit the website.

I found this blog post through Brian's tweet:

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="en" dir="ltr">However, there does seem to be a trend toward _casually_ pushing more complexity and dependencies, even for something like my own site, down closer to the user even when that is very unnecessary. That doesn&#39;t really play to the Web&#39;s best strengths for users.</p>&mdash; @briankardell <a href="https://twitter.com/briankardell/status/1259854677421801479?ref_src=twsrc%5Etfw">May 11, 2020</a></blockquote>

[Tom MacWright](https://twitter.com/tmcw) in [Second-guessing the modern web](https://macwright.org/2020/05/10/spa-fatigue.html) 
states very rightful a thing I had also thought about a lot: keep around aging JS files and keep serving them.
Especially since I had seen this at HolidayCheck when we ran into a serious SEO issue due to exactly this problem.
He describes it like this:

> So if they open the ‘about page’, keep the tab open for a week, and then request the ‘home page’, 
> then the home page that they request is dictated by the index bundle that they downloaded last week. 
> This is a deeply weird and under-discussed situation. There are essentially two solutions to it:
>
> - You keep all generated JavaScript around, forever, and people will see the version of the site that was 
> live at the time of their first page request.

I skipped the second solution. I know we all optimize for pings
and request run times, etc. but in this case, why not just let this extra ping take place and use [ETag](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag) as they were meant, MDN says this about it:

> The ETag HTTP response header is an identifier for a specific version of a resource. It lets caches be 
> more efficient and save bandwidth, as a web server does not need to resend a full response if the content has not changed.

Most of us don't run pages or work for companies that run pages the size of Google or Facebook. This one extra
request might save some overall complexity and allows you to get rid of hashes at the end of every file you ship.
My 2 cents.

Tom writes later

> And then there’s the authentication story. If you do SSR on any pages that are custom to the user, 
> then you need to forward any cookies or authentication-relevant information to your API backend and make 
> sure that you never cache the server-rendered result.

And I just had to  quote  this part of his article:

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="en" dir="ltr">&quot;all of the fancy optimizations are optimizations to get you closer to the performance you would’ve gotten if you just hadn’t used so much technology&quot;<br><br>:nodding: :nodding: :nodding: <a href="https://t.co/Z7Pn2Edyfh">https://t.co/Z7Pn2Edyfh</a></p>&mdash; @wolframkriesing <a href="https://twitter.com/wolframkriesing/status/1259865810308345856?ref_src=twsrc%5Etfw">May 11, 2020</a></blockquote>

It's sad and I have this view on web tech too, we just make lives hard ourselves.
That's why I try to keep this blog as lean as possible. Tell me if you see potential to make 
it better (and for design tips I am most thankful).

Read it all on https://www.kryogenix.org/days/2020/05/06/hammer-and-nails/  
and https://macwright.org/2020/05/10/spa-fatigue.html  
and https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag.

# snowpack.dev - Bundler Free Development

slug: snowpackdev---bundler-free-development
dateCreated: 2020-05-09 13:35 CET  
tags: JavaScript  

Bundler like webpack take up too much of our intention, imho. We spend a lot of time configuring them and waiting for them to build so we can see our site. [Snowpack moves the bundler out of the way](https://www.snowpack.dev/) so you can develop without worrying about it locally.

> At some point in the last decade, JavaScript bundling shifted from being a production nice-to-have optimization to a 
> full-on dev requirement. Configuration files, plugin ecosystems, extra dependencies, tooling complexity, 
> code-splitting, waiting to rebundle every save… all of this suddenly became required overhead to do any level of 
> web development.

Since we always use modern browser during development anyways, doing as snowpack suggests:

> The only requirement is that during development you use a modern browser. Any recent release of Firefox, Chrome, or 
> Edge will do.

should be a no issue. Just imagine you use all the latest features and you are serving the files as you have them on your 
filesystem. This even allows you to leverage more of your devtools and there is a lot that will make you more productive.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Edit your source code in the devtools (and an editor) in parallel.<br>It will render CSS changes without reloads.<br><br>1) Just connect the Filesystem. <br>2) Use &lt;script type=module&gt;<br>3) No transpilers involved<br><br>Welcome to modern web development. <a href="https://t.co/w0kO0kP42o">pic.twitter.com/w0kO0kP42o</a></p>&mdash; @wolframkriesing <a href="https://twitter.com/wolframkriesing/status/1158123836484837379?ref_src=twsrc%5Etfw">August 4, 2019</a></blockquote>

# The History of the Web

slug: the-history-of-the-web
dateCreated: 2020-05-09 13:26 CET  
tags: web, knowledgebase    

In October 17, 1990 IMDb started as a unix script.\
December 25, 1990 Tim Berners-Lee releases WorldWideWeb (later Nexus) on Christmas day, the first ever browser for the web.\
August 6, 1991 Tim Berners-Lee responding to a thread on the alt.hypertext Usenet newsgroup, publicly announces the World Wide Web project for the first time.
[The History of the Web](https://thehistoryoftheweb.com/timeline/) has so interesting stuff. Very worth a read. A great site to spend a lot of time on.

# Brutalist Web Design

slug: brutalist-web-design
dateCreated: 2020-05-09 13:07 CET  
tags: design, a11y  

[Brutalist Web Design](https://brutalist-web.design/) seems quite aligned with Accessibility. The chapters of the guidelines are:

* Content is readable on all reasonable screens and devices.
* Only hyperlinks and buttons respond to clicks.
* Hyperlinks are underlined and buttons look like buttons.
* The back button works as expected.
* View content by scrolling.
* Decoration when needed and no unrelated content.
* Performance is a feature.

Read it all on https://brutalist-web.design/

# Make `arr[0]` Fail Safe

slug: make-arr0-fail-safe
dateCreated: 2020-05-03 18:07 CET
tags: JavaScript, knowledgebase  

I was just filtering a list `list.filter(someCondition)`
and I only wanted the first element **in case there is one**.
Doing `list.filter(someCondition)[0]` fails when the filtered list
is empty. So I am using `slice(0, 1)`, which returns the first element
if there is one, an empty list otherwise.
Now I do `list.filter(someCondition).slice(0, 1)` and never `list.filter(someCondition)[0]`.
Such small things. 

Here one gets reminded again where functions shine, instead of syntax.
Just like `Reflect.defineProperty()` which return a bool and not like
`Object.defineProperty()` which throws when it didn't work. Less noisy, more explicit code.
Which gets me into why exception throwing sux, but that's a whole topic of its own.

# WebStorm Live Templates Rock (Again)

slug: webstorm-live-templates-rock-again
tags: tools, webstorm, automation, knowledgebase  
dateCreated: 2020-05-02 15:27 CET

WebStorm has this awesome feature they call [Live Templates](https://www.jetbrains.com/help/webstorm/2020.1/settings-live-templates.html)
where you can configure a text in a certain filetype to autocomplete
to something, even dynamic. See how I built the auto-completion for `dateC` which becomes 
`dateCreated: 2020-05-02 15:27 CET`, which is current date of course, in my custom format.

`dateC` + <kbd>TAB</kbd>\
becomes\
`dateCreated: 2020-05-02 15:27 CET`

<figure>
    <img src="../live-tpl-video.gif" alt="See Live Template in Action" width=300 class="sizeup-onhover-image scale2 origin-left-center" />
    <figcaption>See Live Template in Action</figcaption>
</figure>


I got tired of writing the metadata, I am using here in my tidbits ([see the source](https://github.com/wolframkriesing/site-stitcher/tree/master/content))
over and over again, metadata such as the current `dateCreated`, as seen before.

## How to create this Live Template?

If you want to create the live template above do the following.

1. <kbd>Shift</kbd> + <kbd>Cmd</kbd> + <kbd>A</kbd> (for "Find Action")

2. Type "Live Template"

3. Select the one with "Preferences" behind it
    <figure>
        <img src="../live-tpl-
