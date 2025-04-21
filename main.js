// let locoScroll;

// function initLocoScroll() {
//     locoScroll = new LocomotiveScroll({
//         el: document.querySelector('[data-scroll-container]'),
//         smooth: true
//     });
// }

// window.addEventListener('load', () => {
//     initLocoScroll();
// });

// // On resize, update the locomotive instance to recalc positions
// window.addEventListener('resize', () => {
//     if (locoScroll) locoScroll.update();
// });


// Hover text functionality
const hoverTextContainer = document.createElement('div');
hoverTextContainer.className = 'hover-text-container';
document.body.appendChild(hoverTextContainer);

let isHoverTextVisible = false;
let hoverTimeout = null;

function showHoverText(event, text) {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    
    // Pause audio when showing hover text
    if (isPlaying) {
        audio.pause();
    }

    hoverTextContainer.textContent = text;
    hoverTextContainer.style.left = `${event.clientX}px`;
    hoverTextContainer.style.top = `${event.clientY}px`;
    hoverTextContainer.classList.add('visible');
    isHoverTextVisible = true;
}

function hideHoverText() {
    hoverTextContainer.classList.remove('visible');
    isHoverTextVisible = false;
    
    // Resume audio if it was playing
    if (isPlaying) {
        audio.play().catch(err => console.warn('Audio playback failed:', err));
    }
}

// Handle hover events
document.querySelectorAll('[data-hovertext]').forEach(element => {
    const text = element.getAttribute('data-hovertext');
    
    // Desktop hover
    element.addEventListener('mouseenter', (e) => {
        showHoverText(e, text);
    });

    element.addEventListener('mouseleave', () => {
        hideHoverText();
    });

    // Mobile touch
    element.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (isHoverTextVisible) {
            // Second tap - navigate to link
            const link = element.closest('a');
            if (link) {
                window.location.href = link.href;
            }
            hideHoverText();
        } else {
            // First tap - show hovertext
            showHoverText(e.touches[0], text);
        }
    });
});