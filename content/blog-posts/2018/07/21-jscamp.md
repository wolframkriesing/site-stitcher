# JSCamp Barcelona - Recap

It is over, the JSCamp in Barcelona, formerly named Angular Camp. These had been two intense days of JavaScript, organized
by [David Pich][david-pich]. This year about 500 people came together to spend two days in a single 
track conference, listening to topics like v8, webpack, nodejs, npm, Rust, ionic, nextjs, a lot of vuejs and much more.

Besides the main track some an ***parallel unconference, called DeepDive sessions*** had been held. 
Those session are the ones that this post will focus on. I will try to recap the things (I) 
learned there and that I feel need to be stated (again).  
Unfortunately the location was not easy to
find from the main location and it was announced only around noon of the first day. The 
people who found it and knew what an unconference has to offer did appreciate it a lot, I believe.

At JS Kongress last year in Munich the InDeep Track, the parallel unconference, was a great success.
David Pich had been there too. I believe this fact and the JSCamp's roots being a BarCamp convinced 
David to also run a parallel unconference at JSCamp. He called it #DeepDiveInJS.

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="en" dir="ltr">Try out and learn more about the talk topics at <a href="https://twitter.com/hashtag/DeepDiveinJS?src=hash&amp;ref_src=twsrc%5Etfw">#DeepDiveinJS</a>  <a href="https://twitter.com/jscamptech?ref_src=twsrc%5Etfw">@jscamptech</a> Great idea! Would be useful in many conferences! <a href="https://t.co/rZuac1G5oS">pic.twitter.com/rZuac1G5oS</a></p>&mdash; Carme Mias Studio (@CarmeMiasStudio) <a href="https://twitter.com/CarmeMiasStudio/status/1019888247995068416?ref_src=twsrc%5Etfw">July 19, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Organizational

Because the DeepDive track did not start until the afternoon of the first conference day, it meant we had enough
time to put up signs and announce it on the big stage. Efficiently this had left two time slots for day one.
Two rooms, so we had four session slots. So we did a quick marketplace and filled the time slots.
[Johannes][jowe] had a genious idea of building a backlog column for the next day, so people could propose
sessions but run them the next day. That had two really cool advantages 1) the people saw what might
come up on the second day and 2) the urge to find a slot for day 1 was gone.

https://twitter.com/jscamptech/status/1020222454067875840
https://twitter.com/CarmeMiasStudio/status/1019888247995068416

On day two we had a marketplace in the morning. [Daniel Ehrenberg][littledan] had already announced a lot of interesting
topics in the backlog the day before, so we got a day planned with interesting TC39 insights.

## Session: Bringing back pure JavaScript

https://twitter.com/byteadventures/status/1019962874012356608

Before day 2 started we had the afternoon of day 1 and one of the topics that attracted about 10 people was
"bringing back pure JavaScript". I joined the session a little bit too late and therefore missed the kickoff.
When I joined I got the impression that the discussion was focusing on the fear of giving up control over
JavaScript and that companies like Microsoft will move it into a direction that is interesting for shareholders,
not for the community. Another thing that I heard, was that people who get payed don't follow their heart anymore,
but become motivated by money.

It was an interesting discussion, even though it became a bit too idealistic at times (for my taste). But still
it showed that there are people who deeply care about our community, the ecosystem and the people working with it.
I pointed out, that I believe open source is something quite advanced as opposed to other industry sectors.
Those try to keep as many secrets as possible and are afraid of loosing any market share to competitors if 
too much information leaks out. I believe the IT world is on the forefront of being open and trying to speed
up innovation by sharing and learning with and from each other. And big companies are an important part of it.
Now we either have the chance to believe that companies like Microsoft are doing good for our community, which 
I believe, or we split away from them, which might also mean that the relevance in the market and therefore
the interest and community attraction for such a topic (like JavaScript) would diminish.
(JavaScript as an example for loosing market relevance is kind of very unrealistic, it's the lingua franca of the web, 
no matter what we do.) 
So we have to make sure that we get the balance right.

## Session: Big numbers in JavaScript, BigInt 

