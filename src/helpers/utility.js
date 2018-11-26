export const buildQueryString = params => {
    let index = 0;
    let queryString = '';
    for(var key in params) {
        index++;
        if (index === 1) {
            queryString += key + '=' + encodeURIComponent(params[key]);
        } else {
            queryString += '&' + key + '=' + encodeURIComponent(params[key]);
        }
    }
    return queryString;
}

export function getScroll() {
    if (window.pageYOffset != null) {
        //IE9+ and other browsers
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        };
    } else if (document.compatMode === 'CSS1Compat') {
        // detect quirk mode, have DTD <!DOCTYPE html> 
        return {
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
        };
    }
    return {
        left: document.body.scrollLeft,
        top: document.body.scrollTop
    };
}

export function getClient() {
    if (window.innerWidth != null) {
        //IE9+
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    } else if (document.compatMode === "CSS1Compat") {
        // have DTD, not quirk mode
        return {
            width: window.documentElement.clientWidth,
            height: window.documentElement.clientHeight
        };
    }
    return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
    };
}

export function getStyle(dom, attr) {
    if (dom.currentStyle) {
        //ie
        return dom.currentStyle[attr];
    } else {
        //standard, w3c
        return window.getComputedStyle(dom, null)[attr];
    }
}

export function throttle(fn, delay) {
    var timer = null;
    return function() {
        clearTimeout(timer);
        timer= setTimeout(fn, delay);
    }
}
