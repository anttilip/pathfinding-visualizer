const S = nodeType.START.code;
const G = nodeType.GOAL.code;
const W = nodeType.WALL.code;

const m1 = {
    maze: [
        [S, 0],
        [0, G]
    ],
    dist: 1.414
};

const m2 = {
    maze: [
        [S, W, 0, 0, 0],
        [0, W, 0, W, 0],
        [0, W, 0, W, 0],
        [0, W, 0, W, 0],
        [0, 0, 0, W, G]
    ],
    dist: 13.656
};

const m3 = {
    maze: [
        [S, W, G, 0, 0, 0, 0, 0, 0],
        [0, W, 0, 0, 0, 0, 0, 0, 0],
        [0, W, 0, 0, 0, 0, 0, W, 0],
        [0, W, 0, 0, 0, 0, W, 0, 0],
        [0, W, W, W, W, W, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [W, W, W, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    dist: 13.656
};

const solvableMazes = [m1, m2, m3];

const unsolvableMaze = {
    maze: [
        [S, W, 0, 0, 0],
        [0, W, 0, W, 0],
        [0, W, 0, W, W],
        [0, W, 0, W, 0],
        [0, 0, 0, W, G]
    ],
    dist: Infinity,
    goal: [4, 4]
};