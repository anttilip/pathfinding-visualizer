/** Binary minimum heap. */
class Heap {
    /**
     * Create Heap
     * @param {number} [size=32] - Initial size of the internal array.
     */
    constructor(size = 32) {
        this.list = new List(size);
        this.size = 0;

        this.nodeIndexes = {};

        // Functions to find nodes parent and childs given its index
        this.parent = (i) => Math.floor((i - 1) / 2);
        this.left = (i) => (2 * i + 1);
        this.right = (i) => (2 * i + 2);
    }

    /**
     * Add node to Heap with given key.
     * @param {number} key - Value on which nodes are evaluated.
     * @param {Node} node - Node that will be added to Heap.
     */
    push(key, node) {
        // Set new node to the last in array
        this.size++;
        this.list.set(this.size - 1, {key: key, node: node});

        this.nodeIndexes[node.hashCode()] = this.size - 1;

        // Move the new node up to its correct place
        this._bubbleUp(this.size - 1);
    }

    /**
     * Remove and return node with smallest key.
     * @return {Array<key: number, node: Node>} Key and node.
     */
    pop() {
        // If heap is empty, there is nothing to pop
        if (this.size === 0) {
            return undefined;
        }
        // Pick the top (smallest) node
        let top = this.list.get(0);

        // Take the last node in heap and move it to the top and decrease size
        let node = this.list.get(this.size - 1);
        this.list.set(0, node);
        this.size--;

        // Move the new top node down to its correct place
        this._bubbleDown(0);

        // Return the original top value
        delete this.nodeIndexes[top.node.hashCode()];
        return top.node;
    }

    updateKey(key, node) {
        let i = this.nodeIndexes[node.hashCode()];
        let oldKey = this.list.get(i).key;
        this.list.get(i).key = key;
        if (oldKey > key) {
            // decrease key
            this._bubbleUp(i);
        } else {
            // increase key
            this._bubbleDown(i);
        }
    }

    _bubbleUp(i) {
        // Starting from bottom go up parent chains until parent has smaller
        // key or end up in top
        let key = this.list.get(i).key;
        while (i > 0 && this.list.get(this.parent(i)).key > key) {
            // Parent has larger key so move parent down and start to check
            // its parents key.
            this._switch(i, this.parent(i));
            i = this.parent(i);
        }
    }

    _bubbleDown(i) {
        // Move the new top node to its own place
        // Starting from top node, check that both children are smaller than
        // current node. If not, switch them and repeat.
        let node = this.list.get(i);
        while (this.left(i) < this.size) {
            // Calculate children's indexes
            let leftIndex = this.left(i);
            let rightIndex = this.right(i);

            // Choose smaller child node
            let smallerIndex;
            if (rightIndex < this.size && this.list.get(rightIndex).key < this.list.get(leftIndex).key) {
                smallerIndex = rightIndex;
            } else {
                smallerIndex = leftIndex;
            }

            // If the smaller child node has smaller key than the moved node,
            // move the smaller child node up
            if (node.key > this.list.get(smallerIndex).key) {
                this._switch(i, smallerIndex);
                // Set new index to be the smaller child nodes previous index
                i = smallerIndex;
            } else {
                // If smaller child node is larger than moving node, this index
                // is its correct position
                break;
            }
        }
        // Set node to its own place we just found
    }

    /**
     * Switch nodes from given indexes.
     * @param {number} x - First index.
     * @param {number} y - Second index.
     */
    _switch(x, y) {
        this.list.swap(x, y);
        this.nodeIndexes[this.list.get(x).node.hashCode()] = x;
        this.nodeIndexes[this.list.get(y).node.hashCode()] = y;
    }
}