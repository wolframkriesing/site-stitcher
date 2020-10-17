# Make Blog Content Previews work on all Social Media
slug: make-blog-content-previews-work-on-all-social-media
dateCreated: 2020-10-17 14:37 CET
tags: social media, HTML, meta tags, links, SEO

On a friend's linkedin profile I saw some links to his content and since linkedin
picks up in traffic and professional relevance, I thought
I need to get my site's traffic better shareable. 

## What am I Talking About?
Every website with content can be shared on other/social media,
e.g. I can post a link to a video, blog post, tweet on linkedin or twitter, or any other
online site. Most of those sites have a preview of the content.

<figure>
    <img src="../preview-on-twitter.gif" alt="Preview on Twitter" height="300" class="sizeup-onhover-image scale2 origin-left-center" />
    <figcaption>Preview as seen on twitter</figcaption>
</figure>

<figure>
    <img src="../preview-on-linkedin.gif" alt="Preview on LinkedIn" height="300" class="sizeup-onhover-image scale2 origin-left-center" />
    <figcaption>Preview as shown on linkedin</figcaption>
</figure>

To provide the data for those previews, I need to add certain tags to my website,
so that those "consuming sites" can build their previews.

TL;DR\
See these two files ([the base template][base-tpl] and the [blog post template][post-tpl]) 
for the code I use in the templates for allowing these previews for my blog posts.

[base-tpl]: https://github.com/wolframkriesing/site-stitcher/blob/485903ea77544e78f1287f066769debb3b1ffa64/templates/_focus.html#L7-L23
[post-tpl]: https://github.com/wolframkriesing/site-stitcher/blob/485903ea77544e78f1287f066769debb3b1ffa64/templates/blog/post.html#L9-L30

## Resources
There are a lot of resources out there, and I had a hard time finding the right and relevant ones.
I want to list them here. As usual, I do that so I will find them later again, because I will
forget these kinda things.

