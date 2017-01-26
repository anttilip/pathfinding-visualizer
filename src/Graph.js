class Graph {
    constructor(size) {
        this.size = size;
        this.nodes = this._createGraph(size);
        this.setStartNode(this.nodes[0][0]);
        this.setGoalNode(this.nodes[this.size - 1][this.size - 1]);
        this.offset = 0;
        this.nodeSize = Math.floor(Math.min(canvas.width, canvas.height) / (size + (this.offset + 1)));
        this.currentlyDrawing = false;
        this.drawingType = nodeType.WALL;
    }

    update(x, y) {
        if (this._outOfBounds(x, y)) {
            return;
        }
        // Convert screen coordinates to graph values
        var screenCoordinates = this._screenToGraph(x, y);
        x = this._screenToGraph(x);
        y = this._screenToGraph(y);
        var node = this.nodes[x][y];

        // Determine which color to draw
        if (!this.currentlyDrawing) {
            if (node.type == nodeType.EMPTY) {
                this.drawingType = nodeType.WALL;
            } else if (node.type == nodeType.WALL) {
                this.drawingType = nodeType.EMPTY;
            }
            this.currentlyDrawing = true;
        }
        if (node.type != nodeType.START && node.type != nodeType.GOAL) {
            // Change node type to the new type
            node.type = this.drawingType;
        }
    }

    draw(canvas) {
        var context = canvas.getContext("2d");
        for (var i = 0; i < this.nodes.length; i++) {
            for (var j = 0; j < this.nodes[i].length; j++) {
                var node = this.nodes[i][j];
                // Draw nodes in grid in their types color
                context.fillStyle = node.type.color;
                var multiplier = this.nodeSize + this.offset;
                context.fillRect(node.x * multiplier, node.y * multiplier,
                    this.nodeSize, this.nodeSize);
            }
        }
    }

    _createGraph() {
        // 2D node array
        var nodes = new Array(this.size);
        for (var i = 0; i < this.size; i++) {
            nodes[i] = new Array(this.size);
            for (var j = 0; j < this.size; j++) {
                nodes[i][j] = new Node(i, j);
            }
        }

        return nodes;
    }

    setStartNode(node) {
        node.type = nodeType.START;
        this.startNode = node;
    }

    setGoalNode(node) {
        node.type = nodeType.GOAL;
        this.goalNode = node;
    }

    _outOfBounds(x, y) {
        var limit = this.size * (this.nodeSize + this.offset) - 1;
        return x < 0 || x > limit || y < 0 || y > limit;
    }

    _screenToGraph(x) {
        return Math.floor(x / (this.nodeSize + this.offset));
    }

    clearCurrentDrawing() {
        this.currentlyDrawing = false;
    }
}