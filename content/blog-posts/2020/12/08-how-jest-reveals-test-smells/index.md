dateCreated: 2020-12-08 08:45 CET
tags: 

# How Jest Reveals Test Smells

Unfortunately I discover very often when using jest that a lot of the things point me to smells in a test.
Jest even encourages some of those instead of encouraging us to write better tests.
I found some things over time, so I just collect them here.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Is there a blog post showing how all the features of jest can be prevented to be needed by better test writing practices?<br>Maybe I should write it.<a href="https://twitter.com/hashtag/javascript?src=hash&amp;ref_src=twsrc%5Etfw">#javascript</a> <a href="https://twitter.com/hashtag/testing?src=hash&amp;ref_src=twsrc%5Etfw">#testing</a></p>&mdash; Wolfram (JS-- HTML++ CSS++) Kriesing (@wolframkriesing) <a href="https://twitter.com/wolframkriesing/status/1257940801616777216?ref_src=twsrc%5Etfw">May 6, 2020</a></blockquote>

## `jest.mock`

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I just saw code that uses jest.mock and read <a href="https://t.co/JFpyTMojQn">https://t.co/JFpyTMojQn</a><br>I hear &quot;let the tests drive you&quot;, I think &quot;too much setup code&quot;.<br><br>I am trying to prevent to mock what I don&#39;t own.<br>I feel bad when I (rarely) test that the right parameter is passed to a stubbed function.</p>&mdash; Wolfram (JS-- HTML++ CSS++) Kriesing (@wolframkriesing) <a href="https://twitter.com/wolframkriesing/status/1260548843487330308?ref_src=twsrc%5Etfw">May 13, 2020</a></blockquote>

## `jest.fn`

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Check how many stubs/spies you can replace by noop-functions!<br><br>If you don&#39;t spy, don&#39;t use<br>- sinon.spy()<br>- jest.fn()<br>- ...<br><br>A noop-function does the job as well<br><br>- () =&gt; {}<br>or<br>- async () =&gt; {}<br><br>Don&#39;t make the <a href="https://twitter.com/hashtag/test?src=hash&amp;ref_src=twsrc%5Etfw">#test</a> more complicated than necessary!</p>&mdash; Wolfram (JS-- HTML++ CSS++) Kriesing (@wolframkriesing) <a href="https://twitter.com/wolframkriesing/status/1275717274008199168?ref_src=twsrc%5Etfw">June 24, 2020</a></blockquote>

## `jest.setSystemTime()` or `jest.getRealSystemTime()`

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="en" dir="ltr">You are just about to use `jest.setSystemTime()` or `jest.getRealSystemTime()`?<br>Why not inject the function that you are actually trying to fake a value for and inject this dependency?<a href="https://twitter.com/hashtag/dependencyInjection?src=hash&amp;ref_src=twsrc%5Etfw">#dependencyInjection</a><a href="https://twitter.com/hashtag/explicitCode?src=hash&amp;ref_src=twsrc%5Etfw">#explicitCode</a></p>&mdash; Wolfram (JS-- HTML++ CSS++) Kriesing (@wolframkriesing) <a href="https://twitter.com/wolframkriesing/status/1336038292664578049?ref_src=twsrc%5Etfw">December 7, 2020</a></blockquote>

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="en" dir="ltr">How?<br><br>// dont use: <br>const fn= () =&gt; {<br>   x = new Date().toISOString();<br>}<br><br>// use:<br>const fn = (nowFn) =&gt; {<br>  x = nowFn();<br>}<br><br>and you can control what `nowFn` is, does and returns in your test, because you inject it.<a href="https://twitter.com/hashtag/tdd?src=hash&amp;ref_src=twsrc%5Etfw">#tdd</a> <a href="https://twitter.com/hashtag/testing?src=hash&amp;ref_src=twsrc%5Etfw">#testing</a> <a href="https://twitter.com/hashtag/jest?src=hash&amp;ref_src=twsrc%5Etfw">#jest</a> <a href="https://twitter.com/hashtag/mocha?src=hash&amp;ref_src=twsrc%5Etfw">#mocha</a><a href="https://twitter.com/hashtag/inject?src=hash&amp;ref_src=twsrc%5Etfw">#inject</a> <a href="https://twitter.com/hashtag/dependencies?src=hash&amp;ref_src=twsrc%5Etfw">#dependencies</a><br>2/</p>&mdash; Wolfram (JS-- HTML++ CSS++) Kriesing (@wolframkriesing) <a href="https://twitter.com/wolframkriesing/status/1336042861004025861?ref_src=twsrc%5Etfw">December 7, 2020</a></blockquote>

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="en" dir="ltr">You can also inject a default dependency (for production), if you like:<br><br>const defaultNowFn = <br>  () =&gt; new Date().toISOString();<br><br>const fn = <br>  (nowFn = defaultNowFn) =&gt; {<br>   ...<br>}<br><br>3/<a href="https://twitter.com/hashtag/javascript?src=hash&amp;ref_src=twsrc%5Etfw">#javascript</a> <a href="https://twitter.com/hashtag/jest?src=hash&amp;ref_src=twsrc%5Etfw">#jest</a> <a href="https://twitter.com/hashtag/tested?src=hash&amp;ref_src=twsrc%5Etfw">#tested</a> <a href="https://twitter.com/hashtag/code?src=hash&amp;ref_src=twsrc%5Etfw">#code</a> <a href="https://twitter.com/hashtag/parameterized?src=hash&amp;ref_src=twsrc%5Etfw">#parameterized</a></p>&mdash; Wolfram (JS-- HTML++ CSS++) Kriesing (@wolframkriesing) <a href="https://twitter.com/wolframkriesing/status/1336043484571119616?ref_src=twsrc%5Etfw">December 7, 2020</a></blockquote>

