# ML for VRT - Part 4: Neural Networks
slug: ml-for-vrt-part-4-neural-networks
dateCreated: 2020-08-11 19:37 CET
tags: learning, neural networks, machine learning, automation

Reading
http://neuralnetworksanddeeplearning.com/chap1.html

Answering my main question "How do  I know which parameters how to  tweak?"
> While the design of the input and output layers of a neural network is often straightforward, there can be quite an art to the design of the hidden layers. In particular, it's not possible to sum up the design process for the hidden layers with a few simple rules of thumb. Instead, neural networks researchers have developed many design heuristics for the hidden layers, which help people get the behaviour they want out of their nets. For example, such heuristics can be used to help determine how to trade off the number of hidden layers against the time required to train the network. We'll meet several such design heuristics later in this book.

## Learn Which Parameter How to set

https://www.youtube.com/watch?v=Boy3zHVrWB4
https://www.youtube.com/watch?v=FWN3Sw5fFoM
https://www.youtube.com/watch?v=hVCuvMGOfyY

Training a neural network means
> what parameters should the have at the edges in order to  model our data well.

**My question**  being answered here. Yeah!
Make sure to have read (at least the first chapter) of the book mentioned above.
Then you will understand what is talked about in this video! 

youtube.com/watch?v=SC1wEW7TtKs

# ML for VRT - Part 3: Hands On
slug: ml-for-vrt-part-3-hands-on
dateCreated: 2020-08-09 09:54 CET
tags: learning, machine learning, automation

I renamed the series to "ML for VRT" instead of "ML vs. VRT"
since that is what I actually want to achieve (eventually), as you can read in 
[Part 1 - Machine Learning vs. Screenshot Comparing?](/tidbits/2020/08/machine-learning-vs-screenshot-comparing/).
Read on to figure out how I ended  up next  to learn about neural networks, because  I figured
out just applying some code examples learned from tutorials won't suffice my learning
and they  won't answer the questions I actually have to understand how to tune a 
neural network to do what I image it to do, detecting screenshots for visual regression testing.

## Use Keras, an ML Library, for the First Time
As described in [part 2](/tidbits/2020/08/ml-vs-vrt-part-2-learning-keras/)
I started to learn Keras in order to  write a first machine learning algorithm myself.

