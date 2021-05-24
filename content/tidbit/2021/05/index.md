# Learning ReScript - Part 1 (Intro and Setup)
slug: learning-rescript-part-1  
dateCreated: 2021-05-22 17:31 CET  
tags: ReScript, JavaScript, typed language, typing, learning  
previewImage: ../rescript-dark.gif  

Finally I am taking the time to learn [ReScript](https://rescript-lang.org/).
Follow me on my journey and read how I approach it, mixed with some of my opinions
and experiences.

## Contents

1) [What is ReScript?](#what-is-rescript)
1) [Installation](#installation)
1) [Not Buildless](#not-buildless)
1) [Running the Compiled JavaScript](#running-the-compiled-javascript)
1) [Commit the Changes](#commit-the-changes)
1) [To be Continued ...](#to-be-continued-)

## What is ReScript?

Here is my answer.  
JavaScript is amazingly flexible, but has short comings when it comes to big
projects, complex structures, growing team sizes and growing code bases.
Types have proven over time to be helpful. Tests are helpful too, but that is
nothing that ReScript helps with, besides maybe reducing the need for a couple
of tests.

ReScript rejects all incorrect programs (it is [sound](https://en.wikipedia.org/wiki/Type_system#Static_type_checking)). 
It is a typed-first language<sup>[1]</sup> that compiles to JavaScript.
It's designed from types and not mounted on top of JavaScript. It compiles
to JavaScript, so it needs at least one compile step to be run.

1) ReScript is a language that [compiles to JavaScript](https://rescript-lang.org/docs/manual/latest/introduction#preservation-of-code-structure).  
1) [The type system is "sound", the types will always be correct.](https://rescript-lang.org/docs/manual/latest/introduction#difference-vs-typescript)
1) ReScript promises to look and act like JS (I have to figure this out), [try here](https://rescript-lang.org/try).  
1) ReScript was previously known as BuckleScript and Reason, [until August 2020](https://rescript-lang.org/blog/bucklescript-is-rebranding).

<sup>[1]</sup> I wrote "typed-first language" above. As far as I know this is not
a commonly used term, I just made it up (maybe it exists already, no idea).
What I mean is, that this is a language that was created with types in mind at creation
time. Things like exhaustiveness, soundness, preventing any-types and alike things that
make a strong typed language powerful and prevent the bugs that untyped languages
may come with, are baked in from the beginning. 
No worries, therefore one can learn to make new mistakes ;).    
Languages or type systems like flow or TypeScript have to deal with baking it onto the
language, so they have to handle the complexity of the underlying language, JavaScript.  
That's why I would name ReScript typed-first.

## Installation

On the [docs install page](https://rescript-lang.org/docs/manual/latest/installation) 
it's suggested to clone an existing repo and
go from there. I prefer to follow the instructions how to set up my own repo
and add ReScript from scratch, if you also want to do that, follow the next chapter of the docs,
[the integration guide](https://rescript-lang.org/docs/manual/latest/installation#integrate-into-an-existing-js-project).

It basically just takes:
1) `npm init --yes` - set up a npm project (`--yes` means: answer all questions with "yes")
1) `npm install rescript --save-dev` - install rescript as a development dependency
1) **create a bsconfig.json** file, as [described in the docs](https://rescript-lang.org/docs/manual/latest/installation#integrate-into-an-existing-js-project)
1) **create a source directory**, e.g. via `mkdir src`
1) throw our **first ReScript code** in there, e.g. `hello.res` with the content
    `Js.log("Hello World")`, my first piece of correct and working ReScript, ever 
1) **build it by running `rescript`**, which creates a `hello.bs.js` (the "bs" comes from the previous name bucklescript, I guess)  
1) **run it** with `node src/hello.bs.js` throws `"SyntaxError: Unexpected token 'export'"`, of course because
  it's a proper ECMAScript module (esm), FAIL, yeah - now what?
  
The resulting JavaScript is the following:
```js
console.log("Hello World");
export {
}
```

