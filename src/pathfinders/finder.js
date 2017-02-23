/** Abstract structure for search algorithms. */
class Finder {
    /**
     * Constructor for abstract Finder.
     * @param {Grid} grid - Grid on which path is searched.
     * @param {function} heuristic - Heuristic used for searching.
     * @param {Array} other - Other arguments / options that got passed.
     */
    constructor(grid, heuristic, ...other) {
        // Ensure that Finder can't be instantiated.
        if (this.constructor === Finder) {
            throw new TypeError("Cannot construct abstract Finder instances directly");
        }

        // Save grid for subclasses to use.
        this.grid = grid;

        // If heuristic function was given, make it tie winning.
        if (heuristic !== undefined) {
            // P is estimated max distance for breaking ties.
            let p = grid.size;
            this.heuristic = (node, goal) => (heuristic(node, goal) * (1 + 1 / p));
        } else {
            // Fall back to default heuristic function (always zero).
            this.heuristic = Heuristics.NONE;
        }

        // Ensure that subclasses have implemented this class
        if (this.findShortestPath === undefined) {
            throw new TypeError('Classes extending the Finder must implement findShortestPath()');
        }
    }

    // Get distance between neighbouring nodes.
    _getDistance(node, next) {
        let weight = node.x == next.x || node.y == next.y ? 1 : SQRT2;
        return node.gScore + weight;
    }

    // Extract path from given node (usually goal node).
    _backtrack(node) {
        let path = new List();
        while (node !== undefined) {
            path.push(node);
            node = node.parent;
        }
        path.reverse();
        return path;
    }
}