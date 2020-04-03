# Trash Your Servers and Burn Your Code: Immutable Infrastructure and Disposable Components

[a talk by Chad Fowler][7]

> Software gets too complex, tests slow, test coverage doesn't make you feel good, so you deploy less.
> The less often you deploy the scarrier it becomes.

I was just about to quote him on

> comments are a code smell, there is just no way to validate them

which I strongly agree on. And just one sentence later he says this

> Tests are also a design smell. If you find yourself more time in your tests,
> and I don't mean in the design of your system.

which I just can't follow along. Because I think the test as your first user of the
code is doing exactly that for you "driving your design". Especially when your code is so
small and modular that you think you are doing great design that's when a test
is so easy to write and a simple way to also verify the code later (as opposed to comments)
which is the value the tests add. They serve as the docs for what your tiny-modules-composition
does, they allow others to go in change requirements and learn where they have to be implemented.
And so on. Don't they? Maybe I will get to that stage of understanding it at some point.

And Chad saying

> My intention is to write code that can't possibly break.

I admire him! I think I still have lot's to learn.

> TDD is a great way to do design, but it is not a great way to prevent bugs

I think we agree basically :)
[Watch his talk][7], it is really very good and contains enough brain food!

[7]: https://www.youtube.com/watch?v=DVSNsAei0VE
---
created_at: 2014-01-24 10:00 CET
---
tags:

testing
video
---
youtube_id: DVSNsAei0VE
---
post_type: summary
