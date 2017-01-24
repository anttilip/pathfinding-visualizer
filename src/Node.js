var nodeType = {
    EMPTY: {
        code: 'E',
        color: '#ffffff'
    },
    WALL: {
        code: 'W',
        color: '#262626'
    },
    START: {
        code: 'S',
        color: '#0fbc00'
    },
    GOAL: {
        code: 'G',
        color: '#bc0000'
    }
};

class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.type = nodeType.EMPTY;
    }
}