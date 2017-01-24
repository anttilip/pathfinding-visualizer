function Graph(size) {
    this.size = size;
    this.nodes = createGraph(size);

    this.update = function(x, y) {
        // Update nodes
    };

    this.draw = function(canvas) {
        // Draw nodes
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
}