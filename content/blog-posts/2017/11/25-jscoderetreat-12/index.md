dateCreated: 2017-11-25 19:15 CET  
postTypes: post  
tags: coderetreat, jscoderetreat  
oldUrls: /blog/2017/11/jscoderetreat-12/  

# JSCodeRetreat #12 using Tetris

It was [Evren] who triggered the idea of using Tetris as the task for the next JSCodeRetreat.
And I have to say it was a good idea, it was a bit more challenging than the Game of Life
and left more room for discussions and also allowed to explore more (software) design challenges.

[Evren]: https://twitter.com/yortuc

## Tetris As The Task

<div style="float: left; padding: 1rem;">
  <img src="./tetris-logo.png" alt="directions" width=100 class="sizeup-onhover-image scale2 origin-left-top" />
  <br/><em>JSCR Tetris Logo</em>
</div>

I had never implemented Tetris until a week ago. And back then I had not even finished it.
But when Evren and I, we coded on it for about 3-4 hours, it felt like a great problem to tackle at a
CodeRetreat. Usually we do Conways Game of Life (GoL) at CodeRetreats, which is a no-player game.
I have facilitated many CodeRetreeats with that game so it was time for something new.
I was also hoping for making the CodeRetreat more inclusive and attractive by using some game that
probably most people have already heard of.

Last weekend when I was on the train, and all the other people at the [#GDCR17][gdcr17], I TDDed a bit
on Tetris, for the second time. And I realized that this game can be tricky. It will probably be 
interesting to see what kind of approaches people will come up with. It felt like there is many ways
one can approach this game. With the GoL there seems to be a limitted number of approaches that people
normally come up with. With Tetris I had the feeling that it would be many more.

So I got hooked and knew that was it. I themed the [#jscr12][jscr12] with Tetris and I even built an ugly
logo for it :) (if you want to improve it please do so!).

Before discussing the day I would like to state how I think Tetris differs from the default CodeRetreat
task, the Game of Life.

[gdcr17]: https://twitter.com/hashtag/gdcr17?f=tweets&vertical=default
[jscr12]: https://twitter.com/hashtag/jscr12?f=tweets&vertical=default

## Tetris vs. GoL

What is different to the GoL? At first it seemed like Tetris is an alike-sized problem. But I think it
is a couple times bigger problem. 

GoL is a so called no-player game, it has **no state**. Every 
generation is "complete". It depends on the previous one, but as soon as the generation is "done"
it does not know anything about its past.
There is nothing that needs to be stored across generations. It can be extended to be that complex though.
Tetris counts scores from the start until the end of the game. The falling piece changes its position over time. 
There must be something like a tick that advances the game. 
This tick accelerates over time. The falling piece can be rotated and its rotation angle must be "remembered" across ticks.
So there is a bit more state with Tetris. And I think this is also closer to real life problems, there
are so many non-trivial problems out there that feel alike difficult (if not even more). And taking a game
for practicing, especially such a famous game, makes accessing the problem easier, I think.

Tetris challenges the participants to **think simple** in order to start somehow and to get something
done in 45 minutes.
GoL is the other way around, it starts out simple and can be extended to be complex. 
In the last years I have seen more problems around simplifying 
tasks than extending them. In the end you can say its the same, because its about easy to change
systems. And that is all what good software design is about.
Still I see the advantage that Tetris has to be simplified by the implementors and I think
this task is the one that needs to be practiced harder and made more obvious to the people.
Additionally Tetris feels simple in the beginning until you get into the nitty gritty details,
it teaches us as well that estimations are always wrong. 

**User interactions** are another thing that Tetris has to offer. Especially in the JS world
we have lots of user triggered functions or event functions or alikes. And Tetris does also have
at least the controls for steering the falling piece. Additionally it has the timer interval that changes over time.
The controls are just like most JS applications, they take place at arbitrary times
so that the implementor has to cater for that. The system itself can receive input from the outside world.

If after all Tetris still seems to simple, it can be extended just like the various GoL 
"extensions" that exist out there. Make it 3D, add more shapes, implement ghost pieces,
vary the gravity and so on.

## First Session

The first session was, as one would expect it: play Tetris :). Ok, there was a tiny twist to it. The
participants were supposed to collect the requirements for Tetris. They had to play two different implementations
of Tetris. There are lots of them on the web and each has a little twist, so I asked them to find out 
what makes up the Tetris game. When I went around and watched the pairs over the shoulder I also asked them
to write down a first test case. Most of them already had one, but many did fight with writing out one
explicit test case that they could also implement.
I asked them to think small, to be explicit and try to narrow down the test description that one can 
implement. Words and phrase like "random", "many", "some", "should", "must work" and alike triggered me to
ask the pair if those descriptions are good enough to write test case for.
Lots of them "refactored" their first test description. I had the feeling that all the participants
already saw that the breaking down the problem into pieces will be an important task throughout the day.
And they were right.

<div style="float: right; padding: 1rem; padding-top: 0;">
  <img src="./test-descriptions.png" alt="directions" width=200 class="sizeup-onhover-image scale2 origin-right-top" />
  <br/><em>Test descriptions</em>
