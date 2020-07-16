# Clean Architecture Book to Read?
slug: clean-architecture-book-to-read
dateCreated: 2020-07-16 12:42 CET
tags: architecture, to read?

I have this book 
[Get Your Hands Dirty on Clean Architecture](https://leanpub.com/get-your-hands-dirty-on-clean-architecture)
on my reading list, actually just as an open tab in my browser for a long time now.
I just put it down here, maybe I come back to read it.
Not sure if it is good and worth the time, but I like the topic and I think it is very relevant to
understand this better.

<figure>
    <img src="../clean-architecture-book.gif" alt="The book on leanpub." width="400" />
    <figcaption>The book on leanpub.</figcaption>
</figure>

Looking at the table of contents I really like the first chapter already.

    1. What’s Wrong With Layers?

    It Promotes Database-Driven Design
    It’s Prone to Shortcuts
    It Grows Hard to Test
    **It Hides the Use Cases**
    It Makes Parallel Work Difficult
    How Does This Help Me Build Maintainable Software?

Especially the bold "It Hides the Use Cases". I think most of our code is not structured
by what it does but by how a language or framework suggests us to do it.
That might also be the reason why I find Hexagonal Architecture and alikes so appealing.

Find [the book on leanpub](https://leanpub.com/get-your-hands-dirty-on-clean-architecture).

# OpenSource Firmware is Important
slug: open-source-firmware-is-important
dateCreated: 2020-07-11 14:37 CET
tags: open source, 

<figure>
    <iframe width="427" height="240" name="video" src="//www.youtube.com/embed/mUTx61t443A" frameborder="0" allowfullscreen></iframe>
    <figcaption>Why Open Source Firmware is Important • Jessie Frazelle</figcaption>
</figure>

[@Jessie Frazelle](https://twitter.com/jessfraz) lays out why that is.
If you really care about the things you ship, watch this!

Below I am just extracting some of the things that I find that important, that I need
to extract them (so I can quicker re-read them again).

## Security First, at Least try Your Best
Just watching the first 5 minutes of her talk, and seeing her 
[dotfiles using `docker run`](https://github.com/jessfraz/dotfiles/blob/master/.dockerfunc)
all over is so coherent. She cares about having control over the software and hardware
she uses and this is well visible in the docker-using dotfiles. 
If it is 
[audacity](https://github.com/jessfraz/dotfiles/blob/dce5b9ace3f975de7063bf130928518069759081/.dockerfunc#L87-L99),
[aws-cli](https://github.com/jessfraz/dotfiles/blob/dce5b9ace3f975de7063bf130928518069759081/.dockerfunc#L100-L106),
[chrome](https://github.com/jessfraz/dotfiles/blob/dce5b9ace3f975de7063bf130928518069759081/.dockerfunc#L151-L192),
[figma](https://github.com/jessfraz/dotfiles/blob/dce5b9ace3f975de7063bf130928518069759081/.dockerfunc#L248-L257) or 
[many others](https://github.com/jessfraz/dotfiles/blob/dce5b9ace3f975de7063bf130928518069759081/.dockerfunc#L78-L80)
there is a `docker run` for it. So good!

I also gave a talk on just using Docker to have a reproducable environment
and also to have less things clutter my computer, but most responses were very skeptical.
Great to see that she actually took it way further. This encourages me too to continue pushing
this path. Thanks for the inpiration [@Jessie](https://twitter.com/jessfraz).

## Talk to Each Other
Around [minute 22](https://youtu.be/mUTx61t443A?t=1366) she comes to a conclusion, which does not only apply to firmware producing companies,
but to many companies (Hint: Conway's Law, as she also pointed out).

<figure>
    <img src="../jessie-1.gif" alt="Miscommunications at various layers lead to bugs in the intersecting layers, based off incorrect assumptions." width="300" />
    <figcaption>Miscommunications at various layers lead to bugs in the intersecting layers, based off incorrect assumptions.</figcaption>
</figure>

## Connecting the Dots
Continuing listening to her talk right after the phrase linked above, she continues
reasoning why working on firmware is so exciting to her and she sees a big opportunity there.
I learned about her company [oxide.computer](https://oxide.computer/) a couple weeks ago,
when I saw [@Steve Klabnik](https://twitter.com/steveklabnik) join them.
In Oxide Computer it looks like she is doing exactly that. Fixing the things she is concerned about
in her talk. Again, very inspiring!

## Closing
If you are thinking of, or even building something and even shipping hardware (that you don't control)
think twice and watch this talk.

> It is very nice when things are minimal and they just do what they are supposed to do.

[Jessie Frazelle at 30:23 min](https://youtu.be/mUTx61t443A?t=1823) 

See below how she concludes this talk. If you are not convinced this makes sense, watch the talk
I believe she has a VERY good point there.

<figure>
    <img src="../jessie-2.gif" alt="Through open source, visibility, minimalism, and open communication we can push computing to a better, more secure place from the hardware up." width="300" />
    <figcaption>Through open source, visibility, minimalism, and open communication we can push computing to a better, more secure place from the hardware up.</figcaption>
</figure>

<figure>
    <img src="../jessie-3.gif" alt="We can't keep building on top of 💩. We really need to care about the base we build on." width="300" />
    <figcaption>We can't keep building on top of 💩. We really need to care about the base we build on.</figcaption>
</figure>

Don't 🚢 💩.

# Web API ValidityState
slug: web-api-validity-state
dateCreated: 2020-07-02 14:38 CET
tags: web, web API, learn, spec reading

It was the [@standardsbot](https://twitter.com/standardsbot) that made me learn and look up
[ValidityState](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState). While that bot tweets
weird stuff, there is always a learning in it. This time it was about ValidityState.

## What is `ValidityState`?
[MDN describes it](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState) as

> The `ValidityState` interface represents the validity states that an element can be in, 
> with respect to constraint validation. Together, they help explain why an element's value 
> fails to validate, if it's not valid.

I have to say, that this indirect explanation of an "interface" might be totally correct, but
makes it harder to understand. One first needs to be sure to understand what an interface is.

## The HTML Spec Says
In this case the [explanation in the spec is much better](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#validitystate).

> A `ValidityState` object has the following attributes. On getting, they must return true 
> if the corresponding condition given in the following list is true, and false otherwise.

I think "`ValidityState` object has the following attributes" makes it so much better to understand.
Especially when you keep reading on. The spec explains it brief, short and explicit:

> `valueMissing`\
> The control is suffering from being missing.
>
> `typeMismatch`\
> The control is suffering from a type mismatch.
>
> `patternMismatch`\
> The control is suffering from a pattern mismatch.
>
> `tooLong`\
> The control is suffering from being too long.
>
> `tooShort`\
> The control is suffering from being too short.
>
> `rangeUnderflow`\
> The control is suffering from an underflow.
>
> `rangeOverflow`\
> The control is suffering from an overflow.
>
> `stepMismatch`\
> The control is suffering from a step mismatch.
>
> `badInput`\
> The control is suffering from bad input.
>
> `customError`\
> The control is suffering from a custom error.
>
> `valid`\
> None of the other conditions are true.

So, don't be scared of specifications, they are sometimes really valuable, helpful and insightful.

## What are these Attributes for?
That's the question, I asked myself next.

The spec goes a bit abstract about it. I just pulled out three sentences that might need some
explanation.

> A submittable element is a candidate for **constraint validation**.\
> [...]\
> The `checkValidity()` method, when invoked, must run the **check validity steps** on this element.\
> [...]\
> An element satisfies its constraints if it is not suffering from any of the above **validity states**.

If you read this again and again and let it sink in it might start making sense.
But it basically means (without being spec-exact) that you can call `checkValidity()`
on any form element, such as an `<input>` and it checks all the above listed attributes
of the ValidityState object. The attributes are all booleans, so the result of 
`checkValidity()` can be easily evaluated based on all values.

Open your browsers console and try out the following:

```
> document.querySelector('input').checkValidity()
true

> document.querySelector('input').validity
ValidityState {valueMissing: true, typeMismatch: false, patternMismatch: false, tooLong: false, tooShort: false, …}
```

This should give you a first good feeling for what the ValidityState consists of.
I assume you can already imagine use cases like better, more detailed validation messages and alikes for your next web app.

## Part of Constraint Validation API

The `ValidityState` is part of [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation), 
so there is quite some more to it, which MDN describes as

> The Constraint Validation API enables checking values that users have entered into form controls, 
> before submitting the values to the server.

## Try it out
Since this is a web site, I think it makes sense to play around with it right on the site.
So try out below what kind of `ValidityState` attributes you get depending on an input field
with different attributes.

## The Simple `<input type=text>`

Simple text input with **maxlength=3**. Try to shorten the value down to three characters and see `tooLong` change.
 
* [ ] `<input `**`type=text`**` maxlength="3" value="12345" />`
* [ ] `<input `**`type=text`**` required />`
- [ ] `<input `**`type=text`**` maxlength="3" value="12345" />`
- [ ] `<input `**`type=text`**` maxlength="3" value="12345" />`
- [ ] `<input `**`type=text`**` maxlength="3" value="12345" />`
- [ ] `<input `**`type=text`**` maxlength="3" value="12345" />`

<code>&lt;input type=</code>
<select id="select-input-type">
    <option>text</option>
    <option>button</option>
    <option>checkbox</option>
    <option>color</option>
    <option>date</option>
    <option>datetime-local</option>
    <option>email</option>
    <option>file</option>
    <option>image</option>
    <option>month</option>
    <option>number</option>
    <option>password</option>
    <option>radio</option>
    <option>range</option>
    <option>reset</option>
    <option>search</option>
    <option>submit</option>
    <option>tel</option>
    <option>text</option>
    <option>time</option>
    <option>url</option>
    <option>week</option>
</select>
required <input type=checkbox>
<code>&gt;</code>

<input id="validity-state-pure-input" type="text" maxlength="3" value="12345">
ValidityState: <pre><code id="validity-state-output"></code></pre>
<script type="application/javascript">
    const showValidity = (validity) => {
        const keys = Object.keys(ValidityState.prototype);
        const all = keys.reduce((all, key) => { all[key] = validity[key]; return all; }, {});
        document.querySelector('#validity-state-output').innerText = '> el.validity\n\n' + JSON.stringify(all, null, 4);
    };
    const el = document.querySelector('#validity-state-pure-input');    
    el.addEventListener('keyup', (evt) => {
        const validity = evt.target.validity;
        showValidity(validity);
    });
    showValidity(el.validity);
    document.querySelector('#select-input-type').addEventListener('change', ({target}) => {
        const newType = target.selectedOptions[0].value;
        el.setAttribute('type', newType);
        el.value = newType;
    });
</script>