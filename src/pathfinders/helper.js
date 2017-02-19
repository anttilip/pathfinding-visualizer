// Constants
const SQRT2 = Math.sqrt(2);

// Heuristics
var dijkstra = function(node, goal) {
    return 0;
};

var octile = function(node, goal) {
    var dx = Math.abs(node.x - goal.x);
    var dy = Math.abs(node.y - goal.y);
    return dx + dy + (SQRT2 - 2) * Math.min(dx, dy);
};

var euclidean = function(node, goal) {
    var dx = Math.abs(node.x - goal.x);
    var dy = Math.abs(node.y - goal.y);
    return Math.sqrt(dx * dx + dy * dy);
};

var manhattan = function(node, goal) {
    var dx = Math.abs(node.x - goal.x);
    var dy = Math.abs(node.y - goal.y);
    return dx + dy;
};

// Presets
const config = {
    DIJKSTRA: {
        algo: AStar,
        heuristic: dijkstra,
        diagonal: true
    },
    ASTAR_OCTILE: {
        algo: AStar,
        heuristic: octile,
        diagonal: true
    },
    ASTAR_EUCLIDEAN: {
        algo: AStar,
        heuristic: euclidean,
        diagonal: true
    },
    ASTAR_MANHATTAN: {
        algo: AStar,
        heuristic: manhattan,
        diagonal: false // Does not work with diagonals
    }
};