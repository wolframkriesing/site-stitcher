tags: purescript

# Purescript #5 - Compiling for the browser [Unfinished]

And to build the source code for the browser run

```
$ pulp browserify
```

To eliminate dead code, use

```
$ pulp build -O
```

the output is much smaller!

Open the shell like this:
```
$ pulp psci
```

```
> :browse Global


decodeURI :: String -> String

decodeURIComponent :: String -> String

encodeURI :: String -> String

encodeURIComponent :: String -> String

infinity :: Number

isFinite :: Number -> Boolean

isNaN :: Number -> Boolean

nan :: Number

readFloat :: String -> Number

readInt :: Int -> String -> Number
```
