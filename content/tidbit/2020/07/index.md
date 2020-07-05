# Web API ValidityState
slug: web-api-validity-state
dateCreated: 2020-07-02 14:38 CET
tags: web, API, learn, spec reading

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

<input id="validity-state-pure-input" maxlength="10">
ValidityState: <pre><code id="validity-state-output"></code></pre>
<script type="application/javascript">
    document.querySelector('#validity-state-pure-input').addEventListener('keyup', (evt) => {
        const validity = evt.target.validity;
        // validity-state-output
        const keys = Object.keys(ValidityState.prototype);
        const all = keys.reduce((all, key) => { all[key] = validity[key]; return all; }, {});
        document.querySelector('#validity-state-output').innerText = JSON.stringify(all, null, 4);
    });
</script>