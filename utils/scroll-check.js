// Whether the element or any ancestor up to root is scrolled down
export function isScrolledDown(el, root) {
    while (el) {
        if (el.scrollTop > 0) return true; // Return true when a scrollable element was found
        if (el === root) return false;
        el = el.parentElement;
    }
    return false;
}

// Whether the element or any ancestor up to root can still scroll further down
export function canScrollDown(el, root) {
    while (el) {
        const scrollRemaining = el.scrollHeight - el.scrollTop - el.clientHeight;
        if (scrollRemaining > 1) return true; // scrollTop can be fractional while scrollHeight and clientHeight are rounded
        if (el === root) return false;
        el = el.parentElement;
    }
    return false;
}
