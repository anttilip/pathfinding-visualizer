/** Class representing a grid or grid. */
class Grid {
    constructor(size = undefined, matrix = undefined, labels = undefined) {
        if (size !== undefined) {
            this._init(size);
        } else if (matrix !== undefined && labels !== undefined) {
            this._initFromMatrix(matrix, labels);
        } else {
            throw Error("Pass either size or matrix to Grid");
        }
        // Some gui helpers
        this.currentlyDrawing = false;
        this.nodeSize = Math.floor(canvas.height / this.size);
        this.drawingType = nodeType.WALL;
    }

    _init(size) {
        this.size = size;
        this.nodes = this._createGrid(size);

        // Set start and goal nodes
        this.startNode = this.nodes[1][1];
        this.startNode.type = nodeType.START;
        this.goalNode = this.nodes[this.size - 2][this.size - 2];
        this.goalNode.type = nodeType.GOAL;

    }

    _initFromMatrix(matrix, labels) {
        this.size = matrix.length;
        this.nodes = this._createGrid(this.size);

        this._setTypes(matrix, labels);
    }

    _setTypes(matrix, labels) {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix.length; j++) {
                if (labels !== undefined) {
                    this.nodes[i][j].type = labels[matrix[i][j]];
                    if (this.nodes[i][j].type === nodeType.START) {
                        this.startNode = this.nodes[i][j];
                    } else if (this.nodes[i][j].type === nodeType.GOAL) {
                        this.goalNode = this.nodes[i][j];
                    }
                }
            }
        }
        if (this.startNode === undefined || this.goalNode === undefined) {
            throw Error("Matrix must have start and goal nodes defined");
        }
    }

    toggleNode(x, y) {
        let node = this.nodes[x][y];
        // Determine which color to draw
        if (!this.currentlyDrawing) {
            if (node.type == nodeType.TRAVERSABLE) {
                this.drawingType = nodeType.WALL;
            } else if (node.type == nodeType.WALL) {
                this.drawingType = nodeType.TRAVERSABLE;
            }
            this.currentlyDrawing = true;
        }
        if (node.type != nodeType.START && node.type != nodeType.GOAL) {
            // Change node type to the new type
            node.type = this.drawingType;
        }
    }

    draw(canvas) {
        let context = canvas.getContext("2d");
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = 0; j < this.nodes[i].length; j++) {
                let node = this.nodes[i][j];
                // Draw nodes in grid in their types color
                node.draw(context, this.nodeSize);
            }
        }
    }

    _createGrid() {
        // 2D node array
        let nodes = new Array(this.size);
        for (let i = 0; i < this.size; i++) {
            nodes[i] = new Array(this.size);
            for (let j = 0; j < this.size; j++) {
                nodes[i][j] = new Node(i, j);
            }
        }

        return nodes;
    }

    getNodesNeighbours(node) {
        let neighbours = new List();
        let left, right, top, bottom;
        let x = node.x;
        let y = node.y;
        // Left
        if (this._isTraversable(x - 1, y)) {
            neighbours.push(this.nodes[x - 1][y]);
            left = true;
        }
        // Right
        if (this._isTraversable(x + 1, y)) {
            neighbours.push(this.nodes[x + 1][y]);
            right = true;
        }
        // Top
        if (this._isTraversable(x, y - 1)) {
            neighbours.push(this.nodes[x][y - 1]);
            top = true;
        }
        // Bottom
        if (this._isTraversable(x, y + 1)) {
            neighbours.push(this.nodes[x][y + 1]);
            bottom = true;
        }
        // Top Left
        if (this._isTraversable(x - 1, y - 1) && (top || left)) {
            neighbours.push(this.nodes[x - 1][y - 1]);
        }
        // Top right
        if (this._isTraversable(x + 1, y - 1) && (top || right)) {
            neighbours.push(this.nodes[x + 1][y - 1]);
        }
        // Bottom left
        if (this._isTraversable(x - 1, y + 1) && (bottom || left)) {
            neighbours.push(this.nodes[x - 1][y + 1]);
        }
        // Bottom right
        if (this._isTraversable(x + 1, y + 1) && (bottom || right)) {
            neighbours.push(this.nodes[x + 1][y + 1]);
        }
        return neighbours;
    }

    _isTraversable(x, y) {
        if (x < 0 || x > this.size - 1 || y < 0 || y > this.size - 1) {
            return false;
        }
        let type = this.nodes[x][y].type;
        return type == nodeType.TRAVERSABLE || type == nodeType.GOAL;
    }

    screenToGrid(x) {
        return Math.floor(x / this.nodeSize);
    }

    gridToScreen(x) {
        return x * this.nodeSize;
    }

    clearGrid() {
        this._init(this.size);
    }

    resetNodes() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                this.nodes[i][j].reset();
            }
        }
    }
}