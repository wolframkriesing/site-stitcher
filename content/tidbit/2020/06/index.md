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
