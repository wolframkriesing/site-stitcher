dateCreated: 2015-12-08 23:27 CET  
tags: emberjs, javascript, framework  

# How Ember methods become computed properties

At this point in the [EmberJS Framework Basics Part 2 video][emberprops-1] 
the author explains how you can make (computed) properties out of 'normal' methods
by using what the ember.js `Ember.Object` offers.
It starts out with `friend.age()`, which returns what you expect. 
The author wants to write this as a property (as one accesses it in ember!) 
like this `friend.get('age')`.
How is that done? Well, ember extends the native prototype of `Function`, so
you can write this inside an ember object definition `age: function (){}.property()`.

The uber magic starts when you make the `age` depend on the `birthday`.
Which is done like this `age: function (){}.property('birthday')`. This is necessary
because the computed property `age` is only calculated at object creation time, not
on every read. In order to make it recalculate every time the `birthday` changes
you need to observe it, as seen above.

You better learn your ember!

[emberprops-1]: https://youtu.be/1NjWozl8bps?t=257
