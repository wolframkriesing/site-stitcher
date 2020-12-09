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
