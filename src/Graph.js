function Graph(size) {
    this.size = size;
    this.nodes = createGraph(size);
    var offset = 1;
    var nodeSize = Math.floor(Math.min(canvas.width, canvas.height) / (size + (offset + 1)));
    var currentlyDrawing = false;
    var drawingType = nodeType.WALL;

    this.update = function(x, y) {
        if (outOfBounds(x, y, this.size)) {
            return;
        }
        // Convert screen coordinates to graph values
        var screenCoordinates = screenToGraph(x, y);
        x = screenToGraph(x);
        y = screenToGraph(y);
        var node = this.nodes[x][y];

        // Determine which color to draw
        if (!currentlyDrawing) {
            if (node.type == nodeType.EMPTY) {
                drawingType = nodeType.WALL;
            } else if (node.type == nodeType.WALL) {
                drawingType = nodeType.EMPTY;
            }
            currentlyDrawing = true;
        }
        if (node.type != nodeType.START && node.type != nodeType.GOAL) {
            // Change node type to the new type
            node.type = drawingType;
        }
    };

    this.draw = function(canvas) {
        context = canvas.getContext("2d");
        for (var i = 0; i < this.nodes.length; i++) {
            for (var j = 0; j < this.nodes[i].length; j++) {
                node = this.nodes[i][j];
                // Draw nodes in grid in their types color
                context.fillStyle = node.type.color;
                var multiplier = nodeSize + offset;
                context.fillRect(node.x * multiplier, node.y * multiplier,
                    nodeSize, nodeSize);
            }
        }
    };

    function createGraph(size) {
        // 2D node array
        var nodes = new Array(size);
        for (var i = 0; i < size; i++) {
            nodes[i] = new Array(size);
            for (var j = 0; j < size; j++) {
                nodes[i][j] = new Node(i, j);
            }
        }
        // Set start and goal nodes in opposing corners
        nodes[0][0].type = nodeType.START;
        nodes[size - 1][size - 1].type = nodeType.GOAL;
        return nodes;
    }

    function outOfBounds(x, y, size) {
        var limit = size * (nodeSize + offset) - 1;
        return x > limit || y > limit;
    }

    function screenToGraph(x) {
        return Math.floor(x / (nodeSize + offset));
    }

    this.clearCurrentDrawing = function() {
        currentlyDrawing = false;
    };
}