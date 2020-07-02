dateCreated: 2020-06-26 11:08 CET
tags: open source, codeberg, FOSS, github
isDraft: true

# Why I Move to Codeberg


## The Trigger
I started learning github actions (and [wrote][3] [about][4] [it][5]). 
Not true. I was reading about them, trying to understand
how they work. I invested one day, after clarifying [the terms for me][3] 
I figured out that I can go as simple as using some actions
from the github marketplace and be done. But I prefer to understand what's under the hood.
So I did dive in and found that there are [multiple repos](https://github.com/actions) and more,
there is a power behind github actions that seems to go beyond what travis, drone or jenkins offer.

That's when I started to ask myself. **What is my time worth?** Is it worth that I invest my time in
learning github actions?
How applicable is the gained knowledge outside of the github world, compared to the time I invest?
How much do I need to go into the depth of github actions to make full use of it?
To be honest, I was really happy with travis. Are github actions just a hip new tool? Do they do
their job so much better? How much is the deep integration and new approach worth?
Is it open source, so that I can dive deep into it and fix or at least understand the things
that are done under the hood?

## Biased
Lots of questions. Many of them have a bias, definitely. The bias comes from my experience.
I have seen many tools. I have also seen many go away.

In 2006 for the first time I consciously invested in evaluating what are
the tools I want to learn and apply in the near future. I had been a PHP dude for a while.
I evaluated server-side and client-side tools. I looked at a lot of them.
Long story short I ended up using Django (had to learn Python for it), MySQL and Dojo.
Looking back at the time, it was a good decision.

My experience and, in the end also, the bias I bring along makes me ask the question again and again:
**Is investing time now right when I look back at it in the future?**
I guess that's why it is continuously harder to decide, there is more past experience to consider and
there is a lot I might loose when choosing the wrong path. "Loose" might be the wrong word, "miss out"
is better. But I will never know.

## Learned to Simplify
Over the last years I am tending a lot to simplify things. 
Simplifying also means prevent to write code, write less code, reduce dependencies,
redo things, throw away code that has become obsolete, speed up the tool chain. Simplify on all levels.

A big part of my developer life
I have been spending in JavaScript land, I started in 1999 with my first pure JS job.
I have seen the ecosystem grow, I have seen us putting layer over layer on top of one another.
I have seen us forgetting user experience, website speed, progressive enhancement, accessibility, 
backwards compatibility and so on. We understand less and less how the browser actually works underneath.
I expected web components to be a much faster and bigger movement than it is. But I believe
many are too busy learning React, which does not really embrace web components (yet).
But web components are built right in the browser and will allow the browser to optimize what
we are optimizing for in the client nowadays with frameworks. But I guess seeing this as an asset is
not mainstream yet. Essentially, we can throw away of the things we
did over the years if we would embrace web components and push their limits.

## Pattern Evolving
What does all this have to do with codeberg? Well, it looks like a pattern.
But let me dissect the topic a bit more before I come back to this.

The web is complicated. In 1998 I started setting up my own web stack, not just building an
HTML page and put it on some drive. I really set up a database, an apache and cgi scripts that 
dynamically render the content when the browser requests a URL.
I had never thought that I had to learn so many new technologies just to build a website.
I had to learn protocols like HTTP, understand apache and how to hook the dynamic rendering
part into it, I learned Perl and remembered the database knowledge I once gained in university.
Later I discovered JavaScript and CSS. I don't remember, but that was at least one year of learning
until I was able to plug all the puzzle pieces together and understand where does what belong.

It feels a little bit as if github actions are as complex as what I described in the last paragraph. 
There is a lot of power that comes with them. Is that necessary?
We have the pipeline well defined. We have tools, so they just need to be plugged together.
I am not convinced we need one player that merges all the tools of the pipeline into their
own offering, narrows down the choices of many of the developers. It is the typical behaviour
of monopolies, they grow into all directions once they have layed the ground for doing so. 

We reinvent tools, github actions are what travis, jenkins, drone, etc.
are, they are CI/CD tools. The pattern here is that the complexity is moving into one direction,
it is the tool chain of one big player, github in this case. Instead of leveraging the eco system
and supporting other CI tools and trying to build standards on how to integrate tools with one
another, github builds its own new tool, embedded into their platform.
I don't know but I would be interested what impact github actions had on travis, I can imagine
since it is a potential replacement for it travis might not be so happy about that.

## I Want Less
What if I want to have a much simpler workflow? What if I just need a simple server, that I set up
on my own and deploy my static sites onto it? Oh yes, sure I will have to make sure the server runs
and is secure. But I just need a tiny subset of the tooling that github actions provide
and I can switch the tooling any time.

With github actions github can leverage its reach to make developers use yet another tool that is
only available on their platform.

## Deeper Into the Rabbit Hole?
To efficiently use github action I need to invest time to learn a tool of one profit-oriented company, 
to become their messenger? By using my time to learn their tooling I will feel as if it is a benefit in my
next job to convince my employer to spend the money to invest in github and use their private repos
or even github enterprise. That's how the business models work nowadays.
**And what is the value I get out of it?**

I like to say that react is facebook's best recruiting tool. It has been made big, the hype grew 
really fast, the next hype in that eco system are react hooks, and the story goes on.
Facebook creates a huge crowd of people that learn, promote and contribute to their tooling.
It's easy to choose from those people for hiring. It's a vicious cycle as long as we allow it to happen.
Do we get some kind of tunnel vision and can't really evaluate what is the right tool for the job?
How often do we choose the right tool for the job as opposed to choosing from the tools we know?

I closed my tidbit [Is it Github "Actions" or "Workflow"?][3] with.
> Github costs no money. What is the price I am paying?

I took this thought with me and I found even more support for it in [Andreas Shimokawa's](https://codeberg.org/ashimokawa)
talk [Codeberg a free home for free projects][2].

## Shaking off Github
I had heard of [codeberg](https://codeberg.org/) before. Now it was time to try it out and see
how much simpler it can be. I started moving my project [More HTML](https://codeberg.org/wolframkriesing/more-html-components)
to codeberg. I wanted to give it a try. As usual, you only learn when you do the things.

I learned that github has given me a lot of things for free, that I did not realize anymore
that they are actually not part of a repository hosting site but that they are tools that go far beyond
and make things easier for me, but also let me loose sight of the complexity that is behind.
Just like in 1998 when I learned web technologies, I had never thought how much technology is behind
all the sites been browsing.

Realizing the things I took for granted when using github, made me think a lot about how much comfort
is it and how much bond to github is this creating? What am I giving up?

I get for free from github:
1. **Git hosting**, simply be it our "origin".
1. **Collaboration** features, such as PRs, diff views, discussing on code.
1. **Issue management** and a huge part is the discussions we feed.
1. **Project management**, we manage all JSCraftCamp things on github (the site, planning, registration, sponsoring, ...). 
1. **Content storing**, as gists or all my blog content is in repos on github.
1. Built in **hosting** of simple static sites via gh-pages.
1. **CI integration**, I use travis a lot, it was the first one that came up on github, if I remember right.
1. **Self promotion** and all the non-tech stuff, I am not even mentioning.

## 7.5 Billion Reasons
All the above I have done for free on github, I never payed a single cent to github.
But when [github was sold to Microsoft](https://github.blog/2018-10-26-github-and-microsoft/) 
some people had [7.5 billion good reasons](https://news.microsoft.com/announcement/microsoft-acquires-github/), 
which I helped them to have. I have been part of the community building it and contributing to it in my spare time.
I spent hours and hours on github. Is this worth a share?

## Support Codeberg
What if I invested this time in the community, into real open source, into projects that are made
by the people for the people. What if I support organizations like 
[Codeberg e.V.](https://blog.codeberg.org/codebergorg-launched.html)
that have the mission to
["build and support a safe and reliable home for Free and Open Source Software"](https://blog.codeberg.org/codebergorg-launched.html)?

Reading some Codeberg issues one finds statements like this in there
> What I find worse is that most TLDs are technically managed by private companies - I'd prefer to change that on a global scale. But that's a different topic to discuss somewhere else :-)

or 

> taking away power from Five Eyes countries after all managing a TLD is something every countriy within the EU can do as well

## But you are Using ...
One might say that I use other payed products, such as WebStorm (I get a sponsored license for jskatas.org), 
Chrome, Twitter, reddit, etc. all for free. Yep that is true.
I am not going to argue that I am guilty of using free tools.
I remember at one event where someone presented a good analogy:
* Pig 1: What awesome food we get, and all is for free and tastes so good, without paying a dime.
* Pig 2: What do you think who is the product?

## The Pendulum Needs to Swing
It's not all about smashing the big ones and envying all companies and rich people.
Not by far, it is actually about challenging the system constantly, challenge the status quo.

It is just like trying to **keep the balance between the reality and how much of a better reality it could be**.
If we do not go to extremes we will never get the pendulum to swing into a healthy middle.
It's our job to make sure the range the pendulum has to swing becomes wider and wider
and we don't let the gravity of the greedy big players, that mostly owe their shareholders,
pull the pendulum into their direction only.

We have to try out alternatives and offer them to the world, we need to figure out how
we can allow more of us to profit from what we have. The talk about sustainability of open source
([I wrote about it](/tidbits/2020/06/open-source-sustainability/)) also underlines that we need
to move into this direction.

I think we need to start moving. Are we aware of the many monopolies that are currently forming?
It does not feel too good.

.... in progress ....

## An Alternative Approach

all is community owned, sponsored by companies that prove to be investing in the community,
later in the people and humanity eventually just making the world better
slowly making profit for the good
open source grows - good stuff grows ...
a different vicious cycle, but good this time ;) 

[1]: https://picostitch.com/tidbits/2020/06/open-source-sustainability/
[2]: https://vimeo.com/376156831
[3]: https://picostitch.com/tidbits/2020/06/is-it-github-actions-or-workflow/
[4]: https://picostitch.com/tidbits/2020/06/trigger-github-action-by-external-event/
[5]: https://picostitch.com/tidbits/2020/06/github-action-features/
