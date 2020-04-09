dateCreated: 2014-02-05 10:00 CET
tags: oop, naming, class name, software design, jscr
postTypes: summary

# Just looks like OOP ...

Linked in the [comments of this][8] I found [another great article][9], which
I just have to quote.

> Unlike other disciplines, software development shows little interest for classics. Most people are more attracted by recent works. Who cares about some 20 years old paper when you can play with Node.js?

io.js! LOL

> a vision of objects like little virtual machines, offering specialized services. Objects were meant to be smart. Hide data, expose behavior. It's more than that: Alan is very explicit about the idea of methods as goals, something you want to happen, unconcerned about how it is going to happen.

__expose behavior__

> It is unfortunate that much of what is called “object-oriented programming” today is simply old style programming with fancier constructs

Is he talking about me? I am trying hard!!!

> Software development is about discovering and encoding knowledge. Now, humans have relatively few ways to encode knowledge: a fundamental strategy is to name things and concepts.

Good wrap-up of why naming is hard.

> If you can't find a proper name for the class, try naming functions. Look at those functions. What is keeping them together? You can apply them to... that's the class name :-)

I have to remember that. Maybe that could be a good session for a [JSCodeRetreat][jscr], finding
class names.

> Handler, again, is an obvious resurrection of procedural thinking. What is an handler if not a damn procedure? Why do something need to be "handled" in the first place? Oh, I know, you're thinking of events, but even in that case, EventTarget, or even plain Target, is a much better abstraction than EventHandler.

Ouch, that hurt. I still catch me wanting to write various Handlers. I like the EventHandler
example.

[8]: http://objology.blogspot.de/2011/09/one-of-best-bits-of-programming-advice.html
[9]: http://www.carlopescio.com/2011/04/your-coding-conventions-are-hurting-you.html
[jscr]: http://jscoderetreat.com
