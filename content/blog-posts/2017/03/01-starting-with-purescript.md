# Purescript - the semantics of JavaScript with types #1

I am convinced, that stricter types are of help when writing, reading and understanding source code. Why? Ever had the [primitive obsession][primitive-obsession]? And if you continue down the (type) rabbit whole, you get to stricter typing. And to Purescript, which attempts *"to keep the semantics of JavaScript, while enjoying the syntax and type system of a language like Haskell"*.
[primitive-obsession]: http://wiki.c2.com/?PrimitiveObsession

Purescript is bringing that to JavaScript while having an (I would say) tiny footprint in the compiled (JavaScript) code. Yes, Purescript compiles down to JavaScript, actually to very well readable JavaScript code (see for yourself towards the end of this post). Read on to get a quick intro on what it is.

The following quotes are from the book ["PureScript by Example"][ps-book] by [Phil Freeman][phil-freeman]. I will try to extract what Purescript is, using quotes mixed with my own words.

> PureScript is a statically typed language, meaning that a correct program can be given a type by the compiler which indicates its behavior.

I think a modern typed language must have type inference (which is the capability of the compiler to figure out some types by itself). Having to write out all the types for every variable would be quite a pain and is actually not really adding lots of value, just work. And Purescript shines there:

> Most importantly, PureScript’s type system supports type inference - it requires far fewer explicit type annotations than other languages, making the type system a tool rather than a hindrance.

This capability paired with the strictness (see first quote) makes for a strong combination and I think this will help to write more predictable and better software. Phil states that in his book *"static types are not only a means of gaining confidence in the correctness of your programs, but also an aid to development in their own right"*.

A lot of time we spend in changing code, which we normally (should) do via refactoring. Here Purescript shines again, compared to JavaScript, where it *"can be difficult when using any but the simplest of abstractions"* as Phil states. From experience I can say that this is an issue. You know the code and it's "interfaces" as long as you are deep inside of it esp. while writing it, but reading it and even worse changing it, especially making big changes, in pure JavaScript, with pure objects, that maybe don't even have good names, can become quite spooky. Especially when untyped data structures bubble through the code, get mixed and mangled, sliced up and mapped.

## Some code please

Below you see a tiny function, taken from the book.

```text
module Main where

import Math (sqrt)
import Prelude

diagonal w h = sqrt(w * w + h * h)
```

in the following you can see that the compiled source code is actually very readable compatible JavaScript code.

```js
"use strict";
var $$Math = require("../Math");
var Prelude = require("../Prelude");
var Data_Semiring = require("../Data.Semiring");
var diagonal = function (w) {
    return function (h) {
        return $$Math.sqrt(w * w + h * h);
    };
};
module.exports = {
    diagonal: diagonal
};
```

## Get started, asap

And on top, Purescript comes with the tool `pulp` which called like so `pulp browserify` generates source code you can use in the browser right away. So Purescript is a tool for the front-end and the backend. You can get started now to be stricter with your code!

You want to get started? Here I can just quote the book again, which mentions some great example use cases, where you can start using Purescript a little at a time, you can do like so:

> * Core logic written in PureScript, with the user interface written in JavaScript.
> * Application written in JavaScript or another compile-to-JS language, with tests written in PureScript.
> * PureScript used to automate user interface tests for an existing application.

I would like to generalize the last bullet point on the list a bit more. You can simply import the actual production code into your tests and just write them in Purescript. Just look at the generated JavaScript above and you see the `require`, which looks like an easy to use hook to existing JS code, and that is the case. I think writing tests in Purescript is a great way to start using Purescript and learn by using it in a less critical part of your application. I think this less critical part, the tests, will soon become the driving force for the source code, since the power of Purescript will shine through quite fast.

[ps-book]: https://leanpub.com/purescript/read
[phil-freeman]: https://twitter.com/paf31

dateCreated: 2017-03-01 20:02 CET
---
postTypes: post
tags: purescript
javascript
functional
typing
