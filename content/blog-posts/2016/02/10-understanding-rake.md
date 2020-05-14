dateCreated: 2016-02-10 10:00 CET  
tags: ruby, knowledgebase    

# Understanding rake in order to keep on reading "Objects on Rails" 

[This document][why-rake], I assume by Jim Weirich made me understand 
where rake came from and it will hopefully also make it easier for me
to understand getting a grip on how it ticks. This is something I need
when working with tools.
I found the above in [this rake tutorial][rake-tutorial].

Still I have a hard time finding a concise overview of what rake offers.
Everyone talks about a DSL but I can only find bits and pieces of what
this DSL offers. There seems no complete overview. Now in the above mentioned
article I found that `directory "tmp"` creates a directory of the given
name. Never seen this before.

Tasks are defined using the DSL like this `task :name ...`.
But for a task that execute tests I can only find this piece of code
everywhere

```ruby
Rake::TestTask.new do |t|
  t.libs << "test"
  t.test_files = FileList['test/test*.rb']
  t.verbose = true
end
```

should it not be something like this

```ruby
task :test => [Rake::TestTask] do |t|
  t.libs << "test"
  t.test_files = FileList['test/test*.rb']
  t.verbose = true
end
```

I would understand that. But the very different syntax used above 
doesn't stick in my head and somehow yells at me "I don't want to be part of the 
DSL, I want to be Ruby".

[why-rake]: http://rake.rubyforge.org/files/doc/rational_rdoc.html
[rake-tutorial]: http://jasonseifer.com/2010/04/06/rake-tutorial
