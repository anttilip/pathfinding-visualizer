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

class Node {
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

    equals(other) {
        if (other instanceof Node) {
            return other.x == this.x && other.y == this.y && other.type == this.type;
        }
        return false;
    }

    draw(context, nodeSize, color = undefined) {
        if (color === undefined) {
            color = this.type.color;
        }
        context.fillStyle = color;
        context.fillRect(this.x * nodeSize, this.y * nodeSize, nodeSize, nodeSize);
    }
}