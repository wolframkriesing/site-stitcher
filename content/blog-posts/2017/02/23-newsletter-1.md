# Newsletter #1

Welcome to the newsletter #1 - about crafting (and) JavaScript - February 28th, 2017. Every Monday you will receive a hand-selected collection of **links about JavaScript and how to craft better software**. Let's get started ...

## JavaScript

In ["Fast Source Map Generation for React Native"][fast-source-map-gen] David describes how he and others *"improved source map generation for 1,758,618 single mappings from 3 seconds to 550 milliseconds by optimizing code for execution in v8."* 

[fast-source-map-gen]: https://medium.com/@david.aurelio/medium-fast-source-map-generation-for-react-native-ea5549007c18#.7uvg5el4j

["V8 has been improved and released version 5.7"][v8-release], where the async performance of Promises has doubled and the speed of async functions has quadrupled, regexps have become 15% faster and two new String functions `padStart` and `padEnd` have been added. And great to see that date and time get some love with the function `Intl.DateTimeFormat.prototype.formatToParts` (read [more about it in ECMAScript 2017 spec][es2017-spec-date]).

[v8-release]: https://v8project.blogspot.de/2017/02/v8-release-57.html
[es2017-spec-date]: https://tc39.github.io/ecma402/#sec-Intl.DateTimeFormat.prototype.formatToParts

In ["The Eff monad implemented in Flow"][eff-monday-in-flow] gcanti shows how to use flowtype to be able to be more explicit about side effects in your code. He shows in a server-side app how you could wire up a signup route to the side effect of writing to a DB.

[eff-monday-in-flow]: https://medium.com/@gcanti/the-eff-monad-implemented-in-flow-40803670c3eb#.g8iv6gjs5

## Crafting

Many contributors have taken Uncle Bob's clean code principles and adapted them for JavaScript, which says *"[Clean Code concepts adapted for JavaScript][cc-guide] is not a style guide. It's a guide to producing readable, reusable, and refactorable software in JavaScript."*.

[cc-guide]: https://github.com/ryanmcdermott/clean-code-javascript

[Samir][samir] wrote [smoke] a small *"integration test framework for console applications."*. Where he says *"a test case consists of input and expected output. It is constructed of a number of files with the same name and different extensions."*, so if you want to run a script or program and test/compare it's output this tool might help. In the [Origins][smoke-origins] section of the readme file Samir describes well why he created this tool.

[samir]: https://twitter.com/SamirTalwar
[smoke]: https://github.com/SamirTalwar/Smoke
[smoke-origins]: https://github.com/SamirTalwar/Smoke#origins

## Various

[Lifetimes of cryptographic hash functions][hash-lifetimes] visualises impressively that (most) hash functions have a lifetime before they get broken. And since git uses the SHA1 hash, which caused the latest noise, [Linus Torvalds states on the mailinglist][git-mail] that the impact on git is rather minor.

[hash-lifetimes]: http://valerieaurora.org/hash.html
[git-mail]: http://marc.info/?l=git&m=148787047422954

It's always good to know [where to find the markdown syntax][markdown-syntax], so here is the link. I use markdown almost daily but still don't know all the special characters by heart yet. 

[markdown-syntax]: https://daringfireball.net/projects/markdown/syntax

While writing this newsletter I wanted to know again how to do quoting right and [found this article by Virginia Kearney][citing-correctly], where she basically states that *"When you are writing on the web, you can mention the name of the source at the beginning of your quote, paraphrase or summary and then provide a link."*. So I hope I have done it right :).

[citing-correctly]: https://letterpile.com/writing/Using-and-Citing-Sources-Correctly


---
created_at: 2017-02-23 22:22 CET
