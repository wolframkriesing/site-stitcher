dateCreated: 2020-06-12 11:27 CET
tags: CSS, web, design, knowledgebase
isDraft: true

# CSS - `rem` **and** `em`
Which unit to use, `rem`, `em` or even `px` (just to mention the most common units) when writing CSS
seems to be an ongoing discussion. For people entering the space of web development
the hurdle just gets higher, the complexity is continuously growing. There are 
[more units](https://developer.mozilla.org/en-US/docs/Web/CSS/length#Units) than ever,  I counted 21, 
there is more sites to learn from. It is not easy to  figure out where and how to start.\
I will try to analyze this a bit applying what I know and have learnt over the last
25 years of web development.

## The User Agent Rules
The user agent, the browser, 
[the user in the end, rules](/tidbits/2020/04/the-end-user-always-has-ultimate-control/) 
when it comes to font-sizes.
Every user can customize their browser settings and determine what is the default look of sites (that respect that).
Unfortunately there are sites that do not respect the user's settings, which is quite sad.
The people that have customized their font-sizes are most probably those that are negatively effected by 
those pages that do not respect the user's decision.

## My Default is `rem`
For the reasons given above my default is `rem`.
I do not modify the root font-size, mostly set via `html { font-size: ...; }` in CSS.
Since the user should be the one in control I don't change this font-size.
Above all, don't make it smaller, the user will appreciate it.
Wearing glasses I can tell how important it is for me to be in control of the (font-)size
of what I look at.

## The Unit `rem` is Relative to the User's Preferences
[MDN describes](https://developer.mozilla.org/en-US/docs/Web/CSS/length#rem) 
the unit "rem" like this:
> Represents the font-size of the root element (typically `<html>`). 
> When used within the root element font-size, it represents its initial value 
> (a common browser default is 16px, but user-defined preferences may modify this).


