dateCreated: 2015-10-23 10:00 CET
tags: OO, values, value object, objects, business object, entities, jskatas, knowledgebase  

# Value Objects and Business Objects or Values and Objects

My pet project [ES6 Katas] is a playground for learning, if you look in [the repo][es6katas repo]
you see lots of things moving around and changes made. Most of it is because I try to apply
new learnings and try to get to a structure that really is what I consider good software.
Lots of new bits of information I learn I try to apply there or at least play around with it
and figure out what's a better way to do things. This often might end up in a forth and back of things
and in not being able to decide what is right, and it looks like nothing moves forward, but that's
just on the surface.

Mostly it's when I am writing tests that things just bubble up, and that's also what I see tests being
most valueable for: they make you question things. In this certain situation I was trying to 
figure out if a kata as used in this project, is a value object or a business object. This lead me to
investigate what do the thoughtleaders in this area say that a value object is. Where I stumbled over
multiple sources. One of those great sources is the well-known [c2 wiki]. I identified the site about
[Value Objects][valueobjects-1] and [Business Objects][valueobjects-2] 
(also called [Reference Object][valueobjects-3]) most important.
Also the wikipedia site on [Value Object][valueobjects-4] is a good start, but it lacks some deep insights,
which I think are necessary in order to learn when and how to find out and apply those properly.

Here is a short upfront answer, taken from [the paper][valueobjects-5] I will mostly quote later about figuring out what
is a value or a business object.

> There is no fail-safe technique to decide whether some tangible or intangible concept is of a value or
> object type.

In other words, there is no right or wrong wether the thing you build is a value object or a business object.

Michael Feathers summarizes a value object calling it a pure value, which I think make it very clear too:
> you can not change the value of 4. 4 is a value. To me, a ValueObject is something which represents a pure value.
[quoted from here][valueobjects-6].

The following are (commented) quotes with a less C++ view on things, but rather a focus on the language agnostic
parts of [the description by Dirk Riehle][valueobjects-7] and fellows on value and business objects. The paper itself
is available as a [PDF][valueobjects-5] too.

> The most prominent advantage of values over objects is that values are side-effect free. 

The paper summarizes the properties of values

> * Values are abstractions (universals or concepts) which model abstractions from a problem domain.
> * Values have no lifecycle (i.e., they do not exist in time, are not created nor changed nor deleted).
> * Values have no alterable state; representations can only be interpreted, not changed.
> * Values are referentially transparent (i.e., there are no side-effects of using a value on other parts of the system).

> From a conceptual point of view, we are still dealing with value types, be they implemented as classes or not. 
> We call an instance of a value type a "value object". 
> We call value types which require implementation constructs like classes
> non-primitive value types.

Properties of objects

> * Objects are representations of phenomena from a problem domain.
> * Objects have a life cycle (i.e., they exist in time, can be instantiated, changed, and deleted).
> * Objects have identity that unambiguously denotes them (thus, they can be referenced).
> * Objects can be shared, which is a consequence of that objects can be referenced.

> While values exist independently of time in an invisible universe of values, objects do exist in time

> objects exist in time, they can be distinguished from each other by their identity (property
> O3). A value, in contrast, has no identity, because there are only occurrences of representations

> Object identity is a value type of particular importance

> On an implementation
> level, the possibility to share objects is an important concept for reuse and integration, but
> also a source of major headaches (side-effects through aliasing). No such concepts and problems exist
> for values (property V4).

> In software development, we can distinguish at least three different types of models: domain analysis,
> system design, and implementation models.

> While no hard rules exist, and every decision must be done pragmatically, our experience shows that
> value types are better reserved for lightweight abstractions

When dealing with a language that has no built-in value types, like JavaScript, where you may build them
using classes, you have to ensure that the property of a value don't get broken. Imagine the following:
`let x = 3; y = x; y++` The initial value of `3` assigned to `x` never changes, because this primitve 
value is provided by the language itself. When we now build this with a custom type, which can be done using
a class, we have to ensure the immutability of it by code. It is not built in.
So we may build something like this class 
```
class MonetaryAmount { 
  constructor(value) { 
    this.value = value; 
  } 
  add(amount) { 
    return new MonetaryAmount(amount.value + this.value); 
  }
  equal(amount) {
    return amount.value == this.value;
  }
}
```
And to ensure all the properties of a value object, see the complete 
tests [here in a gist](https://gist.github.com/wolframkriesing/af7c17b5ed8f375c7b40).

In the DDD world, the two things seem to be called Value Objects and Entities, as can be read
here [What is the difference between Entities and Value Objects?][valueobjects in DDD]
This article describes a nice example which also reflects the difference between the two:
> Imagine that our application allows the person to track their current location. When 
> the person is able to successfully connect to the internet and authenticate with our 
> application a new Location object is created. This Location object has attributes for 
> longitude and latitude. The Location object is a Value Object because we don’t care about 
> the specific instance of the object we only care that it is a location.

## In a modern/scripting language

A value object is the one whose identity is defined by its state rather than by its address. 
How do we properly transfer this to modern/scripting languages (that don't work with memory
allocation as described in the [paper referenced above][valueobjects-5])?
I am thinking about:
1) There is no real notion of an address in JavaScript (maybe let's call it a reference).
2) If we share a value object that is immutable, does it really matter if it is the same reference? The garbage collector
does the job of cleaning up references for us, so let it do it's job and let's reuse things. Or not?

[ES6 Katas]: https://jskatas.org
[valueobjects in DDD]: http://culttt.com/2014/04/30/difference-entities-value-objects/
[es6katas repo]: https://github.com/tddbin/es6katas.org
[c2 wiki]: http://c2.com/cgi/wiki
[valueobjects-1]: http://c2.com/cgi/wiki?ValueObject
[valueobjects-2]: http://c2.com/cgi/wiki?BusinessObject
[valueobjects-3]: http://c2.com/cgi/wiki?ReferenceObject
[valueobjects-4]: https://en.wikipedia.org/wiki/Value_object
[valueobjects-5]: http://dirkriehle.com/computer-science/research/1998/ubilab-tr-1998-10-1.pdf
[valueobjects-6]: http://c2.com/cgi/wiki?ValueObjectsCanBeMutable
[valueobjects-7]: http://dirkriehle.com/computer-science/research/1998/ubilab-tr-1998-10-1.html
