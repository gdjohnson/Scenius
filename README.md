# README

![Track Show Page](/ReadMe%20Assets/OverYou.png)

Brian Eno:

>When I was an art student and, like all art students, I was encouraged to believe that there were a few great figures like Picasso and Kandinsky, Rembrandt and Giotto and so on who sort-of appeared out of nowhere and produced artistic revolution. As I looked at art more and more, I discovered that that wasn’t really a true picture.
> 
>What really happened was that there was sometimes very fertile scenes involving lots and lots of people – some of them artists, some of them collectors, some of them curators, thinkers, theorists, people who were fashionable and knew what the hip things were – all sorts of people who created a kind of ecology of talent. And out of that ecology arose some wonderful work... So I came up with this word SCENIUS – and scenius is the intelligence of a whole… operation or group of people.

Scenius is a fullstack CRUD app clone of the lyrics & annotation site [Genius](https://genius.com) (formerly RapGenius). Built with React/Redux, Ruby on Rails, and the Web API, Scenius allows users to add song lyrics (+ associated album, artist, and track data) to its PostgreSQL database. Much of the GUI design is based on Genius—the two-column layout of lyrics and annotations, the varied opacity of track page headers (requiring CSS z-indices and variable background styles). Other aspects of the UI,  where there seemed room for design improvement or where the Genius design style proved a mismatch for my own purposes, I deviated, harnessing the full power of CSS flex to build a more elegant New Track form, or cutting down on unnecessary text clutter in the UI.

The text annotation system itself, built entirely from scratch with Web API and vanilla Javascript, proved one of the most difficult features to build in the application. Doing research on past strategies for tackling text annotation, I found that one of the most common involved breaking up a text body into a series of `<div>` elements by line. From there, sets of lines could be "annotated" by attached a database object to its corresponding `<div>` element in the DOM. While this approach is elegant and relatively simple to implement, it lacks insofar as annotators often prefer to mark up either a word or phrase (i.e. a sub-section of a `<div>` element) or some fractional combination of lines (e.g. one-and-a-half `<div>` elements). This seriously limited usage flexibility.

An early solution, involving the text body being divided into `<div>` elements at the word or character level, was decided against since it raised potential problems dealing with annotation overlap and had been explicitly decided against by the Genius team's original design. Instead, I settled on treating the entire text body as a parent element indexed into at precise locations. At its most basic this involved pulling the start and end index of a user's text selection (the location in the text they wish to annotate) and saving it in the backend as an Annotation object. When a new track's lyrics page is rendered, a function works through the parent text body and, when a given index location matches the Start and End indices of a stored annotation, wraps the given index range in a `<span>` element containing an id corresponding to the id of the backend object. When the `<span>` element is clicked, the id in the DOM allows a separate set of JS functions to locate, pull, and render the saved annotation itself on the page.

![linkSpanToAnno](/ReadMe%20Assets/linkSpanToAnno.png)

_Helper method linking the DOM annotation elements to the backend annotation objects via shared ids._

While the basic conditional logic for indexing in and out of the lyrics text body was relatively straightforward, there were complications in implementation. The initial problem involved "eliminating" or "discounting" the `<span>` elements in the lyrics body index count, since the presence of any HTML tags in the larger lyrics `<p>` element would throw off indexing. An unannotated lyrics page would contain a single, unbroken text element, but the first annotation splits it into three—the first `<p>` element, the annotation `<span>` element, and the second, post-span text child which follows. Further annotations only continue the splintering and subdivision. But by observing the number of annotation elements attached to a given track (i.e. taking the length of the track's annotations array from the Redux state), my code could easily bypass this problem. First, a function would perform a homebrewed quicksort function on the annotations, ranking them by starting index location. Regardless of where, when, and in what order annotations had been created by users, there was now a systematic way of rendering them in the DOM. 

![sortAnnotations](/ReadMe%20Assets/sortAnnotations.png)

_The helper quicksort method for rendering existing annotations from the backend._

Next, a simple alternating function counts how many `<span>` wraps have already been added to the text body. After the first `<span>` annotation element has been added to the text body, the code—instead of trying to re-insert the second annotation in the first `<p>` element—searches for the third element (the second `<p>`, beginning after the first `<span>`) and inserst the new `<span>` there.

While this approach solved 80% of use cases, a number of edge-cases and semi-nonstandard usages threatened to break the indexing system. For one, Selection objects (Web API objects tracking client highlighting/text selection) can be initiated either from left to right or right to left. A right-to-left user selection contains start, end, and offset properties similarly determined from right-to-left (as opposed to left-to-right, as in typical use). In other words, such selections registered an annotation's start index as "higher" or "greater" than the end index. This caused problems with my sorting and wrapping methods, but was solved by switching from handling Web API Selection objects (bidirectional start/end points) to Web API Range objects (directionally indifferent). 

![createAnno](/ReadMe%20Assets/createAnno.png) ![createAnnoSpan](/ReadMe%20Assets/createAnnoSpan.png)

_Creating annotations: A partial look at the conditional logic needed for processing different types of annotations, depending on precedent, directionality of selection, and start or end overlap with pre-existing annotations._

Similar issues, all stemming from a huge variety in possible usage patterns, presented themselves through the feature implementation. My approach was always the same: 1/ Carefully reading the relevant sections of the Web API docs, searching for object properties and methods which might be relevant towards my problem, 2/ Explicitly writing out the usage conditions which each piece of code logic addressed (helping me navigate nested logics), and 3/ Breaking down the underlying patterns of usage and code behavior in order to refactor the possibility tree (helping me eliminate a number of time and space-heavy nested functions). But I also learned the value of recognizing more challenging problems and blueprinting out solutions to them in advance: the architectural clarity which arrived by the annotation feature's completion would've been a valuable guide over the murkiness I encountered.
