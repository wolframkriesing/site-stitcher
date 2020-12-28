# Why Does my Media Query Not Work?
slug: why-does-my-media-query-not-work
dateCreated: 2020-12-28 21:56 CET
tags: HTML, media query, CSS, viewport

I am working on the [`<pico-viewport-stats>` element](https://wolframkriesing.codeberg.page/pico-elements/examples/viewport-stats.html)
examples. The web site is a simple HTML page, which I stripped down to the bare minimum.
A bit too much!

## For Mobile the Site needs the Meta Tag Viewport!
I viewed the page on a mobile and found out that the margin did not change to `1rem`.
Though I had this media query on the page.
```css
@media screen and (max-width: 600px) {
  body {
    margin: 1rem;
  }
}
```
So I simplified the page to remove all kinds of side effects, etc.
Didn't work.

It must be the headers. Yes. **The following header MUST be on the page** for
the page to work on mobile and also to apply the media query.
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
The media query will work afterwards, because the width will be set to the device's width.
Don't take my word for it, read 
["Using the viewport meta tag to control layout on mobile browsers" on MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag). 
It really enlightens about rendering and viewport behavior.






# HTML Element `<dfn>`
slug: html-element-dfn
dateCreated: 2020-12-27 12:56 CET
tags: HTML, web, knowledgebase

HTML is getting more and more semantic it seems.
I am seriously wondering what this means for building things like a blog, like this one
here. It becomes more and more reasonable to write pure HTML, instead of markdown, doesn't it?
Maybe I am just late and just learned about some HTML elements now. What a shame.

[On MDN it is described like this](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dfn):
> The HTML Definition element (`<dfn>`) is used to indicate the term being defined within the context of a definition phrase or sentence.

The example code shown there is:

```
<p>
  A <dfn>validator</dfn> 
  is a program that checks for syntax errors in code or documents.
</p>
```

Which renders like you see below:

<p style="background: lightyellow;">A <dfn>validator</dfn> is a program that checks for syntax errors in code or documents.</p>

## More HTML ELements
If you are curious and want to get a (quick) overview of all HTML elements and where and how to use them,
the ["HTML elements reference" on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) is a great place
to start reading and dive deeper. It has sections such as "Document metadata", 
"Content sectioning" and "Text content", to name a few interesting ones.

# Learning nginx
slug: learning-nginx
dateCreated: 2020-12-26 12:34 CET
tags: tools, server, nginx, web, apache

Until today I was just a copy+paster of nginx configs. I thought I had my share back when I learned and undestood
apache very well, so why learn another one. But my nextcloud setup and letsencrypt that comes with it has an nginx
"bundled", so I would like to understand things a bit better. So I started reading the docs and will take my notes here.

## Open Source Or Not?
I been surfing and reading on nginx.com which didn't feel very open sourcy and always mentioned "NGINX Plus",
where I felt I have to go and buy it, which was the intention, I guess. But I did find 
[nginx.org](https://nginx.org/) and reading the [about nginx](https://nginx.org/en/)
I also got the confirmation for my feelings, there is the open source universe and the commercial universe
for nginx. Very cool, I love it when open source can be made sustainable by having those that can/want/should
do pay for the software. Sounds like another open source based business at work, awesome!

## Notes on `server`, `server_name` and `location`

* The first server block (as the docs name it), looking like this `server {`, is **the default server**, used when none below matches
* **Search Priorities** is always 1) exact name 2) wildcards 3) regular expressions
  this seems to be that case for [server_name](https://nginx.org/en/docs/http/server_names.html) and location
  which I only found explained very much [in detail on nginx.com](https://docs.nginx.com/nginx/admin-guide/web-server/web-server/#nginx-location-priority)  
* **Location search priorities** are also explained [using examples here](https://nginx.org/en/docs/http/request_processing.html#simple_php_site_configuration)
* "locations of all types test only a URI part of request line without arguments" which means query params can NOT
  be used for filtering for a location, sounds reasonable since that might end in hell
* `location / {` matches any request and it will be used as a last resort
* regular expressions are PCRE, Perl regular expressions, [details for usage in nginx are here](https://nginx.org/en/docs/http/server_names.html#regex_names)
* The strange `server_name _` as I found in my nextcloud nginx, [is explained here too](https://nginx.org/en/docs/http/server_names.html#miscellaneous_names)
  > There is nothing special about this name, it is just one of a myriad of invalid domain names which never intersect with any real name. Other invalid names like “--” and “!@#” may equally be used. 






# Start Dockerized Apps on Boot, on Linux
slug: start-docker-on-boot-on-linux
dateCreated: 2020-12-24 15:32 CET
tags: tools, linux, command line, docker

I want to get my **nextcloud setup to run using docker-compose**, and to start with
I need a linux machine with docker running at start up. This is task #1, it looks
like [this blog post](https://blog.sleeplessbeastie.eu/2020/09/11/how-to-start-docker-service-at-system-boot/)
has the answers how to do it.

## The System

```
$ lsb_release -a
No LSB modules are available.
Distributor ID:	LinuxMint
Description:	Linux Mint 19.3 Tricia
Release:	19.3
Codename:	tricia
```

What the heck is `lsb_release`, never heard of it, and I can't imagine what that term means and 
how I could even ever remember it, since the abbreviation does not sound intuitive.

The man page says the following:
> The lsb_release command provides certain LSB (Linux Standard Base) and distribution-specific information.

## Get Latest docker
```
$ apt upgrade docker.io
Reading package lists... Done
Building dependency tree       
Reading state information... Done
docker.io is already the newest version (19.03.6-0ubuntu1~18.04.2).
Calculating upgrade... Done
0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
```

I have seen newer docker flying around. Mmmh. Will postpone this for now.

## See Docker Info from the OS level
Not sure this headline is right and makes sense to others. 
It does to me (until I know better).

```
$ service docker status # OR
$ systemctl status docker
● docker.service - Docker Application Container Engine
   Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
   Active: active (running) since Thu 2020-12-24 13:27:29 CET; 2h 14min ago
     Docs: https://docs.docker.com
```

The two commands above show the running docker service and some info and details.

## Make Docker Start on Boot

According to the article above it is "just":
```
$ sudo systemctl enable --now docker
```
and you can check that via
```
$ systemctl is-enabled docker
enabled
```
which print `enabled` now. I am not sure if this was not also the case before.
Let me reboot and see. ... Works! Cool.

## Not Just Text Files?
I learned stuff (which I am afraid I will forget too soon again, that's why it's written here).

What I am really wondering about is, that the Linux philosophy is that all things are
stored in pure text files, afaik. Why was this enabling of docker as a service not a simple 
"add this line in file X"? Maybe it was and I just didn't look in the right place under the hood.
Of the entire thing was a bit more complicated than expected and that's why there are 
scripts that do that for me.

Actually I thought back in the years, when I was doing more of Linux stuff by hand, 
that I used to manually just enter which deamons to start and that was it. But my memories might fool me.

## Just Text Files!
And the answer comes, right the moment after I asked the question and I needed to take the next step in my
nextcloud setup.

My next step is to make the nextcloud, which is running in a docker-compose setup start every time 
the machine boots. So even after a power outage, or whatever on next boot our private cloud will be online again.
No need to have me around all the time.

This [stackoverflow post](https://stackoverflow.com/questions/30449313/how-do-i-make-a-docker-container-start-automatically-on-system-boot/39493500#39493500)
explains exactly how to do it. And it is very simple, I am just listing the three step below, refer to the
so post to get all the details:
* Create a file `> /etc/systemd/system/nextcloud.service`
* Fill in the info, including how to start the service and finally
* `sudo systemctl enable nextcloud`. 

Applying my learnings from above, I think I can cehck if it worked.
```
$ systemctl is-enabled nextcloud.service
enabled
```
And reboot again. My nextcloud is up and running on machine (re)boot.
Yeah.

Here is my service file:
```
$ cat /etc/systemd/system/nextcloud.service
[Unit]
Description=nextcloud
Requires=docker.service
After=docker.service

[Service]
Restart=always
ExecStart=/usr/bin/docker-compose -f /nextcloud/docker-compose.yml up -d
ExecStop=/usr/bin/docker-compose -f /nextcloud/docker-compose.yml down

[Install]
WantedBy=default.target
```

And here is the proof that it all works, really:
```
$ systemctl status nextcloud
● nextcloud.service - nextcloud
   Loaded: loaded (/etc/systemd/system/nextcloud.service; enabled; vendor preset: enabled)
   Active: active (running) since Thu 2020-12-24 16:54:10 CET; 7s ago
```

## Update Docker Images with docker-compose 
I had built my nextcloud setup about a year ago, a simple `docker-compose build` did not update any of the 
docker images, but I am sure there have been changes to any of the layers, like the DB, the app, the nginx proxy,
etc. But why did it not update?  I tried 
```
$ docker-compose build db
db uses an image, skipping
$ docker-compose build --no-cache app
app uses an image, skipping
```
:(  
None works.

Because the right one is:
```
$ docker-compose pull
Pulling db (mariadb:latest)...
latest: Pulling from library/mariadb
...
```

Oh, and don't just update the nextcloud image and bump multiple major versions, it can't handle it.
Do one major version at a time! #justSaying
If you try `php occ upgrade` it will let you know, but it was already to late for me by then.






# `KeyboardAvoidingView` the Missing Docs
slug: keyboardavoidingview-the-missing-docs
dateCreated: 2020-12-19 17:40 CET
tags: React Native, mobile, android, iOS, docs
previewImage: ../leave-in-fall.jpeg  

If you are struggling with React Native's `KeyboardAvoidingView` and it does not behave as you expect, 
the most probable reason is some flex layout issue.
I highly recommend reading 
[KeyboardAvoidingView not working properly? Check your Flexbox Layout first](https://medium.com/@nickyang0501/keyboardavoidingview-not-working-properly-c413c0a200d4)
by Nick Yang.

Besides that I also think there is quite some more stuff that is hidden in the code and not in the docs.
I am just collecting the stuff here, mainly so I can look it up again.

## `behavior` prop explained

The `behavior` prop is not well explained in the React Native docs.

> Allow me to go through these attributes for the prop behavior one by one.
>
> I am considering the <TextInput> object for which our keyboard gets called.
>
> **"padding"**: The component goes to a higher position once the keyboard pops up. It is advised to use padding when there are not many components on the screen otherwise the layout might break where the Component may overlap with the components above it.(note: the components above it would also be moved up..but in order to adjust the Views there might be an overlap). Note: Here Both things : the TextInput and the components may get overlapped.
>
> **"position"**: the entire View containing TextInput would be moved up and there is a chance that some of the components above may not be available/visible on the top of the screen i.e. would be cut off from the top of the screen being the upper bound.
>
> **"height"**: generally used with keyboardVerticalOffset. It is used to resize the View of the screen once the keyboard pops up. Might as well lead to overlapping in an attempt to resize the screen. Here, the TextInput would be overlapping above the component above it in case of an overlap.

by [@ckaus](https://stackoverflow.com/users/12801710/ckaus) [on stackoverflow](https://stackoverflow.com/a/65267107)

## Not the Best Solution!?

In the same thread [Matt Way](https://stackoverflow.com/users/277697/matt-way) states:
> In my opinion, this component should be scrapped though, in favour of helper functions that would return keyboard heights over time, so you could apply your own style ideas directly based on keyboard visibility.

[link to stackoverflow](https://stackoverflow.com/a/58385319).

Which I find a quite accurate statement, because 
* this component caused a lot of trouble for me, especially when layouts get more complex.
* It behaves differently on iOS and Android and
* it has a lot of [(open) issues](https://github.com/facebook/react-native/issues?q=is%3Aissue+KeyboardAvoidingView) 
  in the react-native repo ([96 closed](https://github.com/facebook/react-native/issues?q=is%3Aissue+KeyboardAvoidingView+is%3Aclosed) and [25 open](https://github.com/facebook/react-native/issues?q=is%3Aissue+KeyboardAvoidingView+is%3Aopen) as of December 2020).

## "Why didn't you contribute to the docs?"
A totally valid question, and absolutely the right one to ask. I am listing it here, because I have thought about that too.

To be honest, there are couple of reasons:
* I too lazy going through a CLA process,
* I also hesitate a bit doing that with a company like facebook
* writing on this blog is much faster.

Sorry if none of those reasons are good enough. They are just mine.


# esbuild Learnings
slug: esbuild-learnings
dateCreated: 2020-12-12 20:58 CET
tags: JavaScript, bundle, build

## Minify all *.js Files
Sometimes reducing the file size is the only thing I want.
No bundling needed, and esbuild can do it. Like so:
```
$ esbuild src/*.js --minify --outdir=dist
```
This finds all `*.js` files in the director `src`,
minifies them and puts the result in the `dist` directory.



# Website Speed - Lab and Field Tools
slug: website-speed-lab-and-field-tools
dateCreated: 2020-12-09 13:53 CET
tags: tools, page speed, measuring

When I was involved in page speed optimization, in my last job, I was always fighting for measuring
in two ways. One using tools like webpagetest and lighthouse and two measuring the real user's
experience, on the site. There are even names for it, I didn't know, until now:

> How you approach measuring a web page’s performance can tell you whether it’s built for speed or whether it feels fast. 
> **We call them lab and field tools.** Lab tools are the microscopes that inspect a page for all possible points of friction. Field tools are the binoculars that give you an overview of how users are experiencing the page.

Found it in [The mythical “fast” web page](https://calendar.perfplanet.com/2020/the-mythical-fast-web-page/)
by [@Rick Viscomi](https://twitter.com/rick_viscomi).

Just read the article and how he argues for how to approach web site speed optimization, I would have written
it just like him. But why duplicate.

## Use Tools AND Think!

Just one more thing:

> lab tools can lead you astray in subtle ways  
> ...  
> field data is the ground truth for how a page is experienced

:nodding:

## Abandon Rate

> What if users aren’t experiencing this slow performance because they’re conditioned not to? An experience can be so poor that the user abandons it before it gets any worse. They may never come back to the site at all, in which case your field data has survivorship bias where only the bearably slow experiences are measured. How many unbearably slow experiences aren’t you measuring? And you thought we were done with the philosophical questions!

Hehe, we ran into that one too. Getting the number of the (iirc) Abandon Rate was insightful.
We used the server logs. Compared the started requests and those counted by our client-side tool (watch the potential error here).

## Onsite Measurement

The first three articles in my series [browser tools](/blog/tag/browsertools/)
are about measuring the website speed on the site 
[using the Resource Timing API](/blog/2020/11/28-resource-timing-part1/)
to see how 
[to analyze loading depencencies](/blog/2020/11/29-resource-timing-part-2/)
and 
[plotting all this in a waterfall chart](/blog/2020/11/30-resource-timing-part-3/).

# React Native Android Cheatsheet
slug: react-native-android-cheatsheet
dateCreated: 2020-12-05 14:28 CET
tags: React Native, Android

This is a collection of things I sometimes need when working with React Native and my external Android device.

## List Connected Devices
To see all connected devices run:
`adb devices`.
Unfortunately the names listed are not always helpful. I always plug/unplug the device and figure out which one is which name.
Better ideas? I am interested.

## Open the Developer Menu in the App from the Shell
From the command line in the shell to open the developer menu run this command

`adb shell input keyevent KEYCODE_MENU`

## Reload App from Shell
`adb shell input text "RR"`

## Reconnect Device
Sometimes when I put my computer to sleep, or alike and it disconnects from the device, run the following to restart
the connection (rebuilding the android app works too, but is way slower):
```
$ # In this order!
$ adb reverse tcp:8081 tcp:8081
$
$ react-native start
$ # OR
$ adb shell input text "RR"
$ # OR
$ # <press "r", if you are in the shell where `react-native start` is still running>
```
Unfortunately I also have to restart the app on the device, will need to figure out how to prevent this.

More hints in [this thread on stackoverflow](https://stackoverflow.com/questions/44170991/reload-a-react-native-app-on-an-android-device-manually-via-command-line).

## See Logs
```
$ adb logcat
```

## See Also
* [adb Learnings](/tidbits/2020/11/adb-learnings/) - My findings about how "to use my real android device to preview stuff, not the emulator anymore"
* [Start the Right Android Emulator](/tidbits/2020/10/start-the-right-android-emulator/) - If you have multiple devices installed in the Android Studio, and you need to choose a certain one.

# Android Ripple Effect - Analyzed
slug: android-ripple-effect-analyzed  
dateCreated: 2020-12-04 18:00 CET  
tags: React Native, Android, mobile  
previewImage: ../ripple-preview.jpeg  

[React Native](https://reactnative.dev) has a component `Pressable`. Used like so `<Pressable>clickable thing</Pressable>`.
It is a more abstract way to build a button or something that a user can click.
The component `Pressable` has one Android-specific [attribute `android_ripple`](https://reactnative.dev/docs/pressable#android_ripple-android),
which allows to customize the UX of the ripple effect.
I think the visual feedback the ripple effect provides is very user-friendly, it indicates if a click was detected.
So I am investing time in making it work well, but it's not that easy.
Let me share my learnings.

## What is the Ripple Effect?
The ripple effect is the red dot flying in on the button. Can you see it?
This is a native Android feature provided by React Native to be kinda controlled from there.
<figure>
    <img src="../ripple-anim.gif" alt="Ripple animation" width="600" />
    <figcaption>Ripple effect in action</figcaption>
</figure>

## Contents

1. [The Context](#the-context)
1. [No `onPress` no Ripple](#no-onpress-no-ripple)
1. [Background Color on a Child Overlays Ripple Effect](#background-color-on-a-child-overlays-ripple-effect)
1. [Workaround: How to still use a Background Color?](#workaround-how-to-still-use-a-background-color)
1. [Don't add `borderless`!](#watch-out-though---dont-add-borderless)
1. [Add `borderRadius` - Works](#add-borderradius---works)
1. [The Ripple Radius](#the-ripple-radius)
1. [Building a Round Button](#building-a-round-button)
1. [Conclusion](#conclusion)

## The Context
It's all about React Native, correct. I am currently using v0.63.2 (just in case someone case along, reads this and screams "it's all wrong", check the version first).
My Android version is [API Level 28](https://en.wikipedia.org/wiki/Android_Pie) and 
the device I use is a [Cosmo Communicator made by Planet Computers](https://www.www3.planetcom.co.uk/cosmo-communicator),
that's also why you saw a landscape video above.

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

## Background Color on a Child Overlays Ripple Effect
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
Now that I explored the ripple effect (and React Native's use) in depth I am ready to use it.
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
I am not sure if I am not understanding the docs, expecting wrong things or simply not getting React Native yet.
But I have a feeling that there are a couple of gotchas, that might also be called bugs.
I will link it in the according places, maybe it feels helpful to someone.

UPDATE: It looks like there is an even better solution coming. It is in [a pull request](https://github.com/facebook/react-native/pull/30466)
which basically puts the ripple effect always in the foreground, that's how I understand it. I think this might solve
most of the issues I described above. Cool.