The calculation with big numbers in JavaScript (and many other languages) is not as easy as it seems.
I remember a friend telling me that he worked on his PhD writing a large numbers library for Java. 
Back then I had no clue why this was such a big thing. But seeing so many people being interested and
discussing the topic so intensively proved again that it is important.
After some introduction and the explaination of a real life scenarios, [Dan][littledan] explained
how one can work with BigInts and what the expactations shall be. To be honest, I don't remember
all the details and I was also not paying very close attention. But find more info at the [TC39 proposal][bigint-proposal].

https://twitter.com/andrei_antal/status/1020224627103199232

## Day 2

The market place in the morning ended up with the following session

* 12:00 TC39 community involvement, by @littledan
* 12:40 Class fields and private methods, by @littledan
* 14:40 Decorators, behavior injection, by @k1r0s
* 15:20 Decorators by @littledan
* 16:30 Typescript AND/OR Flowtype, which I proposed (but didn't take place due to ongoing interest in TC39 sessions started before)
* 17:00 Observers, Proxies, Object.observe, by Alfonso Coretti (session has been moved)

And things had been left in the backlog, so there was enough room for more sessions and potential to 
ramp up this format. Let's try again!

## Session: How to contribute to TC39

https://twitter.com/wolframkriesing/status/1020245103204601856
https://twitter.com/wolframkriesing/status/1020259962461835264

Dan gave a presentation about the TC39 process. He explained how proposals go through stages (from stage 1 to stage 4)
and what those stages mean. My biggest take away was when he said "contributing can not only be done by writing a new proposal".
This was eye-opening for me. Because I also kinda thought this is the best I could do. He kept going by suggesting
that people who like to contribute could also think about:
1) commenting on existing proposals, open issues, discuss on issues, participate, give the community of users a voice
   and make it visible, and
1) write tests for a new proposal.

***Writing tests*** sounds boring? No, not at all, I believe we all write tests in our heads and just do not often enough
dump them into code. All the time we try to play through a feature or (TC39) proposal, we try to exectue it in our
heads and try to see what might fail, what edge case we might discover or try to feel what using it will be like.
The same will be needed for a proposal to go to stage 3 anyways. Dan also mentioned that unfortunately tests get written
last mostly. The proposal authors do need support there, that's why this is one way we can help and contribute.
How to write a test? There is the [repo test262][test262] where you can also find lots [of][pr1] [insightful][pr2] [PRs][pr3], 
some also for proposal. Unfortunately I don't remember exact details about the process in this repo.

[test262]: https://github.com/tc39/test262
[pr1]: https://github.com/tc39/test262/pull/1590
[pr2]: https://github.com/tc39/test262/pulls?utf8=%E2%9C%93&q=is%3Apr+is%3Aclosed+label%3Awaiting-author+
[pr3]: https://github.com/tc39/test262/pull/888

## Session: New class features

### Decorators

### Privates

Daniel 

## Session: Observers, Proxies, Object.observe

Alfonso had a real life example, where he had the issue that `Object.observe` would have been his solution, but
had been removed from the standard, unfortunately. He had an `<input>` tag that he wanted to listen on 
attribute changes that were made via JavaScript. The DOM APIs (addEventListener) do not fire when attributes
are changed from a script source, but only user-triggered changes do fire. Alfonso's issue was, that his
element was not directly modified but indirectly, by some user modification, which again triggered his script
to modify the node he wants to listen on.
Fortunately lots of people who know the specification inside out and had been working on it too had been 
at the conf, so [Ciro] pinged [Kenneth], who came and joined the discussion. (That's how unconfs tick.
Awesome.) Since I had left the room, I only heard later that Kenneth's suggestion was to bring it up as an issue
against the spec, maybe there is more interest in it and there will be a proposal that fixes this use case.

Aren't customized built-in elements the solution for it or MutationObserver? /me calling Alfonso ...

[Ciro]: https://twitter.com/k1r0s
[Kenneth]: https://twitter.com/kennethrohde

[david-pich]: https://twitter.com/davidpich
[jowe]: https://twitter.com/jowe
[littledan]: https://twitter.com/littledan
[bigint-proposal]: 




---
created_at: 2018-07-21 19:00:00 +0200
---
post_type: post
---
tags:

events
unconference
open space
---
_hidden: no
---
_discoverable: yes
---
