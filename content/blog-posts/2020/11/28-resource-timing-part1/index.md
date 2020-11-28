dateCreated: 2020-11-28 14:20 CET
tags: browsertools, knowledgebase
previewImage: header.png

# Resource Timing (part 1) - The API

I want to explore the Resource Timing API, part of the Performance API, accessible via `window.performance` 
in all modern browsers.  
This post is the start of a series of [blog posts about browser tools][tag-browsertools], in which I look into any
kind of tools or APIs in and around the browser, so mostly things web developers might find useful.

[tag-browsertools]: /blog/tag/browsertools/

## First Live Stats
Up to here **this page loaded <span id="num-assets-loaded-1">??</span> assets** (or resources) and 
**took <span id="time-taken-loading-1">??</span> seconds to load**. Try it: reload the site and the numbers may change.
<span id="loading-failed-hint-1"><em>(If you just see "??" then reading the data didn't 
work, do you have an older browser? You can keep reading and try if and how the described API works in your browser.)</em></span>  
All these information were gathered, just now, via the `Resource Timing API`, which we would like to 
cover in this article. 
At the end of the article the same stats with the updated values can be found, the values might differ.

<script type="text/javascript">
const getMaxResponseEnd = (resources) => {
  return resources.map(r => r.responseEnd).reduce((a, b) => Math.max(a, b));
};

const __updateInlineStats__ = (index) => {
  try {
    const r = window.performance.getEntriesByType('resource');
    document.querySelector(`#num-assets-loaded-${index}`).textContent = r.length;
    document.querySelector(`#time-taken-loading-${index}`).textContent = (getMaxResponseEnd(r) / 1000).toFixed(2);
    document.querySelector(`#loading-failed-hint-${index}`).remove();
  } catch (e) { /* swallow errors */ }
};
__updateInlineStats__(1);
</script>

## What is the Resource Timing API

Let's look at the `Resource Timing` API ([on MDN][2], [in the spec][4]), it is part of the 
`Performance` API ([on MDN][1], [the spec][5]), which you can reach via `window.performance` in a modern browsers. 
I will explain how it can be useful to better understand the impact on performance of resources that a website loads, 
e.g. JS, CSS, images, XHRs and alike.

The [specification (or spec) introduces the topic][3] in a very understandable way: 

> [The spec] introduces the `PerformanceResourceTiming` interface to allow JavaScript mechanisms to collect complete 
> timing information related to resources on a [website].

The interface that the spec defines is called **"PerformanceResourceTiming", is a collection 
of attributes about one resource that a website loads**. For example the attribute `duration` is the time
it took to load a certain resource. 

## Use the Resource Timing API
To get all attributes we have to get all entries of the type "resource", loaded by this site. 
The API call for this is:

```js
window.performance.getEntriesByType('resource')
```

This returns an array of all resources, among which it has attributes `name`, `duration`, `startTime` and `responseEnd`:

```js
[{
    // ... shortened
    name: "https://picostitch.com/_global.css",
    duration: 14.79000000108499,
    startTime: 65.99000000278465,
    responseEnd: 84.66500000213273,
    // ... shortened
}, {...}]
```

The `duration` is given in milliseconds. The time is measured using the DOMHighResTimestamp API, which allows for 
very exact time measuring. 

## Measuring using DOMHighResTimestamp
Why is this needed? We could have used `Date.now()`, but [the spec][7] says it "does not 
allow for sub-millisecond resolution and is subject to system clock skew". Measuring the timings very exact
can make quite a difference with the high speed connections and always improving browser speeds.
You can see the sub-milliseconds part in the `duration`'s value above. 
Good to know that we have reliable time measuring in the browser 
available, details might become another blog post in this series.

## Query the Data
The `name` is the URL of the resource the website loaded and the API measured the rsource timing for.
Let me sum up, by looking at the part of the API seen so far.

In the following I wrote two lines of JavaScript, that you can try out on the console of your
browser and see what kind of results you are getting. Feel free to copy line by line and see what
you are getting.

```js
> // Read all resource that our website has loaded.
> const resources = window.performance.getEntriesByType('resource');

> // Filter out the name and the duration. 
> const durations = resources.map(({name, duration}) => ({name, duration}));

> durations // Print out the contents of `durations`.
```

```js
[  
    // ... shortened
    {name: "https://picostitch.com/blog/blog.css", duration: 18.619999988004565},
    {name: "https://picostitch.com/blog/2020/11/28-resource-timing-part1/fallback-chart-1.png", duration: 51.56999998143874},
    {name: "https://picostitch.com/_global.css", duration: 23.9000000001397},
    {name: "https://picostitch.com/_nav.css", duration: 27.08499997970648},
    // ...
]
```

