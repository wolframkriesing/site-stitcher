dateCreated: 2016-02-07 19:44 CET  
tags: ruby, learning  

# Discovering ruby #4

In the [ruby koans](http://www.rubykoans.com/) I now came across array functions. 
One is `collect` and I thought, this is `map`, and the comment below said

> 'map' is another name for the 'collect' operation

Moving on, I noticed that `filter` has different names too:

> 'find_all' is another name for the 'select' operation

So I need to hammer new names in my head and actually also map them
and not forget that they are aliases for each other.
Better or not, I can't say. I got used to `filter` and `map`.
* `map` can be: `collect`
* `filter` is: `find_all` or `select`
* `reduce` is: `inject(start_value)`

## Iterators, yield

Somehow I have to say that the way iterators are used in ruby makes them 
seem way more simpler and intuitive to use than I know them from ES6.

```
def many_yields
  yield(1)
  yield(2)
end

many_yields { |item| result << item } 
# result = [1, 2] 
```

Maybe it's because the block syntax is so not-like-a-function.
And inside the `many_yields` method you can use `block_given?` to find out
you had been called with a block. Quite handy.

## `ensure` for a method

I have just seen this constructor for the first time, in the koans

```
def find_line(file_name)
  file = open(file_name)
  # do stuff and return
ensure
  file.close if file
end
```

Wow, this is so cool, if we don't misuse it.
Ensure that a certain block of code is always executed at the end of a function,
no matter which execution path was taken.
