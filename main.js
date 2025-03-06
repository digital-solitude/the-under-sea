let locoScroll;

function initLocoScroll() {
    locoScroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true
    });
}

window.addEventListener('load', () => {
    initLocoScroll();
});

// On resize, update the locomotive instance to recalc positions
window.addEventListener('resize', () => {
    if (locoScroll) locoScroll.update();
});