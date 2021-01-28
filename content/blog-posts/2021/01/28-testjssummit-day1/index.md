dateCreated: 2021-01-28 16:10 CET
tags: conference, JavaScript

# TestJSSummit Day 1

It just started. I warmed up talking to @Jacek, we both thought it starts at 15:00
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

tbc...