class Graph {
    constructor(size) {
        this.size = size;
        this.nodes = this.createGraph(size);
        this.offset = 1;
        this.nodeSize = Math.floor(Math.min(canvas.width, canvas.height) / (size + (this.offset + 1)));
        this.currentlyDrawing = false;
        this.drawingType = nodeType.WALL;
    }

    update(x, y) {
        if (this.outOfBounds(x, y, this.size)) {
            return;
        }
        // Convert screen coordinates to graph values
        var screenCoordinates = this.screenToGraph(x, y);
        x = this.screenToGraph(x);
        y = this.screenToGraph(y);
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

    createGraph() {
        // 2D node array
        var nodes = new Array(this.size);
        for (var i = 0; i < this.size; i++) {
            nodes[i] = new Array(this.size);
            for (var j = 0; j < this.size; j++) {
                nodes[i][j] = new Node(i, j);
            }
        }
        // Set start and goal nodes in opposing corners
        nodes[0][0].type = nodeType.START;
        nodes[this.size - 1][this.size - 1].type = nodeType.GOAL;
        return nodes;
    }

    outOfBounds(x, y, size) {
        var limit = size * (this.nodeSize + this.offset) - 1;
        return x < 0 || x > limit || y < 0 || y > limit;
    }

    screenToGraph(x) {
        return Math.floor(x / (this.nodeSize + this.offset));
    }

    clearCurrentDrawing() {
        this.currentlyDrawing = false;
    }
}