Looking at the output of an array is fun for developers, but seeing that data in a diagram offers
a different perspective, so let's see the `duration` of all the resources loaded on this website, in a diagram.
Try it: reload the page and see the bars update. This is life data.

<figure>
  <hc-chart id="duration-chart" style="height: 15rem;">
    <img src="fallback-chart-1.png">
  </hc-chart>
  <figcaption style="padding-top: 2rem">The chart shows the durations it took to load the resources gathered using the Performance API.</figcaption>
</figure>

<script type="text/javascript">
  window.__runOnloaded__ = [];
  window.__runOnloaded__.push(() => {
    const onLoaded = () => {
      window.customElements.whenDefined('hc-chart').then(() => {
        const chart = document.querySelector('#duration-chart');
        const resources = window.performance.getEntriesByType('resource');
        const durations = resources.map(({name, duration}) => ({label: name, value: duration}));
        chart.updateChartData(durations);
      });
    };
    const scriptTag = document.createElement('script');
    scriptTag.onload = onLoaded;
    scriptTag.setAttribute('type', 'text/javascript');
    scriptTag.setAttribute('src', 'https://holidaycheck.github.io/hc-live-chart-component/HcChart.js');
    document.head.insertBefore(scriptTag, document.head.childNodes[0]);
  });
</script>

## `startTime` and `responseEnd` Attributes

The `duration` attribute, is the result of subtracting the `responseEnd - startTime` attribute ([spec][8]).
The `startTime` attribute is the time when fetching the resource started ([MDN][9]). The `responseEnd` is the timestamp 
when the last byte was received or when the transport connection closes ([MDN][10]).

Let's see how to find out how long loading all resources took.
The code you will see now, is the same that generated the numbers at the beginning of this article
and as you will find them at the end again, so you can compare the two.
The time taken how long loading all resources took I calculate by 
retreiving all `responseEnd` values and taking the biggest one, as you can see below:

```js
> // Helper function to find the max value in an array.
> const findMax = values => values.reduce((a, b) => Math.max(a, b));

> // Read all resource entries.
> const resources = window.performance.getEntriesByType('resource');

> // Filter out the `responseEnd` attribute and find the maximum.
> const allEnds = resources.map(r => r.responseEnd);
> resources.length + ' resources, ' + findMax(allEnds) + ' ms'
```
<pre id="inline-stats-result" class="highlight">
  If you see this either JavaScript is disabled, or something went wrong :(.
</pre>

<script type="text/javascript">
  window.__runOnloaded__.push(() => {
    const resources = window.performance.getEntriesByType('resource');
    const resourcesStr = resources.length + ' resources, ';
    const timeStr = getMaxResponseEnd(resources) + ' ms';
    document.querySelector('#inline-stats-result').innerHTML = resourcesStr + timeStr;
  });
</script>

Try out: If you reload this page, the numbers will change, look closely at the duration (the second number).

## Live Stats Again

Now that you got here. Let's pick up the live stats again, as seen at the beginning and list the tiny statistics again. 
After the [event "load"][6] (the whole page has loaded, including all dependent resources such as stylesheets images) 
this **page loaded <span id="num-assets-loaded-2">??</span> assets** (or resources) and 
**took <span id="time-taken-loading-2">??</span> seconds to load**. 
<span id="loading-failed-hint-2">(If you just see "??" then reading the data didn't work, do you have an old browser?)</span>

<script type="text/javascript">
  window.__runOnloaded__.push(() => __updateInlineStats__(2));
  window.addEventListener('load',() => window.__runOnloaded__.forEach(fn => fn()));
</script>

## Finally

Hopefully this article shows that getting insights into resource timing of a site is not
only possible in your browser's developer tools, but also right in the browser itself. 
What you can do with it I leave up to your imagination.
If you have something interesting please [ping me on twitter][@wolframkriesing], I am curious to see and learn more about it,
especially about useful applications with it.

Soon: You want to know more? Read [part 2 of this series about "Loading Dependencies"].

*The first version of this post I wrote and published [for the HolidayCheck TechBlog, May 2019](https://techblog.holidaycheck.com/post/2019/05/06/browsertools-1-resource-timing-part1).*

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Performance
[2]: https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API
[3]: https://www.w3.org/TR/resource-timing-2/#introduction
[4]: https://www.w3.org/TR/2017/CR-resource-timing-1-20170330/
[5]: https://www.w3.org/TR/performance-timeline-2/
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
[7]: https://www.w3.org/TR/hr-time-2/#abstract
[8]: https://www.w3.org/TR/2017/CR-resource-timing-1-20170330/#performanceresourcetiming
[9]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry/startTime
[10]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming/responseEnd
[@wolframkriesing]: https://twitter.com/wolframkriesing