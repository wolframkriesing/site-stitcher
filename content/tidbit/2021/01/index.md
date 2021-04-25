# Every Day is Refactoring Day
slug: every-day-is-refactoring-day
dateCreated: 2021-01-26 18:49 CET
tags: crafting, good code, refactoring
previewImage: ../refactoring-preview.jpeg

It is always good to remind oneself constantly how and why to do things.
Refactoring is one of the things that I see getting too little attention.
I don't mean in our sprints or tickets, I mean in our professional lifes.
**Refactoring is a tool we have. Use it** (right)! I guess "right" is more
often important than one thinks.

I was just reading [Ron Jeffries' post on why refactoring does not belong in the
backlog](https://ronjeffries.com/xprog/articles/refactoring-not-on-the-backlog/), 
which I had not seen before. Even though it sounds quite logical and makes no sense
to stop development for half a year just to refactor to a happy place, it is
discussed as an option, too often. Just don't!

One of my favourite quote (by Kent Beck) is:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">
    for each desired change, make the change easy (warning: this may be hard), 
    then make the easy change</p>&mdash; @KentBeck 
    <a href="https://twitter.com/KentBeck/status/250733358307500032?ref_src=twsrc%5Etfw">September 25, 2012</a>
</blockquote>

It does take discipline not to run to the finish line as fast as one can, because "it is just right there".
It does take discipline to take a step back and make the new puzzle piece fit.
Making it fit sometimes means adjusting the entire puzzle a bit.

## Software is SOFT
This is another one of my favourite sayings. Software is soft.
You can always massage software to where you need it now.
We rarely work on software where we know exactly what it will look like in the future.
We write most of software to support a (fast) changing business.

## Ron Reminds
Refactoring is part of the job every day. It is like renaming, like fixing indentation,
like optimizing imports, like compiling again, like learning a new language feature, it is
just like everything else, it is not a task that stands alone and should be done solely for
days or weeks.
Ron sums it up well, I think:

> We improve the code where we work, and ignore the code where we don't have to work.

By doing so we have NOT "wasted effort on places that don't provide benefit".
This often means to just ignore some of the trash laying around. Yep, there is trade offs
everywhere. It takes discipline to not refactor everything and touch all places once
one found a thing that should be ironed out. 

Going into extremes and cleaning the heck out of code is good when practicing, but
at some point we also want to contribute and help moving things forward with our team, 
and then refactoring might not always be needed as much as a developer would like to.

I love how Ron ends his article:

> This is how you do it.

;)

<span>Photo by <a href="https://unsplash.com/@carlevarino?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Cesar Carlevarino Aragon</a> on <a href="https://unsplash.com/s/photos/tools?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>



# Six Working Flexbox Layouts
slug: six-working-flexbox-layouts
dateCreated: 2021-01-25 22:26 CET
tags: css, flexbox
previewImage: ../flexbox-preview.jpeg

