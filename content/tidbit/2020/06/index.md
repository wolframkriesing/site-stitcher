# Open Source Sustainability
slug: open-source-sustainability
dateCreated: 2020-06-24 22:47 CET
tags: open source

The title does not really enclose all the topics and cover the full value of this talk.
Actually it is not explicit enough, because sustainability is a word that is being used 
in too many contexts and means too much.
I would maybe rephrase the title to 
"The Real Cost and Value of Open Source and Why and How Your Company can Participate and Give Back".
A bit clunky, but it tells the story I believe.

[@Tobie Langel](https://twitter.com/tobie) starts by mentioning ways how open source gets funded
nowadays. Though he limits it to the money-funding parts, I believe the employed as full-time
open source dev, funding through free license of products, etc. is not included.

Later he adds up the salary of all developers and compares it to the open source funding that
[open collective](https://opencollective.com/) has given out in 2018. I am not sure I can fully
follow the comparison, since one is salaries and the other is funding for open source projects, 
maybe I just didn't get why they are comparable. But I think it very well shows the dimensions
of value created in the open source space, because if all open source work would be payed 
I believe the sum of all salaries would be beyond this trillion. But that's just my guesstimate.

He goes on with taking apart the limitation that funding open source just with money has.
Pretty nice drill down on the problem.
His final conclusion is a bit richer, but let me say this: It is clear that there are not 
many companies that understand the real value of open source yet.

@tobie The next talk could be about how to establish a sustainable software cycle in companies, that
do not just make use of open source.

Watch it, I can highly recommend it.

<iframe width="427" height="240" name="video" src="//www.youtube.com/embed/HZZrbVKAC-4" frameborder="0" allowfullscreen></iframe>

The [slides and more about his talk are can be found here](https://speaking.unlockopen.com/5JrQdv/towards-a-sustainable-solution-to-open-source-sustainability#siZvtHS).

## Another Related Topics 
... I just remember is
[Why I forked my own project and my own company ownCloud to Nextcloud](https://www.youtube.com/watch?v=UTKvLSnFL6I)
by Frank Karlitschek, Nextcloud Founder. He talks about how and why he re-tried his company
and is convinced that doing full and real open source is the better approach.

# NodeJS Architecture Applied
slug: node-js-architecture-applied
dateCreated: 2020-06-20 13:50 CET
tags: javascript, architecture, code, web, design patterns, clean code, TypeScript, monorepo

The article 
[Node.js, Dependency Injection, Layered Architecture, and TDD: A Practical Example, Part 1](https://carlosgonzalez.dev/posts/node-js-di-layered-architecture-and-tdd-a-practical-example-part-1/) 
by [@Carlos González](https://twitter.com/rhyek)
gives a very good introduction of how to structure a (TypeScript/JavaScript) app.
He links articles that allow one to dive deeper into underlying concepts and still explains the
big picture very well. **Great job Carlos!**

He starts by explaining
[The "D" in SOLID (Dependency Inversion)](https://carlosgonzalez.dev/posts/node-js-di-layered-architecture-and-tdd-a-practical-example-part-1/#toc-2)
which might feel a bit clunky if you haven't heard of it before. But I have to say at this point,
stick to it, the benefit will become obvious while working with a code base as he is creating it and
especially testing will be so much more beneficial. While the "D" (driven) in TDD will also push you
that direction anyways. 

Next he writes about
[Layered Architecture](https://carlosgonzalez.dev/posts/node-js-di-layered-architecture-and-tdd-a-practical-example-part-1/#toc-4)
explains it very quickly and easy to understand, applicable right away.
He dives into many more very important topics. Just go and read the article, it is great!

I just want to dive deeper into two things.

## More TDD, Please (1)
I just strongly miss the TDD part. If you know me, you knew I was going to say that.
Parts in the article describing how to do things, without diving into "why"
makes the purpose of architecting a bit too much a self-purpose, though this is what the
article is mainly about. Still, I believe that using the "driving" through tests might also very well supports
some architecture decisions and can help explaining them better.

Reading some tests like in [todo.service.spec.ts](https://github.com/rhyek/nestjs-practical-example/blob/master/apps/webapi/src/todos/todo.service.spec.ts)
feels a bit too much like testing the "how" instead of the "why" and "what".
This might lead people into the wrong direction, that's why I think it is important to make sure not to
learn testing this way. 
Reading a test description such as 
[`'assignTo should internally call findOneOrFail instead of findOne'`](https://github.com/rhyek/nestjs-practical-example/blob/4da963fcaa74d33c030ca82ab382edaa7549a9c7/apps/webapi/src/todos/todo.service.spec.ts#L84)
already states that it describe implementation details. There are low-level tests that sometimes look like
this, I agree. But these sometimes feel like they are testing the mikro-orm and I believe that should not be the intention.  
The article [Learning By Testing](https://ymmv.craftswerk.io/2019/03/learning-by-testing)
by [@Raimo Radczewski](https://twitter.com/rradczewski)
has a lot of good hints on this topic.

Reading further Carlos states that about some TDD things that

> We will discuss that further in part 2 of this series.

Really cool!

Don't get me wrong, I like the trade-offs he makes and the focus, still deep knowledge he has put into this
article. I am looking forward to part 2, because

> in part 2 of this series we will focus a little on Test-Driven Development but especially 
> how we can set up Integration Testing using Docker for our project.

Especially the docker part I am really curious about. I have also talked about 
[TDD your next docker container](https://www.youtube.com/watch?v=ZSLQ02vpZUg) 
last year, the code in is [this repo](https://codeberg.org/wolframkriesing/tdd-docker-image-with-goss)
on [codeberg](https://codeberg.org) (codeberg = github + independent).


## Too Many new Terms? (2)
When I started reading this article, I started out to be a bit opposed to the idea of using so much tooling,
like nestjs, an ORM, TypeScript, etc. But I have to say in the context of learning architecture those tools
might be a great base to build on to practice those principles and to be productive faster. 
Learnings about the architecture layers and practice software architecture without bothering too much about
the underlying structures and technologies might be a benefit to grasp the concepts quickly.

## Learn What is Below Architecture!
If the described software architecture and things like NestJS that uses Express.js under the hood
([sic](/tidbits/2020/06/what-does-sic-mean/)),
ORMs, TypeScript, TDD, SOLID or any of those are new to you, if phrases like

> Dependency Injection is a bit different in TypeScript [...] dependency abstractions are done with interfaces 
> and it is with those same interfaces that you register a provider in an IoC container
  
or
  
> TypeScript compiles down to JavaScript and when this happens interface and type information is lost
 
or

> TypeScript offers [...] abstract classes

or

> mikro-orm already provides repositories for our entities

are hard to understand or sounds like magic
**I strongly recommend to take the time to learn architecture in a more profound way, than the article suggests**.
I suggest remove all the layers of software, like the ORM, TypeScript, nestjs, etc.
Start practicing the core techniques and technologies, some of them are: 
- JavaScript (the language), including npm
- TDD
- SOLID
- Design Patterns.

Even this list is already very long and it took me years until I was able to understand how and when to reach out for them.
Let alone TDD, I believe after I had a crash course from JB Rainsberger it took me two years to start being confident
to apply it and make software, I wrote, benefit from it. During those two years I basically just made mistakes.
Anyways, it is worth to start chopping up the learnings into smaller and more widely applicable learnings.

## Fight Software Bloat
Why am I saying that? I have seen it too often that the levels of abstraction that we take for granted
are actually not so abstract as one thinks, they are often very much simpler than one imagines.
Starting to learn on top of those abstractions leads to a missing understanding of the underlying principles 
and technologies, which will lead to inefficiently applying them and result in the bloated software,
which seems to be mainstream nowadays (in JavaScript land). 

An example makes this easier to understand. 
I remember learning about test libraries (such as mocha, jasmine or jest) with a mentee a couple years ago and
I learned that he saw them as a given and "magic that I will never understand". Once we took apart what a test library
does and he had implemented one himself he was ready to unleash the covers and realize that there is
no magic at all. One just has to lift the covers. But doing that requires the push into that direction.

## Less is More
That is the push I wanted to give as a second take away from the article.
**Unleash the covers of the layers below and you will be surprised how many layers deep it goes.
You will see, with much less you can achieve the same.**

If this sounds reasonable and you have questions feel free to [reach out to me on twitter](https://twitter.com/wolframkriesing).

# What does "sic" mean?
slug: what-does-sic-mean  
dateCreated: 2020-06-19 16:40 CET  
tags: english  

I just came across an article again, that had "(sic!)" in it, and I finally looked up
what it means. I also see it in german text. So it's time to look  it up and learn what
it means and how to use it when appropriate.

Fortunately there is 
[an explanation in the Merriam-Webster](https://www.merriam-webster.com/words-at-play/sic-meaning-usage-editorial-citation) 
where it is kinda nicely summarized.

> What is denoted by sic is that the word or phrase that precedes it occurs in the original 
> passage being quoted or name being used and was not introduced by the writer doing the quoting.

I understand. At least for a second. But how do I know which part is the cited part?
So I continue reading  to understand  it better. But I get a bit confused.

> Sometimes the quoted text contains an error of grammar or spelling, but other times it might 
> not contain an error at all, but some kind of language or phrasing that might be unexpected.

Why does it mention errors? Is that really so important when citing?

## "Sic" is Finger-pointing? 

Reading a bit further in the  article, that turns out to  be verry  informative,  but also less
explicit about when and how to use "sic", a sentence sticks out:

> There are a host of etiquette issues that surround sic. Since it often follows misspellings 
> or nontraditional language use, some commentators see it as a means of needlessly making a 
> value judgment on someone else’s language habits.

Ok, that sounds "sic" is kind of a blaming tool or finger pointing technique. Actually, that's also
where I found it today in a German political tweet. Am I getting the hang of it?
A bit later the article confirms my feeling:

> The New Yorker’s Louis Menand describes sic as a “damning interpolation, combining ordinary, 
> garden-variety contempt with pedantic condescension.”

I had to look up what "pedantic condescension" means, but yeah this sounds like a blaming tool.
Since I don't feel very much like blaming, at least I try  not to, I would stick to  this:

## You can Also Paraphrase

> Sometimes it may be better to paraphrase the text and avoid what seems like haughty comment 
> on another writer’s choices.

There is always some doubt left one may misunderstands and wrong-uses other people's words.
Especially nowadays in times of short messages, short attention spans and headline skimming.

The  last paragraph  ends the article like so:

> Additionally, it’s regarded as bad form to use sic repeatedly when the same error or weird spelling occurs in a document.

There is more to  that last paragraph but without having read the entire article, it does not make
so much sense. Finally, I can just recommend to read the article 
[Showing Off Your [Sic] Moves](https://www.merriam-webster.com/words-at-play/sic-meaning-usage-editorial-citation),
and it's not just for pointing out errors (sic).

# Github Action Features
slug: github-action-features  
dateCreated: 2020-06-18 17:40 CET  
tags: tools, github action, deployment  

While reading about github actions I note down a couple of things here, that
I find worth noting and remembering. Basically I can imagine what it looks like, 
it's a travis with a tighter integration into github, but some details are interesting.
 
Quotes from https://help.github.com/en/actions/configuring-and-managing-workflows/configuring-a-workflow

I see nothing left to wish for on how to start an automated workflow, even cron jobs exist.

> You can configure a workflow to start once:
>
> * An event on GitHub occurs, such as when someone pushes a commit to a repository or when an issue or pull request is created.
> * A scheduled event begins.
> * An external event occurs.

Steps in a job can share information using the filesystem!

> Each job in a workflow executes in a fresh instance of the virtual environment, and steps 
> within a job can share information using the filesystem.

Running multiple jobs on different configurations is built-in, really nice!

> a workflow can run a job for more than one supported version of a language, 
> operating system, or tool. For each configuration, a copy of the job runs and reports a status.

> There are different types of actions you can use in your workflow to suit your project's needs:
>
> * Docker container actions
> * JavaScript actions
>
> For more information, see ["About actions."](https://help.github.com/en/articles/about-actions#types-of-actions)

On that page I finally learn what an action is.

> Actions require a metadata file to define the inputs, outputs and main entrypoint for your action. 
> The metadata filename must be either action.yml or action.yaml. 
> For more information, see ["Metadata syntax for GitHub Actions."](https://help.github.com/en/articles/metadata-syntax-for-github-actions)

And finally reading through some code in the "setup-node" action repo
https://github.com/actions/setup-node
makes me realize that this is not just like travis, it is so much more complicated on first sight.
Maybe also more powerful, but will also occupy more time to fully understand it.

# Trigger Github Action by External Event
slug: trigger-github-action-by-external-event  
dateCreated: 2020-06-18 17:33 CET  
tags: tools, github, deploy, automate, webmention  

Lately I thought more often about automating my blog using [webmentions](https://webmention.io/)
and while reading the Github Actions docs, I found the following might come in handy.
So I am parking that info here.

> To trigger a workflow after an external event occurs, you can invoke a repository_dispatch 
> webhook event by calling the "Create a repository dispatch event" REST API endpoint. 
> For more information, see "Create a repository dispatch event" in the GitHub Developer documentation.

The link is https://developer.github.com/v3/repos/#create-a-repository-dispatch-event

# Is it Github "Actions" or "Workflow"?
slug: is-it-github-actions-or-workflow  
dateCreated: 2020-06-18 13:24 CET  
tags: tools, github  

I wanted to deploy to github-pages using the renamed branch "main", but it seems not to be possible with
github (yet) to turn on github-pages with a branch different then "master".
So I thought it might be a good time to try out github actions, maybe this will help?
If not I will have learned something.

## I am Trying it out
I clicked on the "Actions" tab on my [More HTML project page](https://github.com/more-html/components) 
and chose "set up a workflow yourself &rightarrow;".
The confusion did already start for me, I click on "**action**" and the link here says "set up a **workflow**".
What is it action or workflow?

<figure>
    <img src="../github-actions-1.gif" alt="I clicked: set up a workflow yourself" width="500" />
    <figcaption>I clicked: set up a workflow yourself</figcaption>
</figure>

This now opens a file editor for a file ".github/**workflows**/main.yml".
Again workflow, not action. I need to read some docs.

<figure>
    <img src="../github-actions-2.gif" alt="&quot;basic workflow to help you get started with Actions&quot;" width="500" />
    <figcaption>&quot;basic workflow to help you get started with Actions&quot;</figcaption>
</figure>

Even at the top of this new file it says

> basic **workflow** to help you get started with **Actions**

I really need to clarify the terms for me.
So I click the "Documentation" link on the right side.
There it says "Getting started with a workflow" and later

> For the full GitHub **Actions** documentation on **workflows**, see [...some link...]

It doesn't get clearer yet.
I follow the suggested link. And already the breadcrumb (see image below)
does help me understand it a bit better. There is a hierachy.
Though still the terms are used in a mixed way. But I seem to be close to figuring it out.

<figure>
    <img src="../github-actions-3.gif" alt="Both terms &quot;action&quot; and &quot;workflow&quot; are used." width="500" />
    <figcaption>Both terms &quot;action&quot; and &quot;workflow&quot; are used.</figcaption>
</figure>

On this page [Configuring a workflow](https://help.github.com/en/actions/configuring-and-managing-workflows/configuring-a-workflow)
I finally find relief.

> **Workflows** must have at least one **job**, and jobs contain a set of **steps** that perform 
> individual tasks. Steps can run **commands** or use an **action**.
> You can create your own actions or use actions shared by the GitHub community and customize them as needed.
>
> You can configure a workflow to start when a GitHub event occurs, on a schedule, or from an external event.

Alright, now I get it. Now I have a hierarchy and I understand what the terms mean and how they
are connected. Poooh, finally.

## In the End
I realized Github Actions are way more than just a `.travis` file, if I want to entirely understand them.
 
While searching and thinking about how to do that and how much technology and machines are behind this to make it all work,
I thought that all this does not cost me a dime.
This leaves me with the question, why not move all my code slowly over
to [codeberg.org](https://codeberg.org/), pay for it, control it, own it. 

Github costs no money. What is the price I am paying?

# Michael Feathers on Functional Code
slug: michael-feathers-on-functional-code  
dateCreated: 2020-06-12 15:36 CET  
tags: code  

Michael Feathers wrote 
[Functional Code is Honest Code](https://michaelfeathers.silvrback.com/functional-code-is-honest-code).
I will take away questions from this article.

He starts out
> It’s hard to change things that you don’t understand — you can try, but you’ll often fail.

I can not agree more to it. But I see that this is hard in our industry, the playfulness
when writing code seems often to be more important. 

## My take away Question
I might not know the definitions of OO and Functional good enough, but to me the following
seem a bit too strict.

> So many of the techniques around gaining testability involve parameterizing classes 
> and methods so that all of the inputs and outputs are explicit and mockable under test.

I would call that dependency injection. And it has the following result.

> You pass in a reference to that capability as a constructor or method argument. 
> This makes an OO system, broadly functional.

Is passing in a reference or in other words a dependency, what distinguishes
OO code from functional code? Mmmh, I always thought it's just a technique applied whereever.

# My Reproducable (Development) Environment
slug: my-reproducable-dev-env
dateCreated: 2020-06-12 11:49 CET
tags: tools, development, setup

It is painful sometimes, but  having a setup that works on any machine (that has docker), 
just git-clone and run is **AMAZING**.
I use a [bash script](https://github.com/wolframkriesing/site-stitcher/blob/master/run.sh) 
and a 2-line Dockerfile for it.

## I Used to use Nix
About three years ago I used [nix](https://nixos.org/) for it, which was definitely more compatible at runtime. 
No separate filesystem (as volume mapped into a docker container), but still just the executables configured. 
But it was too complicated, especially when it stopped working out of the box as on the latest MacOS (Catalina).
I removed nix everywhere, I always say that you need a PhD to understand and efficiently use nix, so I am out.

## Switch to Docker
Now with having a docker setup for each project I find problems too. 
Problems such as mapping the filesystem into the container only 
that is available. All other files on my computer are invisible.
Which is great on first sight and definitely from identifying unwanted dependencies that is great.
But for example when I worked on [test-stitcher](/projects/#test-stitcher) 
which parses various files also from outside of of my project it's painful, it was actually essential
to have access to all files (of other projects) for this project. Currently I think I map
another volume into the container but I am not very happy with that solution either.
To mention just one of the challenges I faced.

## Improvable
Also docker is not as efficient with resources and with mapped volumes etc. So my fan does start 
spinning 🌬 sometimes. But to be honest I prefer those things that make me aware of handling my resources 
carefully and not just expect to have endless disk space and CPU power.
Assuming endless resources will hurt much more down the road. I have seen that often. And it gets 
expensive latest when multiple colleagues complain about the environment being slow, the development cycle slowing 
down, and when this happens at scale it does cost and is harder to fix.

## To Be Continued ...
I am looking forward to [wasi.dev](https://wasi.dev/). As far as I understand it has the features of nix that I appreciate 
and the potential to set up the development and runtime environment one needs per project.
I keep watching this space to improve my projects environments.

Actually, I am very surprised that our industry standard is having local, non-reproducible
development environments and trying to reproduce those in production, sometimes even with different
means. 

# Pseudo-Class `:defined` Under the Hood

slug: defined-pseudo-class-under-the-hood
dateCreated: 2020-06-01 13:16 CET
tags: web, CSS, Web Components

The CSS pseudo-class `:defined` is for defined (custom) elements, sure.
But what does "defined" really mean? While reading about [upgrading CBEs](./html-elements-not-upgradable-to-cbes)
I came across the definition for it. Let me [quote the DOM spec a bit](https://dom.spec.whatwg.org/#concept-element-is-value).  

> An element’s custom element state is one of "undefined", "failed", "uncustomized", or "custom". 
> An element whose custom element state is "uncustomized" or "custom" is said to be defined. 
>
> [...]
>
> Whether or not an element is defined is used to determine the behavior of the `:defined` pseudo-class.

## What is the "custom element state"?
The [DOM spec has not much on it](https://dom.spec.whatwg.org/#concept-element-custom-element-state).
It just says when the value is set to what.
There is one [example in the spec that shows the four states](https://dom.spec.whatwg.org/#example-c5b21302).

```
<!DOCTYPE html>
<script>
  window.customElements.define("sw-rey", class extends HTMLElement {})
  window.customElements.define("sw-finn", class extends HTMLElement {}, { extends: "p" })
  window.customElements.define("sw-kylo", class extends HTMLElement {
    constructor() {
      // super() intentionally omitted for this example
    }
  })
</script>

<!-- "undefined" (not defined, not custom) -->
<sw-han></sw-han>
<p is="sw-luke"></p>
<p is="asdf"></p>

<!-- "failed" (not defined, not custom) -->
<sw-kylo></sw-kylo>

<!-- "uncustomized" (defined, not custom) -->
<p></p>
<asdf></asdf>

<!-- "custom" (defined, custom) -->
<sw-rey></sw-rey>
<p is="sw-finn"></p>
```


# HTML Elements not Upgradable to CBEs

slug: html-elements-not-upgradable-to-cbes
dateCreated: 2020-06-01 12:54 CET
tags: web, HTML, Web Components

[More HTML](https://github.com/more-html/components)
provides a CBE (Customized Built-in Element) for upgrading heading tags such as H1, H2, ...
to render a link-icon beside them, as many know it from github readme files.\
I wanted to upgrade all picostitch sites automatically by just including a `<script>`
which upgrades all headings on the page and adds this functionality.\
**It is not possible to upgrade a parsed and rendered element (like an H1) afterwards.**

There is a very good longer [explanation of that on stackoverflow](https://stackoverflow.com/a/51527693).
In short the conclusion is:

> The is attribute is used only at element creation (at parse time) to initialize the is value and has no effect if 
> changed when the element is already created. In that sense is value is read-only.

## What is More HTML?

This is a small early stage project I started a while ago. It ...

> ... provides several web components that just enhance HTML.
  Some are provided as pure web components ala `<more-somecomponent>`
  and others can be used via customized built-in elements (CBEs [read more on MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)), 
  such as `<h1 is=more-h1>`
  which enhances an H1 with certain functionality.
  See the [examples](https://more-html.github.io/components/examples/) for some more in depth explanation and examples.

See the [README](https://github.com/more-html/components).

## What is a CBE?

CBE is the abbreviation for "customized built-in element" and it makes up a part of Custom Elements.
[The spec says](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example) 
the following about it.

> Customized built-in elements are a distinct kind of custom element, which are defined slightly differently and used 
> very differently compared to autonomous custom elements. They exist to allow reuse of behaviors from the existing 
> elements of HTML, by extending those elements with new custom functionality.

## What does "upgrade" mean?

"Upgrade" in the context of Web Components or Custom Elements has a specific meaning.
[The spec explains](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-upgrades-examples)
that very well too.

> Because element definition can occur at any time, a non-custom element could be created, and then later become a 
> custom element after an appropriate definition is registered. We call this process "upgrading" the element, 
> from a normal element into a custom element.

# WebStorm: "New File" Creates Directories and File

slug: webstorm-auto-create-files-and-directories
dateCreated: 2020-06-01 12:22 CET 
tags: tools, WebStorm

I saw a video that VS Code creates directories and file when
adding a file named like `dir1/dir2/file.js`, I tried it in WebStorm.
It works.

Just do "New File" (<kbd>Command</kbd> + <kbd>n</kbd> for me) and type
the full path and all directories needed get created. Cool.

<figure>
    <img src="../webstorm-newfile.gif" alt="'New file' dialog in WebStorm also accepts path names." width="400" />
    <figcaption>'New file' dialog in WebStorm also accepts path names.</figcaption>
</figure>
