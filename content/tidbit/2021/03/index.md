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
