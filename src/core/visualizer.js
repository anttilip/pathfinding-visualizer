/** Class responsible of visualizing the found path. */
class Visualizer {
    /**
     * Create Visualizer.
     * @param {Array.<{prev: Array, dist: Array, seenList: Array}>}} result - Result from found path.
     * @param {Graph} graph - Graph on which the shortest path was found.
     */
    constructor(result, graph) {
        this.graph = graph;
        this.distance = result.dist;
        this.seenList = result.seenList.reverse();
        this.flatten = (node) => (node.x * graph.size + node.y);
        this.path = this._extractPath(result.prev, graph);
        this.prevNode = undefined;
    }

    /**
     * One tick forward on visualization
     * @param {Canvas} canvas - Canvas on which visualization is drawn.
     * @param {number} speed - Multiplier how many nodes are revealed in a tick.
     */
    tick(canvas, speed) {
        // Visualize searching
        var context = canvas.getContext("2d");
        for (var i = 0; i < speed && this.seenList.length > 0; i++) {
            var node = this.seenList.pop();
            var distance = this.distance[this.flatten(node)];
            var color = hslToStr(this._distanceToHSL(distance), 50, 50);
            node.draw(context, this.graph.nodeSize, color);
        }


        if (this.seenList.length === 0) {
            if (this.path.length === 0) {
                // Path drawn
                return;
            }

            if (this.prevNode === undefined) {
                this.prevNode = this.path.pop();
            }

            var node = this.path.pop();
            // Start drawing the shortest path starting from the goal node.
            context.beginPath();
            context.moveTo(this.graph.graphToScreen(this.prevNode.x + 0.5),
                this.graph.graphToScreen(this.prevNode.y + 0.5));
            context.lineTo(this.graph.graphToScreen(node.x + 0.5),
                this.graph.graphToScreen(node.y + 0.5));
            context.stroke();
            this.prevNode = node;
        }
    }

    /**
     * Is visualization already over?
     * @return {boolean} Boolean value of visualization being over.
     */
    visualizationComplete() {
        return this.seenList.length === 0 && this.path.length === 0;
    }

    _extractPath(prev) {
        var path = [];
        var node = this.graph.goalNode;
        while (prev[flatten(node.x, node.y, this.graph.size)] !== undefined) {
            path.push(node);
            node = prev[this.flatten(node)];
        }
        return path.reverse();
    }

    _distanceToHSL(distance) {
        var min = 133;
        var max = 360 - 133;
        var end = this.graph.goalNode;
        var maxDist = this.distance[this.flatten(end)];
        return min + distance * max / maxDist;
    }
}