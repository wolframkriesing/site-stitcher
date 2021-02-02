# Codeberg Repo as npm Dependency
slug: codeberg-repo-as-npm-dependency
dateCreated: 2021-02-03 00:25 CET
tags: npm, nodejs, JavaScript, codeberg
previewImage: ../codeberg-preview.jpeg

I am gladly using [codeberg](https://codeberg.org) (as github alternative)
for as many projects as I can, really support their mission.
"Independent and powered by your donations and contributions".  
I struggled a little bit [to figure out the URL that works](#how-it-works)
for a package
that is not on npm yet, but exists just as a codeberg repo.

## Failed Tries

I tried a lot of the known URL patterns as dependency in my `package.json`.   
**Those that failed** were:
* https://codeberg.org/wolframkriesing/test-stitcher.git
* git://codeberg.org/wolframkriesing/test-stitcher.git
* git@codeberg.org:wolframkriesing/test-stitcher.git
* git+ssh://git@codeberg.org/wolframkriesing/test-stitcher.git
* git+ssh://git@codeberg.org:wolframkriesing/test-stitcher.git
* git+https://codeberg.org/wolframkriesing/test-stitcher.git 

Just to quote one error that I received when I called `npm install`: 
```
> npm install
npm ERR! code ENOLOCAL
npm ERR! Could not install from "git@codeberg.org:wolframkriesing/test-stitcher.git" as it does not contain a package.json file.
```

## How it Works

The URL that **works** is prefixed with "git+https":
* git+https://codeberg.org/wolframkriesing/test-stitcher.git

```json
{
  "dependencies": {
    "test-stitcher": "git+https://codeberg.org/wolframkriesing/test-stitcher.git"
  }
}
```

I have not seen and used the combination "git" and "https" before, but hey if 
npm accepts this. Cool. hth




# React: Hooks vs. Saga
slug: react-hooks-vs-saga
dateCreated: 2021-02-02 14:31 CET
tags: react, tools, frontend, web, JavaScript

I am currently working on a React Native app that uses redux saga heavily.
My main concern with it is the traceability of code that goes together, the modularization. It is hard, if not impossible to know
what belongs together, what is needed in combination with what. 

Currently, the different parts, actions, sagas, etc. are spread
across multiple places in the source code. I prefer to have, things that belong together, in one place,
and whatever is shared across the code base I put in `shared-*` directories. If I have a "simple" API request that puts some
data in a store, the API request, its error handling and placing the data in the store goes in one place, best in one file.
If don't need it, I can delete it and my IDE can help me detect unused code.

## Learning From Others
So I searched for articles via ["react saga vs hooks"](https://duckduckgo.com/?t=canonical&q=react+saga+vs+hooks&ia=web)
to prove my bias, nah, to learn from others how they did it.

Even though I am not a big fan of react hooks either, since they impose so much magic on me and don't make testing stuff easy,
it's the better choice here. And, I actually have a way of testing the hooks in an acceptable manner.
(Reading this myself, I am bothered by the many tradeoffs the react ecosystem forces on me constantly, 
but that is a constant itch of mine, as my twitter timeline underlines.)

Rossi Tri Le wrote
[How I replace Redux, Redux Saga with React Hooks](https://medium.com/@rossitrile93/how-i-replace-redux-redux-saga-with-react-446b4c84f788)
> This article will show you how to easily and effectively replace redux, redux saga with React Hooks.

This sounds like the right thing.

> Most [...] use [...] useState/ useReducer, which is fine if you only need to make a few API calls. 
> But if you plan to go production, with a lot of API call, then maintaining the codebase with this approach will soon become a nightmare.

This sounds interesting. I want to learn how to prevent nightmares and still get away from sagas.
(I also think that generators are not fitting this problem well.)

> For the middleware, I am going to use a pure javascript function to replace it.
> Now we understand our problem, and have a plan to tackle it, let’s get started.

I really like the direction this is going.
I like it for two reasons:
1) The author seems not to **require** a framework for everything, nowadays I see too many programmers "needing"
   big tools to solve small problems.
2) The author states clearly what is the problem and lays out a plan This is so refreshing. Not just jumping in,
   coding away and figuring out on the way where one wants to go.
   
> I don’t directly pass the dispatch function down the component tree, but the actions function.

that was also one of the things that always bothered me. Why do I need to see the store inner workings in my
business logic code.

Oh, and the article, almost abruptly ends here.  
Unfortunately I did not learn why just using hooks ends in a nightmare, as the author mentioned above. I believe
sorting hooks properly together and splitting the "put in a store" part makes it well to handle, but I need
to gain more experience here.

There is a repo with the really simplified way of how to do it.
https://github.com/rossitrile/replace-redux-saga-by-react-hooks
Thanks Rossi. At least I got my assumptions confirmed. I am going down that route too.
