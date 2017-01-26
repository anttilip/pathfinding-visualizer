class Visualizer {
    constructor(result, graph) {
        this.graph = graph;
        this.distance = result.dist;
        this.seenList = result.seenList;
        this.flatten = (node) => (node.x * graph.size + node.y);
        this.path = this._extractPath(result.prev, graph);
    }

    update() {}

    draw(canvas) {
        var context = canvas.getContext("2d");
        for (var i = 1; i < this.path.length; i++) {
            var node = this.path[i];
            var distance = this.distance[this.flatten(node)];
            var color = hslToStr(this._distanceToHSL(distance), 50, 50);
            node.draw(context, this.graph.nodeSize, color);
        }
    }

    _extractPath(prev) {
        var path = [];
        var node = this.graph.goalNode;
        while (prev[flatten(node.x, node.y, this.graph.size)] !== undefined) {
            path.push(node);
            node = prev[this.flatten(node)];
        }
        return path;
    }

    _distanceToHSL(distance) {
        var min = 133;
        var max = 360 - 133;
        var maxDist = this.distance[this.flatten(this.path[0])];
        return min + distance * max / maxDist;
    }
}