class Visualizer {
    constructor(result, graph) {
        this.graph = graph;
        this.path = this._extractPath(result.prev, graph);
        this.distance = result.dist;
        this.visitedNodes = result.visitedNodes;
        var flatten = (node) => (node.x * graph.size + node.y);
        this.visibleNodes = new Set(this.visitedNodes);
        this.nodeToHSL = (node) => (133 + distance[flatten(node)] / (360 - 133));
    }

    update() {}

    draw(canvas) {
        var context = canvas.getContext("2d");
        for (var i = 1; i < this.path.length; i++) {
            var node = this.path[i];
            // if (this.visitedNodes.has(node)) {
            var flatten = (node) => (node.x * this.graph.size + node.y);
            var nodeToHSL = (x) => (133 + this.distance[x] * (360 - 133) / this.distance[flatten(this.path[0])]);
            var x = flatten(node);
            var c = nodeToHSL(x);
            context.fillStyle = 'hsl(' + c + ', 50%, 50%)';
            context.fillRect(node.x * this.graph.nodeSize, node.y * this.graph.nodeSize, this.graph.nodeSize, this.graph.nodeSize);
        }
    }

    _extractPath(prev) {
        var flatten = (node) => ((node.x) * this.graph.size + node.y);
        var path = [];
        var i = this.graph.goalNode;
        while (prev[flatten(i)] !== undefined) {
            path.push(i);
            i = prev[flatten(i)];
        }
        return path;
    }
}