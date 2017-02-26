class DFS extends Finder {
    constructor(...opts) {
        super(...opts);
    }

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
                let neigbour = neighbours.get(i);

                let distance = this._getDistance(node, neigbour);
                if (!neigbour.opened) {
                    neigbour.opened = true;
                    neigbour.parent = node;
                    this.stack.push(neigbour);
                    openedList.push(neigbour);
                }
                if (distance < neigbour.gScore) {
                    neigbour.gScore = distance;
                }

                if (this.grid.goalNode.equals(neigbour)) {
                    return {
                        path: this._backtrack(neigbour),
                        opened: openedList
                    };
                }
            }
        }
        return {path: undefined, opened: openedList};
    }
}