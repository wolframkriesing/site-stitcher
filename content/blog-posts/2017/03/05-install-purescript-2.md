dateCreated: 2017-03-05 22:15 CET  
postTypes: post  
tags: purescript, notes, yarn, npm, nodejs  
oldUrls: /blog/2017/03/install-purescript-2/  

# Purescript #2 - Installing

This post is my 2nd write-down inspired by ["Purescript by Example"][ps-book],
the book by [Phil Freeman][phil-freeman], the author of purescript.
Now about chapter 2, where I install Purescript and touch the tools
for the first time. I am gonna use `yarn` instead of `npm`,
let's see how that goes :).

[ps-book]: https://leanpub.com/purescript/read
[phil-freeman]: https://twitter.com/paf31

## Preparation

This post builds up on *"[Purescript - the semantics of JavaScript with types #1][ps-#1]"*
where I tried to put Purescript into perspective and explain what it is
and where it comes from. All the knowledge in here is based on the book mentioned
above and some playing around. The book is also the anchor point for me for
this series of posts around Purescript.

In order to get Purescript up and running, you need to have nodejs and npm
installed. Well, I assume if you landed on this blog for some strange reason,
you either know how to do that or have it installed already. So let's go.

Before we get started. In order to not having to install all npm packages globally, I
normally prefer to keep all dependencies local to the current project.
[Globally installed npm packages are evil.][npm-global-post] Period.
And to make working with local packages easier I have the following in my environment setup.
```shell
> export PATH=$PATH:./node_modules/.bin
```
This makes the executable of any package installed locally in the current
npm project executable just by typing the executable name. Ha? What?
An example: instead of having to type `./node_modules/.bin/psc` to execute 
the `psc` executable I can just write `psc` since I had added 
`./node_modules/.bin` to the PATH where executables are searched for.

And: I am going to use [yarn] instead of [npm] to install Purescript. Why?
Just because I can. And I need to practice a bit, why not
learn two things at a time :).

## Install the Purescript compiler

I create a directory `purescript-series` which will become a npm-package (or yarn package)
where all the Purescript stuff gets installed into.
```shell
> mkdir purescript-series
> cd purescript-series
> yarn init
# ... many lines later
success Saved package.json
✨  Done in 5.66s.
```
Now the directory is a proper package, where I can install stuff into.
After having been reminded, that yarn is is growing up and now has it's own language
``` `install` has been replaced with `add` ```, I got Purescript installed, like so:  
NOTE: If you still prefer installing it globally, use
[*`yarn global`*][yarn-global] instead of `yarn` for running yarn commands.
```shell
> yarn add purescript --save # "--save" stores this dependency in package.json
yarn add v0.15.1
# ... many lines later
✨  Done in 4.40s.

> psc # Trying out the executable we have installed
psc: No input files.
```
Ok, `psc` the Purescript compiler is installed. Before I am going to use it a short reminder.
Let's inspect where the `psc` command comes from:
```shell
> which psc
./node_modules/.bin/psc
```
Aha, it comes from the current package's `node_modules` directory. Just as
I configured it before (remember I enhanced the `PATH` environment variable).  
So, what can I do now, with Purescript, the `psc` executable?
```shell
> psc --help
psc - Compiles PureScript to Javascript

Usage: psc [FILE] [-o|--output ARG] [--no-tco] [--no-magic-do] [--no-opts]
           [-v|--verbose-errors] [-c|--comments] [--source-maps] [--dump-corefn]
           [-p|--no-prefix] [--json-errors]

Available options:
  --version                Show the version number
  # ...snip...
  FILE                     The input .purs file(s)
  # ...snip...
  -c,--comments            Include comments in the generated code
  # ...snip...

psc 0.10.7
```
We already see the current version
on the last line of the help output, no need to try out `psc --version` again, we won't
be surprised :).

The Purescript compiler takes a `*.purs` file and compiles it into JavaScript code and
the file lands in the directory `output/`. So let's do it.

## My first Purescript program

