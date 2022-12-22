const navBar = document.getElementById("navbar")

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos >= currentScrollPos) {
        navBar.style.top = "0";
    }
    else if (currentScrollPos > 70) {
        navBar.style.top = "-56px";
    }
    prevScrollpos = currentScrollPos;
}






