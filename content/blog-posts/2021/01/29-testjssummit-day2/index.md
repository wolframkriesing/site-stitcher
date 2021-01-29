dateCreated: 2021-01-29 16:20 CET  
tags: conference, JavaScript, a11y   
previewImage: preview.png  

# TestJSSummit - Notes for Day 2

## Talk 1: The Cypress Talk

He starts taking apart how he categorizes tests. 
What kind of tests he suggests to use for what kind of part of an application.
They are tied to technical boundaries.
For example testing a server backend he suggests to use API tests,
for "individual piece of code" he suggests a unit test, and so on.
In the end he is advertising that cypress will have a node test runner.
I think I get it, this is how cypress "sees" the kinds of tests. Maybe
I didn't listen properly in the beginning :).

Next he suggests that certain kinds of tests (written using cypress)
is "too short" he says, "this is unproductive". The tests are testing a single
DOM element's attribute each. I would not say they are too short, these
are just the wrong kinds of tests. Testing DOM elements' attributes'
values is not very often useful. As usual, it depends. [I did that too][testing-dom-attributes].
Though I am not sure if putting all assertions into one test is the better
strategy, this will result in not knowing why a test failed. Maybe another
indication for the wrong kind of test?

Confirming my above assumption, he says too long tests make you unproductive,
but I am not sure I can agree to the reasons, like "the longer the test 
the higher the chance the browser will run out of memory and crash". What?
I am not sure I want this kind of web application. Does this imply that cypress
causes those memory overflows? I mean browsers are kept open on websites for ages
nowadays, right?
Also, the argument that shorter tests allow for faster problem detection, is what
I tried to say above too.

As usual, it depends. I think long tests are sometimes very useful. For example
I prefer just a handful of tests to ensure the critical paths of my site/app
work and people can do the most important things. They can take long and give
me security and are easy to maintain, because there are few of them.

A cypress assertion might be like `should('not.be.visible')`? String?
Mmmh, that is what I am always struggling with with the expect-kind approach
of writeing assertions. Have a look at [hamjest] an assertion library that allows
you to write very expressive assertion, that are readable, auto-complete and
output well readable, useful errors.

He brings forward really good arguments for good documentation.
Oh yeah, good docs makes life easier. Not only for the users, also for the maintainers.
He even looks for searches on the docs page that return no results and writes
docs for it. Pretty cool!  
Cypress team has a tool that parses markdown files and runs the examples that are in there,
just like http://fitnesse.org does.  
Promote your own docs, as he does. This is pretty cool, forces you to improve them
but also focuses on usability! Kudos!!!

Mmmh, in the Q&As Gleb mentions the "big test" for testing a user journey,
like an entire shopping experience, as a good test. I agree. So I guess how I understood
his arguments about big tests being unproductive,
in the beginning, is just not to be understood as the absolute. As usual, it depends.

## Talk 2: Playwright

