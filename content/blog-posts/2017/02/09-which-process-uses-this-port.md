dateCreated: 2017-02-09 18:00 CET  
tags: command line, linux, tooling, lsof  
postTypes: post  
oldUrls: /blog/2017/02/which-process-uses-this-port/  

# Find out which process listens on which port

The annoying `port 8080 is already in use` message and not knowing which
process is occupying this port sucks. I knew it was `lsof` that can help me.
But how exactly?
TL;DR: ``ps -p `lsof -i :8080 -t` -o command=`` (on Mac OSX)

I just wanted to start the react-native app via `react-native run-ios`.
It didn't start the first time. Because of my built-in laziness I just ran the command again.
Ran it again, and read the output, just than
```bash
Port 8080 already in use, packager is either not running or not running correctly
```
Ah the port is in use, that's why react-native didn't come up.
There was this handy linux command `lsof` (list open files). A simple
web search later and I found a [great article on it][article], which showed the solution `lsof -i :8080`
where `8080` is the port.
When you run this you might get something like this:
```bash
> lsof -i :8080
COMMAND PID USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
node    178 wk     13u  IPv4 0xaa0005c2e1d30003      0t0  TCP *:http-alt (LISTEN)
```
This is a nicely formatted table. It first lists `node` which is the command
that was run and is still running and occupying the port 8080.

## Which program is running?

In order to find out the full command was run the PID (process identifier) will help
us. Fortunately we got it in the line above, see the second column, it's 28161.
By adding `-t` to the `lsof` command we can receive only the process ID.
```bash
> lsof -i :8080 -t
178
```
Now we can pass the PID into `ps` (process status) and we will get all info about
the process running, like so:
```bash
> ps -p 178
  PID TTY           TIME CMD
  178 ttys006    0:01.00 node /Users/wk/cosmowiki/node_modules/.bin/http-server dist
```
In the last column we can see the command that was actually run.
So let's call `ps` so that it will JUST list the command that is running
and occupying port 8080. We do that by adding `-o command` which tells
`ps` to just show the command. This will leave an useless headline above the
command. We can remove it by passing an empty headline, which ps will
ignore, we do that by using the parameter we pass to `-o` as a key-value
pair and leave the value (the headline) empty. We use `-o command=`, looks
strange but works :).
```bash
> ps -p `lsof -i :8080 -t` -o command=
node /Users/wk/cosmowiki/node_modules/.bin/http-server dist
```
This results in just the command that I had run and which occupies port 8080.

## Kill the running process

Now I know why and I know what I have to stop, if I want to stop the process
right now, I can call
```bash
> kill `lsof -i :8080 -t`
```

## Some words about lsof

Just play around with it, and you will see there are many open files, and
on a unix style system most of the things are files, that's why a line count
of a `lsof` run will also show you quite a big number of lines.
```
> lsof | wc -l
14227
```

[article]: https://debian-administration.org/article/184/How_to_find_out_which_process_is_listening_upon_a_port

related_tweets:

<blockquote class="twitter-tweet" data-conversation="none" data-cards="hidden" data-partner="tweetdeck"><p lang="en" dir="ltr"><a href="https://twitter.com/wolframkriesing">@wolframkriesing</a> Small nitpick: My Linux ps doesn&#39;t know &quot;-p&quot; - Works on FreeBSD, and so I guess you use OSX :)</p>&mdash; My Own Worst Enemy (@anderiasch) <a href="https://twitter.com/anderiasch/status/834859794892730369">February 23, 2017</a></blockquote>
