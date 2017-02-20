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
        this._createListeners(canvas);
    }


    // Manipulates the grid
    _onMouseInput(x, y) {
        if (renderer.mode == mode.EDIT) {
            if (this.draggedNode === nodeType.START) {
                // If user is dragging the start node, move it with mouse
                this.grid.startNode.type = nodeType.EMPTY;
                this.grid.nodes[x][y].type = nodeType.START;
                this.grid.startNode.draw(canvas.getContext('2d'), this.grid.nodeSize);
                this.grid.startNode = this.grid.nodes[x][y];
            } else if (this.draggedNode === nodeType.GOAL) {
                // If user is dragging goal node, move it with mouse
                this.grid.goalNode.type = nodeType.EMPTY;
                this.grid.nodes[x][y].type = nodeType.GOAL;
                this.grid.goalNode.draw(canvas.getContext('2d'), this.grid.nodeSize);
                this.grid.goalNode = this.grid.nodes[x][y];
            }
            // toggle node type, e.g. EMPTY -> WALL
            this.grid.toggleNode(x, y);
            // Draw changed node
            this.grid.nodes[x][y].draw(canvas.getContext('2d'), this.grid.nodeSize);
        } else {
            renderer.changeMode(mode.EDIT);
        }
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
}