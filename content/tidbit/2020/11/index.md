# Hacking Android Styles
slug: hacking-android-styles
dateCreated: 2020-11-30 16:28 CET
tags: android, react-native, styling, mobile, knowledgebase

I never did android development, only the react-native side of things.
Now while digging deeper, trying to figure out how to style a react-native picker on android (because the default is really ugly)
I am reading into [android docs](https://developer.android.com/). I found out how to break my app's rendering with one line of XML. Not true, five lines of XML.

In "android/app/src/main/res/values/style.xml" I can style theme my app.
By simply overriding the style `android:textViewStyle` like you see below
I can change all `<Text>` components used in my app that do not override any of the attributes you see below.

```
<resources>
    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
        <!-- Customize your theme here. -->
        <item name="android:textViewStyle">@style/TextView</item>
    </style>

    <style name="TextView" parent="AppTheme">
        <item name="android:textColor">#ff0000</item>
        <item name="android:padding">20dp</item>
        <item name="android:gravity">center</item>
    </style>
```

I have overridden `textColor`, `padding` and `gravity` (which is kinda like `justifyContent` in flexbox-speak).
And boom I had a couple of red texts that became centered in my app. I guess that also means I did not yet 
properly style all elements.

# `Theme.AppCompat` is supplied by the Android Support Library
slug: theme-app-compat-is-supplied-by-the-android-support-library
dateCreated: 2020-11-30 16:25 CET
tags: android, tools, react-native, react, mobile development, knowledgebase

When I started digging into the `styles.xml` file of our react-native app I found XML like this:

```
<resources>
    <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
        <item name="android:textColor">#000</item>
```

I understand that the `parent` attribute there means inherit the styles from the theme
"Theme.AppCompat.Light.NoActionBar", I was searching the web where this theme was defined, until 
I found it while reading [the android docs](https://developer.android.com/guide/topics/ui/look-and-feel/themes?hl=en)
there I found the answer:

> a theme such as `Theme.AppCompat` that's supplied by the Android Support Library

So it ships with android and since this is not open source (I think) I didn't find it.
At least I know now where it comes from ;).
I also found the answer to [what the Android Support Library is](https://developer.android.com/topic/libraries/support-library/).

# Restore deleted git branch
slug: restore-deleted-git-branch
dateCreated: 2020-11-26 15:10 CET
tags: tools, git, source code, knowledgebase

I had deleted a git branch locally, which I wanted to restore.
It's totally easy. A tiny bit of knowledge upfront. There is something called the reflog, it's kinda
like the hidden git history, that knows every change you did on the repo, every change, and it
does NOT throw away anything.

## Step 1 - Find the last commit on the deleted branch
The command is `git reflog` is to "manage reflog information" in git speak, per [the official docs](https://git-scm.com/docs/git-reflog).
That meant nothing to me. I translated it for me to be the action log, super history or the git spy who sees everything I do :).

Run `git reflog show` to see all the commits of any branch you have, including the deleted ones.
Find the commit that was the top of the branch you want to restore. By top of I mean the last commit, basically the end
by which you want to grab this branch out of the reflog and restore it.

## Step 2 - Restore it
Restore it by running `git branch <branch-name> <commit-hash>`.
I assume you can give it any name for `<branch-name>`, but I didn't try.
Just make sure you get the right `<commit-hash>`, which is this strange looking unreadable string of characters and numbers.

I hope this helps (me) when reading it (again).

# adb learnings
slug: adb-learnings
dateCreated: 2020-11-25 23:26 CET
tags: tools, android, adb, knowledgebase

I want to use my real android device to preview stuff, not the emulator anymore.
If I don't get the CPU power I need, I need to work around it.

So I plugged in my real device, ran `adb devices` and that's where I got stuck (the last 2h)

```
$ adb devices 
List of devices attached
ABCDEF1234	no permissions (user in plugdev group; are your udev rules wrong?); see [http://developer.android.com/tools/device.html]
```

The most in depth explanation of how to get a handle on the problem is this article here http://www.janosgyerik.com/adding-udev-rules-for-usb-debugging-android-devices/
it didn't help me to solve the problem, but I believe I learned a lot and I have one more puzzle piece about the android world.

## udev
While at it, I also learned that there is something like `udev` which is the device manager for the linux kernel.
This site explains it quite well https://www.thegeekdiary.com/beginners-guide-to-udev-in-linux/.
And my plugged in android phone is a device, right?

## Do it on the host system
I have a docker container with the android-studio running inside, which mounts the USB devices in there.
I first tried it inside the docker container, until I realized this is not so clever and actually also does not work.
So I did the udev magic, as described in [the article linked above][1], created the file, set the right permissions
and voila `adb devices` does NOT show a warning anymore. Party! 

[1]: http://www.janosgyerik.com/adding-udev-rules-for-usb-debugging-android-devices/

# Purpose Driven
slug: purpose-driven
dateCreated: 2020-11-24 23:05 CET
tags: purpose, company, founders, sustainable

> The purpose is the core of the company, not the profit.

<figure>
    <img src="../purpose-driven.jpeg" alt="Documentary on arte.tv" height="300" class="sizeup-onhover-image scale2 origin-left-center" />
    <figcaption>Documentary on arte.tv</figcaption>
</figure>

A great documentary about purpose driven companies. Companies that work for the "why" not the "how much".
The interesting part, that is being touched on just slightly, is where the documentary tries to show how
little support our government, laws and types of companies that exist have for this "new model".

Companies like https://www.ecosia.org and https://www.wildplastic.com that are companies that
own themselves, they kinda pulled the plug from capitalism and their money is not what the companies
and the employees work for but the purpose of making the world a bit better.
Basically bringing back the "social" into the social market economy that we are propogating that we would live in,
but that is quite polluted by a lot of greed.