This is ES6 syntax, modern JavaScript and nodejs does not run this as is.
Let's analyze for one paragraph, what this means before diving into possible solutions,
or jump straight to the paragraph [Running the Compiled JavaScript](#running-the-compiled-javascript).

## Not Buildless

The "norm" nowadays is to install a lot of (fat) dependencies like webpack and babel to transpile and
run this tiny "hello world" program. I prefer [#buildless](https://twitter.com/search?q=%23buildless), 
working without building, bundling and any pre-processing step, run code as written.
Which is actually not very hard. Every browser can run modern JavaScript, browsers can
load JavaScript modules and, HTTP2 is quite fast with multiple files. Nodejs can handle any modern JS.
So transpiling and bundling become just fallbacks for most of the pages out there, not 
a necessity anymore.

Of course ReScript adds one build step before the code can be run. It has to be turned into
JavaScript, we have done that above. For me compiling ReScript is 
one step worth adding, one acceptable exception to the buildless.
The gain is quite substantial, compared to TypeScript, webpack, babel, which I
try to prevent adding as a requirement to a project's pipeline.
But let's come back to ReScript, the "buildless" is a topic of it's own.

## Running the Compiled JavaScript

For JS resulting out of the compilation of the ReScript code 
the easiest is adding `"type": "module"` to the package.json
which indicates to nodejs that all the files in this package are modern JavaScript, ECMAScript
modules (esm). Running it via `node src/hello.bs.js` now outputs "Hello World".
Assuming this project is all ReScript this is fine I think. The `type=module`
does not play too well with non-esm packages, 
which is the case for most JS packages out there, still, sadly.

Another way to run this script without changing the package.json is 
```
node --input-type=module -e "`cat src/hello.bs.js`"
```
which tells nodejs to interpret the code as modern JS code using the module syntax
that the compiled file contains,
for that we `cat` the code into the node interpreter via `-e`.
I guess I never did this before like this. This might not be a way to go.
With multiple files it might also become quite cumbersome, but feel free to take it further.

Another way, especially useful when there will be some dependencies that are
not esm can be to `npm install esm` and run `node -r esm src/hello.bs.js`.
This will transpile esm code on the fly. It's quite handy and simple, causing basically no headaches (until now).
I am using this in a number of places, because the first solution is not so handy
with non-esm dependencies.

## Commit the Changes

One step done. Though the execution is not automated yet, for me this is
worth to commit this into [the repo](https://codeberg.org/wolframkriesing/rescript-learning-commit-by-commit). 
Before doing so, when looking at the diff, I see that a `lib` directory
was created with a lot of stuff I don't know about. I guess ReScript was doing that.
So I am adding `lib` to [my `.gitignore` file](https://codeberg.org/wolframkriesing/rescript-learning-commit-by-commit/src/branch/main/.gitignore).
And there is a `.merlin` file, does this have something to do with magicians?
I guess not, ReScript just adds things in places. I will commit this file too.
I don't know yet if this is a good idea or not.

Also I am adding the `*.bs.js` files to the `.gitignore`, in the end these are 
compiler's results.

Committing now ([see the code at this point in time](https://codeberg.org/wolframkriesing/rescript-learning-commit-by-commit/src/commit/a920f856fd913d34ba93a3d4d7e1685ae99f298a)).

## To be Continued ...

Read how I start automating, follow the docs
and explore the executables in 
[Part 2](../learning-rescript-part-2).








# Learning ReScript - Part 2 (rescript command)
slug: learning-rescript-part-2  
dateCreated: 2021-05-22 22:36 CET  
tags: ReScript, JavaScript, typed language, typing, learning  
previewImage: ../rescript-cutout.gif  

In [Part 1](../learning-rescript-part-1) I started with ReScript,
I set up [a project](https://codeberg.org/wolframkriesing/rescript-learning-commit-by-commit) 
and made my first steps, got it running.  
Now I want to learn more and get to the point where I have a feeling for how to use ReScript, 
lets see where it takes me. I guess it will take me more than this "Part 2" post to be
comfortable to start a project with ReScript.

## Automate Building and Running

I want to have one command that builds the files and runs them, e.g. `npm start` or `npm run build` or alike.
Best would be of course, that it does that continuously in the background.

Before automation that I like to understand how to compile and run the compiled file.

## The `rescript` CLI Command

Until now running `rescript` did the compilation. It generated the `hello.bs.js` file in the
same directory as where the `hello.res` file is located, in `src/`.

For me the rescript command is still a black box. I don't want to understand it down to the
implementation (yet), but I want to know it a bit better. What can it do? Am I using it right?
Why do I just call `rescript` and not e.g. `rescript compile`?
So I let `rescript` tell me what it can tell to help me, via `rescript --help`.
```shell-session
# rescript --help
Unknown subcommand or flags: --help
Available flags
-v, -version  display version number
-h, -help     display help 
Subcommands:
    build    
    clean
    format
    convert
    help
Run rescript subcommand -h for more details,
For example:
    rescript build -h
    rescript format -h
The default `rescript` is equivalent to `rescript build` subcommand
```

Very interesting first thing, that actually makes me a bit suspicious is
"Unknown subcommand or flags: --help". I thought it was a standard for CLI commands to support `--help`.
Is ReScript going a bit offroad here, or am I not up to date? Sounds like I want to read a little bit
more about command line interfaces. I get the feeling there are many camps, and ReScript joined the one
that supports `-h`, which feels kinda like Windows-style to me, but I am not an expert here.
Unsurprisingly this line goes away when running `rescript -h`. Ok.

Another question gets answered when I read the help instructions to the end

> The default `rescript` is equivalent to `rescript build` subcommand
 
Now I know that `rescript` is just an alias to `rescript build`, which I would have expected
to be `rescript compile`. Fine. Learned it. So I will stick to the more explicit `rescript build`, 
because I would have expected `rescript` to rather open a 
[REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop),
where I can play with the
language, just like python or nodejs do. Since it does not do that, I prefer explicitly writing
`rescript build` so I confuse less, the one person that would expect the same as me behind `rescript`.

## Build and Run

Ok, let's sum up. For compiling I use `rescript build` and for running `node src/hello.bs.js`.
To run the code and interactively try if changes work I run:
```shell-session
# rescript build && node src/hello.bs.js 
Hello World
```

For now I do this after every change. I prefer to "feel" the execution for some time
until I get a good feeling what, if and how I want it automated. Until then I prefer one more
click that I need to run my modified code.

Now that I am ready to explore the actual language a bit more, let me do so.
I will start continuing through the docs,
under Language Features, which is the next big chapter the first one 
[Overview](https://rescript-lang.org/docs/manual/latest/overview)
which I did not find so useful, it's more a cheatsheet that might come in handy later.
I jump to 
[Let Binding](https://rescript-lang.org/docs/manual/latest/let-binding).

## First Language Learning - Let Binding

First sentence reminds me that learning and especially using the right terms
in the according community is always important, here it starts with
> "let binding", in other languages, might be called a "variable declaration"

I guess I have seen this in languages like Haskell or PureScript. Ok, "let binding" it is.
And I felt I had become good with using the terms that JavaScript land is using.
Now I need to connect a new map to this knowledge. Brain, go and work!

The first refactoring I do is introduce a let binding:
```rescript
let helloWorld = "Hello World"
Js.log(helloWorld)
```

see the [according commit](https://codeberg.org/wolframkriesing/rescript-learning-commit-by-commit/commit/ef269a3727b80c413efa716a428f0cf2ef61ef10).

Running it has no suprises for me. It prints as above.

## Block Scope

Next on the [Let Binding](https://rescript-lang.org/docs/manual/latest/let-binding)
page is "Block Scope". Ha, something I know from JavaScript.
And it works a lot like JS, fulfilling the promise of ReScript "look and act like JS".
Cool.

So [I introduce a block around my code](https://codeberg.org/wolframkriesing/rescript-learning-commit-by-commit/commit/c850bc0efd2f680084cd6d77dcf8e9f0f352a006).
```rescript
let printHelloWorld = {
  let helloWorld = "Hello World"
  Js.log(helloWorld)
}

printHelloWorld
```

I had started writing `printHelloWorld()` on the last line first, because I was a bit
confused. Until [much later I figured out](https://codeberg.org/wolframkriesing/rescript-learning-commit-by-commit/commit/e53232480aa03efeb221a54c2e0040b966446f37) 
that the code I wrote was acutally not really
that useful in the sense I intended. I thought on the last line I call this block.

At the time of writing this post (so after I had written the code and commited it)
I know that the block is executed and the value of the last line is returned,
and therefore the value of `printHelloWorld`,
in this case the `Js.log()` call's return value. I don't even know what's its value.

Still, the variable `helloWorld` is only available inside the block, which is surrounded
by the curlies, `{` and `}`.

I like to go even one further and, just like in JS, write
```rescript
{
  let helloWorld = "Hello World"
  Js.log(helloWorld)
}
```

Which seems useless, but it is basically creating a block scope around this code,
so no let binding (lets use the new terms) is accessible outside of it.
Want proof? Here it is, the code:
```rescript
{
  let helloWorld = "Hello World"
  Js.log(helloWorld)
}
Js.log(helloWorld)
```

fails already at compilation time:

```shell-session
# rescript build
rescript: [1/1] src/hello.cmj
FAILED: src/hello.cmj

  We've found a bug for you!
  /app/src/hello.res:5:8-17

  3 │   Js.log(helloWorld)
  4 │ }
  5 │ Js.log(helloWorld)

  The value helloWorld can't be found

FAILED: cannot make progress due to previous errors.
```

I would say this proves that the curlies work for building a block.

## Shadowing

In the current docs chapter there are a lot more details about private let binding,
shadowing and others. It might be interesting to read through them once, but 
they seem not that interesting to me right now. 

Especially the shadowing, which
is kinda re-binding a variable, e.g. like so `let x = 1; let x = x + 1`.
This is valid ReScript, but it is not recommended and feels like I want to forget
about it right away. I would even prefer if I could turn it off.

## Make it a Module

In the next commit [I wrap all the code into a module](https://codeberg.org/wolframkriesing/rescript-learning-commit-by-commit/commit/e46b8fe8621a662d6e9fa90ead9e00c9369b1bc5)


## Formatting




## Going Through the Docs

After I finished the installation and have ReScript running, proven by the
hello.res file, its compilation and letting it run 

go through docs
next chapters are not intersting for me
so i jump to lang-features overview
but no examples or intro into using the language but a comparison to JS


## An Opinion on the Docs
The docs have quite an opinionated touch to them and, to be honest, they don't
read easy all the time. Sentences like "ReScript is the language for folks who 
don't necessarily love JavaScript, but who still acknowledge its importance."
on the [intro page of the docs](https://rescript-lang.org/docs/manual/latest/introduction)
don't make me feel as if I want this language for those reasons. I really do like
JavaScript, there is not just one language on this planet, but I also want to learn
ReScript but for different reasons.

The very opinionated "thankfully" sprinkled across the 
["Comparison to JS"](https://rescript-lang.org/docs/manual/latest/overview#comparison-to-js) page,
which I interpret (maybe wrongly) as "what a stupid language feature",
might scare off some people. Not sure if this is intentional.
I don't like it.

The [intro page](https://rescript-lang.org/docs/manual/latest/introduction),
has some glorification and subjective comparisons on it, like
"TypeScript's type system is ...", "Faster than JavaScript" and "Readable Output & Great Interop".
I am not sure this belongs in a technical language documentation.
Maybe everything there is correct, but it feels kinda like "ReScript is better",
it doesn't make me feel too comfortable reading it.

"other crazy patterns you'll soon find horrible, after getting used to ReScript's alternatives."
https://rescript-lang.org/docs/manual/latest/primitive-types#tips--tricks
They are right, no doubt.
"The more you overload the poor string type, the less the type system (or a teammate) can help you!"
