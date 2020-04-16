dateCreated: 2020-04-16 11:05 CET  
tags: design, developer  

# A developer designs

[Uku][1] creator of [plausible.io][4] had written a nice article on how to design, 
even though one is a miserable designer, as I am. A must read if you own the same skill deficiency ;).

[In his article][2] Uku says a couple of simple and good things like "Copy designs you like",
"Start without code" and "Lose your ego and get some feedback" - if you wanted the quick learnings from
his article you are done. But there is more good stuff, [I strongly recommend to read the full article][2].
He also says read the book "Don’t make me think" and "Refactoring UI". I ordered the first one and
it sounds like I can do reading of a bit over 200 pages. Looking at his [plausible.io][4] convinces me
to follow his learnings, because look around on this page (picostitch.com) here, it needs some good design.

At the end Uku writes 

> When a developer says they suck at design they often think that they’re lacking an innate ability or 
> talent to design. That’s like saying you can’t play the piano because you weren’t born with that skill. It’s absurd.

Oops, did I start the post complaining I am a bad designer? Lalalala ... 
So get up and learn about it, I am convinced he is right. We can learn anything.
Will we become masters in it, maybe not. But better every time we practice it. So starting is the key.

## Accept Knowledge Gaps - Move on

Just one thought that came up while reading and trying to get somewhere with my design skills, is that
I am really good in stopping myself by having too many constraints, which also make me go forth and back.
See the commits on [this repo][5] for creating this site, I started having no styles for the links, pure default HTML.
Later I set `text-decoration: none` and some color for the links because I saw that at some blog and it
looked awesome. After reading [Accessibility for UX Designers][3] I added the `text-decoration` back in,
because 

> When you remove the underline from links, people with limited colour vision may be unable to recognize the links.

Makes sense to me.

Wandering between not knowing enough, or maybe better knowing there are gaps in my knowledge
about Accessibility, Usability, User Experience and so on sometimes blocks me. But I am aware and trying
to just accept my lack of knowledge and skills.
Though the things I try to strive for, that I have seen done wrong (imho) in so many places are the following:
- Simplicity - I try to use less code, less dependencies, less noise.
- Semantics - HTML can be simple not semantic enough, but there are add-ons like schema.org
- Simple CSS - What if I turn off CSS will my site still be usable? Just stretch your mind to challenge
  the current status quo.
- No JavaScript - Ok, no JS is quite far fetched but hey, the site currently has no JS, what for would it need it?
  I have ideas on how to add some, but always just to enhance the usability (or fun), never make it essential.
  
Let me go figure out how to get some structure into my design skills, following Uku's foot steps.

[1]: https://twitter.com/ukutaht
[2]: https://plausible.io/blog/learning-design-as-a-developer
[3]: https://accessibility-for-teams.com/accessibility-for-ux-designers
[4]: https://plausible.io
[5]: https://github.com/wolframkriesing/site-stitcher