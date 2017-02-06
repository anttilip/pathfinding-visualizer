var nodeType = {
    EMPTY: {
        code: 'E',
        color: '#303030'
    },
    WALL: {
        code: 'W',
        color: '#dedede'
    },
    START: {
        code: 'S',
        color: '#0fbc00'
    },
    GOAL: {
        code: 'G',
        color: '#bc0000'
    }
};

/** Class representing a node on graph / grid. */
class Node {
    /**
     * Create node.
     * @param {number} x - The x coordinate
     * @param {number} y - The y coordinate
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.type = nodeType.EMPTY;
    }

    hashCode() {
        const prime = 31;
        var hash = 1;
        hash = prime * hash + this.x;
        hash = prime * hash + this.y;
        return prime * hash + this.type.code.charCodeAt(0);

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
        if (color === undefined) {
            color = this.type.color;
        }
        context.fillStyle = color;
        context.fillRect(this.x * nodeSize, this.y * nodeSize, nodeSize, nodeSize);
    }
}