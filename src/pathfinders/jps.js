/** Jump point search algorithm. */
class JPS extends Finder {
    constructor(...opts) {
        super(...opts);
    }

    /**
     * Find shortest path in a grid.
     * @return {{path:Node, opened:Node}[]} - Shortest path and all opened nodes.
     */
    findShortestPath() {
        this.openSet = new Heap();
        this.openedList = new List();

        this.start = this.grid.startNode;
        this.goal = this.grid.goalNode;

        // gScore is nodes distance from start node.
        this.start.gScore = 0;
        // fScore is gScore plus heuristic.
        this.start.fScore = 0;

        // Push start node to heap
        this.openSet.push(this.start.fScore, this.start);
        this.start.opened = true;
        this.openedList.push(this.start);

        while (this.openSet.size !== 0) {
            let node = this.openSet.pop();
            node.closed = true;

            // Goal node was found
            if (this.goal.equals(node)) {
                return {
                    path: this._backtrack(node),
                    opened: this.openedList
                };
            }

            this._identifySuccessors(node);
        }
        // Path was not found
        return {
            path: undefined,
            opened: this.openedList
        };
    }

    _identifySuccessors(node) {
        let neighbours = this._findNeighbrours(node);

        for (let i = 0 ; i < neighbours.length; i++) {
            let neighbour = neighbours.get(i);
            let jumpPoint = this._jump(neighbour, node);
            if (!jumpPoint || jumpPoint.closed) {
               // Move to the next node if jump point wasn't found or is closed
               continue;
            }
            // Get jump points distance from current node
            let dist = this._getDistance(node, jumpPoint);
            if (!jumpPoint.opened || dist < jumpPoint.gScore) {
                jumpPoint.gScore = dist; // Distance from start
                // Distance + heursitic
                jumpPoint.fScore = jumpPoint.gScore + this.heuristic(jumpPoint, this.goal);
                jumpPoint.parent = node;

                // If neighbour has not been seen before, put it in heap
                // to be processed later.
                if (!jumpPoint.opened) {
                    this.openSet.push(jumpPoint.fScore, jumpPoint);
                    jumpPoint.opened = true;
                    this.openedList.push(jumpPoint);
                } else {
                    this.openSet.updateKey(jumpPoint.fScore, jumpPoint);
                }
            }
        }
    }

    _jump(node, parent) {
        if (!this.grid.isTraversable(node.x, node.y)) {
            return;
        } else if (node.equals(this.goal)) {
            return node;
        }
        let x = node.x;
        let y = node.y;
        let dx = Math.sign(node.x - parent.x);
        let dy = Math.sign(node.y - parent.y);

        // Check if nodes has forced neighbours
        if (dx !== 0 && dy === 0) {
            // X-axis move
            if (!this.grid.isTraversable(x, y + 1) &&
                this.grid.isTraversable(x + dx, y + 1)) {
                // Forced neighbour down
                return node;
            }
            if (!this.grid.isTraversable(x, y - 1) &&
                this.grid.isTraversable(x + dx, y - 1)) {
                // Forced neighbour up
                return node;
            }

        } else if (dx === 0 && dy !== 0) {
            // Y-axis move
            if (!this.grid.isTraversable(x + 1, y) &&
                this.grid.isTraversable(x + 1, y + dy)) {
                // Forced neighbour right
                return node;
            }
            if (!this.grid.isTraversable(x - 1, y) &&
                this.grid.isTraversable(x - 1, y + dy)) {
                // Forced neighbour left
                return node;
            }

        } else if (dx !== 0 && dy !== 0) {
            // Diagonal move
            if (!this.grid.isTraversable(x - dx, y) &&
                this.grid.isTraversable(x - dx, y + dy)) {
                // Forced neighbour 1
                return node;
            }
            if (!this.grid.isTraversable(x, y - dy) &&
                this.grid.isTraversable(x + dx, y - dy)) {
                // Forced neighbour 2
                return node;
            }
        }

        // Jump along X-axis and Y-axis if move was diagonal
        if (dx !== 0 && dy !== 0) {
            // X axis
            if (this.grid.isTraversable(x + dx, y) && this._jump(this.grid.nodes[x + dx][y], node)) {
                return node;
            }
            // Y axis
            if (this.grid.isTraversable(x, y + dy) && this._jump(this.grid.nodes[x][y + dy], node)) {
                return node;
            }
        }

        // Jump diagonally if it is allowed
        if (this.grid.isTraversable(x + dx, y + dy) &&
            (this.grid.isTraversable(x + dx, y) ||
             this.grid.isTraversable(x, y + dy))) {
                return this._jump(this.grid.nodes[x + dx][y + dy], node);
        }
    }

