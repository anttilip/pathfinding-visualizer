/*
    These are just small helper functions to make life easier.
*/

function flatten(x, y, len) {
    return x * len + y;
}

function hslToStr(h, s, l) {
    return 'hsl(' + h + ',' + s + '%,' + l + '%)';
}