## Reintroduce `this`?

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">&quot;You can also pass variables from this module to your test suites by assigning them to <a href="https://t.co/bpdtat1Io7">https://t.co/bpdtat1Io7</a> object – this will make them available in your test suites as global variables.&quot;<a href="https://t.co/xvNGQO0ywg">https://t.co/xvNGQO0ywg</a><br><br>Wasn&#39;t the magic `this` one of the mistakes of mocha?<a href="https://twitter.com/hashtag/jest?src=hash&amp;ref_src=twsrc%5Etfw">#jest</a></p>&mdash; Wolfram (JS-- HTML++ CSS++) Kriesing (@wolframkriesing) <a href="https://twitter.com/wolframkriesing/status/1262736975280275456?ref_src=twsrc%5Etfw">May 19, 2020</a></blockquote>

## Filter tests

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">This pattern of jest to let users filter the tests down easily and not running all tests feels like an anti-pattern to me.</p>&mdash; Wolfram (JS-- HTML++ CSS++) Kriesing (@wolframkriesing) <a href="https://twitter.com/wolframkriesing/status/1323952904655511553?ref_src=twsrc%5Etfw">November 4, 2020</a></blockquote>



## Depdenency Injection

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Another good piece of documentation which, if you properly listen to it whispering, tells you to inject dependencies that otherwise leak in.<br>Make them transparent, it hurts in the beginning, but pays off.<a href="https://t.co/CMGbRVChoW">https://t.co/CMGbRVChoW</a><br><br>see also <a href="https://t.co/2894cILEkk">https://t.co/2894cILEkk</a><a href="https://twitter.com/hashtag/jest?src=hash&amp;ref_src=twsrc%5Etfw">#jest</a></p>&mdash; Wolfram (JS-- HTML++ CSS++) Kriesing (@wolframkriesing) <a href="https://twitter.com/wolframkriesing/status/1262740869670531073?ref_src=twsrc%5Etfw">May 19, 2020</a></blockquote>

## Jest Is Slow

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Running the tests of one file with mocha takes 0.2s running the same tests with jest 1.5s ... why should I be waiting 1.3s more every time? What&#39;s the value added?</p>&mdash; Wolfram (JS-- HTML++ CSS++) Kriesing (@wolframkriesing) <a href="https://twitter.com/wolframkriesing/status/1187644277049974785?ref_src=twsrc%5Etfw">October 25, 2019</a></blockquote>

## Various

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Why do the tests fail when I have no test inside a test file?<br>A warning, ok, but it&#39;s not a test fail. I am an adult, please.<br><br>&quot;Your test suite must contain at least one test.&quot;<a href="https://twitter.com/hashtag/jest?src=hash&amp;ref_src=twsrc%5Etfw">#jest</a></p>&mdash; Wolfram (JS-- HTML++ CSS++) Kriesing (@wolframkriesing) <a href="https://twitter.com/wolframkriesing/status/1262661256093339649?ref_src=twsrc%5Etfw">May 19, 2020</a></blockquote>