    _findNeighbrours(node) {
        if (node.parent === undefined) {
            // If node is start node, return all neighbours
            return this.grid.getNodesNeighbours(node);
        }
        let pruned = new List();
        let x = node.x;
        let y = node.y;
        let dx = Math.sign(node.x - node.parent.x);
        let dy = Math.sign(node.y - node.parent.y);

        // X-axis move
        if (dx !== 0 && dy === 0) {
            if (this.grid.isTraversable(x + dx, y)) {
                // Natural neighbour
                pruned.push(this.grid.nodes[x + dx][y]);
                if (!this.grid.isTraversable(x, y + 1) &&
                    this.grid.isTraversable(x + dx, y + 1)) {
                    // Forced neighbour down
                    pruned.push(this.grid.nodes[x + dx][y + 1]);
                }
                if (!this.grid.isTraversable(x, y - 1) &&
                    this.grid.isTraversable(x + dx, y - 1)) {
                    // Forced neighbour up
                    pruned.push(this.grid.nodes[x + dx][y - 1]);
                }
            }
        } else if (dx === 0 && dy !== 0) {
            // Y-axis move
            if (this.grid.isTraversable(x, y + dy)) {
                // Natural neighbour
                pruned.push(this.grid.nodes[x][y + dy]);
                if (!this.grid.isTraversable(x + 1, y) &&
                    this.grid.isTraversable(x + 1, y + dy)) {
                    // Forced neighbour right
                    pruned.push(this.grid.nodes[x + 1][y + dy]);
                }
                if (!this.grid.isTraversable(x - 1, y) &&
                    this.grid.isTraversable(x - 1, y + dy)) {
                    // Forced neighbour left
                    pruned.push(this.grid.nodes[x - 1][y + dy]);
                }
            }
        } else if (dx !== 0 && dy !== 0) {
            // Diagonal move
            let diag = false;
            if (this.grid.isTraversable(x, y + dy)) {
                // Natural neighbour up/down
                pruned.push(this.grid.nodes[x][y + dy]);
                diag = true;
            }
            if (this.grid.isTraversable(x + dx, y)) {
                // Natural neighbour left/right
                pruned.push(this.grid.nodes[x + dx][y]);
                diag = true;
            }
            if (diag && this.grid.isTraversable(x + dx, y + dy)) {
                // Natural neighbour diagonal
                pruned.push(this.grid.nodes[x + dx][y + dy]);
            }
            if (!this.grid.isTraversable(x - dx, y) &&
                this.grid.isTraversable(x - dx, y + dy) &&
                this.grid.isTraversable(x, y + dy)) {
                // Forced neighbour 1
                pruned.push(this.grid.nodes[x - dx][y + dy]);
            }
            if (!this.grid.isTraversable(x, y - dy) &&
                this.grid.isTraversable(x + dx, y - dy) &&
                this.grid.isTraversable(x + dx, y)) {
                // Forced neighbour 2
                pruned.push(this.grid.nodes[x + dx][y - dy]);
            }
        }
        return pruned;
    }

    // Regular distance does not work when jumping
    _getDistance(node, next) {
        // Grid uses 8-direction movements so I chose octile
        return node.gScore + Heuristics.OCTILE(node, next);
    }
}