### Twitter, LinkedIn, Facebook, Pinterest - One Preview Tool 🤷🏽‍♂️
On [socialsharepreview.com](https://socialsharepreview.com/) one can check these four social media
previews. The tool is nice to get a quick overview and feeling for what tags to have on the site.
I also had the impression not all info here are fully accurate. So better use multiple tools and
double check.

### The Open Graph protocol 💡
The [Open Graph protocol](https://ogp.me/) 
was introduced by Facebook in 2010. It mainly defines how to built the `property` attributes in meta tags like this
`<meta property="og:title" content="..." />`. It seems to be used by multiple sites, but I didn't investigate
that any deeper.

### LinkedIn Preview Tool 👍🏿
They call their tool ["Post Inspector"](https://www.linkedin.com/post-inspector/inspect).
Here you get a preview of your link and good hints how to improve it.

### Twitter Preview Tool  👎🏽
They call it the ["Card validator"](https://cards-dev.twitter.com/validator).
Here you get a preview of your link and no real hints how to improve it.

### A Good Summary 👌🏾 👩🏼‍💻 
["The Essential Meta Tags for Social Media" on css-tricks](https://css-tricks.com/essential-meta-tags-social-media/) -
is an article from 2016 (so it might not be the most up to date) stating very well
what needs to be implemented and which tags can also be used to reduce the page size.
This article lacks linkedin completely though, which I note because it was what got me
started.

### Parsers and publishing tools
On the Open Graph page there are [some tools listed](https://ogp.me/#implementations).
The most useful ones are the testing tools. Though those of competitors like twitter and linkedin 
are missing here.

### Medium's Help
On [Medium's Help page](https://help.medium.com/hc/en-us/articles/215769058-Update-social-media-preview-cards)
there are some info about the three major social media sites making it easy to test links and 
their previews, but all the above tools should have covered it already.

## Meta Tag is Strange
Some `<meta>` tags use the attribute `name` and some `property`.

```
<meta property="og:description" content="..." />
<meta property="article:description" content="..." />
<meta name="twitter:description" content="..." />
```

I looked up on [MDN's page on `<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta)
what the different attributes mean, but `property` is not even listed there.
**It is important to use the right ones, otherwise it won't work**.
I had broken my linkedin previews (see [the breaking commit](https://github.com/wolframkriesing/site-stitcher/commit/a78e1c55c2efde44ad7a94bbbe204717123f7b02))
because I tried to apply only what MDN states (and what
I assume is standard). The [fixing commit is here](https://github.com/wolframkriesing/site-stitcher/commit/485903ea77544e78f1287f066769debb3b1ffa64).
The reason seems to be RDF, as someone [stated on stackoverflow](https://stackoverflow.com/a/22418095).



## Plausible Supports UTM Parameters
At the same time I discovered that [plausible.io](https://plausible.io) 
the analytics tool on the site [supports UTM parameters](https://plausible.io/blog/utm-tracking-tags)
so I can better analyze which traffic source the readers came from.

It seems though that linkedin cuts UTM parameters from the URL I pasted in there.
Why?

# Tim Berners-Lee about WWW
slug: tim-berners-lee-about-www
dateCreated: 2020-10-12 16:59 CET
tags: learning, web

Actually Sir Tim Berners-Lee put the headline "Answers for Young People" above 
[this article](https://www.w3.org/People/Berners-Lee/Kids.html), but this is by far not only for the younger people.
I can highly recommend to read it.

Beside learning about how he invented the WWW, the explanation of URL and learning what happens when you click a link (URL)
I would like to highlight the section where he explains how exciting and useful math is. 
He headlined that with 
[I'm interested in Math -- what exciting stuff is there we don't do at school?](https://www.w3.org/People/Berners-Lee/Kids.html#L325).
I read from it **Education** is a thing ;). If there is nothing you take away, take this.

## Is the Web Good or Bad?
The last question he answers is powerful. Some quotes. No comments needed.

> what is made of the Web is up to us.\
> [...]\
> Let's use the Web to help people understand each other.

Think about it and act like it.

# React Native Picker - Still Maintained?
slug: react-native-picker-still-maintained
dateCreated: 2020-10-10 21:04 CET
tags: react-native, mobile

I am wondering if the react-native Picker component is still maintained and if it is usable or if I am totally
looking at the wrong thing for using a picker for a mobile app.

<figure style="padding: 1rem;">
    <img src="../picker.jpeg" alt="Example of the Picker Component" width="300" class="sizeup-onhover-image scale2 origin-left-center" />
    <figcaption>Example of the Picker Component</figcaption>
</figure>


## The Data I Have

I collected some data points about the [React Native Picker](https://github.com/react-native-community/react-native-picker)
but I still don't know if this component is in wide use or not.

## npm Lists Many Downloads

On npm the package has [>67k downloads a week](https://www.npmjs.com/package/@react-native-community/picker)
which looks like there is some traction and many people are using it. That is my assumption.

<figure style="padding: 1rem;">
    <img src="../npm-picker-stats.png" alt="npm stats" width="300" class="sizeup-onhover-image scale2 origin-left-center" />
    <figcaption>npm stats of the Picker Component</figcaption>
</figure>


## Moved out of the RN Core

Last time I had used the picker component, it was part of the RN core.
In about 2017, as far as I understand from the issue's comments.
the Picker moved to 
[the community repo](https://github.com/react-native-community/react-native-picker#react-native-communitypicker),
where some formerly core components have moved.

## Unresolved Issues Stay

I used (at least) workarounds for 
[two](https://github.com/facebook/react-native/issues/7817#issuecomment-264837382) 
[issues](https://github.com/facebook/react-native/issues/9220#issuecomment-245546641)
in the Picker back in 2016. The Picker was still part of the RN core.
The issues were closed when the picker moved to the new 
[community repo](https://github.com/react-native-community/react-native-picker).

## Almost no Maintenance

Most [commits in the last months](https://github.com/react-native-community/react-native-picker/commits/master)
are about managing dependencies.
A lot of [issues are still open](https://github.com/react-native-community/react-native-picker/issues?page=2&q=is%3Aopen+is%3Aissue)
and knowing that the repo had moved in 2017 (I believe)
I assume the issues had not been moved from there to the new repo.
