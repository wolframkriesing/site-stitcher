# Machine Learning vs. Screenshot Comparing?
slug: machine-learning-vs-screenshot-comparing
dateCreated: 2020-08-04 18:14 CET
tags: testing, machine learning, automation

I broke this site, and thanks to [@Holger](https://twitter.com/Holger__P) reporting the error  I  figured out
I should have done more testing instead of just tweeting that I should :).

<blockquote class="twitter-tweet" data-partner="tweetdeck">
  <p lang="en" dir="ltr">
    I can create golden master tests now, that screenshot all the pages of my blog now, 
    I refactor and should end up with the same screenshots. <br>
    And then I can do the changes that I want to do, which will be simple after the refactor.<br>
    I should!
  </p>
  &mdash; @wolframkriesing
  <a href="https://twitter.com/wolframkriesing/status/1289915124182953989?ref_src=twsrc%5Etfw">August 2, 2020</a>
</blockquote>

## Machine Learning FTW?
So I asked [@Kamal](https://twitter.com/kamal4493)
a great colleague, who I learned a lot about Machine Learning from, among other really skilled
colleagues as HolidayCheck ([sad day yesterday](https://twitter.com/ania_ch/status/1290368351139770371)).

So I proposed an idea to Kamal, I said, what about discovering bugs when rendering my website
using some simple machine learning (not sure if such a thing exists).
This was the rendering issue Holger pointed out yesterday:

<figure>
    <img src="../broken-landscape-rendering.gif" alt="Screwed up rendering in landscape mode" width="400" class="sizeup-onhover-image scale2 origin-left-center" />
    <figcaption>Screwed up rendering in landscape mode</figcaption>
</figure>

What is wrong with the screenshot above? Well, I want it:
- to not wrap the navigation at the top
- to have a  margin on the left of the text
- to have both columns be equal, or in a portrait mode just be a single column.

His first input was unexpected for me, since I just don't have much experience with ML (as if this is totally logical)
to use black and white  images and let some machine learning do the job.

## Why Apply Machine Learning Here?
Ok, let me take a  step back.

If all this  above was too  fast, let me explain my thoughts how I  got to the conclusion of why <abbr title="Machine Learning">ML</abbr> 
can help here.
As I had  learned in [AI for everyone](https://www.coursera.org/learn/ai-for-everyone) (that Kamal suggested to me)
**every problem that we humans can  spot in one second or less can also be solved by an <abbr title="Artifiical Intelligence">AI</abbr> (or here ML)**.

I was able to find the issue on my site in less than one second, and since I had seen amazing things
being done by machine learning I thought this might be a  good fit and something I could potentially tackle.
Besides it  being  a problem to  have  fun with and learn ML with, I also was postponing screenshot testing
for my  own site all the time, because for the last  10 years  I  have spent endless hours in screenshot
testing, adjusting thresholds, reviewing errors and flaky tests
and [so did others](https://twitter.com/chaos_monster/status/1290629259816558593).

Finally there  was  a  glimpse to fix this problem and hopefully solve it with a new approach.
I don't want to:
- continuously adjust master  screenshots
- find visual  problems that are no real problems
- compare images manually to figure out it was just a tiny diff in the font rendering
- and there are many other issues with screenshot comparing imho.

Besides the above I am convinced those kind of <abbr title="Visual Regression Tests">VRTs</abbr>
should not be blocking a deployment pipeline but be done after deploy, they are (still) slow.
But that is just a side note.

## Learning if ML fits

Kamal suggested "https://keras.io/examples/vision/mnist_convnet/ it will get you started".
Also this for understanding https://keras.io/examples/vision/image_classification_from_scratch/
I asked what do all these functions mean? https://keras.io/examples/vision/mnist_convnet/#build-the-model
```python
model = keras.Sequential(
    [
        keras.Input(shape=input_shape),
        layers.Conv2D(32, kernel_size=(3, 3), activation="relu"),
        layers.MaxPooling2D(pool_size=(2, 2)),
        layers.Conv2D(64, kernel_size=(3, 3), activation="relu"),
        layers.MaxPooling2D(pool_size=(2, 2)),
        layers.Flatten(),
        layers.Dropout(0.5),
        layers.Dense(num_classes, activation="softmax"),
    ]
)

model.summary()
``` 

Maybe this helps https://keras.io/getting_started/intro_to_keras_for_engineers/, Kamal said.

I have a plan now how to create images to train the model with, the images i would generate using my site:
- images always for different screen sizes, 1024x768, 1400x1900, etc.
- images with the latest blog posts
- images with older blog posts (1st...10th, 2nd...11th, 3rd..12th, ...) to have different looking sites

Of course I need right and wrong images, I need to tag them accordingly first, so the model can learn.
Should it be 50/50? Ideally it should be, but doesnt have to be.



  

# Technical Debt is Anything Preventing You From Developing Fast
slug: tech-debt-prevents-from-being-fast
dateCreated: 2020-08-03 22:37 CET
tags: architecture, tech debt, screaming architecture 

A podcast with 
[@Sandro Mancuso](https://twitter.com/sandromancuso) 
[talking about tech debt and maintainable software](https://maintainable.fm/episodes/sandro-mancuso-technical-debt-is-anything-preventing-you-from-developing-fast).
My notes.

## What is Maintainable Software?
1. "Tested  in minutes, if not in seconds"
- "I  am  not scared to change"
- "Press a button run all the tests and see it works"
- "I  can reply on the test suites"

2. "A change is localized"
- make a change in one place and I dont need to change anything else

3. "Find the place to change"
- how  the software is designed
- the language used should align  with  the business, with what the software does

4. "Relationship between modules" (module being function, class, …)
- coupling + cohesion
- Fun in: the number of modules talking to this module
- Fun out: "one module talks to too many modules"

5. "Who is making the change" the human side
- OO or functional
- "what you are used to and what you know"

## DDD in Software
"When  you look at  the package structure, how do you know what the package does?" (package = namespaces)
- only tech layers hide what the software does
- classes are nouns, but is a "User" an "Author", "Buyer", …?
- what do we do with those
- "The behaviour of the system is very rarely seen in the package and the classes" "very rarely seen this"

## How do you define Tech Debt?
"Anything the system is preventing the system to achieve"
- even badly written code that needs NO change, its no tech debt
- tech debt is what is preventing us to be fast
- devs sometimes call things they don’t like tech debt
- "every tech problem is a business problem" and vice versa

## Structure of the Team
- "POs prioritise a back log and then go to devs" this misses including the devs
- the business does not understand refactoring and plays it back, we (devs) need to provide a strategy and why - you get a "no"
- prevent the disconnect between biz and tech

## Outside in Development
Frontend First Dev, Interaction Driven Design
- "There is no point in  having a backend if there is no frontend"
- "we design our domain first and the persistence and frontend is just a detail"
- "we should analyze how we interact with the system, that’s where I would start from"
- "understand what the external world wants from my system"
- growing a domain model is like TDD from very specific tests which drive generic code, the system can evolve this way too

## (Software) Design
There is a practical and a theoretical side.
- "you can not design software well by just writing code"

# Photovoltaic on a Car
slug: photovoltaic-on-a-car
dateCreated: 2020-08-03 18:37 CET
tags: sustainability, photovoltaic, solar, cars

Recently I was reading and learning a bit more about sustainable energy and
since electric cars are no magic anymore, what about electric cars
that charge themselves from the sun?

## Content
I am going to try to understand (and then write down) what photovoltaic is,
and how this will be applied to fill the battery of a car and the challenges there.
And maybe I add some of my thoughts at the end (and everywhere in between).

Note: These here are just my notes, no complete article or alike.
Just me learning while writing down.

## The Cheapest Energy Source on Earth
Mathieu, Director Photovoltaic Integration at Sono Motors 
[said in Dec 2019](https://youtu.be/XoYnBIahXzw?t=288)
> Photovoltaic is the cheapest energy source you can have on earth.

<figure>
    <iframe id="photovoltaic-player" width="427" height="240" name="video" src="//www.youtube.com/embed/XoYnBIahXzw" frameborder="0" allowfullscreen></iframe>
    <figcaption>State of Development – Solar Integration | Sono Motors</figcaption>
</figure>

Just to quote another source, 
[on wikipedia the statement is a bit more specific](https://en.wikipedia.org/wiki/Photovoltaics):
> Photovoltaics (PV) has become the cheapest source of electrical power in regions with a high solar potential  
> [...]  
> Panel prices have dropped by the factor of 10 within a decade.

The pricing is no surprise I would say, it seems to be a very trendy technology ;).

## What is Photovoltaic?
What really helped me to put the term "photovoltaic" (PV) into the right perspective was
[this explanation on wikipedia](https://en.wikipedia.org/wiki/Photovoltaic_system)
> As PV systems convert light directly into electricity, they are not to be confused 
> with other solar technologies, such as concentrated solar power or solar thermal, used for heating and cooling.

I understand (from Mathieu's explanation at 
[13:00 min](https://youtu.be/XoYnBIahXzw?t=800)) 
the photovoltaic is the material that covers the solar cell, so it's 
what used to be the glass, that protected the solar cell.
He talks about the polymer melting at one temperature and the solar cell at another.

<script type="application/javascript">
function playVideoAt(videoId, startAt) {
  document.querySelector('#photovoltaic-player').src = '//www.youtube.com/embed/' + videoId + '?autoplay=1&start=' + startAt;
}

(function connectAllYoutubeLinksToPlayOnTheSite() {
  var urlStart = 'https://youtu.be/XoYnBIahXzw?t=';
  var videoLinks = document.querySelectorAll('a[href^="' + urlStart + '"]');
  videoLinks.forEach(function(link) {
    var timestamp = link.href.replace(urlStart, '');
    link.addEventListener('click', function() {
      link.href = '#the-cheapest-energy-source-on-earth';
      playVideoAt('XoYnBIahXzw', timestamp);
    });
  });
})();  
</script>



Though, reading "Most organic photovoltaic cells are polymer solar cells."
[on wikipedia](https://en.wikipedia.org/wiki/Organic_solar_cell), 
I think I didn't get this completely right.
The article explains it like this.
> An organic solar cell (OSC) or plastic solar cell is a type of photovoltaic that uses 
> organic electronics, a branch of electronics that deals with conductive organic polymers 
> or small organic molecules, for light absorption and charge transport to produce electricity 
> from sunlight by the photovoltaic effect.

I keep this kinda open (for me). Feel free to correct me, help me fix it (via a 
[PR on the repo](https://github.com/wolframkriesing/site-stitcher) or a 
[tweet](https://twitter.com/wolframkriesing)).

## Stage 1 at Sono Motors
At Sono Motors the solar cells integration is planned in two stages.
The first stage is to figure out where and how to place solar cells on the car.
> The solar cell itself is very fragile and you cannot put solar cells everywhere on the car.

Though Sono Motors has been figuring out how to optimize and use as much space
as possible of the car for placing solar cells.

## Stage 2
The second stage is to 
> develop a new family of polymers

for a car some parameters are special like:
* the shape of the object
* temperature effects
* humiditiy effects
* sun irradiance
* shock proofnes

Mathieu says.

## Charging While Driving?
The shadow is moving slowly when the car is parked, basically at the speed of the movement
of the sun. The electronics can adjust for that.
When driving the electronic will not (yet) manage to optimize the charging cycles, 
since they might be very hard to predict.
This is how I understood it.

## Challenges I hear
- Optimize charing while driving.
- The polymer development has not yet started (since it is stage 2).
