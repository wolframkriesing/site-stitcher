dateCreated: 2021-01-28 16:10 CET  
tags: conference, JavaScript  
previewImage: preview.png  

# TestJSSummit Day 1

[It](https://www.testjssummit.com/) 
just started. I warmed up talking to Jacek, we both thought it starts at 15:00
but it didn't so it gave us 1h to warm up.

## Intro

Wow, more then 5000 participants.
I guess that is the advantage of online conferences, the number of people joining
is basically unlimited.

They have all kinda stuff set up, discord (a chat), spatial (a kinda virtual env where you can work around).

## Talk 1: Evolution of Browser Testing

[@Christian Bromann](https://twitter.com/bromann) 
from Saucelabs starts with a 25min talk on how browser 
automation has evolved over the last year. So I expect a high level overview.
Let's see if there is something to learn.  
Half in he very well explained the history and also the tech setups of all the browser
testing tools.

I start to get the feeling that the conference is going to be **just about browser testing (?)**,
which I would call integration testing. I am not sure this is going to satisfy what
I expected from "Test JS Summit". That makes me think about what I did expect.
I beleive I expect to hear about good testing approaches, which start at a lower level
for me. I actually see testing more as a way of driving code, which means drive design
and architecture of a software.

Aha, he is introducing [webdrive-bidi](https://github.com/w3c/webdriver-bidi) now.

> WebDriver BiDi is a proposed bidirectional protocol for browser automation, building on and extending WebDriver.
> 
> WebDriver BiDi is not ready.

Christian is saying "you can finally talk to your Safari-friend".
Seeing the latest focus that Apple puts on browser development I would not be so sure that
they will help us on that front.

I am glad that there are things moving forward in the space of browser testing.

In the Q&A at the end the question came up "How can I prevent the `waitForElement()`?".
Christian says "it is something that you need there".
This is what I also see as the main issue, it causes lags, flaky tests, devs pulling out their hair
and tests to become hard to maintain. I have no solution either, I am also thinking about this
for years already ;).

## Talk 2: It's not About Your Assertion Library

Now [@Mark](https://twitter.com/novemberborn),
maintainer of [ava](https://github.com/avajs/ava), 
starts by giving a different talk. Cool.
The headline sounds like this will meet my expectations, he will talk about how to test,
not the painful browser testing.

The talk was not about assertion libraries or anything alike, it was an even higher
level talk. Ok. I didn't expect that either.  
Still it was very good to have this kind of talk, we don't talk about why and how to test
right often enough. Still it felt a bit like he was not able to find the rights words
to get through to me, but I know what he means. 🤔

Mark says in the after-talk Q&A.

> Back in the days, before docker, when you installed node on your machine ...

Thanks ;).

In the Q&A "What is your definition of integration tests?".
Define it yourself. Align with your team what are the right tests for your product
and call them whatever you want.

## Sponsoring

What? There are companies that really label themselves to do 
"Enterprise Jamstack Websites"? Wow, what happens when the Jam is not sweet anymore?
Pffff... 🤷🏽

## Talk 3: Your Tests Lack Vision

[Angie Jones](https://twitter.com/techgirl1908)
starts with [a video on inattentional blindness](https://www.youtube.com/watch?v=ubNF9QNEQLA&t=15s), 
which already makes very clear where she is going (since I know what applitools does).
Then comes a lot of slides for nodding, especially if you have done visual testing a couple 
of times.

> When you are writing your tests, you are scripting in your inattentional blindness.

She came across a broken website, and then:
> I did what any of you would do, I opened the dev tools.

I love that. She still finished the process but also mentioned that she thought
about the non-devs that don't even know about devtools. Yo yo.

She is getting her point across quite well, she bascially sells the AI browser testing
approach the company she works for does. I am totally on board and I think this
is a very good way to do it, hence 
[my ML tidbit on "Machine Learning vs. Screenshot Comparing"](/tidbits/2020/08/machine-learning-vs-screenshot-comparing/).
I just can't stop having the impression that this is more of a sales talk
than a talk for a conference.

## Panel Discussion 

The moderator Yoni Goldberg is throwing some numbers in the room, I like that to
get a feeling for the speed in the field of testing javascript.

First question is about Github Actions. Kent C. Dodds touches on the monopolistic
trend just briefly, not enough I think. I have my problems with github actions being
so dominating. I have a [draft post](/blog/2020/06/26-why-move-to-codeberg/) 
that was triggered by me learning github actions,
leading to go to codeberg (without having anything like github actions).
The marketplace makes it "open source" was a sense I got from the discussion, I am not
sure I can agree.

Also here it sounds like the browser testing is what people like a lot.
Unit tests are always mentioned on the side, but I am not sure it gets the love
it should. Maybe I just have an old style view on this.

Oren says "integration testing you get high coverage really fast", without
touching on the tradeoffs. Then he mentions that he also hates flakiness and
prefers 20% of his code tested and be reliable, over 100% tested but flaky.
Later he does state the big difference of testing at the top of the test pyramid
and at the bottom. Well done.

Jason Palmer says "keeping quality high pays dividence over time". *nodding hard*

"When should I write a unit test?" and "What is a component test?" Yoni asks the panel.
Kent states that more integration tests prevent needing unit tests (how I heard it). Aha.
Though he also says that algorithmic things (as he calls them) are 
where he sees unit tests being needed.
Yet another time that I understand that we don't really have the same view
on testing.

Nancy says it: "integration tests is a term we are not aligned on". I agree.

Mmmh, Yoni summarizes the panel kinda like this: test on the user's side, 
network and UI! And (he said) we still have the "old tools" like 
unit testing.
And that gives me food for thought, having learned testing from 
JB Rainsberger's and
[Integrated Tests Are A Scam](https://www.youtube.com/watch?v=VDfX44fZoMc).
Do I look at it from the wrong angle. But the test quality I have seen 
in the last years and I see in most places is so low, that I am not sure
we are on the right track dismissing testing the small things and just 
testing from the user's chair.

I need a break ... bbl

## Talk X: Contract Testing with pact.io

Matt Fellows shows us how integration tests actually will fail you when your system grows.
Thanks. I am not loosing faith.
Yep, contract tests, this is the thing we want between parts of our system.

Ok, I realize the integration tests things like *-testing-library
is a different flight level to what pact.io and the thing Matt talked about.
