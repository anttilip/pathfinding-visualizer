/** Class representing a graph or grid. */
class Graph {
    constructor(size = undefined, matrix = undefined) {
        if (size !== undefined) {
            this._init(size);
        } else if (matrix !== undefined) {
            this._initFromMatrix(matrix);
        } else {
            throw "Pass either size or matrix to Graph";
        }
        // Some gui helpers
        this.currentlyDrawing = false;
        this.nodeSize = Math.floor(canvas.height / this.size);
        this.drawingType = nodeType.WALL;
    }

    _init(size) {
        this.size = size;
        this.nodes = this._createGraph(size);
    }

    _initFromMatrix(matrix) {
        this.size = matrix.length;
        this.nodes = this._createGraph(this.size);

        this._setTypes(matrix);
    }

    _setTypes(matrix) {
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix.length; j++) {
                switch (matrix[i][j]) {
                    case nodeType.START.code:
                        this.nodes[i][j].type = nodeType.START;
                        break;
                    case nodeType.GOAL.code:
                        this.nodes[i][j].type = nodeType.GOAL;
                        break;
                    case nodeType.WALL.code:
                        this.nodes[i][j].type = nodeType.WALL;
                        break;
                    default:
                        this.nodes[i][j].type = nodeType.EMPTY;
                }
            }
        }
    }

    toggleNode(x, y) {
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
                node.draw(context, this.nodeSize);
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

        // Set start and goal nodes
        this.startNode = nodes[0][0];
        this.startNode.type = nodeType.START;
        this.goalNode = nodes[this.size - 1][this.size - 1];
        this.goalNode.type = nodeType.GOAL;

        return nodes;
    }

    getNodesNeighbours(node) {
        var neighbours = [];
        var left, right, top, bottom;
        var x = node.x;
        var y = node.y;
        // Left
        if (this._isEmpty(x - 1, y)) {
            neighbours.push(this.nodes[x - 1][y]);
            left = true;
        }
        // Right
        if (this._isEmpty(x + 1, y)) {
            neighbours.push(this.nodes[x + 1][y]);
            right = true;
        }
        // Top
        if (this._isEmpty(x, y - 1)) {
            neighbours.push(this.nodes[x][y - 1]);
            top = true;
        }
        // Bottom
        if (this._isEmpty(x, y + 1)) {
            neighbours.push(this.nodes[x][y + 1]);
            bottom = true;
        }
        // Top Left
        if (this._isEmpty(x - 1, y - 1) && (top || left)) {
            neighbours.push(this.nodes[x - 1][y - 1]);
        }
        // Top right
        if (this._isEmpty(x + 1, y - 1) && (top || right)) {
            neighbours.push(this.nodes[x + 1][y - 1]);
        }
        // Bottom left
        if (this._isEmpty(x - 1, y + 1) && (bottom || left)) {
            neighbours.push(this.nodes[x - 1][y + 1]);
        }
        // Bottom right
        if (this._isEmpty(x + 1, y + 1) && (bottom || right)) {
            neighbours.push(this.nodes[x + 1][y + 1]);
        }
        return neighbours;
    }

    _isEmpty(x, y) {
        if (x < 0 || x > this.size - 1 || y < 0 || y > this.size - 1) {
            return false;
        }
        var type = this.nodes[x][y].type;
        return type == nodeType.EMPTY || type == nodeType.GOAL;
    }

    _outOfBounds(x, y) {
        var limit = this.size * this.nodeSize - 1;
        return x < 0 || x > limit || y < 0 || y > limit;
    }

    screenToGraph(x) {
        return Math.floor(x / this.nodeSize);
    }

    graphToScreen(x) {
        return x * this.nodeSize;
    }

    clearGraph() {
        this.nodes = this._createGraph();
    }
}