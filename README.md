# Proximity
proximity.js is a javascript file you can add to your project, website, etc. to visualize the waveform of an audio file. Name was inspired by youtube channel called __Proximity__.

To test it you need to add an audio file into the directory called `song.mp3` or change the source of the `AudioElement` in test.html line 7 to the path of your desired song.

## How to add it to my project?
Insert the following code into your HTML-File
```html
<script src="proximity.js"></script>
<script type="text/javascript">
var audioElement = document.getElementById("..."),
	canvasElement = document.getElementById("...");

var myVisualizer = new visualizer(audioElement, canvasElement);
myVisualizer.init();
```

