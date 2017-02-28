/** Class handling user input. */
class Input {
    /**
     * Create Input.
     * @param {Canvas} canvas: canvas on which grid is drawn.
     * @param {Grid} grid: grid which contains all the nodes.
     */
    constructor(canvas, grid) {
        this.grid = grid;
        this.isDragging = false;
        this.draggedNode = undefined;
        this.prevCoordinate = undefined;
        this._createListeners(canvas);
    }


    // Manipulates the grid
    _onMouseInput(x, y) {
        // Find all nodes that should be toggled
        let nodes = new List();
        if (this.prevCoordinate !== undefined) {
            nodes = this._findNodesBetweenPoints(this.prevCoordinate.x, this.prevCoordinate.y, x, y);
        }
        nodes.push(this.grid.nodes[x][y]);
        this.prevCoordinate = {x: x, y: y};

        if (!this.draggedNode) {
            // Toggle all found nodes
            nodes.array.forEach(node => {
                // toggle node type, e.g. TRAVERSABLE -> WALL
                this.grid.toggleNode(node.x, node.y);
                // Draw changed node
                node.draw(canvas.getContext('2d'), this.grid.nodeSize);
            });
        } else {
            this._handleNodeDragging(x, y);
        }
    }

    _handleNodeDragging(x, y) {
        if (renderer.mode == mode.EDIT) {
            let node = this.grid.nodes[x][y];
            if (node.type === nodeType.TRAVERSABLE) {
                if (this.draggedNode === nodeType.START) {
                    this.grid.startNode.type = nodeType.TRAVERSABLE;
                    this.grid.startNode.draw(canvas.getContext('2d'), this.grid.nodeSize);
                    this.grid.startNode = node;
                } else {
                    this.grid.goalNode.type = nodeType.TRAVERSABLE;
                    this.grid.goalNode.draw(canvas.getContext('2d'), this.grid.nodeSize);
                    this.grid.goalNode = node;
                }
                node.type = this.draggedNode;
                this.grid.nodes[x][y].draw(canvas.getContext('2d'), this.grid.nodeSize);
            }
        } else {
            this.grid.resetNodes();
            renderer.changeMode(mode.EDIT);
        }

        //     if (this.draggedNode === nodeType.START && this.grid.nodes[x][y].type === nodeType.TRAVERSABLE) {
        //         // If user is dragging the start node, move it with mouse
        //         this.grid.startNode.type = nodeType.TRAVERSABLE;
        //         this.grid.nodes[x][y].type = nodeType.START;
        //         this.grid.startNode.draw(canvas.getContext('2d'), this.grid.nodeSize);
        //         this.grid.startNode = this.grid.nodes[x][y];
        //     } else if (this.draggedNode === nodeType.GOAL && this.grid.nodes[x][y].type === nodeType.TRAVERSABLE) {
        //         // If user is dragging goal node, move it with mouse
        //         this.grid.goalNode.type = nodeType.TRAVERSABLE;
        //         this.grid.nodes[x][y].type = nodeType.GOAL;
        //         this.grid.goalNode.draw(canvas.getContext('2d'), this.grid.nodeSize);
        //         this.grid.goalNode = this.grid.nodes[x][y];
        //     }
        // } else {
        //     this.grid.resetNodes();
        //     renderer.changeMode(mode.EDIT);
        // }
        // this.grid.nodes[x][y].draw(canvas.getContext('2d'), this.grid.nodeSize);
    }

    _onSizeChange(size) {
        this.grid = new Grid(size);

        // Set renderer to use the new grid
        renderer.grid = this.grid;
        renderer.changeMode(mode.EDIT);
    }

    _onSpeedChange() {
        // TODO: move speed logic here
    }

    _getMouseCoordinates(evt) {
        let rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    _mouseCoordinatesToGrid(coord) {
        return {
            x: this.grid.screenToGrid(coord.x),
            y: this.grid.screenToGrid(coord.y)
        };
    }

    // Event listeners react to user input
    _createListeners(canvas) {
        canvas.addEventListener('mousedown', (evt) => {
            this.isDragging = true;
            let coord = this._mouseCoordinatesToGrid(this._getMouseCoordinates(evt));
            if (this.grid.nodes[coord.x][coord.y] === this.grid.startNode ||
                this.grid.nodes[coord.x][coord.y] === this.grid.goalNode) {
                this.draggedNode = this.grid.nodes[coord.x][coord.y].type;
            }

            this._onMouseInput(coord.x, coord.y);
        });

        addEventListener('mouseup', () => {
            this.isDragging = false;
            this.draggedNode = undefined;
            this.grid.currentlyDrawing = false;
            this.prevCoordinate = undefined;
        });

        canvas.addEventListener('mousemove', (evt) => {
            if (this.isDragging) {
                let coord = this._mouseCoordinatesToGrid(this._getMouseCoordinates(evt));
                this._onMouseInput(coord.x, coord.y);
            }
        });

        document.getElementById("size").addEventListener('change', (evt) => {
            this._onSizeChange(evt.target.value);
        });
    }

    _findNodesBetweenPoints(x0, y0, x1, y1) {
        // Bresenham's line algorithm
        let dx = Math.abs(x1 - x0);
        let dy = Math.abs(y1 - y0);
        let sx = (x0 < x1) ? 1 : -1;
        let sy = (y0 < y1) ? 1 : -1;
        let err = dx - dy;

        let nodes = new List();
        while (x0 !== x1 || y0 != y1) {
            nodes.push(this.grid.nodes[x0][y0]);

            let e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x0  += sx;
            }
            if (e2 < dx) {
                err += dx;
                y0  += sy;
            }
        }
        return nodes;
    }
}