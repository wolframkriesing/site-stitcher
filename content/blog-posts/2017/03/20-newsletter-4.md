dateCreated: 2017-03-20 18:01 CET
tags: lint, eslint, React Native, refactoring, code quality, github, audio, playground, classes

# Newsletter #4

This is newsletter #4 - about crafting (and) JavaScript - March 20th, 2017. Every Monday you will receive a hand-selected collection of **links about JavaScript and how to craft better software**. Let's get started ...

## JavaScript

***[Sketch — A Playground for React Native][sketch-post]*** This is a pretty cool tool. Especially if you have never touched react-native, this is a perfect tool for just trying it out. You can [write code or drag 'n drop code][sketch] and right away see the result on your device.

[sketch]: https://sketch.expo.io/
[sketch-post]: https://blog.expo.io/sketch-a-playground-for-react-native-16b2401f44a2

***[ESLint v3.18.0 released][eslint]*** If you care about your code eslint is a tool you surely want to use. This version "adds support for AST selectors" which allows for simplifying the implementation of custom rules.

[eslint]: http://eslint.org/blog/2017/03/eslint-v3.18.0-released

***[How to Use Classes and Sleep at Night][classes]*** is an interesting look at JS classes by [Dan Abramov][dan]. The introduction of "real" classes in ES6 started lots of discussion. Dan suggest his view, which rings with many people in the JS community.

[classes]: https://medium.com/@dan_abramov/how-to-use-classes-and-sleep-at-night-9af8de78ccb4
[dan]: https://twitter.com/dan_abramov

[Howler.js][howlerjs] is a library I found through [Thorsten's tweet][thorstens-tweet], which ***"makes working with audio in JavaScript easy and reliable across all platforms"***.

[howlerjs]: https://howlerjs.com/
[thorstens-tweet]: https://twitter.com/ThorstenRinne/status/842367095291695104

## Crafting

[Michael Feathers talked][mfeathers-talk] about [delta flora][delta-flora], a tool he once wrote to get more insight into your source code and it's history. [CodeScene][codescene] looks a very promising tool which does exactly that. It might make sense to keep an eye on it.

[codescene]: https://codescene.io/showcase
[mfeathers-talk]: http://www.ustream.tv/recorded/61483799
[delta-flora]: https://github.com/michaelfeathers/delta-flora

***[STON - Smalltalk Object Notation][ston]*** reads to me as if this is a notation for typed JSON. JSON is one of the most common exchange formats, but it also lacks a lot of explicitness due to it's exclusively simple typing. Maybe STON could be an option for a more strict(er) typed exchange format.

[ston]: https://github.com/svenvc/ston/blob/master/ston-paper.md

[Github has saved replies][saved-replies], I didn't know. If you are intensively using github issues and pull requests, there is a nice feature you might find helpful: "saved replies". It's like canned responses in gmail. It can help with "saving you a ton of time typing".

[saved-replies]: https://github.com/blog/2135-saved-replies

***[Avoid pull requests][pr-post]*** because they are "a bad smell of team dynamics" and I strongly agree with the author that "pairing is much better than reviewing". And I agree also that "pull requests are great, especially when your team is not colocated". But they are not all bad, especially in open source PRs are great, where people don't sit beside one another.

[pr-post]: http://vgaltes.com/teamwork/Avoid-pull-requests/
