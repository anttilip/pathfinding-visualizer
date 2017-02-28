/** Class responsible of visualizing the found path. */
class Visualizer {
    /**
     * Create Visualizer.
     * @param {Array.<{prev: Array, dist: Array, seenList: Array}>}} result - Result from found path.
     * @param {Grid} grid - Grid on which the shortest path was found.
     */
    constructor(result, grid) {
        this.grid = grid;
        this.openedList = result.opened;
        this.openedList.reverse();
        this.path = result.path;
        this.maxDist = this._findMaxDistance(this.openedList);
        this.currentNode = grid.goalNode;
        this.visualizationComplete = false;
        this.hslToStr = (h, s, l) => 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
    }

    /**
     * One tick forward on visualization
     * @param {Canvas} canvas - Canvas on which visualization is drawn.
     * @param {number} speed - Multiplier how many nodes are revealed in a tick.
     */
    tick(canvas, speed) {
        let context = canvas.getContext("2d");

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
        for (let i = 0; i < speed && this.openedList.length !== 0; i++) {
            let node = this.openedList.pop();

            if (node.type !== nodeType.START && node.type !== nodeType.GOAL) {
                // Color all regular nodes by their gScore (distance from start)
                node.custom_color = this.hslToStr(this._distanceToHSL(node.gScore), 100, 85);
            }
            node.draw(context, this.grid.nodeSize);
        }
    }

    /**
     * Visualize the found path.
     * @param {Context} context - Context for drawing.
     */
    _visualizePath(context) {
        if (this.currentNode.parent === undefined) {
            this.visualizationComplete = true;
            this.grid.startNode.draw(context, this.grid.nodeSize);
            this.grid.goalNode.draw(context, this.grid.nodeSize);
            return;
        }

        let node = this.currentNode;
        let parent = this.currentNode.parent;

        context.beginPath();
        context.moveTo(this.grid.gridToScreen(node.x + 0.5),
            this.grid.gridToScreen(node.y + 0.5));
        context.lineTo(this.grid.gridToScreen(parent.x + 0.5),
            this.grid.gridToScreen(parent.y + 0.5));
        context.stroke();
        this.currentNode = parent;
    }

    _distanceToHSL(distance) {
        let min = 133;
        let max = 360 - 133;
        let end = this.grid.goalNode;
        return min + distance * max / this.maxDist;
    }

    _findMaxDistance(list) {
        let max = 0;
        for (let i = 0; i < list.length; i++) {
            if (list.get(i).gScore > max) {
                max = list.get(i).gScore;
            }
        }
        return max;
    }
}