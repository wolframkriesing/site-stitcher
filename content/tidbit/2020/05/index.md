# We don’t give people a website any more
dateCreated: 2020-05-11 16:46 CET  
tags: web  

Actually the headline is a quote from the article I just read ["Hammer and Nails"](https://www.kryogenix.org/days/2020/05/06/hammer-and-nails/) by [Stuart Langridge](https://twitter.com/sil) where he nicely states how we make every user's browser a fat client by making them work far beyond rendering some HTML+CSS.

> Instead of an HTML page, you get some templates and some JSON data and some build tools, and then that compiler 
> runs in your browser and assembles a website out of the component parts. That’s what a “framework” does… it builds 
> the website, in real time, from separate machine-readable pieces, on the user’s computer, every time they visit the website.

I found this blog post through Brian's tweet:

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="en" dir="ltr">However, there does seem to be a trend toward _casually_ pushing more complexity and dependencies, even for something like my own site, down closer to the user even when that is very unnecessary. That doesn&#39;t really play to the Web&#39;s best strengths for users.</p>&mdash; @briankardell <a href="https://twitter.com/briankardell/status/1259854677421801479?ref_src=twsrc%5Etfw">May 11, 2020</a></blockquote>

which is in a thread that started off linking to the above article.

[Tom MacWright](https://twitter.com/tmcw) in [Second-guessing the modern web](https://macwright.org/2020/05/10/spa-fatigue.html) 
he states very rightful a thing I had also thought about a lot, especially since I have seen a 
project run in a serious SEO issue due to exactly this problem: aging JS files you should keep around.
He describes it in detail like this:

> So if they open the ‘about page’, keep the tab open for a week, and then request the ‘home page’, 
> then the home page that they request is dictated by the index bundle that they downloaded last week. 
> This is a deeply weird and under-discussed situation. There are essentially two solutions to it:
>
> - You keep all generated JavaScript around, forever, and people will see the version of the site that was 
> live at the time of their first page request.

I skipped the second solution, simply because it just makes shit so much more complex. I know we all optimize for pings
and request run times, etc. but in this case, why not just let this extra ping take place and use [ETag](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag) as they were meant

> The ETag HTTP response header is an identifier for a specific version of a resource. It lets caches be 
> more efficient and save bandwidth, as a web server does not need to resend a full response if the content has not changed.

Most of us don't run pages or work for companies that run pages the size of Google or Facebook. This one extra
request might save some overall complexity.

Tom writes later

> And then there’s the authentication story. If you do SSR on any pages that are custom to the user, 
> then you need to forward any cookies or authentication-relevant information to your API backend and make 
> sure that you never cache the server-rendered result.

And I just had to  quote  this part of his article:

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="en" dir="ltr">&quot;all of the fancy optimizations are optimizations to get you closer to the performance you would’ve gotten if you just hadn’t used so much technology&quot;<br><br>:nodding: :nodding: :nodding: <a href="https://t.co/Z7Pn2Edyfh">https://t.co/Z7Pn2Edyfh</a></p>&mdash; @wolframkriesing <a href="https://twitter.com/wolframkriesing/status/1259865810308345856?ref_src=twsrc%5Etfw">May 11, 2020</a></blockquote>

It's sad and I have this view  on web tech too. 
That's why I try to keep this blog as lean as possible. Tell me if you see potential to make 
it better (and for design tips I am most thankful).

Read it all on https://www.kryogenix.org/days/2020/05/06/hammer-and-nails/
and https://macwright.org/2020/05/10/spa-fatigue.html
and https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag

# snowpack.dev - Bundler Free Development

dateCreated: 2020-05-09 13:35 CET  
tags: javascript  

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

dateCreated: 2020-05-09 13:26 CET  
tags: web  

In October 17, 1990 IMDb started as a unix script.\
December 25, 1990 Tim Berners-Lee releases WorldWideWeb (later Nexus) on Christmas day, the first ever browser for the web.\
August 6, 1991 Tim Berners-Lee responding to a thread on the alt.hypertext Usenet newsgroup, publicly announces the World Wide Web project for the first time.
[The History of the Web](https://thehistoryoftheweb.com/timeline/) has so interesting stuff. Very worth a read. A great site to spend a lot of time on.

# Brutalist Web Design

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

dateCreated: 2020-05-03 18:07 CET
tags: javascript

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

tags: tools
dateCreated: 2020-05-02 15:27 CET

I created a [Live Template](https://www.jetbrains.com/help/webstorm/2020.1/settings-live-templates.html) 
to auto-complete `dateC`+<kbd>TAB</kbd> to `dateCreated: 2020-05-02 15:27 CET`.

<figure>
    <img src="../live-tpl-video.gif" alt="See Live Template in Action" width=300 class="sizeup-onhover-image scale2 origin-left-center" />
    <figcaption>See Live Template in Action</figcaption>
</figure>


I got tired of writing the metadata, I am using here in my tidbits ([see the source](https://github.com/wolframkriesing/site-stitcher/tree/master/content))
over and over again, metadata such as the current `dateCreated`, as seen before.

### How to create this Live Template?

1. <kbd>Shift</kbd> + <kbd>Cmd</kbd> + <kbd>A</kbd> (for "Find Action")
2. Type "Live Template"
3. Select the one with "Preferences" behind it
    <figure>
        <img src="../live-tpl-find-action.gif" alt="Find Action screen in WebStorm" width=300 class="sizeup-onhover-image scale2 origin-left-center" />
        <figcaption>Find Action screen in WebStorm</figcaption>
    </figure>
4. Create a new Live Template, <kbd>Cmd</kbd> + <kbd>N</kbd>, choose "Live Template"
5. Fill it in as in the image
    <figure>
        <img src="../live-tpl-edit.gif" alt="The editor for the live template" width=300 class="sizeup-onhover-image scale2 origin-left-center" />
        <figcaption>The editor for the live template</figcaption>
    </figure>
6. Make sure to set "Applicable ..." below the fields.
   Since I am using it in markdown files, which has no own section I chose "Other", see image
    <figure>
        <img src="../live-tpl-type.gif" alt="Edit live template type" width=300 class="sizeup-onhover-image scale2 origin-left-center" />
        <figcaption>Edit live template type</figcaption>
    </figure>
7. Note the `$NOW$`. This is a variable which does NOT exist yet, so let's create it to return 
   the `dateCreated` in the format you have seen above (`2020-05-02 15:27 CET`).
8. Click "Edit variables" on the right.
9. Reading a little bit in [the JetBrains docs](https://www.jetbrains.com/help/webstorm/2020.1/edit-template-variables-dialog.html)
   I found out very quickly that I need to set the value of the variable `NOW`
   to `concat(date("Y-MM-dd HH:mm"), " CET")`.
    <figure>
        <img src="../live-tpl-edit-variable.gif" alt="Edit live template variable" width=300 class="sizeup-onhover-image scale2 origin-left-center" />
        <figcaption>Edit live template variable</figcaption>
    </figure>
10. If you tick "Skip if defined" the value will just auto complete and the Live Template is done (otherwise the inserted
    value of `NOW` would be selected for editing, which we don't need here)
11. Save and apply ... just close all the dialogs :)
12. Voila, now when I type dateC`+<kbd>TAB</kbd> in my markdown file I get the date.
    `dateCreated: 2020-05-02 15:54 CET`

# My micro.blog Export

dateCreated: 2020-05-02 15:23 CET
tags: indieweb

I just [exported the small number of posts as JSON (12 KB)](./my-microblog-export.json) I had on micro.blog.

# Accessibility (and) Tools

dateCreated: 2020-05-01 19:13 CET
tags: a11y

Diving into the topic of accessibility I found so much more than I expected.
The first was the fact that ["About 1 in 5 people has some type of disability."](https://webmaster.tamu.edu/2015/04/28/7-things-you-should-know-about-web-accessibility/).
I always knew and fought for doing accessibility at least better than yesterday,
but effecting 20% by doing it badly can be painful, not only emotionally also for a business.

I found the [NY Times has a page on Accessibility](https://help.nytimes.com/hc/en-us/articles/115015727108-Accessibility)
so "as many readers as possible are able to enjoy The New York Times", not sure how many pages do that and care so much.

I also played around with the "ultimate power" that the user has on the client to control what a website might look like.
There is more than you expect.
<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="en" dir="ltr">
It&#39;s so much fun to play around with my ultimate power over websites. <br>I am customizing my browser settings a bit, 
starting with the fonts.<br>Diving into accessibility a bit more.
<a href="https://twitter.com/hashtag/a11y?src=hash&amp;ref_src=twsrc%5Etfw">#a11y</a> 
<a href="https://twitter.com/hashtag/webdesign?src=hash&amp;ref_src=twsrc%5Etfw">#webdesign</a> 
<a href="https://twitter.com/hashtag/web?src=hash&amp;ref_src=twsrc%5Etfw">#web</a> 
<a href="https://t.co/gHGEL2pujz">pic.twitter.com/gHGEL2pujz</a></p>&mdash; @wolframkriesing <a href="https://twitter.com/wolframkriesing/status/1255833819476905986?ref_src=twsrc%5Etfw">April 30, 2020</a></blockquote>

While searching for tools to check beyond what lighthouse does, also so I can understand and learn
more about accessibility I came across the [Web Accessibility Evaluation Tools List](https://www.w3.org/WAI/ER/tools/)
on the W3C page it has **140 tools listed**. And again, I came across WebAIM.org, they have a great tool: 
[WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org/) where you enter a URL and get the results for this page
with annontations on the page, see the image below.

<figure>
    <img src="../wave-a11y-result.gif" alt="WAVE, Accessibility Tool Result" width=300 class="sizeup-onhover-image scale4 origin-left-center" />
    <figcaption>WAVE, Accessibility Tool Result</figcaption>
</figure>
