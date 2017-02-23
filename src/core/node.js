let nodeType = {
    TRAVERSABLE: {
        color: '#fdf3e7'
    },
    WALL: {
        color: '#384047'
    },
    START: {
        color: '#0fbc00'
    },
    GOAL: {
        color: '#bc0000'
    }
};

/** Class representing a node on grid / grid. */
class Node {
    /**
     * Create node.
     * @param {number} x - The x coordinate
     * @param {number} y - The y coordinate
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.type = nodeType.TRAVERSABLE;
        this.custom_color = undefined;

        this.parent = undefined;

        this.opened = false;
        this.closed = false;

        this.gScore = Infinity;
        this.fScore = Infinity;
    }

    reset() {
        this.custom_color = undefined;

        this.parent = undefined;

        this.opened = false;
        this.closed = false;

        this.gScore = Infinity;
        this.fScore = Infinity;
    }

    hashCode() {
        const prime = 857;
        let hash = 359;
        hash = prime * (hash << 5) + this.x;
        hash = prime * (hash << 5) + this.y;
        return prime * hash ;
    }

    /**
     * Check equality with other node.
     * @param {Node} other - The other node.
     * @return {boolean} Equality between this and other node.
     */
    equals(other) {
        if (other instanceof Node) {
            return other.x == this.x && other.y == this.y && other.type == this.type;
        }
        return false;
    }

    /**
     * Draws the node on canvas.
     * @param {CanvasRenderingContext2D} context - Context on which node is drawn.
     * @param {number} nodeSize - Node size when drawn on canvas.
     * @param {string} color  - Hex color or e.g hsl(50, 50%, 100%).
     */
    draw(context, nodeSize, color = undefined) {
        color = this.custom_color || this.type.color;
        // if (color === undefined) {
        //     color = this.type.color;
        // }
        context.fillStyle = color;
        context.fillRect(this.x * nodeSize, this.y * nodeSize, nodeSize, nodeSize);
    }
}