# Android Ripple Effect Analyzed
slug: android-ripple-effect-analyzed
dateCreated: 2020-12-04 18:00 CET
tags: react-native, android, mobile

[React-native](https://reactnative.dev) has a component `Pressable`. Used like so `<Pressable>clickable thing</Pressable>`.
It has one Android-specific [attribute `android_ripple`](https://reactnative.dev/docs/pressable#android_ripple-android),
which defines what this very useful UX ripple effect looks like.
I feel this visual feedback is very user-friendly, it indicates if a click was detected.
So I am investing time in making it work well, but it's not that easy.
Let me share my learnings.

The ripple effect is the red dot flying in on the button. Can you see it?
This is a native Android feature provided by react-native to be kinda controlled from there.
<figure>
    <img src="../ripple-anim.gif" alt="Ripple animation" width="600" />
    <figcaption>Ripple effect in action</figcaption>
</figure>

## The Context
It's all about react-native, correct. I am currently using v0.63.2 (just in case someone case along, reads this and screams "it's all wrong", check the version first).
My Android version is [API Level 28](https://en.wikipedia.org/wiki/Android_Pie) and 
the device I use is a [Cosmo Communicator made by Planet Computers](https://www.www3.planetcom.co.uk/cosmo-communicator),
that's also why you see a landscape video.

## Contents

1. [No `onPress` no Ripple](#no-onpress-no-ripple)
1. [Background Color on a Child Disables Ripple Effect](#background-color-on-a-child-disables-ripple-effect)
1. [Workaround: How to still use a Background Color?](#workaround-how-to-still-use-a-background-color)
1. [Don't add `borderless`!](#watch-out-though---dont-add-borderless)
1. [Add `borderRadius` - Works](#add-borderradius---works)
1. [The Ripple Radius](#the-ripple-radius)
1. [Building a Round Button](#building-a-round-button)
1. [Conclusion](#conclusion)

## No `onPress` no Ripple
The `<Pressable>` must receive a prop `onPress`, if that one is missing I got no the ripple effect.

**Expectation**: I had expected `onPress` can be left out, ripple still works.

```
// No `onPress`, NO ripple effect visible!
<Pressable
    android_ripple={{color: 'red'}}
>
    <Text>Click me</Text>
</Pressable>

// The `onPress` exists, ripple effect visible.
<Pressable
    onPress={() => {}} 
    android_ripple={{color: 'red'}}
>
    <Text>Click me</Text>
</Pressable>
```
Even a `onPress={noop}` works. So I assume the argument is just checked, I didn't dive into the source code 
(but it's [probably somewhere in there](https://github.com/facebook/react-native/blob/master/Libraries/Components/Pressable/Pressable.js)).

**Learning**: Always pass at least a `noop` to onPress to make sure the ripple effect is visible.

## Background Color on a Child Disables Ripple Effect
The ripple effect is turned off by any child inside a `<Pressable>` that has a background color.

**Expectation**: I did **not** expect this. I had expected the ripple effect to overlay any child component, no matter how it is styled.
```jsx
// The ripple effect is NOT visible.
<Pressable
    onPress={() => {}}
    android_ripple={{color: 'red'}}
>
    <Text 
        style={{backgroundColor: 'blue'}}
    >Click me</Text>
</Pressable>

```
The above code just disables the ripple effect basically. So you click and you get no visual feedback
if you clicked or not.

The below code shows, that the ripple effect still takes place, just behind the text component.
There is an opacity on the text, which lets the ripple effect shine through and the colors mix.
```jsx
// The colors red and blue mix, 50/50, so you can see the ripple effect is behind the text component.
<Pressable
    onPress={() => {}}
    android_ripple={{color: 'red'}}
>
    <Text 
        style={{backgroundColor: 'blue', opacity: 0.5}}
    >Click me</Text>
</Pressable>
```

If you give the Pressable a height, higher than the child element, here the text, you will also see the 
ripple effect show in the parts that are not covered by the child element.
```
<Pressable
    onPress={() => {}}
    android_ripple={{color: 'red'}}
    style={{height: 100}}
>
...
```

## Workaround: How to still use a Background Color?
I want the content to have a background color though.
So I moved the background color to the Pressable component. That works.

```jsx
<Pressable
    onPress={() => {}}
    android_ripple={{color: 'red'}}
    style={{
        backgroundColor: 'blue',
    }}
>
    <Text>Click me</Text>
</Pressable>
```

But it also creates one interesting effect, the color of the ripple effect is not pure red, as
defined below, but it is red and blue mixed together.

**Expectation**: I would not have expected the colors to mix, I thought the ripple effect was a solid color.

## Don't add `borderless`!
When you add the attribute `borderless` to the `android_ripple` prop the background color
is gone.

**Expectation**: I did not expect the `borderless` attribute to influence how the component is styled.

```
// The attriute `borderless=true` REMOVES the background color!
<Pressable
    onPress={() => {}}
    android_ripple={{color: 'red', borderless: true}}
    style={{
        backgroundColor: 'blue',
    }}
>
...
```

## Add `borderRadius` - Works
I also have the requirement to make the pressable a circle, so I will use `borderRadius`.
I did not expect this to work, but it does. No problem here.

```
<Pressable
    onPress={() => {}}
    android_ripple={{color: 'red'}}
    style={{
        backgroundColor: 'blue',
        borderRadius: 10,
    }}
>

```

## The Ripple Radius
In the docs I did not find any info on what the `radius` attribute on the `android_ripple` prop
really does. It says "Defines the radius of the ripple effect." ... doh, sorry but I thought that it was
some kinda radius. But I figured it out.

```
// A big circle animates into a tiny one, of 1 pixel.
<Pressable
    android_ripple={{color: 'red', radius: 1}}

// A big circle animates into a 20 pixels big one, that's where the animation ends.
<Pressable
    android_ripple={{color: 'red', radius: 20}}
```

It seems that the start of the animation is always about 50dp (just an estimate).
Once you click, it animates to the size you have set to `radius`.

If you set `radius=1` you see an animation from 50dp down to 1dp, a circle that becomes smaller
over time.

If you have `radius=50` it kinda looks like there is a static circle on the screen for a short amount of time.

If you have `radius=100` it looks the entire circle stays at 100dp and just fades in and disappears. Nothing fancy.
But does the job.

That seems to me like, the property should be called `endRadius` or `animationEndRadius` or something.

## Building a Round Button
My actual goal was to build a round burger menu item **with a proper ripple effect**.
Now that I explored the ripple effect (and react-native's use) in depth I am ready to use it.
It looks like this right now:

```
const diameter = 100;
const circle = {
    backgroundColor: 'white',
    padding: diameter / 4,
    borderRadius: diameter / 2,
};
return (
    <Pressable
        onPress={onPress}
        android_ripple={{color: 'red', radius: 20}}
        style={circle}
    >
        <IconBurgerMenu width={diameter / 2} height={diameter / 2} />
    </Pressable>
);
```

## Conclusion
I am not sure if I am not understanding the docs, expecting wrong things or simply not getting react-native yet.
But I have a feeling that there are a couple of gotchas, that might also be called bugs.
I will link it in the according places, maybe it feels helpful to someone.
