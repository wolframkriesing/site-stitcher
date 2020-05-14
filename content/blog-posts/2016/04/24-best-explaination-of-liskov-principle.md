dateCreated: 2016-04-24 10:00 CET  
tags: oop, SOLID, knowledgebase    

# The best explaination of the Liskov Principle - by Allen Holub

You want to learn with really good examples why all inheritance
is bad, and why you should think twice if you want to inherit
in places or if you jump on the ship with the new tool/library/framework
that forces you to inherit from it's base class.
Watch the first 30 minutes https://vimeo.com/163860086 (exactly until 30:00).

> Coupling is bad. You can't eliminate it, if you did, you wouldn't have a program

https://vimeo.com/163860086#t=5m48s

> The more you know how the other object works, 
> the worse off you are form a maintenatnce point of view.

https://vimeo.com/163860086#t=6m14s

Regarding subclass

> When u are using subclass objects, you are also using super class objects.

https://vimeo.com/163860086#t=7m0s

> Inheritance makes no sense at all, unless its reasonable, to pass to your subclass 
> object, any message and all messages defined at the super class level.
> If there are super class level methods that dont make any sense at subclass level
> then you shouldnt be using any inheritance at all. It's that simple.

https://vimeo.com/163860086#t=7m23s

A great example for how to break the Liskov Principle (one of the SOLID principles).
> If you find yourself in a situation where you are extending a super class
> and you have override everything, something is really wrong.

https://vimeo.com/163860086#t=10m2s

> It is always true that you can replace extends relationships with 
> implement relationships.

https://vimeo.com/163860086#t=23m36s

He spells out why using a delegate is better than implicitly having it 
happen (as inheritance would do). Also does his tiny sub-sentence
remove one of my mixed feelings I had about ruby's delegate built-in.
Which does look like nice sugar but is a bit less "safe", due to it's
nature of trying to make you write less.

https://vimeo.com/163860086#t=25m20s

And he closes this part by saying

> That's our trade-off we added a tiny bit of complexity.
