dateCreated: 2015-12-03 23:52 CET  
tags: emberjs, javascript  

# Exploring emberjs

730.975 byte - the size of the main JS file of an empty app that ends up in the dist folder
after building the app by `ember build --environment=production`.

131,7 Mb - the size of the directory and it's content 
where I just initialized a new ember app, using `ember init`.
Looking into the `node_modules` folder I see that bower, npm, babel and many others
are dependencies of ember. Is it creating it's own eco-system inside an npm package?

On [the page][ember-objectmodel] in the ember guide about the object model, 
you can read that ember extends the native `Array` and the `String` prototypes.
Accidentally I had seen that `Function` also gets extended. Did we not learn 
from history?

You can't deny that ember tries to bring things from Ruby and rails to JavaScript.
There is `init()` as kind of constructor, monkey-patching Array, String, Function and others?
The reopening of classes and I guess you can list a couple more. 
I am sure this makes ember very appealing to all the rails/ruby enthusiasts.
The prevention of many of the things ES6 provides and "just doing it different"
makes this framework really move away from the language.

I see all my knowledge and tools that I learned over the last years becoming almost useless.
Refactoring will be basically impossible with Ember, computed properties that are used
as strings all over the place make it basically impossible to find them all and replace them
correctly. Renaming is such an essential thing in continuously improving software.
Do I really want to have it take away?

I stumbled over `this` usage in mocha in my early days of using ES6 and remembered how I thought
the new arrow functions actually changed how functions work. The real truth is, `function`
did behave wrong until now, because it made `this` special and not simply a normal variable.
That was when I realized that arrow functions do it right, now comes ember around the corner
and does also rely on this relict of `this` inside a function is special #magic

```js
// works
Router.map(function() {
  this.route('about');
});

// does NOT work, TypeError: _this.route is not a function
Router.map(() => {
  this.route('about');
});
```

In short: be careful where you use the arrow functions in ember!

My different view on npm and the usage of packages led me to a [first pull request][ember-mypr] 
for the ember homepage. I just couldn't see that I was supposed to install ember globally.
Smashed :).

Don't use:
- observers, [reasons are explained on the site itself][ember-observers] and they are perfect to 
  create hard to find cyclic dependencies, esp. given their synchronous nature, they just call for it.
  Suggested solution: use `Ember.run.once`, make the framework's problems my own :( 
- [deep magic][ember-deepmagic], such as `Ember.computed.map` (see), creates a listener on an arrar basically and 
  sets up an iterator over it, mixes too much into one thing

Some interesting finding:

> The enumerable API follows ECMAScript specifications as much as possible.

I understand it like this: We follow the spec, unless we know better.

> For arbitrary filtering, use the filter() method. The filter method expects the callback to 
> return true if Ember should include it in the final Array, and false or undefined if Ember should not.

This is standard JS, my friend ...

Ember has an `any()` method, which is [described as such][ember-any]

> To find out whether at least one item in an enumerable matches some condition, you can use the `any()` method:

The [MDN says about `some()`][ember-somemdn]:

> The some() method tests whether some element in the array passes the test implemented by the provided function.

I didn't even get to build the Game of Life ... it seems.

[ember-objectmodel]: http://guides.emberjs.com/v2.2.0/object-model/
[ember-observers]: http://guides.emberjs.com/v2.2.0/object-model/observers/#toc_observers-and-asynchrony
[ember-deepmagic]: http://guides.emberjs.com/v2.2.0/object-model/computed-properties-and-aggregate-data/
[ember-any]: http://guides.emberjs.com/v2.2.0/object-model/enumerables/#toc_aggregate-information-every-or-any
[ember-somemdn]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
[ember-mypr]: https://github.com/emberjs/website/pull/2425
