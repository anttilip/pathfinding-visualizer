// Constants
const SQRT2 = Math.sqrt(2);

// Heuristics
var Heuristics = {
    DIJKSTRA: function(node, goal) {
        return 0;
    },

    OCTILE: function(node, goal) {
        var dx = Math.abs(node.x - goal.x);
        var dy = Math.abs(node.y - goal.y);
        return dx + dy + (SQRT2 - 2) * Math.min(dx, dy);
    },

    EUCLIDEAN: function(node, goal) {
        var dx = Math.abs(node.x - goal.x);
        var dy = Math.abs(node.y - goal.y);
        return Math.sqrt(dx * dx + dy * dy);
    },

    MANHATTAN: function(node, goal) {
        var dx = Math.abs(node.x - goal.x);
        var dy = Math.abs(node.y - goal.y);
        return dx + dy;
    }
};
// Presets
const config = {
    DIJKSTRA: {
        algo: AStar,
        heuristic: Heuristics.DIJKSTRA,
        diagonal: true
    },
    ASTAR_OCTILE: {
        algo: AStar,
        heuristic: Heuristics.OCTILE,
        diagonal: true
    },
    ASTAR_EUCLIDEAN: {
        algo: AStar,
        heuristic: Heuristics.EUCLIDEAN,
        diagonal: true
    },
    ASTAR_MANHATTAN: {
        algo: AStar,
        heuristic: Heuristics.MANHATTAN,
        diagonal: false // Does not work with diagonals
    }
};