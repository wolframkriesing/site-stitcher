dateCreated: 2015-11-16 14:01 CET
tags: ruby, learning  

# Me discovering ruby #2

I know that the calling of functions can be quite noise-less, no parantheses and commas.
But it also leaves me baffled at times. I can't get my head around this one either.

```
> "abc".sub(/./) {1}
=> "1bc"
> "abc".sub((/./), "1")
=> "1bc"
```

It might also because I have no docs at hand right now (due to being offline).
In the first version I don't see if `{1}` is the second parameter to `sub` or the parameter
given to a function returned by `sub(/./)`. The second call makes sense, just 
strange that the second parameter must be a string here and not a block (which is what `{` and `}` mean, I suppose).
Keep going, it will come to me some day :).
