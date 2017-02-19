/** Class responsible of visualizing the found path. */
class Visualizer {
    /**
     * Create Visualizer.
     * @param {Array.<{prev: Array, dist: Array, seenList: Array}>}} result - Result from found path.
     * @param {Graph} graph - Graph on which the shortest path was found.
     */
    constructor(result, graph) {
        this.graph = graph;
        this.openedList = result.opened.reverse();
        this.path = result.path;
        this.currentNode = graph.goalNode;
        this.visualizationComplete = false;
    }

    /**
     * One tick forward on visualization
     * @param {Canvas} canvas - Canvas on which visualization is drawn.
     * @param {number} speed - Multiplier how many nodes are revealed in a tick.
     */
    tick(canvas, speed) {
        var context = canvas.getContext("2d");

        if (this.openedList.length !== 0) {
            this._visualizeSeen(context, speed);
        } else {
            this._visualizePath(context);
        }
    }

    /**
     * Visualize seen nodes.
     * @param {Context} context - Context for drawing.
     * @param {number} speed - Multiplier how many nodes are revealed in a tick.
     */
    _visualizeSeen(context, speed) {
        for (var i = 0; i < speed && this.openedList.length !== 0; i++) {
            var node = this.openedList.pop();
            var color = hslToStr(this._distanceToHSL(node.gScore), 50, 50);
            node.draw(context, this.graph.nodeSize, color);
        }
    }

    /**
     * Visualize the found path.
     * @param {Context} context - Context for drawing.
     */
    _visualizePath(context) {
        if (this.currentNode.parent === undefined) {
            this.visualizationComplete = true;
            return;
        }

        var node = this.currentNode;
        var parent = this.currentNode.parent;

        context.beginPath();
        context.moveTo(this.graph.graphToScreen(node.x + 0.5),
            this.graph.graphToScreen(node.y + 0.5));
        context.lineTo(this.graph.graphToScreen(parent.x + 0.5),
            this.graph.graphToScreen(parent.y + 0.5));
        context.stroke();
        this.currentNode = parent;
    }

    _distanceToHSL(distance) {
        var min = 133;
        var max = 360 - 133;
        var end = this.graph.goalNode;
        var maxDist = this.graph.goalNode.gScore;
        return min + distance * max / maxDist;
    }
}