I am going to create a file `src/Main.purs` and put the simplest working
source code in there, that I was able to come up with.
```shell
> mkdir src
> echo "module Main where" > src/Main.purs
> psc src/Main.purs 
Compiling Main
```
I have just written my first Purescript file and compiled it.
Let's look at it in detail. The Purescript file `src/Main.purs` contains only
the minimal thing needed:
```text
module Main where
```
Nothing more! It compiles without any error and warning. Hip hip Hurray!
But it also doesn't really do much. Though it will show us what the compiler
produces from our source code. The resulting source code is what I want to see. 
As said before, it lands in the directory `output`:
```shell
> cat output/Main/index.js
// Generated by psc version 0.10.7
"use strict";
module.exports = {};
```
I want a little bit more. Actually I would want a hello-world, but printing out
something requires a bit more work, since that is a side-effect and in Purescript
this is done via monads (if I got all the things right :)) which is something 
I will cover a bit later, the earliest when I understand them properly in order
to explain them properly here (let's see when that is the case).

From the book I understand that `main` is kinda like the default program.
That's why I will extend my compiling source code to contain the following code
to at least return a "hello world" (and not output it yet).
I will try it by simply assigning a string to the variable `main`.
`Main.purs` looks like this now
```text
-- src/Main.purs (this line is a comment, started by `--` in purescript)
module Main where

main = "hello world"
```
I would expect this now to provide `main` in the `exports` as string
containing "hello world". Let's see if this compiles something that looks like
that.
```shell
> psc src/Main.purs 
Compiling Main
Warning found:
in module Main
at /Users/wk/purescript-series/src/Main.purs line 4, column 1 - line 4, column 8

  No type declaration was provided for the top-level declaration of main.
  It is good practice to provide type declarations as a form of documentation.
  The inferred type of main was:
          
    String
          
```
Oh, a warning. Tbh I kinda was waiting for that, since in a strictly typed language
the `main = <a string>` could do it via type inference but that is an external interface
and in order to "know" the type of the program it should have a proper signature, I assume.
And the [docs also state][toplevel-signature] 
*"Type signatures are not required for top-level declarations in general, but is good practice to do so."*
so my gut was not wrong :). But let's look at the output anyways.
```shell
> cat output/Main/index.js 
// Generated by psc version 0.10.7
"use strict";
var main = "hello world";
module.exports = {
    main: main
};
```
And there it is. The variable `main` gets exported in [CommonJS][commonjs] style
which means the compiled file could now be required and used by any normal
commonjs compatible file, such as a nodejs script. Wow, this opens up quite
some possibilities I would say.  
Possibilities? Well, as mentioned in [#1 of this series][ps-#1] we could just
write part of our application (or our tests) in Purescript which we then
import wherever we need to.

## Adding my first type annotation

The warning up there, is still a bit bothering me a bit. Looking up how to add typing to
the code, I quickly found out that the right thing to do is:
```text
-- src/Main.purs (this line is a comment, started by `--` in purescript)
module Main where

main :: String
main = "hello world"
```
Compiling the file and outputing the result is as expected, no error and the 
same JavaScript source code as before. Good.
```shell
> psc src/Main.purs 
Compiling Main
> cat output/Main/index.js 
// Generated by psc version 0.10.7
"use strict";
var main = "hello world";
module.exports = {
    main: main
};
```
Reading a bit in the Syntax docs I read that [type annotations][type-annotations]
can also be done right on the value by adding `::` after it. So let's rewrite the code
to annotate the string with the type, instead of the variable `main`
```text
main = "hello world" :: String
```
Perfect, this compiles and results in the same expected code.

## Whitespace matters

While reading about the Purescript syntax I saw that [whitespace matters][whitespace-rules]. Which
reminded me of two languages Python and Red. In Purescript whitespace matter for
e.g. for multiline declarations, best to be explained by an example:
```text
-- valid
main = 
  "hello world"
```
this compiles without an error. Just as I understood it from the syntax docs.
```text
-- invalid
main = 
"hello world"
```
When compiling this it fails like this:
```shell
> psc src/Main.purs 
Error found:
at /Users/wk/purescript-series/src/Main.purs line 6, column 1 - line 6, column 1

  Unable to parse module:
  expecting indentation past column 1
```

Enough learnings for now.  
Next we will look at [`pulp`][pulp-github] a Purescript build tool, written by [Bodil] it seems,
at least it on github under her account. So I guess she had kicked it off.


[ps-#1]: /blog/2017/03/starting-with-purescript/
[npm-global-post]: /blog/2015/03/globally-installed-npm-packages-equals-evil/
[yarn]: https://yarnpkg.com/
[npm]: https://www.npmjs.com/
[yarn-global]: https://yarnpkg.com/en/docs/cli/global
[commonjs]: https://en.wikipedia.org/wiki/CommonJS
[type-annotations]: https://github.com/purescript/documentation/blob/master/language/Types.md#type-annotations
[whitespace-rules]: https://github.com/purescript/documentation/blob/master/language/Syntax.md#whitespace-rules
[Bodil]: https://twitter.com/bodil
[pulp-github]: https://github.com/bodil/pulp
[toplevel-signature]: https://github.com/purescript/documentation/blob/master/language/Syntax.md#top-level-declarations

related_tweets:

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="en" dir="ltr">I installed <a href="https://twitter.com/hashtag/Purescript?src=hash">#Purescript</a> using <a href="https://twitter.com/hashtag/yarn?src=hash">#yarn</a> and wrote my first script that compiles :) read about how =&gt;   <a href="https://t.co/BMiizTD3fQ">https://t.co/BMiizTD3fQ</a></p>&mdash; pico stitch (@wolframkriesing) <a href="https://twitter.com/wolframkriesing/status/838698426929860608">March 6, 2017</a></blockquote>
<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="en" dir="ltr"><a href="https://twitter.com/wolframkriesing">@wolframkriesing</a> you can also install purescript using yarn at the global level. It&#39;s working for our team.</p>&mdash; Sudhir Kumar ⚛ (@sudhirvkumar) <a href="https://twitter.com/sudhirvkumar/status/838810514897702912">March 6, 2017</a></blockquote>
<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="en" dir="ltr"><a href="https://twitter.com/wolframkriesing">@wolframkriesing</a> thanks for the blog. We need more blogs to promote PureScript.</p>&mdash; Sudhir Kumar ⚛ (@sudhirvkumar) <a href="https://twitter.com/sudhirvkumar/status/838810635001528320">March 6, 2017</a></blockquote>
