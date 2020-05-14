dateCreated: 2015-11-11 12:47 CET
tags: ruby, learning, knowledgebase    

# Discovering ruby #1

One method three different return types

```ruby
> [1].slice(2)
=> nil
> [1].slice(0)
=> 1
> [1].slice(0,1)
=> [1]
```

Ranges, including and excluding

```ruby
> (1..3).to_a
=> [1, 2, 3]
> (1...3).to_a
=> [1, 2]
```

aha, it's not that `...` is the one including the latter number, it's actually excluding.
I guess this has been done in order to make `..` behave as in other languages.

Now combine including/excluding and slicing, and I would say ... it has potential to become hard to read :).

```ruby
> [1,2,3][1..-1]
=> [2, 3]
> [1,2,3][1...-1]
=> [2]
```

Destructuring the ruby way, has some nice sugar.

```ruby
> one, *all = [1,2,3]
=> [1, 2, 3]
> one
=> 1
> all
=> [2, 3]
```

interesting what the irb returns for the first line.

Ruby has a built in `Hash` class, which takes a default value. I am getting the hang of it and it
seems to make sense in the way one has to think in ruby.

```ruby
> h = Hash.new('default')
=> {}
> h[:some] = 42
=> 42
> h
=> {:some=>42}
> h[:other]
=> "default"
```

Hash default values are an interesting thing. I have to say it seems I need to learn them,
the logic is something I don't get yet, but I am just starting :).

```ruby
> h = Hash.new([])
=> {}
> h[:one].push(1)
=> [1]
> h[:one] << 2
=> [1, 2]
> h[:one] 
=> [1, 2]
> h[:two]
=> [1, 2]
> h = Hash.new('nix')
=> {}
> h[:no].concat('no')
=> "nixno"
> h[:yo]
=> "nixno"
```

This means that the default value can be updated using something that looks like accessing 
a value of the hash, which seems to be something to keep in mind, and not forget!!!
Currently I think default values for hashes should not be used.