</div>

I had expected the participants to find many different subtle differnces in the various Tetris implementations
out there, but that didn't really happen in the first session. It was no problem, but surprised me a little bit.
I think for the next time I will have to try to specify the first session a bit better, a bit more 
explicit and tighter. I would like the participants to pick a certain Tetris feature and explore it really in depth.
There had been pairs that discovered parts of Tetris that I had not thought one could focus on separately, but 
that was great to see and fun to explore with them. And actually in our last mob session we started exactly
with one of those features, which was the rotation of a block.

## TDD and Ping Pong

Next sessions we focused on TDD and pair programming. To most of the TDD was new and pair programming seemed
not to be part of their daily job. After every session we always had very productive and interesting conversations
where people shared their learnings. I felt that Tetris has many more things to discuss. We actually got
around to discuss technical "issues" quite late. We had a lot of ground to cover since it is not easy and straight
forward to start implementing Tetris. You can start in many places. Depending on where you start it can become
quite difficult soon. That convinced me to stick to Tetris also for the next JSCodeRetreat.
Practicing TDD and pair programming can be done just as well, I had no doubt.

## Array functions

After lunch I shortly explained some array functions, like `filter`, `map` and also the rest and spread operators.
I asked the participants to use the array functions, to not use any loops and for those who wanted to stretch a bit
more to prevent the use of conditionals. I think everyone loved the conditionals challenge.

## Mob-Programming Session

One of the most interesting sessions in my opinion was the last one. We teamed up for a huge mob session. We
had been about twelve people sitting around on big screen. First we started to find out how to start.
We agreed to start with the rotation of a piece. I think most people expected us to start with some
kind of array that contains a Tetris piece and to rotate this array.
I spontaneously came up with representing a piece as an object like this `{name:'square', angle:0}`
and now the rotation part became quite simple. We just had to modify the angle by 90 degrees.
This triggered the discussion how we can really imagine this to be a piece that one can render later.
It also triggered the question if we need the `name` attribute at all, actually every piece could just have
an angle. The rotation is a piece of cake than. This pushes the responsibility of knowing what a piece looks
like to some other place, but it was also not a problem we had to solve now.
Interesting was also the idea of rotating a "vertical bar" (you know those 4 squares column) which then
becomes a "horizontal bar". So instead of changing the angle of a piece we would change the name of it.

After the rotation we on to the moving of a piece. First we implemented the `moveRight()` function
assuming that the position can be incremented any time. Than we questioned this approach and asked
who shall have the knowledge of determining if a piece can be moved right or not. Is it the board,
the piece itself or somewhere else. After a bit of discussion we injected a function into `moveRight()`
and that function can be called on every cell that the piece might occupy when moving right. This
way we moved the knowledge of the cells that have to be inspected close to where the piece is 
defined, into the move-function.

We also discussed a couple of times that a type system might help. We touched on property based testing and
mutation based testing. It was very valuable to me and I enjoyed it a lot, because the people cared
about discussing. It was a great atmosphere, very friendly, collaborative, welcoming and open-minded.

Actually noone missed implementing to render a Tetris block on the screen, I think.
We had enough to do without even painting it :).

## Thanks

First and foremost I want to thank all the participants for beeing part of this event.
I liked it a lot. It is always a pleasure again. And I will love to do it again.

<div style="float: right; padding: 1rem;">
  <img src="./directions.jpg" alt="directions" width=200 class="sizeup-onhover-image scale2 origin-right-top" />
  <br/><em>Directions</em>
</div>

Thanks a lot to [futurice] who have served us very well and sponsored drinks and food for the entire day.
They even had their own posters designed so people would find the location easier.

[futurice]: https://twitter.com/futurice

related_tweets:

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="en" dir="ltr">I like the approach we went for in our last <a href="https://twitter.com/hashtag/jscr12?src=hash&amp;ref_src=twsrc%5Etfw">#jscr12</a> session for implementing <a href="https://twitter.com/hashtag/tetris?src=hash&amp;ref_src=twsrc%5Etfw">#tetris</a>. <br>We started quite simple and had some valueable discussions, imho. <a href="https://t.co/3i0UQPmNX5">pic.twitter.com/3i0UQPmNX5</a></p>&mdash; programmer@work (@wolframkriesing) <a href="https://twitter.com/wolframkriesing/status/934480043711127554?ref_src=twsrc%5Etfw">November 25, 2017</a></blockquote>
<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="en" dir="ltr">1st session we played Tetris<br>2nd we TDDed<br>3rd was ping pong pairing<br>4th is about using array functions, no loops, no conditionals<a href="https://twitter.com/hashtag/jscr12?src=hash&amp;ref_src=twsrc%5Etfw">#jscr12</a></p>&mdash; JS CodeRetreat (@jsCodeRetreat) <a href="https://twitter.com/jsCodeRetreat/status/934409989690679296?ref_src=twsrc%5Etfw">November 25, 2017</a></blockquote>




