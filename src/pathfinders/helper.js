// Constants
const SQRT2 = Math.sqrt(2);

// Heuristics
let Heuristics = {
    NONE:
    function(node, goal) {
        return 0;
    },

    OCTILE:
    function(node, goal) {
        let dx = Math.abs(node.x - goal.x);
        let dy = Math.abs(node.y - goal.y);
        return dx + dy + (SQRT2 - 2) * Math.min(dx, dy);
    },

    EUCLIDEAN:
    function(node, goal) {
        let dx = Math.abs(node.x - goal.x);
        let dy = Math.abs(node.y - goal.y);
        return Math.sqrt(dx * dx + dy * dy);
    },

    SQUARED_EUCLIDEAN:
    function(node, goal) {
        let dx = Math.abs(node.x - goal.x);
        let dy = Math.abs(node.y - goal.y);
        return 10000 * (dx * dx + dy * dy);
    },

    MANHATTAN:
    function(node, goal) {
        let dx = Math.abs(node.x - goal.x);
        let dy = Math.abs(node.y - goal.y);
        return dx + dy;
    }
};
// Presets
const config = {
    DIJKSTRA: {
        algo: AStar,
        heuristic: Heuristics.NONE,
        name: 'Dijkstra'
    },
    ASTAR_OCTILE: {
        algo: AStar,
        heuristic: Heuristics.OCTILE,
        name: 'A* (octile distance)'
    },
    ASTAR_EUCLIDEAN: {
        algo: AStar,
        heuristic: Heuristics.EUCLIDEAN,
        name: 'A* (euclidean distance)'
    },
    ASTAR_MANHATTAN: {
        algo: AStar,
        heuristic: Heuristics.MANHATTAN,
        name: 'A* (manhattan distance)'
    },
    BEST_FIRST: {
        algo: AStar,
        heuristic: Heuristics.SQUARED_EUCLIDEAN,
        name: 'Best-first'
    },
    DFS: {
        algo: DFS,
        heuristic: Heuristics.NONE,
        name: 'Depth-first (DFS)'
    }
};