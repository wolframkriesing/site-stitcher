dateCreated: 2020-05-12 18:00 CET  
tags: javascript, typescript, typing, setup, ts4js  
isDraft: true

# TypeScript for JavaScript, Part 1 - Getting Started
Did you know that you don't need to rename all your ".js" files to ".ts" and go all in on TypeScript,
but that you can go gradually. Adapt TypeScript step by step, become familiar with it in your existing
JavaScript project. No need to put on hold development for weeks, while you convert the code base to TypeScript.\
I have done that many times now, read on how I am doing it for the [jskatas.org]
sourcecode.

Let's type check JavaScript files using TypeScript.

## Official Docs are Scarce on this Topic
The TypeScript docs have one page on the topic 
[Type Checking JavaScript Files][1]
but over time, I found out that there is much more to this topic. Thanks to [Jan] and his project [elix] where
I learned most of the basics on how to apply TypeScript as a type linter on JS files.  

[1]: https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html
[jskatas.org]: https://jskatas.org
[Jan]: https://twitter.com/JanMiksovsky
[elix]: https://twitter.com/ElixElements/

## What is "TypeScript for JavaScript", and Why?
I did a lot of FlowType to type check my JavaScript code, but TypeScript seems to be the more active and growing one.
So I started to investigate how I can use TypeScript, especially on existing JavaScript projects.
Why? The main reason for me was always development speed. One way to achieve this is that I try to prevent
all build steps and want to run my code straight without building and bundling, no matter if I run a browser
or nodejs project. So depending on the TypeScript compiler to compile my files was not an option for me.

In the following you can see how I set up **TypeScript, as a type linter for JavaScript files**.
This allows me to type lint my code optionally, so if (for whatever reason) I don't want type safety, I don't have
to worry about it. With TypeScript it is not so easy to opt out (afaik).

## Why "TypeScript for JavaScript"?
Why should I do it at all, when it is optional for JS files? 
Here are a couple of reasons why you might want to consider it:
* when types get complex, you might want a tool to point out mistakes
* when the domain language forms, you want to name things coherently
* when the team grows, types are more expressive
* exhaustivness checks create safety and prevent bugs
* typing makes you think about your architecture (even if you do them afterwards)

## How to start with TypeScript for a JavaScript Project

## Install TypeScript Dependency

<figure style="display: inline-block">
    <img src="./install-typescript.gif" alt="diff in package.json of installed typescript" width="50%"/>
    <figcaption>The diff in the package.json of installed typescript</figcaption>
</figure>