Layouting a site with CSS is initially easy. It becomes fun and more difficult when
it shall become responsive, when you have a special design in mind and when one browser
does not work as expected.  
The site [Solved by Flexbox](https://philipwalton.github.io/solved-by-flexbox/)
by [@philwalton](https://twitter.com/philwalton)
is a great resource where he shows six major use cases and describes
the solutions.  

Thanks a lot Phil, great job!

<figure>
    <img src="../flexbox-browser-support.jpeg" alt="The best, a lot of browsers are covered." width="100%" />
    <figcaption>The best, a lot of browsers are covered.</figcaption>
</figure>

[Visit: "Solved by Flexbox" it is worth it!](https://philipwalton.github.io/solved-by-flexbox/)






# CSS Preloading - Superior To Bundling?
slug: css-preloading-superior-to-bundling
dateCreated: 2021-01-24 15:54 CET
tags: HTML, preload, site speed, web, fast sites
previewImage: ../preload-preview.jpeg

Do you want to speed up CSS file loading? Do you also see this waterfall chart in the Network
Tab of your DevTools?
There is a simple measure to help the browser optimize loading assets. Preload them.  
I think it is **superior to bundling**. It is less complex and has better caching behavior.

Let's start by looking at how we used to do it.

## Before

We normally use 
```html
<!-- blog.html -->
<link rel="stylesheet" href="blog.css">
<link rel="stylesheet" href="_nav.css">
```

This loads two CSS files, which might look like this:

```css
/* blog.css */
@import "../_global.css";
@import "../_nav.css";

/* _global.css */
@import "./_vars.css";
@import "./_reset.css";
```

They causes the network view to show this graph and clearly shows that loading one file
results in loading more files. Even though we actually know what other files will need to be loaded.

<figure>
    <img src="../preload-1.png" alt="Preload waterfall, not ideal" width="100%" />
    <figcaption>Preload waterfall, not ideal</figcaption>
</figure>

Let's optimize loading the CSS files.

## After

Preloading the assets is as easy as adding a couple of lines in your site's `<head>`.
In the above example we can preload like this:
```html
<link rel="preload" href="/_vars.css" as="style">
<link rel="preload" href="/_reset.css" as="style">
<link rel="preload" href="/_global.css" as="style">
<link rel="preload" href="/_nav.css" as="style">
```

and it will result in a network graph looking like this:

<figure>
    <img src="../preload-2.png" alt="Preloading all CSS files. No waterfall. Ideal." width="100%" />
    <figcaption>Preloading all CSS files. No waterfall. Ideal.</figcaption>
</figure>

## Superior to Bundling - Why?

It brings **less complexity**. Bundlers themselves are complex tools. You can drops them
completely for the CSS part of a site by leveraging preloading. You might want to
generate the preload-tags if manual maintanence is a burden. For this site I am sticking to
manually building them. It's not worth the effort (yet).

The browser can **optimize caching** of small files, instead of a big bundled CSS file.
If you deploy multiple times a day you can prevent the customer to have to download a new
bundle every time they visit the site. Using this approach files like `_vars.css` or `_reset.css`
may not change as often as others, so the browser won't need to reload them, and even less
a big bundled CSS file.

## Details

On MDN the article 
[Preloading content with rel="preload"](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content)
describes how and what can be preloaded in way more detail.





# docker-compose and Export $PATH
slug: docker-compose-and-export-path
dateCreated: 2021-01-08 17:02 CET
tags: docker, tools, docker-compose, containers
previewImage: ../export-path-preview.jpeg

[All my projects use docker-compose](/tidbits/2021/01/docker-vs-docker-compose/).
In my setup I want every nodejs packages that provides an executable, such as `mocha` or `tsc`
to be available globally on the command line.

So I can type
```shell-session
$ mocha
...
```

I don't want to have to type the long version:

```shell-session
$ ./node_module/.bin/mocha
...
```

## How to Expose nodejs Executables?

I don't want to `cd` into the project directory
and call the executable via `./node_module/.bin/mocha` or `./node_module/.bin/tsc` from there.
I can set this up by extending my machine's path like this `PATH=$PATH:./node_modules/.bin`.

The [according `Dockerfile`](https://github.com/wolframkriesing/site-stitcher/blob/944038f503d8ae47c12de1982141dc8d9df6937a/Dockerfile#L3) looks like this:
```dockerfile
FROM node
ENV PATH=$PATH:./node_modules/.bin
```

## Define Path Export in docker-compose

I was searching the [docker-compose docs](https://docs.docker.com/compose/compose-file/compose-file-v3/) but I could not find how to add a path to the existing path
inside a docker-compose setup. The typical docker-compose setup is stored in a `docker-compose.yml`
file and for nodejs it might look like this (very simplified):
```yaml
version: '3'
services:
  picostitch:
    image: nodejs
    ports:
      - "5000:5000"
    volumes:
      - '.:/app'    
```
see the [complete file running this blog, here](https://github.com/wolframkriesing/site-stitcher/blob/76ba1541673a156d5cd944241ea7f29200fffeb5/docker-compose.yml).

In a docker-compose you can configure (multiple) services. The one I need here is `picostitch`, which is
just a simple nodejs container, it exposes the port 5000 and maps the local directory `.` into the container
under `/app`.

Beside `ports`, `volumes` docker-compose also provides `environment` where one can define environment variables
to be set inside the running container. But I did not find a way to export a path.

## Use docker-compose's `build` Option

In this case I used the `build` option, which takes a directory where it looks for a `Dockerfile`, in which I set the 
path accordingly.
```yaml
version: '3'
services:
  picostitch:
    build: .
```

In the end I do use exactly the `Dockerfile` as mentioned above, so **docker-compose** can use it to build
my **picostitch** service.

```dockerfile
FROM node:15
ENV PATH=$PATH:./node_modules/.bin
```

See the [files in the repo](https://github.com/wolframkriesing/site-stitcher/tree/944038f503d8ae47c12de1982141dc8d9df6937a);

## Multiple Containers

When I have multiple containers that need a customized Dockerfile, I create a directory `docker-files/<service-name>`
where I put the `Dockerfile` in each directory. **docker-compose** also needs that for building the image in that
directory and use it as it's context.





# Docker vs. docker-compose
slug: docker-vs-docker-compose
dateCreated: 2021-01-08 12:14 CET
tags: docker, docker-compose, tools, containers, project setup
previewImage: ../docker-compose-preview.jpeg

After clarifying why [I use Docker for every project I set up](/tidbits/2021/01/why-i-use-docker-for-every-project/)
let me try to clarify also: **Why would I use a docker-compose setup over a single Dockerfile setup?**
I had been doing the single Dockerfile setup for quite a while. 
I was doing a lot of manual work, that made the setup work. But I don't regret it, it taught me a lot!
But that was not sustainable, and it didn't scale.

## How I Automate every Projects' Setup

My setup with one docker container always contained a [`run.sh` file](https://github.com/wolframkriesing/site-stitcher/blob/76ba1541673a156d5cd944241ea7f29200fffeb5/run.sh),
and a `Dockerfile`.
The `run.sh` file grew over time and taught me a lot of bash, but docker-compose does all I need without any bash scripting. 
More about that in a bit. 
The `run.sh` had the following purposes:
1. **start and enter a container** - via `./run.sh bash` I built, started, entered a container and landed on the command line inside that container
1. **enter a running container** - the above command also detected if a container was already running and just entered it, 
   basically opening a second shell inside the container (via `docker exec`)
1. **build the image on demand** - when I changed the `Dockerfile` (the definition of the container) docker needs to rebuild
   the container, my `run.sh` did this (more or less well) on demand
1. **configure the docker runtime** - when running a docker container you might need to expose a port (for a web server running inside the container)
   or you need to map a folders into the container, so you can work with the files inside the container.
   All these things were inside my `run.sh`.

## docker-compose ftw
   
Long story short: docker-compose does all that. A bit different, maybe not as convinient, but in a standardized and 
consistent way. Additionally docker-compose does it for any number of containers!

For using `docker-compose` I use [this `docker-compose.yml` file](https://github.com/wolframkriesing/site-stitcher/blob/76ba1541673a156d5cd944241ea7f29200fffeb5/docker-compose.yml).
All things I configured in my `run.sh` before are in this file. 
Using `docker-compose` I do the above like this:
1. **start and enter a container** - this needs two commands with `docker-compose`, 1) `docker-compose up -d` starts
   the container(s) in the background and 2) `docker-compose exec <name> bash` opens a bash in the container with `<name>`
1. **enter a running container** - just like before, `docker-compose exec <name> bash` opens a bash in the container with `<name>`
   the `<name>` is defined in the `docker-compose.yml` file as the service's name
1. **build the image on demand** - `docker-compose build` this builds all docker containers as needed,
   `docker-compose build --pull` will try to find newer docker images, e.g. when you just used the image "node"
1. **configure the docker runtime** - all the configuration of mapping ports or volumes are done in the
   `docker-compose.yml` file, normally located at the root of the project's directory.
   
In the [README.md](https://github.com/wolframkriesing/site-stitcher/tree/5381c9776c265e48d6f903f5019f02d9b64cda6c#develop-run-locally)
I also described how I am using `docker-compose` for this project.

## Finally

I am quite happy with that setup now. Every project works the same.
I am thinking of using the same name "app" for the main container, so I can always do
`docker-compose exec app bash` to enter the app (or main) container.
This could make it even more unified and easier.
The [`docker-compose.yml` file](https://github.com/wolframkriesing/site-stitcher/blob/76ba1541673a156d5cd944241ea7f29200fffeb5/docker-compose.yml)
I use for this site the container is called "picostitch" right now, which I need
to know. Not as ideal as using "app" every time.




# Why I Use Docker for Every Project
slug: why-i-use-docker-for-every-project
dateCreated: 2021-01-08 10:13 CET
tags: docker, tools, containers
previewImage: ../docker-preview.jpeg

I used to install everything on my machine. I used to have ruby, nodejs, python, java, rebol, red
and all the programming languages and environments, their packagers and tools I needed installed
on my machine. It was heaven. Except for the moment when I had to install a new tool, that needed
a newer version, and the old ones might broke and then I had to choose or reinstall every time, switch to
rvm, nvm, pyenv or something else. For a while vagrant was cool.

Finally, I settled with docker.

## The itch

I am working with nodejs for some years now. I worked in projects with many packages which we maintained. 
We had linked the packages and worked on many of them in parallel. 
Eventually the globally installed nodejs, even via nvm became a hazzle and
caused bugs and glitches that consumed so much time, that I needed to scratch this itch.
But that was not enough yet, I didn't fix it then. I also didn't know how.

Another eye opener for me was when I came back to a project years later which had no reproducable environment
set up anywhere, that can run the project. I didn't even know which node version it had used, which npm version and
how to run the project (docs were missing too, right).
Even worse and more impactful, working in a team or company that has many projects and
environments running. Each project needs to be installed on my machine. The worst and most time consuming
I had until now was setting up a ruby environment just for running some CSS pre-processor, back in the days.
I think I spent two days to get all the versions right and the CSS pre-processor to run.

## Docker to the Rescue

The **reproducability** and the **isolation** of the environments are the main reasons why I started
using docker, after a short detour to nixpkgs, where the UX made me fail.

With docker I need two dependencies, the docker runtime and docker-compose and I can install
any package or setup, even a complex setup, in a way that even any colleague can get it up and running
in minutes. The most important part is that **it will create the same environment and no hidden, lingering side-effects**
caused by a tiny difference or alike that will cost a lot more time some time later.
Ok, there are flaws to docker, there are side-effects and issues, but way less compared to not using it.

See [my repo site-stitcher](https://github.com/wolframkriesing/site-stitcher#develop-run-locally)
for an example of how I am using it for generating this website
and read in [docker vs. docker-compose](/tidbits/2021/01/docker-vs-docker-compose/)
about which I chose.

## More

If you like to go deeper and ensure that even this setup is tested and wont break when you update your `Dockerfile`
I even gave a talk on how to [TDD your next docker container](https://www.youtube.com/watch?v=ZSLQ02vpZUg).
