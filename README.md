<h1> Overview </h1>

Project developed from scratch with the purpose of fixating javascript concepts like DOM manipulation, event bubbling and built-in methods.

The app main functionality is a stopwatch with two buttons and 4 actions available: Start, Stop, Resume and Reset.

With users prone to motion sickness in mind, the animations (which includes milliseconds display due to its fast nature) don't show if they have motion reduced setting on.

Although the design screenshots display the number of days passed, it will only show in case the stopwatch surpasses 24h, which would be a unlikely real world scenario, so I added just as a little "easter egg" of sorts.

<h2>Initial Design</h2>

<h3>Desktop</h3>
<img src="https://github.com/RyukioMiyamoto/stopwatch/blob/main/img/desktop_design.png?raw=true" alt="A digital stopwatch displaying days, hours, minutes, seconds and milliseconds">
<h3>Mobile</h3>
<img src="https://github.com/RyukioMiyamoto/stopwatch/blob/main/img/mobile_design.png?raw=true" alt="A digital stopwatch displaying days, hours, minutes, seconds and milliseconds">
<h3>Styles guide</h3>
<img src="https://github.com/RyukioMiyamoto/stopwatch/blob/main/img/style.png?raw=true" alt="">

<h3>Issues</h3>
I noticed that whenever the application was out of focus (tab changes) the watch would stop, so I looked into it and found out the setInterval method wasn't very reliable for this kind of operation, however I wanted to try and find a fix for it and tried until I've reached the present solution, using the Date methods, calculating the difference in time from when the visibility changed and adding to the total time. There's room for improvement but as it is, I feel satisfied for reaching a working solution.

<h2>Demo</h2>

https://stopwatch-yukio.netlify.app
