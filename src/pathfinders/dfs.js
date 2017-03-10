/** Depth-first search algortihm */
class DFS extends Finder {
    constructor(...opts) {
        super(...opts);
    }

    /**
     * Find shortest path in a grid.
     * @return {{path:Node, opened:Node}[]} - Shortest path and all opened nodes.
     */
    findShortestPath() {
        this.stack = new List();
        let openedList = new List();

        this.grid.startNode.gScore = 0;
        this.grid.startNode.opened = true;
        this.stack.push(this.grid.startNode);

        while (this.stack.length !== 0) {
            let node = this.stack.pop();
            node.closed = true;

            let neighbours = this.grid.getNodesNeighbours(node);
            for (let i = 0; i < neighbours.length; i++) {
                let neighbour = neighbours.get(i);

                let distance = this._getDistance(node, neighbour);
                if (!neighbour.opened) {
                    neighbour.opened = true;
                    neighbour.parent = node;
                    this.stack.push(neighbour);
                    openedList.push(neighbour);
                }
                if (distance < neighbour.gScore) {
                    neighbour.gScore = distance;
                }

                if (this.grid.goalNode.equals(neighbour)) {
                    return {
                        path: this._backtrack(neighbour),
                        opened: openedList
                    };
                }
            }
        }
        return {path: undefined, opened: openedList};
    }
}
