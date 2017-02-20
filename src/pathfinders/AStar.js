/** A* search algorithm. */
class AStar {
    /**
     * Constructor for A* search algorithm.
     * @param {Grid} grid - Grid on which path is searched.
     * @param {function} heuristic - Heuristic used for searching.
     */
    constructor(grid, heuristic) {
        this.grid = grid;
        // P is estimated max distance for breaking ties
        let p = grid.size;
        this.heuristic = (node, goal) => (heuristic(node, goal) * (1 + 1 / p));
    }

    /**
     * Find shortest path in a grid.
     * @return {{path:Node, opened:Node}[]} - Shortest path and all opened nodes.
     */
    findShortestPath() {
        // Nodes that have been seen but not processed yet.
        let openSet = new Heap();
        // Ordered list of nodes which have been seen.
        let openedList = new List();

        let start = this.grid.startNode;
        let goal = this.grid.goalNode;

        // gScore is nodes distance from start node.
        start.gScore = 0;
        // fScore is gScore plus heuristic.
        start.fScore = 0;

        // Push start node to heap
        openSet.push(start.fScore, start);
        start.opened = true;
        openedList.push(start);

        // Main loop
        while (openSet.size !== 0) {
            let node = openSet.pop();
            node.closed = true;

            // Goal node was found
            if (goal.equals(node)) {
                console.log('Goal found with path distance: ' + node.gScore);
                return {
                    path: this._backtrack(node),
                    opened: openedList
                };
            }

            // Get nodes neighbours
            let neighbours = this.grid.getNodesNeighbours(node);
            for (let i = 0; i < neighbours.length; i++) {
                let neighbour = neighbours.get(i);

                // If neighbour is already processed move to next neigbour
                if (neighbour.closed) {
                    continue;
                }

                // Get neighours distance from current node
                let dist = this._getDistance(node, neighbour);

                if (!neighbour.opened || dist < neighbour.gScore) {
                    neighbour.gScore = dist; // Distance from start
                    // Distance + heursitic
                    neighbour.fScore = neighbour.gScore + this.heuristic(neighbour, goal);
                    neighbour.parent = node;

                    // If neighbour has not been seen before, put it in heap
                    // to be processed later.
                    if (!neighbour.opened) {
                        openSet.push(neighbour.fScore, neighbour);
                        neighbour.opened = true;
                        openedList.push(neighbour);
                    } else {
                        openSet.updateKey(neighbour.fScore, neighbour);
                    }
                }
            }
        }
        // Path was not found
        return {
            path: undefined,
            opened: openedList
        };
    }

    _getDistance(node, next) {
        let weight = node.x == next.x || node.y == next.y ? 1 : 1.414;
        return node.gScore + weight;
    }

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