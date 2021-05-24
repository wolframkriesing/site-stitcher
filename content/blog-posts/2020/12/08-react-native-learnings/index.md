dateCreated: 2020-12-09 01:49 CET
tags: React Native

# React Native Learnings

```
const iosShadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
}
```

## `overflow=hidden` prevents a shadow
does not show a shadow
```
<Pressable style={{overflow: hidden, ...iosShadow}}>
```

Remove the `overflow` attribute, which hides the shadow
```
<Pressable style={{...iosShadow}}>
```

## `<Text>` styling is limited, wrap it in a `<View>`

on iOS 
```
<Text style={{borderRadius: 5}}>
```
does not render a round corner, do
```
<View style={{borderRadius: 5}}>
  <Text>
```

## React.useEffect() - deep compare works on iOS

Watch out. Actually `React.useEffect()` does not deep compare.
Something like `React.useEffect(yourFn, [anObject])` triggers
`yourFn` to be called on every render. You have to use the props explicitly
`React.useEffect(yourFn, [anObject.prop1, anObject.prop2])`
which makes sense.

Here is the catch: I developed on iOS and it all worked, while I was
using the deep-compare approach (`[anObject]`) accidentally.
Then I tried it on Android and it did NOT work.

I assume this is due to the different JS engines. Would be interesting to
explore this some further.
