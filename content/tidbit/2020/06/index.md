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
