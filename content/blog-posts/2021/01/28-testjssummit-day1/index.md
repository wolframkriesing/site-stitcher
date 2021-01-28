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

> When you are writing your tests, you are scripting in your unintentional blindness.

She came across a broken website, and then:
> I did what any of you would do, I opened the dev tools.

I love that. She still finished the process but also mentioned that she thought
about the non-devs that don't even know about devtools. Yo yo.


tbc...