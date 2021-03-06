# Hermes - Mobile JavaScript Engine
slug: hermes-mobile-javascript-engine
dateCreated: 2021-03-14 17:26 CET
tags: JavaScript, mobile, React Native
previewImage: ../hermes-preview.webp

[React Native (RN) 0.64 was just released](https://reactnative.dev/blog/2021/03/12/version-0.64). 
One of the things I had stumbled upon more often lately in RN
code was the word "hermes". I didn't know what kinda tool or package that was.
Until I informed myself a bit.  
In short: [Hermes](https://hermesengine.dev/) is a mobile optimized JavaScript engine.

## React Native needs a JavaScript Engine
Just to give the context, let me quickly sum up why RN needs a JavaScript Engine.
For RN you write JavaScript code, which can run on multiple platforms, such as iOS and Android.
The app code you are writing uses [ReactJS](https://reactjs.org/). The JavaScript code
gets bundled into on big JS file and shipped with the mobile app file, for example the `*.apk` file
on Android. On the phone the code needs to be run, that is where the JS engine comes into play.
The native components are being talked to over a bridge, that's why every React Native project
also always consists of native code too.

Hermes is one of the JavaScript engines, and since RN 0.64 also available for iOS.
Beside that [JavaScript engines used in RN](https://reactnative.dev/docs/javascript-environment#javascript-runtime) 
are JSC (JavaScriptCore) and v8.

## Goals
The best way to understand why Hermes exists is to watch the 15min
video of ChainReactConf 2019.

<iframe width="427" height="240" name="video" src="//www.youtube.com/embed/zEjqDWqeDdg" frameborder="0" allowfullscreen></iframe>

Anyway, let me sum it up in my own words.
Hermes aims to:
* reduce the size of a mobile app (as downloaded from the app store), in the video he mentioned about 30% reduction
* speed up the app start-up time and the execution times, in the video from about 7s down to 5
* cause less out of memory crashes/bugs by reducing the RAM used on the phone, reduction by a 30% too
* allow RN apps to perform better, especially on less powerful phones

Of course all those numbers depend on the kind of app you are running.

## No JIT
From the talk I learned that hermes does NOT have a JIT, due to the assumption that there is not
much code that is run multiple times, esp. code that needs optimization at start-up time.
Also because the JS code gets compiled to bytecode optimizations can be done that an engine
like v8 does at runtime (using a JIT). All this sounds interesting.

## Less of JavaScript Features
Hermes does NOT implement all features of JavaScript. In the video Marc explains that they analyzed
their use of JavaScript and removed features that they never used and that are heavy on an engine, I assume.
For example Proxies, `with`, `eval`, some `Symbol` stuff and other less known JavaScript features.
Sounds like a clever move. I assume there is more that could be left out, like for loops ;).

## Another Engine? Really?

I started out asking why this requires yet another JavaScript engine.

<blockquote class="twitter-tweet" data-partner="tweetdeck">
    <p lang="en" dir="ltr">I am reading that <a href="https://twitter.com/hashtag/hermes?src=hash&amp;ref_src=twsrc%5Etfw">#hermes</a> [1] is (yet) another <a href="https://twitter.com/hashtag/JavaScript?src=hash&amp;ref_src=twsrc%5Etfw">#JavaScript</a> <a href="https://twitter.com/hashtag/engine?src=hash&amp;ref_src=twsrc%5Etfw">#engine</a> built for <a href="https://twitter.com/hashtag/reactnative?src=hash&amp;ref_src=twsrc%5Etfw">#reactnative</a> (but not only afaik).<br>Anyone knows where to read about motivations and goals? Didn’t find it yet. Just seeing docs, etc. about how it works, but not the whys.<br><br>[1] <a href="https://t.co/6v278WlPOj">https://t.co/6v278WlPOj</a>
    </p>
    &mdash; @wolframkriesing <a href="https://twitter.com/wolframkriesing/status/1371127354903433217?ref_src=twsrc%5Etfw">March 14, 2021</a>
</blockquote>

The video above tells some of the motivations. While I believe tackling the task
of writing a JS engine is quite a challenge, I also thought that the upside might not
be so huge. V8 seems to be really good in optimizing and running code optimally.
Is is not possible to compile v8 without for example `eval` and `Proxy`, which hermes
did not implement?

On the one hand, it makes sense to democratize the JS engine space a bit and
offer more choice. On the other hand, it also feels a bit like the tech giants
need another playing field to do some arm wrestling. I am drawn between those
two views. But I certainly don't know the truth behind the birth of hermes.
So I keep looking forward to getting some more app speed with less cost.
Thanks.

## More Info

The post that actually led me to watch the video was this one:
[React Native: What You Need To Know About Hermes.](https://medium.com/react-native-nigeria/react-native-what-you-need-to-know-about-hermes-b3686b446e49)

A pretty recent article from Dec 2020
[Boost Android performance using Hermes](https://engineering.instawork.com/boost-android-performance-using-hermes-e01da8a2baaa).

There is not much going on, and therefore a
[twitter search for "hermesengine"](https://twitter.com/search?q=hermesengine&src=typed_query&f=live)
reveals quite interesting info.

The [hermes playground](https://hermesengine.dev/playground/), 
where you can compile JS code into Bytecode that hermes uses.





# Hermes Analysis
slug: hermes-analysis
dateCreated: 2021-03-15 09:01 CET
tags: JavaScript, engine, insights, React Native

I have been digging a little bit into [Hermes (a mobile first JS engine)](../hermes-mobile-javascript-engine/)
focused on [React Native](https://reactnative.dev/). Since I shared most of it on twitter, I want to "copy"
the content here to persist it for me, I know I am coming back to this eventually and this way I get up to speed
faster.

## Object vs. Map

I think I have an idea of how a bytecode based VM works, so I was curious to dig a little deeper.
And I am going to use an example that I remember [@Benedikt](https://twitter.com/bmeurer)
told me about once, where a v8 is struggling with. It is the usage of the very overloaded
and powerful object literal in JavaScript, while one actually is "just" doing the work that a
[JavaScript Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) 
is way more ideal for. 

Besides the speed gain a VM might give you when using a Map, I also like the explicitness in code.
A piece of code that reads `map.has('key')` is way more explicit than any way you can write this
with an object. And you also know it does ONLY that.

So I thought I would like to see what kinda code hermes produces when I use an object literal
vs. a Map. Find my annotated tweets below.

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="en" dir="ltr">I am digging into <a href="https://twitter.com/HermesEngine?ref_src=twsrc%5Etfw">@HermesEngine</a>’s bytecode.<br>Let’s see how object vs. Map.<br><br>// v1<br>const o = {one: 1, two: 2};<br>print(o.one);<br><br>// v2<br>const m = new Map([[&#39;one&#39;, 1], [&#39;two&#39;, 2]]);<br>print(m.get(&#39;one&#39;));<br><br>1/</p>&mdash; @wolframkriesing <a href="https://twitter.com/wolframkriesing/status/1371213511339208707?ref_src=twsrc%5Etfw">March 14, 2021</a></blockquote>

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="en" dir="ltr">Why?<br>I once learned that object is so overloaded and complex (in v8) that for a simple map, using Map is way more efficient. Besides that the code is also way more explicit.<br><br>2/</p>&mdash; @wolframkriesing <a href="https://twitter.com/wolframkriesing/status/1371213781309796355?ref_src=twsrc%5Etfw">March 14, 2021</a></blockquote>

<blockquote class="twitter-tweet" data-partner="tweetdeck">
    <p lang="en" dir="ltr">
        The resulting bytecode looks like this. I believe the images are the relevant parts of the bytecode.<br><br>
        It’s easy to see which code is shorter. Not sure (yet) if relevant. 
        Shorter bytecode is good for the bundle size, but now I need to look under the hood.
        <br><br>3/
    </p>
    &mdash; @wolframkriesing 
    <a href="https://twitter.com/wolframkriesing/status/1371214864853635085?ref_src=twsrc%5Etfw">March 14, 2021</a>
</blockquote>

<figure>
    <img src="../hermes-bytecode-map.gif" alt="Hermes bytecode for Map code" width="300" class="sizeup-onhover-image scale2 origin-left-top" />
    <figcaption>Hermes bytecode for Map code</figcaption>
</figure>
<figure>
    <img src="../hermes-bytecode-object.gif" alt="Hermes bytecode for object code" width="300" class="sizeup-onhover-image scale2 origin-left-top" />
    <figcaption>Hermes bytecode for object code</figcaption>
</figure>

I have generated and screenshotted the images in the [hermes playground](https://hermesengine.dev/playground/).

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="en" dir="ltr">Reading the <a href="https://twitter.com/hashtag/hermes?src=hash&amp;ref_src=twsrc%5Etfw">#hermes</a> VM interpreter code [1] I can’t but wonder why vm authors seem to like big code files instead of many smaller modular ones.<br><br>[1] <a href="https://github.com/facebook/hermes/blob/master/lib/VM/Interpreter.cpp">https://github.com/facebook/hermes/blob/master/lib/VM/Interpreter.cpp</a></p>&mdash; @wolframkriesing <a href="https://twitter.com/wolframkriesing/status/1371221113133531136?ref_src=twsrc%5Etfw">March 14, 2021</a></blockquote>

With uxebu we used to build a flash parser and a VM for ActionScript 3 bytecode, so I think I have
seen some alike stuff being developed and I can't get rid of the feeling that there is a certian type
of programmer, that likes to write this code :).

Besides the style of code, it seems that I need to dive even deeper.
Just looking at the bytecode is not very conclusive and reveals a different
picture to what I expected. The bytecode for the Map-version is longer.
So I guess the VM code under the hood might reveal some more insights.

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="en" dir="ltr">v1<br>createObjectFromBuffer 120 LOC<br><br>v2<br>`CreateThis` sounds complex, it calls `Callable::newObject` which looks like it wants quite some memory.<br>To create the map an array is used, `Interpreter::createArrayFromBuffer` is just 25 LOC, Sounds efficient compared to an object.<br><br>/5</p>&mdash; @wolframkriesing <a href="https://twitter.com/wolframkriesing/status/1371226121224794121?ref_src=twsrc%5Etfw">March 14, 2021</a></blockquote>

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="en" dir="ltr">I definitely can’t draw any conclusion about object vs. Map in regards to resource usage. But I read some hermes VM code and believe I have a feeling for what is going on under the hood. I am far from understanding it, but it looks like there are people who love that stuff ;)<br><br>6/</p>&mdash; @wolframkriesing <a href="https://twitter.com/wolframkriesing/status/1371227632105324548?ref_src=twsrc%5Etfw">March 14, 2021</a></blockquote>

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="en" dir="ltr">In regards to bytecode size, bundle size, mobile app size in the end, objects (as used here) seems to result in a smaller bytecode size.<br>At runtime, I didn’t measure any numbers, so I can’t say.<br><br>7/</p>&mdash; @wolframkriesing <a href="https://twitter.com/wolframkriesing/status/1371228910202073092?ref_src=twsrc%5Etfw">March 14, 2021</a></blockquote>

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="en" dir="ltr">In the talk where Marc introduced <a href="https://twitter.com/hashtag/hermes?src=hash&amp;ref_src=twsrc%5Etfw">#hermes</a> he said it has no JIT. Looking at the parameters [1], it looks like this has changed, or I don&#39;t understand things really.<br>Anyways, this is me sharing my half-baked knowledge about hermes.<br><br>[1] <a href="https://hermesengine.dev/playground/">https://hermesengine.dev/playground/</a> (click the ?)<br><br>8/8</p>&mdash; @wolframkriesing <a href="https://twitter.com/wolframkriesing/status/1371230363788439559?ref_src=twsrc%5Etfw">March 14, 2021</a></blockquote>

Besides all the analysis and the time spent, I can't say I understand all of it.
But I get some feeling for hermes.
I am wondering if there are more optimziation possible. Especially given, that 
hermes dismisses some JS features already. There might be more possible to get 
to a smaller but still very usable JS engine, that might has some good tradeoffs
for an even bigger resource consumption gain.

I keep look out.



# Redux, Context or What
slug: redux-context-or-what
dateCreated: 2021-03-16 20:46 CET
tags: React, JavaScript

State management in react as it is most commonly spread among devs is suboptimal, I would say.
I just looked up my first react app, it's from 2014 and we used react to make working with HTML
in a "normal" DOM based page easier and code more readable. React didn't control all the page.
We used jQuery to animate between the pages, where each page was a react component.
Nowadays a react app tries to get the entire app to be react as quickly as possible.
Has it turned around, against us?

But let's look a bit into state management, some history and some opinions.
I just did this and watched a couple interesting videos.
I got stuck with [Zustand](https://github.com/pmndrs/zustand) (not biased by a German name, definitely not)
suggested by [@Ben](https://twitter.com/benawad).

## Choose Context or Redux 
A very good very short video about when to choose Context or a state management library like redux.
He shows very well where using Context only starts to get inefficient.  
6 minutes
<iframe width="427" height="240" name="video" src="//www.youtube.com/embed/5gUHfe-ETuo" frameborder="0" allowfullscreen></iframe>

<br/><br/>

## Redux and Context Explained 
Here is a five minutes (starting at 3:35min up to 8:30min) rundown of redux and 
what the "new" Context API (in React since about v16.3) can do.  
5 minutes
<iframe width="427" height="240" name="video" src="//www.youtube.com/embed/qT-6yHhzHqw?start=215" frameborder="0" allowfullscreen></iframe>

<br/><br/>

## From History to What to use Next 
He starts from exploring the history of the Context API, and he ends with the question
if you should use redux in a project you start today. Well done.  
6 minutes
<iframe width="427" height="240" name="video" src="//www.youtube.com/embed/ws131BqvLRg" frameborder="0" allowfullscreen></iframe>

<br/><br/>

## The Three Types of State 
In this video Ben explains very well what three kind of states he sees in React apps.
He also says:
> you are probably gonna be required to learn redux at some point, although I would recommend
> to procastinate it as long as you can

Made me smile. I succeeded in that too, I mean I know the theory and stuff, but ...    
6 minutes
<iframe width="427" height="240" name="video" src="//www.youtube.com/embed/BhQYZmaxTCM" frameborder="0" allowfullscreen></iframe>

Youtube has annoyed me enough with ads. Back to coding ...




# Immutable States Done Right with Immer  
slug: immutable-states-done-right-with-immer  
dateCreated: 2021-03-16 23:46 CET  
tags: JavaScript, React, state  

This blows me away, just like [Zustand](https://github.com/pmndrs/zustand/)
which makes [state management very simple](https://twitter.com/wolframkriesing/status/1371944812253958145)
[immer](https://immerjs.github.io/immer/docs/introduction) implements immutability
in the way it had always wanted to be implemented.

This 6min video explains it and you see what I mean.
https://egghead.io/lessons/redux-simplify-creating-immutable-data-trees-with-immer