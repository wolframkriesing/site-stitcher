created_at: 2018-05-13 11:15 CET  
tags: coderetreat, jscoderetreat  
old_urls: /blog/2018/05/jscoderetreat-13/

# JSCodeRetreat #13, Tetris again

It was the second time that we did Tetris as our task for the JSCodeRetreat and I have to say,
that the participants' comment made me realize that we are on the right track.
Though not all comments were purely in favor of Tetris, I think Tetris is the better
task for a (JS) CodeRetreat.

## Slicing, or: Identify a First Feature

At a CodeRetreat, no matter which task, I always see that the people need one or two sessions
to not see the task as the problem anymore. With Game of Life (GoL) people mostly need to properly understand
it first before they become really productive. With Tetris this is no different. But the game itself
is way better known and therefore easier to grasp, it seems to me. This does also hook the people
easier and they believe they have it all under control.

In the first session I mostly ask the participants to pick one feature of Tetris and try to think of
a first set of tests for this feature that they might want to implement. It differs a lot what
people identify as a feature and how detailed they write out the first test descriptions.
Some people start implementing very early on. In this case I often see the chance to ask them
to simplify the problem they want to solve. In the first session it rarely happens that people do
already get into a fast rhythm with a short feedback cycle. This makes it very easy to ask them
for the second session to try to iterate fast from test to test.

You see the challenge, right? Slicing a huge problem such as Tetris is possible in soooo many ways.
I have seen many "first features" that one can solve and could start with. And even those features
are sometimes way to big. Here lies a lot of potential for us to learn and practice. How can
we:
- support slicing problems small and also
- try to identify the depth of such a sub-problem and, maybe even more important,
- find out the value of such a sub-problem that we might want to tackle and start building and
  eventually ship to our customer?

Are we doing the product owner's job here? Even if, I believe that programmers must look at the big picture
and figure out what brings customer value. That's why I walk around in the first session and ask always:
"What do I, as a player, get from this feature that you chose?". And if the answer is something like
"you get a board" or "you can see tetris blocks" than people start re-thinking their choice automatically.

## Core Problem

Interesting to learn and also to understand for me is: What is the core of the task?
I have no answer, but when seeing us work on Tetris I always ask myself: Is there some kind of core
that we have to start with? Can we build everything out of tiny modules and later plug them
together? Do we run into a wall when we don't start with the core? Is a set of tiny well-defined
modules (without any core) always capable of forming a big picture and working piece of software?

This might seem really stupid to ask. Who knows :). (I don't.)
I am not the best software architect, I am more the low-level developer, I love to
dig deep into the root of things, rather than architecting the big picture.
Therefore I might have these questions. If you have answers, please throw them over the fence,
I would love to learn.

## Implementation Details

Let me go from the big picture, in the paragraphs above, down into the depth of writing code.
The temptation to make people not think of arrays for a Tetris board was so big, so often
during yesterday's CodeRetreat. But I tried to resist and let people discover this by themselves.
Marco, one of the participants even mentioned in the closing round that he now also sees
how Tetris can even be implemented without a board. That was kinda cool.

Another example that I had seen about implementation detail, was that the pair wanted to
implement just "the rotation of the I-block" (the test description). So the test was kinda a like this:
- input is `[1,1,1,1],[0,0,0,0],[0,0,0,0],[0,0,0,0]`
- rotate the block and
- check that the result is `[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0]`.

I saw this and asked how to make the code more look like the test description. I am a fanatic
about having test descriptions be as expressive as possible and I have high hopes that they also influence
the readablity of the code, or even better that the code becomes the test description in the programming language's syntax.
So the array of arrays up there seemed not really expressive, I thought. And the problem that was to be
solved could be written as code in a much simpler form, I believe. For example something like `{shape: 'I', angle: 0}`
which becomes `{shape: 'I', angle: 90}` after rotation.
It would have the same meaning and be readable. Wouldn't it?
That might just be my subjective view and hope ... who knows.

In one discussion I was asked how to test the implementation details. Remembering my first days
in TDD, I was testing every implementation detail, and I was convinced it was necessary and right.
So I asked the questions that eventually might lead to understand that implementation details are
nothing that a test should care about, because it would just couple the test to tightly to the
actual code that fulfills what the tests ask for and turn off the ability to refactor. In the
end that leads to code that rots, because we won't be able to take care of it.

Tetris is also a great task, no different to GoL, which allows us to think abstract and put concepts
into code that are more business concepts than technical concepts. It is very tempting in GoL
like in Tetris to construct the board as an array. Learning not to do that is a big step, I believe.
It opens up new ways to think about code and embedding product concepts deeper into the code itself.
Which in turn again triggers the thinking of how to get the right domain language into the code.
In the next step this makes us programmers ask ourselves how to cooperate better with the product owners.
All those logically connected steps make it so necessary and valueable for us programmers to
practice writing better code, using better words, being expressive ...
and apply the [four rules of simple design][4rules].

[4rules]: https://leanpub.com/4rulesofsimpledesign

## TODO

- [x] slicing problems small
  - [ ] give some examples, to make it easier to understand, for what i mean by 1st feature
- [x] what is the core problem
- [x] what of this big task can i deliver that is valueable? - covered by 1st paragraph
- [x] is the board to be an array an implementation details?
- [x] do i need to think about implementation details early?
- [ ] it has: user interaction, a tick, visual only data, complex enough logic
- [ ] if you want to make it more complex: feel free
- [ ] i think it attracted more newbies - love it
- [ ] no UI!

related_tweets:

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="en" dir="ltr">If Schoppenhauer wrote Javascript: tetris pieces that generate a board by existing, <a href="https://twitter.com/hashtag/jscr13?src=hash&amp;ref_src=twsrc%5Etfw">#jscr13</a> <a href="https://twitter.com/goosebumps4?ref_src=twsrc%5Etfw">@goosebumps4</a></p>&mdash; Daniel Bolívar (@ddanielbee) <a href="https://twitter.com/ddanielbee/status/995265941171855361?ref_src=twsrc%5Etfw">May 12, 2018</a></blockquote>
<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="en" dir="ltr">i have a new explaination for why feedback and trying makes lots of sense ... let&#39;s talk tomorrow at <a href="https://twitter.com/hashtag/jscr13?src=hash&amp;ref_src=twsrc%5Etfw">#jscr13</a> <a href="https://twitter.com/jsCodeRetreat?ref_src=twsrc%5Etfw">@jsCodeRetreat</a> <br>cu <a href="https://t.co/AvlrKQVGnr">pic.twitter.com/AvlrKQVGnr</a></p>&mdash; ⪡Web-Componenter⪢ (@wolframkriesing) <a href="https://twitter.com/wolframkriesing/status/995071651644674053?ref_src=twsrc%5Etfw">May 11, 2018</a></blockquote>
