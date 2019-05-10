# README

Brian Eno:

> I was an art student and, like all art students, I was encouraged to believe that there were a few great figures like Picasso and Kandinsky, Rembrandt and Giotto and so on who sort-of appeared out of nowhere and produced artistic revolution. As I looked at art more and more, I discovered that that wasn’t really a true picture.
> 
> What really happened was that there was sometimes very fertile scenes involving lots and lots of people – some of them artists, some of them collectors, some of them curators, thinkers, theorists, people who were fashionable and knew what the hip things were – all sorts of people who created a kind of ecology of talent. And out of that ecology arose some wonderful work... So I came up with this word SCENIUS – and scenius is the intelligence of a whole… operation or group of people.

Scenius is a fullstack app clone of Genius (formerly RapGenius), the song lyrics annotation site. Built with React/Redux, Ruby on Rails, and the Web API, Scenius allows users to add song lyrics (+ associated album, artist, and track data) to its PostgreSQL database. Some of the GUI design is based on Genius's—the varied opacity of track page headers, using CSS z-indices and variable background styles, for instance. Other aspects of the UI, especially where there seemed room for design improvement or where the Genius style was a mismatch for my own deviated purposes, I deviated, harnessing the full power of CSS flex to build a more elegant New Track form, or generally out unnecessary text clutter from the UI.

One of the more difficult features to implement in Scenius was the text annotation system, built entirely from scratch with Web API and vanilla Javascript. Doing research on past strategies for tackling text annotation, I found that one of the most common involved breaking up a text body into a series of `<div>` elements by line. From there, a line could be "annotated" by attached a database object to its corresponding `<div>` element in the DOM. While this approach is elegant and relatively simple to implement, it lacks insofar as annotators often prefer to mark up either a word or phrase (i.e. a sub-section of a a `<div>` element) or some combination of lines (e.g. one-and-a-half `<div>` elements). This seriously limited usage flexibility.

An early solution, involving the text body being divided into `<div>` elements at the word or character level, was decided against since it raised potential problems with overlapping annotations and had been explicitly decided against by the Genius team's original design. Instead, I settled on treating the entire text body as a single element indexed into at precise locations. At first glance, this meant pulling the start and end index of a user's text selection (the location in the text they wish to annotate) and saving it in the backend as an Annotation object. When a new track's lyrics page is rendered, a function travels through the lyrics text body and, when a given index location matches the Start and End indices of a stored annotation, that index range is wrapped in a `<span>` element containing an id corresponding to the id of the backend object. When the `<span>` element is clicked, the id in the DOM allows a separate set of JS functions to locate, pull, and render the saved annotation itself on the page.

While the basic conditional logic for indexing in and out of the lyrics text body was relatively straightforward, there were complications in implementation. The initial problem was merely "eliminating" the `<span>` elements in the lyrics body, since the presence of any HTML tags in the larger lyrics `<p>` element would throw off the careful indexing. An un-annotated lyrics page would contain a single, unbroken text element, but the first annotation breaks this single element into three--the first `<p>` element, the `<span>` element, and the second, post-span text which follows. Further annotations only continue the splintering. But by observing the number of annotation elements attached to a given track (i.e. taking the length of the track's annotations array from the Redux state), my code could easily bypass this problem. First, a function would perform a homebrewed Quicksort on the annotations, ranking them by starting index location. Regardless of where, when, and in what order annotations had been created by users, there was now a systematic way of rendering them in the DOM. Next, a simple alternating function counted how many `<span>` wraps had already been added to the text body. After the first `<span>` annotation element had been added to the text body, the code--instead of trying to re-insert the second annotation in the first `<p>` element--would search for the third element (the second `<p>`, beginning after the first `<span>`) and insert the new `<span>` there. This required the system for subtracting or "eliminating" HTML tags from the index count, both when pulling user selections to create a new backend annotation and when rendering existing backend annotations on the page.

While this approach solved 80% of use cases, a number of edge-cases and semi-nonstandard usages threatened to break the indexing system. For one, Selection objects (Web API objects tracking client highlighting/text selection)can be initiated either from left to right or right to left. A right to left selection sets its start, end, and offset properties from right to left--in other words, registering an annotation's start index as "higher" or "greater" than the end index. This caused problems with my sorting and wrapping methods, but was solved easily with conditional logic and a switch from handling Web API Selection objects (bidirectional start/end points) to Web API Range objects. 

Similar issues, all stemming from a huge variety in possible usage patterns, presented themselves through the feature implementation. My approach was always the same: 1/ Carefully reading the relevant sections of the Web API docs, searching for object properties and methods which might be relevant towards my problem, 2/ Explicitly writing out the usage conditions which each piece of code logic addressed (helping me navigate nested logics), and 3/ Breaking down the underlying patterns of usage and code behavior in order to refactor the possibility tree (helping me eliminate a number of time and space-heavy nested functions). But I also learned the value of recognizing more challenging problems and blueprinting out solutions to them in advance: the architectural clarity which arrived by the annotation feature's completion would've been a valuable guide over the murkiness I encountered.
