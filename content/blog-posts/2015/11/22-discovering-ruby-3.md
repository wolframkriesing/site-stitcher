dateCreated: 2015-11-22 21:52 CET  
tags: ruby, learning, knowledgebase  

# Discovering ruby #3

This [article about closures in ruby][discover3-post] started somewhere by saying 
"Ruby has four different ways of using closures, each of which is a tad bit different, and sometimes nonsensical".

Finally a number that nails it. Now I know there are four ways of building closures 
(or at least that's the number it was in 2008).

> To start off, we re-opened the Array class and put our iterate! method inside. We will keep with Ruby conventions 
> and put a bang at the end, letting our users know to watch out, as this method might be dangerous!

Very interesting bits in here for me:
1. "re-open the Array class" - that's what it is called when a class gets
   monkey-patched (again)
2. a bang at the end of a method marks it as dangerous. Finally a very explict definition of what it means.

Later in the article I learned about the difference between a block and Proc. 
While this is still sinking into my brain, I think I will revisit this more often, in order to 
decide what to use when:

> Block: Your method is breaking an object down into smaller pieces, and you want to let your users interact 
> with these pieces.  
> Block: You want to run multiple expressions atomically, like a database migration.  
> Proc: You want to reuse a block of code multiple times.  
> Proc: Your method will have one or more callbacks.  

And finally this article covers lambda and the ruby method `method` which (in my words)
creates a reference to an existing method.

Very good article to learn about closures in Ruby. When I get the hang of how Ruby ticks inside
I think this will be way more rational to me, it is not yet.

[discover3-post]: http://www.reactive.io/tips/2008/12/21/understanding-ruby-blocks-procs-and-lambdas/