If you want to  dive  right in, find [this repo "learning-ml"](https://codeberg.org/wolframkriesing/learning-ml)
where I built a docker container which runs a [jupyter](https://jupyter.org/)
notebook and where I played around with, first the example from a course
and second exploring a simple task to use ML on. But let's go step by step.

## The Example From the Keras Tutorial
As described in  the earlier parts I followed Kamal's suggestions to learn using ML
by reading [Introduction to Keras for Engineers](https://keras.io/getting_started/intro_to_keras_for_engineers/)
which turned out to raise many more questions than answers.
My  way of learning was to  read the tutorial and figure out if I can understand what is being 
done. I failed.

## Why did I fail Learning from "Keras for Engineers"
First,  one should understand what is my background.
I am a normal software developer, I  have done a lot of low-level (without web),
in 1999 I jumped into the web, I did  a  lot of PHP, Python, etc. and for the last 
20  years I  do  mostly JavaScript extensively. I love to read the specs of technologies
I use (if available) and I like to learn and understand the history and reasons
why a certain technology was developed and is used for. And I know the applications
technologies are used for change over time.

Back to learning from "Keras for Engineers".
I thought I read through the code on the page, read the explanations and I will be set
to go and make use of machine learning. Actually, my initial expectation was even simpler,
I thought I download some library  and throw right and wrong screenshots in some 
directories and tell  the code to learn and then I have trained a model to detect
right and wrong screenshots. It turned out to not be that easy.

You might succeed with that simple approach by going another path, but I am the
kind of person, I like to understand what is happening under the hood. 
I started my career learning low-level languages like C and Assembler, I knew
(more or less) well what was going on under the hood.
So I expect the same here. I want to understand how does a ML code come up
with the result that it comes up with.

Well, I already learned over the last years at HolidayCheck from my colleagues
that worked with ML, that "understanding" and maybe even verifying why an ML model
comes up with a certain result is not really how it works.
Anyways, I am  a bit stubborn :).

## Switch to a TensorFlow Course via Video
I searched around and got stuck with a freeCodeCamp.org video
[Keras with TensorFlow Course - Python Deep Learning and Neural Networks for Beginners Tutorial](https://www.youtube.com/watch?v=qFJeN9V1ZsI).
I did work through the first hour, because already learned in the first ten minutes
to understand terminology which had  raised question  marks in the previously mentioned
Keras tutorial. So I followed along.

I think I  kinda got the hang of it. I learned to at least understand how the parts
are connected, not that I really understand all the terms used yet, but the course gave me
a good feeling of where things belong.
So I did the first example from scratch, writing all the code by hand by  fast forwarding the
video for a second time to the places where the code was shown. Even though I did  not
totally understand  the reason for building the  first model I got it to  run.
See [the repo](https://codeberg.org/wolframkriesing/learning-ml) and 
[the source code online of the first "patients example"](https://codeberg.org/wolframkriesing/learning-ml/src/branch/main/1-patients-example1.py).
You can run it either in a jupyter notebook,  which is handy, but not how I prefer it to do.
Or you can run it on the command line after cloning the repo like so `./run.sh python 1-patients-example1.py`.
See  the [README](https://codeberg.org/wolframkriesing/learning-ml/src/branch/main/README.md) for more detailed instructions.

## My Own First Model Training
The  actual fun part comes now. I want to train a model that I came up with, where I can also
judge the predictions.

So I needed a problem, a simple problem to solve first.
While I first thought I was in  a dead end when the input is just simple numbers,
I quickly  realized I can come up with many examples that can be simple things for an AI to learn.
I thought **why not train an AI to learn to find even and odd numbers**?
Let me take away, the result first. I failed. I could not make the model learn that on my first try.
But knowing and trying to find out why is a great learning too.

## Even or Odd - Training my First Model


----
To be  written about:
- I started with https://www.coursera.org/learn/ai-for-everyone/
- Thomas suggested to learn with https://course.fast.ai/videos/?lesson=1
  the code that will be used https://github.com/fastai/course-v3/blob/master/nbs/dl1/lesson1-pets.ipynb
- explanation why  even/odd cant work https://stackoverflow.com/questions/53671491/machine-learning-odd-even-prediction-doesnt-work-50-success
- Thomas said even/odd can be done, but I need to learn how, I have no clue



# ML for VRT - Part 2: Learning Keras
slug: ml-vs-vrt-part-2-learning-keras
dateCreated: 2020-08-05 19:54 CET
tags: testing, machine learning, automation, visual regression test

In [part 1](/tidbits/2020/08/machine-learning-vs-screenshot-comparing/)
I started my naive investigation on how to apply machine learning for
making visual regression tests (VRT) better.
I described the problem to solve, explored Keras  very superficially and did also touched on the complexity
of doing ML myself as opposed to having colleagues who are experts and who throw phrases
like "train a model" and "predict" etc. around.   
Oh boy, did I underestimate this.

## Keras - A Deep Learning API
The above paragraph is gibberish? Let's take a step back  again.

Since Kamal had pointed me to Keras I go with the flow, I trust his expertise  and I start reading what it is.  
> Keras is a deep learning API written in Python, running on top of the machine learning platform TensorFlow. It was developed with a focus on enabling fast experimentation. Being able to go from idea to result as fast as possible is key to doing good research.

Sounds like what I need. And if my VRT will run on the server I am fine  with  Python, which is a great language!
Though I had to  ask Kamal, what about JavaScript. I  know there is tensorflow for  JS, he said
I should read [this](https://codelabs.developers.google.com/codelabs/tfjs-training-classfication/index.html#0)
but from all what I hear and learned Python seems to be the first go  to language. So I  stiick to it,
I also want to learn fast. So I started digging out my rusty  Python knowledge :).

Next I read [Introduction to Keras for Engineers](https://keras.io/getting_started/intro_to_keras_for_engineers/).
The first important thing I learned are the 
[what I will learn in this guide](https://keras.io/getting_started/intro_to_keras_for_engineers/#introduction), 
which sounds like the steps I need:

1. Prepare your data before training a model
1. Do data preprocessing
1. Build a model that turns your data into useful predictions
1. Train your model
1. Evaluate your model on a test data
1. Customize
1. Speed up training by leveraging multiple GPUs.
1. Refine your model 

I guess I  have to  start taking some screenshot, to do step 1 "Prepare data".

## Preprocessing
The next step  is preprocessing data, the guide says:
> In general, you should seek to do data preprocessing as part of your model as much as possible, not via an external data preprocessing pipeline.

On the other hand this might cause  a lot of data, imagine every image has a million pixels, won't that be slow as hell?
So I asked Kamal again, since that was not that clear from the guide:

> Me: How do I preprocess my screenshots?  
> Kamal: Keras preprocessing will do that for you.   
> Me: I expect images  to  have many pixels  and also varying sizes, do I have to  preprocess those?  
> Kamal: The library takes care of it.  

The answer came later [in the guide too](https://keras.io/getting_started/intro_to_keras_for_engineers/#using-keras-preprocessing-layers):
> In Keras, you do in-model data preprocessing via preprocessing layers  
> [..]  
> The key advantage of using Keras preprocessing layers is that they can be included directly into 
> your model, either during training or after training, which makes your models portable.

Makes sense to me. But  still feels like it will be computation intensive. But let's see.
The guide then lists some code, that looks readable but what's under the hood is magic to me.
But let me get through the process first and eventually it will reveal it's magic, I learned that.
The alternative would be to go deep into the science behind it, but then I would not get done in the next two years ;).

## Building Models
This is just step three of the eight steps listed above.
> A "layer" is a simple input-output transformation (such as the scaling & center-cropping transformations above).  
> [..]  
> You can think of a model as a "bigger layer" that encompasses multiple sublayers and that can be trained via exposure to data.

Sounds like docker, hehe. Next, some code, I understand:
```python
# "To build models with the Functional API, you start by specifying the shape"
# Let's say we expect our inputs to be RGB images (3) of arbitrary size (None, None)
inputs = keras.Input(shape=(None, None, 3))
```

Next are some details about building a model, which will have multiple  inputs
`model = keras.Model(inputs=inputs, outputs=outputs)` but I will need to understand better
once I am coding it.

## Training Models
> The next step is to train your model on your data.

```python
# "fit" the data to the model
model.fit(numpy_array_of_samples, numpy_array_of_labels, batch_size=32, epochs=10)
```

> Besides the data, you have to specify two key parameters: the batch_size and the number of epochs 
> (iterations on the data). Here our data will get sliced on batches of 32 samples, and the model 
> will iterate 10 times over the data during training.

I am assuming that the  labels are where the indicating of right  and wrong goes, but I am not sure.
I mean I will need to tell the machine what images are good and which ones are bad ones.
Reading on, maybe it will reveal soon.

I am getting overwhelmed by reading the next parts,  I only understand half of what is going on.
Eventually I will have to learn the underlyings I feel.

```python
# I understand this ... though I assume I won't need any of 
# those when I have screenshots of a website.
x = CenterCrop(...
x = Rescaling(...

# Now it gets tricky.
x = layers.Conv2D(...
x = layers.MaxPooling2D(...
x = layers.GlobalAveragePooling2D(...
outputs = layers.Dense(...
```

Oh my gosh. There is stuff in there that I have no idea what it means and how I  would need to adjust it
for my use case.

> Once you have defined the directed acyclic graph of layers

What did I do?

I  found this video
https://www.youtube.com/watch?v=qFJeN9V1ZsI
which explains in three hours all the things I think I need to know.
And it seems a bit more fitting to my (low) state of knowledge.


# ML for VRT - Part 1 (was: Machine Learning vs. Screenshot Comparing?) 
slug: machine-learning-vs-screenshot-comparing
dateCreated: 2020-08-04 18:14 CET
tags: testing, machine learning, automation, visual regression test

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

Kamal suggested [keras](https://keras.io/examples/vision/mnist_convnet/) to "it will get you started" he says.
Also this for understanding 
[Image classification from scratch](https://keras.io/examples/vision/image_classification_from_scratch/).
What do all these functions mean? (see [Build the model](https://keras.io/examples/vision/mnist_convnet/#build-the-model))
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

I  am all lost. I thought it was  as simple as throwing some images somewhere and call `run()`.
I was naiv.
Kamal says "maybe this helps [Introduction to Keras for Engineers](https://keras.io/getting_started/intro_to_keras_for_engineers/)".

## The Plan to  Solve my Problem
Leaving all the ML internals aside. Let me try to explain what is my current plan on how to make use
of ML for solving this problem.

I have a plan now how to create images to train the model with, the images i would generate using my site:
- images always for different screen sizes, 1024x768, 1400x1900, etc.
- images with the latest blog posts
- images with older blog posts (1st...10th, 2nd...11th, 3rd..12th, ...) to have different looking sites
- images for the different media-queries (portrait, landscape)
- images for different font sizes (since [you can configure that in your browser](/tidbits/2020/04/the-end-user-always-has-ultimate-control/))

Of course I need right and wrong images, I need to tag them accordingly first, so the model can learn.
Should it be 50/50? Ideally it should be, but doesnt have to be.

## What's Next?
Read [part 2](/tidbits/2020/08/ml-vs-vrt-part-2-learning-keras/)
about what I tackled next and how I started to go through the keras tutorial to hope to learn
how to train my model.

I still have questions like:
- Will it really be "easy" and possible to train a model to "understand" my screenshots?
- Is this task not too big?
- How do I know ML does the task well?
- When will I see useful results?

If you are curious read [Part 2 about learning Keras](/tidbits/2020/08/ml-vs-vrt-part-2-learning-keras/).

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
