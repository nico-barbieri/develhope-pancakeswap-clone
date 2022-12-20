import { timeUnitInMs } from "./data-simulation.mjs";
let now = new Date();
let nextEvent = new Date();
let $countdown = document.querySelector('#slideshow-countdown');

const formattedTime = (time) => {
    return new Date(time).toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });
}

const timeUntilNextExtraction = (now, nextEvent) => {
    now = new Date();
    nextEvent.setHours(5, 0, 0, 0);
    if (now.getHours() > 5) nextEvent.setHours(11, 0, 0, 0);
    if (now.getHours() > 11) nextEvent.setHours(17, 0, 0, 0);
    if (now.getHours() > 17) nextEvent.setHours(23, 0, 0, 0);
    return formattedTime(nextEvent.getTime() - now.getTime());
}

const countdown = (html) => {
    html.innerHTML = timeUntilNextExtraction(now, nextEvent);
}

setInterval(() => {
    countdown($countdown);
}, 1000);