There is pupeteer out there, but now there is [Playwright](https://playwright.dev), the cross platform
browser automation testing tool, headless as far as I know.
It is not like selenium but rather like a virtual user
using the browser, by interacting via the native interfaces, I think.  
This was my 2 cents, before the talk starts. Now off to listen to Arjun Attam from
Microsoft talking about Playwright.

He touches on new features coming to the web continuously. I am curious how
he gonna show that Playwright will be catching up fast with those.

I like this example, it shows well what plywright is good at and made for:
```js
const {chromium, firefox, webkit} = require('playwright');
```
Ok, the `require` is old-style, but it shows well that playwright is for automating all
browsers. Yeah!
Oh, and "Playwright webkit is available across all platforms [...] you can use webkit
to test for your Safari issues in your Linux CI environment". Isn't that cool?
* Playwright can run in headless and headful mode.
* it can emulate devices, like an iPhone 11
* it can tell the browser to have certain permissions turned on (e.g. geolocation, notifications, ...)
* you can set color scheme to dark,
* you can set the browser "to be" in a certain geo location (giving lat+lng)
* set a locale
* mock certain URLs
* listen to events such as console calls, domcontentloaded, websocket connections, ...
* ...

All this is just not possible with tools that run inside the browser.
I love it. This is the right way, I think.

Very important is what he says about how interactions on the page are handled,
e.g. the code:
```js
await page.goto('irrelevent-url');
await page.click('a-selector');
```
he says that playwright prevents the use for waiting and timeouts by automatically 
waiting internally before executing the `page.click` until the element
* is visible,
* is done animating,
* is ready to receive click events.

"All this internally done for you". Cool. Of course you can build the wait conditions yourself too. Good.
Isn't that what cypress is doing under the hood too?
I am curious how much those two are aligned, work together, etc.

In the Q&A Arjun mentions that Playwright will provide a test runner. 🙈
Why? There are enough out there. I am sure users wanted it, that's why they are
doing it but why not invest the time in things that playwright can become better
at than redoing what others do. Why not just document better how to use test runner
X or Y with playwright? I guess they discussed that.
I didn't find the test runner on the website. Mmmh.

## Talk 3: Detox (Mobile end-to-end test for apps)

Rotem Mizrachi-Meidan says they started [detox](https://github.com/wix/Detox) 
for testing their React Native app.
Oh, this sounds like I need this at my current job. We have it set up, but until
now we didn't have time to catch up and tbh I was also a bit reluctant to use
such a (seemingly) heavy tool. I only heard about installation problems until now ;).
Let's see how well Rotem will sell it (to me).

Detox only "acts" when there is nothing more to do, no network requests, no animation,
the app has nothing to do he says. Mmmh, that sounds clever.

"Our test are easy to run and they are cheap to run." He says after he has explained
the imho complex and big architecture of their Wix app. I am really curious how
those two go together.

"Detox doesn't have any screenshot comparison mechanisms. It can take device-level screenshots
and element-level screenshots, to compare them with external apps." That is one piece
of information I was looking for. Thanks for sharing Rotem!
They use aplitools to compare the screenshots, to prevent the slight pixel diffs.
Sounds clever.

He later touches on mobile CI and mentions that they tried all the tools.
He says that the problem is always android emulators, which he states run
better on Mac than on Linux. This is news to me. I have not experienced that yet.
They have an internal CI on VMWare with real Macs.
Oho, compilation times are slow. Yep, I know what you talk about.
Mac Minis he says they reached 2x compile speed.
Oh, I misinterpreted, he is of course talking about running the detox tests on those machines.
Yep, I can imagine this to be fun (not).
Their QA engineers are faster than running their tests on servers. Oho.

And the talk is over. Surprise.

Afterwards the poll actually offers me the list of (all the) mobile test automation tools.
There is: Appium-based, Detox, Espresso and XCUITest.

Oh, in the Q&A when Rotem was asked about device features like camera, turning the device on/off,
going offline, etc.
he says that detox runs on simulators, not on real devices yet (on iOS).
But they seem to be working on that on iOS.
Faking/mocking network stuff is nothing they can solve and do yet.
Camera just works, there is nothing that blocks it, he says. Not sure what that means.
He mentions that he has just written 
[this blog post "Detox: Writing Stable Test Suites"](https://medium.com/wix-engineering/detox-writing-stable-test-suites-372c9d537184).

## Talk 4: A11y

[Ava Wroten](https://www.wroten.me/) 
starts by saying that in her talk she will be using a lot of emberjs, the
framework she works with mostly. Very interesting, I used to do quite some ember
a while ago, we did not become best friends. I remember it shipping yet one more npm
with it. That made me very suspicious. But I have heard things have improved.

> People with disabilities are the worlds largest minority

Well said. Emberjs has first class a11y support. That is cool. Reminds me
of dojo, it had also brought this from the beginning all the time.
Yep, if there are pitfalls in the framework they bubble up all the way 
into every app using this framework, she says.

So many good hints, I will fallback to listing the tools she mentioned and examples she listed, 
which often make it clear what the tool does:
- [axe-core](https://github.com/dequelabs/axe-core) 
- https://www.deque.com/axe/ has browser extensions
- axe support is built into Svelte 🎉
- @axe-core/react, `axe(React, ReactDOM, 1000)`
- vue-axe, `Vue.use(VueAxe)`
- jest-axe, `exepct(await axe(html)).toHaveNoViolations()`
- @axe-core/webdriverjs
- cypress-axe, `cy.injectAxe(); cy.checkA11y()`

Good tip, is that a11y testing will always involve some manual testing.
And it is never complete without manual testing an app or site.
Automation is not getting it all.

Great request at the end:

> Hire someone different than you.

Thanks a lot Ava!

[testing-dom-attributes]: ..
[hamjest]: ..