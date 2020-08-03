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
