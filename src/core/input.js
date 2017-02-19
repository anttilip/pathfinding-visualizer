/** Class handilng input. */
class Input {
    /**
     * Create Input.
     * @param {Canvas} canvas: canvas on which graph is drawn.
     * @param {Graph} graph: graph which contains all the nodes.
     */
    constructor(canvas, graph) {
        this.graph = graph;
        this.isDragging = false;
        this.draggedNode = undefined;
        this._createListeners(canvas);
    }


    // Manipulates the grid
    _onMouseInput(x, y) {
        if (renderer.mode == mode.EDIT) {
            if (this.draggedNode === nodeType.START) {
                // If user is dragging start node, move it with mouse
                this.graph.startNode.type = nodeType.EMPTY;
                this.graph.nodes[x][y].type = nodeType.START;
                this.graph.startNode = this.graph.nodes[x][y];
            } else if (this.draggedNode === nodeType.GOAL) {
                // If user is dragging goal node, move it with mouse
                this.graph.goalNode.type = nodeType.EMPTY;
                this.graph.nodes[x][y].type = nodeType.GOAL;
                this.graph.goalNode = this.graph.nodes[x][y];
            }
            // toggle node type, e.g. EMPTY -> WALL
            this.graph.toggleNode(x, y);
        } else {
            renderer.mode = mode.EDIT;
        }
    }

    _onSizeChange(size) {
        this.graph = new Graph(size);

        // Set renderer to use the new graph
        renderer.graph = this.graph;
        renderer.mode = mode.EDIT;
    }

    _onSpeedChange() {
        // TODO: move speed logic here
    }

    _getMouseCoordinates(evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    _mouseCoordinatesToGrid(coord) {
        return {
            x: this.graph.screenToGraph(coord.x),
            y: this.graph.screenToGraph(coord.y)
        };
    }

    // Event listeners react to user input
    _createListeners(canvas) {
        canvas.addEventListener('mousedown', (evt) => {
            this.isDragging = true;
            var coord = this._mouseCoordinatesToGrid(this._getMouseCoordinates(evt));
            if (this.graph.nodes[coord.x][coord.y] === this.graph.startNode ||
                this.graph.nodes[coord.x][coord.y] === this.graph.goalNode) {
                this.draggedNode = this.graph.nodes[coord.x][coord.y].type;
            }

            this._onMouseInput(coord.x, coord.y);
        });

        addEventListener('mouseup', () => {
            this.isDragging = false;
            this.draggedNode = undefined;
            this.graph.currentlyDrawing = false;
        });

        canvas.addEventListener('mousemove', (evt) => {
            if (this.isDragging) {
                // alert('mousemove');
                var coord = this._mouseCoordinatesToGrid(this._getMouseCoordinates(evt));
                this._onMouseInput(coord.x, coord.y);
            }
        });

        document.getElementById("size").addEventListener('change', (evt) => {
            this._onSizeChange(evt.target.value);
        });
    }
}