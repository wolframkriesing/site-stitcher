dateCreated: 2020-05-12 18:00 CET  
tags: javascript, typescript, typing, setup, ts4js  
previewImage: road.jpg

# TypeScript for JavaScript, Part 1 - Setup
You don't need to rename all your ".js" files to ".ts" to go all in on TypeScript, you can go gradually. 
Adopt TypeScript step by step, become familiar with it in your existing JavaScript project.
No need to put development on hold for weeks, while you convert the code base to TypeScript and fix all type errors.
Read on to see how I adopt TypeScript for JavaScript for the sourcecode of [jskatas.org].

Let's type check JavaScript files by using TypeScript.

## Contents

1. [Contents](#contents)
1. [Official Docs are Scarce on this Topic](#official-docs-are-scarce-on-this-topic)
1. [What is TypeScript for JavaScript?](#what-is-typescript-for-javascript)
1. [Why TypeScript for JavaScript?](#why-typescript-for-javascript)
1. [How to start with TypeScript for a JavaScript Project](#how-to-start-with-typescript-for-a-javascript-project)
1. [Install TypeScript](#install-typescript)
    1. [Install TypeScript Package](#install-typescript-package)
    1. [Add Npm Script for Type Checking](#add-npm-script-for-type-checking)
1. [Configure TypeScript](#configure-typescript)
    1. [Add TypeScript Confguration File - tsconfig.json](#add-typescript-confguration-file---tsconfigjson)
    1. [Configure TypeScript to Search the "src" Directory - The "include" Config](#configure-typescript-to-search-the-src-directory---the-include-config)
    1. [Make TypeScript find JS Files - The "allowJs" Compiler Option](#make-typescript-find-js-files---the-allowjs-compiler-option)
    1. [No Compiled Files Needed - The "noEmit" Compiler Option](#no-compiled-files-needed---the-noemit-compiler-option)
    1. [Report Type Errors in JS Files - The "checkJs" Compiler Option](#report-type-errors-in-js-files---the-checkjs-compiler-option)
    1. [Extend "include" Config to Find all Source Files](#extend-include-config-to-find-all-source-files)
1. [Conclusion](#conclusion)

## Official Docs are Scarce on this Topic
The TypeScript docs have one page on the topic 
[Type Checking JavaScript Files][1].
But there is a bit more to it. Thanks to [@Jan] and his project [@elix]
[I learned][7] the basics and how to apply TypeScript as a type linter on JS files.  

## What is TypeScript for JavaScript?
[I used to do a lot of][4] [Flow] to type check my JavaScript code. Meanwhile TypeScript is picking up in features,
though there are subtle differences in philosophy between Flow and TypeScript.
But TypeScript seems to be the more active project and the one getting more support
from the community (the [activity on][5] [the projects][6] seems to be on par though). 
Therefore TypeScript currently seems like a very interesting option.

I started to investigate how I can use TypeScript on existing JavaScript projects.
Why not pure TypeScript? The main reason for me was always development speed and a small dependency footprint. 
One way to achieve this is to prevent all build steps and run my code straight without 
transpiling, building or bundling, no matter if I run a browser or nodejs project. 
Depending on the TypeScript compiler to compile my files before I can run them was not an option for me.
I went a bit different path.

In the following you can see how I **set up TypeScript, as a type linter for JavaScript**, 
to type check JavaScript files.

[jskatas.org]: https://jskatas.org
[@Jan]: https://twitter.com/JanMiksovsky
[elix]: https://twitter.com/ElixElements/
[Flow]: https://flow.org/
[deno]: https://deno.land
[1]: https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html
[2]: http://www.adamsolove.com/js/flow/type/2016/04/15/flow-exhaustiveness.html
[3]: https://www.typescriptlang.org/docs/handbook/advanced-types.html#exhaustiveness-checking
[4]: https://gitlab.com/wolframkriesing/talk-flow-type-enterjs-2017
[5]: https://github.com/facebook/flow/graphs/commit-activity
[6]: https://github.com/microsoft/TypeScript/graphs/commit-activity
[7]: https://github.com/elix/elix/pull/109#issuecomment-575589440

## Why TypeScript for JavaScript?
This allows me to type-lint my code optionally. If (for whatever reason) I don't want type safety, I don't have
to worry about it. With pure TypeScript (.ts files) it is not so easy to opt out (afaik) and .ts files are not useable 
in the browser without preprocessing.

Why should I do it at all, when it is optional?
Any linter is optional too. Discipline and interest are required.
Here are a couple of reasons why I think it is valueable:
* When data structures get complex, types help a lot and I want a tool to point out my mistakes.
* When the domain language forms, I want to name things coherently across the entire project, and types help a lot with that.
* When the team grows, types are more expressive and help staying aligned.
* [Exhaustivness checks][3] create safety and prevent bugs.
* Type checking makes me think about the architecture more, even if I type the code afterwards.

## How to start with TypeScript for a JavaScript Project
When I started applying TypeScript to JavaScript files I had a couple simple rules:
1. **JavaScript files stay JavaScript**. Prevent bloat of types mangled into JavaScript syntax.
   JavaScript can be hard to read already without types in it.
1. **I want to be able to stop and go back, any time** - I didn't want to get stuck with a half typed solution 
   that stops any development on the code.
1. **No extra compile/transpile step**.
1. I want to **add type checks where needed**. If all files get type checked eventually, 
   cool, but that's not a must.
   
I need a way to add the type hints and the code to stay pure JavaScript.
[Type hints can be added via comments](https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html#supported-jsdoc). 
For example a function can be annotated with types like this:
```javascript
/**
 * @param data {PlainObject}
 * @return {string}
 */
const renderTidbitPage = (data) => {}
```
Where `PlainObject` is a custom type (find the [real code here](https://github.com/wolframkriesing/site-stitcher/blob/2a208630d4e49147fb4a527788a01f69f3b84d56/src/render-tidbit/render-page.js#L27-L37)).
TypeScript will pick up these type definitions and understand them.
All JavaScript code will stay Javascript code.

Let's start adding and configuring TypeScript to jskatas.org code base.
It should be very easy to adapt this to any project at any stage.
No matter if you have just started or if you have a years old code base, add type checks in the here described way
will not hinder you to continue work on the code base. That is also always one of my goals, as listed above.
I want the code to become better every day and sometimes type checking certain files will improve it.

## Install TypeScript
Let's start installing TypeScript using npm.

### Install TypeScript Package
Start with `npm i typescript --save-dev`. We don't need typescript during production,
so at it only to the devDependencies using `--save-dev` or `-D`.

<figure>
    <img src="./install-typescript.gif" alt="diff in package.json of installed typescript." width="400" class="sizeup-onhover-image scale2 origin-left-top" />
    <figcaption>The diff in the package.json of installed typescript.</figcaption>
</figure>

This is [the commit on the jskatas.org repo](https://github.com/wolframkriesing/jskatas.org/commit/d5c714565526cc88feb6612fa0f7b49aae5d1b2d).

Running `tsc` (the executable for typescript) now does nothing useful with our source code yet,
it just lists all its options.

```shell
> ./node_modules/.bin/tsc
Version 3.8.3
Syntax:   tsc [options] [file...]

Examples: tsc hello.ts
          tsc --outFile file.js file.ts
          tsc @args.txt
          tsc --build tsconfig.json

Options:
 -h, --help                                         Print this message.
 -w, --watch                                        Watch input files.
 --pretty                                           Stylize errors and messages u
...
```

### Add Npm Script for Type Checking
I added a npm script `npm run typecheck` which is just an alias for `tsc`
([see the commit](https://github.com/wolframkriesing/jskatas.org/commit/11d1fde4673b9204792212fa7d2c98160ad92dcf)).
Additionally `npm run dev:typecheck` runs tsc in watch mode (I prefer to prefix my dev scripts with `dev:`).

<figure>
    <img src="./add-typecheck-script.gif" alt="The git diff for the npm script `typecheck` which runs tsc." width="400" class="sizeup-onhover-image scale2 origin-left-top" />
    <figcaption>The git diff for the npm script `typecheck` which runs tsc.</figcaption>
</figure>

Still nothing happens yet in regards to type checking, tsc is just not yet configured.
Let's configure tsc, by adding a `tsconfig.json`.

## Configure TypeScript
Having installed tsc (the TypeScript executable) it needs to be configured.
Let's do it step by step.

### Add TypeScript Confguration File - tsconfig.json
TypeScript's configuration goes into a file `tsconfig.json` normally located in the root of the project
([commit](https://github.com/wolframkriesing/jskatas.org/commit/2a9bbcd7182295c7074bb1662e915a4af00df71b)).
It is a JSON file, so I add the most minimal JSON in it `{}`.

<figure style="display: inline-block">
    <img src="./empty-tsconfig.gif" alt="Empty 'tsconfig.json' file." width="150" class="sizeup-onhover-image scale2 origin-left-top" />
    <figcaption>Empty 'tsconfig.json' file.</figcaption>
</figure>

I just added an empty `tsconfig.json`. Which gets me a step futher. I am a fan of baby steps,
this way I learn bit by bit the effect of every change. I prefer this over throwing a huge config in my
project which does a zillion things that I did not anticipated. They gonna kick back eventually.

Running the type check now gives us a hint what to do next.
```
> npm run typecheck

> jskatas.org@2.0.0 typecheck /app
> tsc

error TS18003: No inputs were found in config file '/app/tsconfig.json'. Specified 'include' paths were '["**/*"]' and 'exclude' paths were '[]'.
```

I will do exactly this next.

### Configure TypeScript to Search the "src" Directory - The "include" Config
Let's start including all JS files from our `src` folder, by 
<morehtml-tldr>adding the one line `"include": ["src/*.js"]` in the `tsconfig.json`</morehtml-tldr> 
([commit](https://github.com/wolframkriesing/jskatas.org/commit/527c05f5202fdf857c2902427a28de4857fe944c)).

<figure style="display: inline-block">
    <img src="./tsconfig-with-include.gif" alt="Configure tsc to search the 'src' directory." width="400" class="sizeup-onhover-image scale2 origin-left-top" />
    <figcaption>Configure tsc to search the 'src' directory.</figcaption>
</figure>

```
> npm run typecheck

> jskatas.org@2.0.0 typecheck /app
> tsc

error TS18003: No inputs were found in config file '/app/tsconfig.json'. Specified 'include' paths were '["src/*.js"]' and 'exclude' paths were '[]'.
```

By default tsc looks for `.ts` files. But there are none here, there are
only `.js` files. That's why the error message did not change much.
Let's make sure tsc finds our files and starts type checking useful stuff.

### Make TypeScript find JS Files - The "allowJs" Compiler Option
TypeScript has quite a number of [compilerOptions](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
they can either be passed as command line arguments or set in the `tsconfig.json`, which is what we will do
([commit](https://github.com/wolframkriesing/jskatas.org/commit/5b24fd2bd522291909fe534f320c74571748e8c4)).
We add "allowJs" to "compilerOptions". The [docs describe it](https://www.typescriptlang.org/v2/en/tsconfig#allowJs) like this:
> Allow JavaScript files to be imported inside your project, instead of just .ts and .tsx files.

Thanks to [@Munawwar](https://twitter.com/munawwarfiroz) for pointing out that
["you can use `jsconfig.json` which is exactly like tsconfig.json but with `allowJs` defaulted to true"](https://twitter.com/munawwarfiroz/status/1262022720180625409).

<figure style="display: inline-block">
    <img src="./tsconfig-allowjs.gif" alt="Set the compiler option 'allowJs=true'." width="400" class="sizeup-onhover-image scale2 origin-left-top" />
    <figcaption>Set the compiler option 'allowJs=true'.</figcaption>
</figure>

```
> npm run typecheck

> jskatas.org@2.0.0 typecheck /app
> tsc

error TS5055: Cannot write file '/app/src/config.js' because it would overwrite input file.
error TS5055: Cannot write file '/app/src/env.js' because it would overwrite input file.
error TS5055: Cannot write file '/app/src/kata.js' because it would overwrite input file.

...

Found 9 errors.
```

Oha. What does tsc want to do now? We have not passed the option `outDir` which determines the
directory where tsc would write the compiled files to. So it tries to write the files to the same
location where it found them. Fortunately it does not overwrite the existing files.
Even though, if it would it would still run as expected but the source code would be rewritten,
and it would be using a lot of `var` and node-style `export.*`, replace ES6 classes with `function` etc.
basically down-compile the code to ES3.
Using the [config option `target`](https://www.typescriptlang.org/v2/en/tsconfig#target)
one can control what the target version of ECMAScript shall be.

Actually we don't need no compiled files, so let's turn that off.

### No Compiled Files Needed - The "noEmit" Compiler Option
We are using TypeScript only to verify types, not to convert or compile our source files to 
anything else, so we add the `noEmit` option to turn off writing files
([commit](https://github.com/wolframkriesing/jskatas.org/commit/65c0ab8c6cfe8c35e347e3a340d76faaf992b247)).

<figure style="display: inline-block">
    <img src="./tsconfig-noemit.gif" alt="Set the compiler option 'noEmit=true'." width="400" class="sizeup-onhover-image scale2 origin-left-top" />
    <figcaption>Set the compiler option 'noEmit=true'.</figcaption>
</figure>

Running this:

```
> npm run typecheck

> jskatas.org@2.0.0 typecheck /app
> tsc
```

There is no output on the command line. Thinking (and reading on the TypeScript home page) about what TypeScript actually is and that it 
"[compiles to plain JavaScript](https://www.typescriptlang.org/)", the expected input is a ".ts" file.
But we have none. That means, we have to tell it to also type check JavaScript files.
We will do that next using the "checkJs" option.

### Report Type Errors in JS Files - The "checkJs" Compiler Option
[The docs explain the "checkJs" option](https://www.typescriptlang.org/v2/en/tsconfig#checkJs) quite well:
> Works in tandem with `allowJs`. When `checkJs` is enabled then errors are reported in JavaScript files. 
> This is the equivalent of including `// @ts-check` at the top of all JavaScript files which are included in your project.

There is not only the possibility to add the `checkJs` option in the `tsconfig.json`
(see [the commit](https://github.com/wolframkriesing/jskatas.org/commit/7afb09295f9f66d28510152d4dbb24bc26d726a8)),
but also a `// @ts-check` comment at the top of a JS file. 
I stick to having all the config in the `tsconfig.json`.
Just to make it easier. I also like to try and prevent inline comments that configure the (type) linter, because I believe
code either adheres to the rules or the rule is useless. I have worked with a lot of code that had so many inline
comments that turned off configured settings just for a line, that I wondered why it is configured that way at all.
Often I went and turned off those kind of (lint) options, so the exceptions set via comments could be removed.
Consistency ftw.

<figure style="display: inline-block">
    <img src="./tsconfig-checkjs.gif" alt="Set the compiler option 'checkJs=true'." width="400" class="sizeup-onhover-image scale2 origin-left-top" />
    <figcaption>Set the compiler option 'checkJs=true'.</figcaption>
</figure>

Feels like we should be getting some useful output from `tsc` now. Let's try:

```
> npm run typecheck

> jskatas.org@2.0.0 typecheck /app
> tsc

src/config.js:28:10 - error TS2339: Property 'bundleName' does not exist on type 'BundleConfig'.

28     inst.bundleName = bundleName;
            ~~~~~~~~~~

src/config.js:29:10 - error TS2339: Property 'sourceUrl' does not exist on type 'BundleConfig'.

29     inst.sourceUrl = `${katasUrl}/${bundleName}/__all__.json`;
            ~~~~~~~~~

...

Found 24 errors.

```

We get useful output now! Unfortunately when starting with TypeScript, I have to say I was struggling to understand what
the error messages mean. The above ones seem understandable to me now, but it might be because I have
seen a couple of them already.

Let's take the first one. What it means is that TypeScript has found something that it identifies as 
a `type 'BundleConfig'`. I assume it is a `class BundleConfig`. And for some reason it says that `bundleName`
does not exist as a property on it. I strongly assume, that I am using it 
[in the code](https://github.com/wolframkriesing/jskatas.org/blob/c34ff1cd44af3b42d25e3706d21db4b3c34748f7/src/config.js#L25-L32) 
as such, but since there are no annotations for TypeScript to understand my code and it also can just 
[analyze the AST](https://github.com/microsoft/TypeScript/wiki/Architectural-Overview#overview-of-the-compilation-process)
of the code it can't figure out that `bundleName` is actually a valid property. So we will have to 
help TypeScript later figuring that out.
TypeScript does some basic 
[type inference](https://www.typescriptlang.org/docs/handbook/type-inference.html) but since JavaScript code
can be quite arbitrary it was not able to clearly figure out the above correlation between `BundleConfig` and `bundleName`.

I learned to get used to not understanding the error messages, when starting with a new programming language.
There is no site in the TypeScript docs, that I have found, that lists all error messages and helps you find solutions (maybe this is an opportunity for starting one).
The only thing I found in the TypeScript source code that does not really help, is 
[the JSON file](https://github.com/microsoft/TypeScript/blob/cbf15bb6ed1cd8b30403654a0a1c67baac329d06/src/compiler/diagnosticMessages.json#L1348-L1351)
that lists all error messages.

### Extend "include" Config to Find all Source Files
TypeScript found 24 errors, that sounds not too many, it surprised me a bit.
I found out quickly why that is. I configured to only search the src directory and not all its subdirectories
and also not the `script` directory. I need to fix that, just to get a feeling of how much type annotation work
lies before me. So I change the config to `"include": ["src", "scripts"]`
([commit](https://github.com/wolframkriesing/jskatas.org/commit/374985ef6171733eaea7e85db202705770ad0b6a)).

<figure style="display: inline-block">
    <img src="./tsconfig-include-all.gif" alt="Set include config to find 'src' and 'scripts' directories." width="400" class="sizeup-onhover-image scale2 origin-left-top" />
    <figcaption>Set include config to find 'src' and 'scripts' directories.</figcaption>
</figure>

```
> npm run typecheck

> jskatas.org@2.0.0 typecheck /app
> tsc

...

Found 72 errors.
```

Voila. 72 errors. That sounds more reasonable.
Note the difference, before we were just searching for all files directly under `src` by using `"include": ["src/*.js"]`
now we omitted the `*.js` and added the `scripts` directory the same way, so that all subdirectries are also searched.

Why explicitly list just those two directories by using `"include": ["src", "scripts"]`? Why not just use `"include": ["."]`
to include all files found in the project?
If we did that we would get 172 errors. That is because we would also type check the `node_modules` and the `dist` folder,
which is not what we want, since those are not the source files we want to type check.

## Conclusion

For a start this looks good.
* I know I can type check my JS files, if my continuous integration environment should not run the type checks yet,
  I don't have to. 
* I can start working on fixing type errors. Most of it will start with adding some basic configuration
for TypeScript to understand my code.
* **In the next part I will cover where to start type checking**, which files, why these and how to get rid of the first type errors.

You have fixes, feedback, questions, input or found mistakes or bugs, please [ping me on twitter](https://twitter.com/wolframkriesing).
Thanks for reading all the way to here 🥳.