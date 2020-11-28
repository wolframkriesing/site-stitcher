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

## Resource Timing API

Let us start by looking into the `Resource Timing` API ([on MDN][2], [in the spec][4]), it is part of the 
`Performance` API ([on MDN][1], [the spec][5]), which you can reach via `window.performance` in all modern browsers. 
We will learn how it can be useful to better understand the impact on performance of resources that a website loads, 
e.g. JS, CSS, images, XHRs and alike.

The [specification (or spec)][3] introduces the topic in a very understandable way: 

> [The spec] introduces the PerformanceResourceTiming interface to allow JavaScript mechanisms to collect complete 
> timing information related to resources on a [website].

The interface that the spec defines is called "PerformanceResourceTiming", which is in simple terms the collection 
of many attributes about one resource that the website loads. For example the `duration` attribute, which tells us 
how long it took to load a certain resource. For that we have to read all resources that were loaded, which we do via 
`window.performance.getEntriesByType('resource')`. This returns an array of all resources, which contains the `name` 
and `duration` properties (among others):

```js
> window.performance.getEntriesByType('resource')
```

```js
[{
    // ... shortened
    duration: 14.79000000108499,
    name: "http://techblog.holidaycheck.com/css/main.css",
    startTime: 18.41499999864027,
    responseEnd: 33.20499999972526,
    // ... shortened
}, {...}]
```

The `duration` is given in milliseconds. The time is measured using the DOMHighResTimestamp API, which allows for 
very exact time measuring. Why is this needed? We could have used `Date.now()`, but [the spec][7] says it "does not 
allow for sub-millisecond resolution and is subject to system clock skew". Better to have exact timestamps. You can 
see the sub-milliseconds part in the `duration`'s value above. So we have reliable time measuring in the browser 
available, details might become another blog post in this series.

The `name` is the URL of the resource the website loaded and the API measured.
Let's sum it all up, by looking at the part of the API we have learned about.

```js
> // Read all resource that our website has loaded.
> const resources = window.performance.getEntriesByType('resource');
> // Filter out the name and the duration. 
> const durations = resources.map(({name, duration}) => ({name, duration}));
> durations
```

```js
[  // shortened for readability
   {name: ".../css/main.css", duration: 14.42500000121072},
   {name: ".../img/hc-labs-only-logo.svg", duration: 18.744999993941747},
   ...
]
```

{% comment %} 
  The chart below should be something like "height: 20rem" instead of px
  But currently the rem are set to 10px on this page and to fix that all the CSS should be fixed.
  Basically I (Wolfram) see no reason why there is any custom font-size needed anyways (maybe some rem units sometimes)
  But in general I am pretty sure we can just use the defaults of the user agent and it should be fine. 
{% endcomment %}

<figure>
  <hc-chart id="duration-chart" style="height: 350px;">
    <img src="fallback-chart-1.png">
  </hc-chart>
  <figcaption>The chart above shows the durations it took to load the resources gathered using the Performance API.</figcaption>
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
    scriptTag.setAttribute('src', 'https://holidaycheck.github.io/hc-live-chart-component/HcChart.js')
    document.head.insertBefore(scriptTag, document.head.childNodes[0]);
  });
</script>

## The `responseEnd` Attribute In Use

The `duration` attribute seen before, is the result of subtracting the `responseEnd - startTime` attribute ([spec][8]).
The `startTime` attribute is the time when fetching the resource started ([MDN][9]). The `responseEnd` is the timestamp 
when the last byte was received or when the transport connection closes ([MDN][10]). The time taken how long loading all 
resources took, as you saw at the beginning of the article and as you can see at the end again, is calculated by 
retreiving all `responseEnd` values and taking the biggest one, as you can see below:

```js
> // Helper function to find the max value in an array.
> const findMax = values => values.reduce((a, b) => Math.max(a, b));
>
> const resources = window.performance.getEntriesByType('resource');
> // Filter out the responseEnd attribute only and find the maximum.
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


Hint: If you <a id="reload-link-2" href="{{ page.url }}?force-reload=0#the-responseend-attribute-in-use">reload</a>, 
the numbers may change.

<script type="text/javascript">
  (() => {
    const anchor = document.querySelector('#reload-link-2');
    const href = anchor.getAttribute('href');
    const counter = +(new URL(location).searchParams.get('force-reload'));
    anchor.setAttribute('href', href.replace(/force-reload=\d+/, 'force-reload=' + (counter+1)));
  })()
</script>


## Finally

Now that you got here, we pick up the thing we did at the beginning of the page again and list the tiny statistics again. 
After the [event "load"][6] (the whole page has loaded, including all dependent resources such as stylesheets images) 
this **page loaded <span id="num-assets-loaded-2">??</span> assets** (or resources) and 
**took <span id="time-taken-loading-2">??</span> seconds to load**. 
<span id="loading-failed-hint-2">(If you just see "??" then reading the data didn't work, do you have an old browser?)</span>

<script type="text/javascript">
  window.__runOnloaded__.push(() => __updateInlineStats__(2));
  window.addEventListener('load',() => window.__runOnloaded__.forEach(fn => fn()));
</script>


Hopefully this article shows that getting insights into resource timing of a site is possible not
only in developer tools, but also right in the browser itself. What you can do with it we leave up
to your imagination.

You want to know more? Read [part 2 of this series about "Loading Dependencies"][11].

*The first version of this post I wrote and published [for the HolidayCheck TechBlog, May 2019](https://techblog.holidaycheck.com/post/2019/05/06/browsertools-1-resource-timing-part1).*

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Performance
[2]: https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API
[3]: https://www.w3.org/TR/2019/WD-resource-timing-2-20190424/
[4]: https://www.w3.org/TR/2017/CR-resource-timing-1-20170330/
[5]: https://www.w3.org/TR/performance-timeline-2/
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
[7]: https://www.w3.org/TR/hr-time-2/
[8]: https://www.w3.org/TR/2017/CR-resource-timing-1-20170330/#performanceresourcetiming
[9]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry/startTime
[10]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming/responseEnd
[11]: 
