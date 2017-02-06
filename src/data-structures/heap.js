class Heap {
    constructor(size = 32) {
        this.array = new Array(size);
        this.size = 0;
        // Functions to find nodes parent and childs given its index
        this.parent = (i) => Math.floor(i / 2);
        this.left = (i) => (2 * i + 1);
        this.right = (i) => (2 * i + 2);
    }

    push(key, node) {
        // Increase heap size by one and expand array when needed
        this.size++;
        if (this.size > this.array.length) {
            this._expandArray(this.array);
        }
        // Starting from bottom go up parent chains until parent has smaller
        // key or end up in top
        var i = this.size - 1;
        while (i > 0 && this.array[this.parent(i)].key > key) {
            // Parent has larger key so move parent down and start to check
            // its parents key.
            this.array[i] = this.array[this.parent(i)];
            i = this.parent(i);
        }

        // Set new node to the position we just searched
        this.array[i] = {
            key: key,
            node: node
        };
    }

    pop() {
        // If heap is empty, there is nothing to pop
        if (this.size === 0) {
            return undefined;
        }
        // Pick the top value
        var top = this.array[0];

        // Save bottom value and set it to the new top
        var movingNode = this.array[this.size - 1];
        this.array[0] = movingNode;

        // Decrease heap size by one
        this.size--;

        // Move the new top node to its own place
        // Starting from top node, check that both children are smaller than
        // current node. If not, switch them and repeat.
        var i = 0;
        while (this.left(i) < this.size) {
            // Calculate children's indexes
            var leftIndex = this.left(i);
            var rightIndex = this.right(i);

            // Choose smaller child node
            var smallerIndex;
            if (rightIndex < this.size && this.array[rightIndex].key < this.array[leftIndex].key) {
                smallerIndex = rightIndex;
            } else {
                smallerIndex = leftIndex;
            }

            // If the smaller child node has smaller key than the moved node,
            // move the smaller child node up
            if (movingNode.key > this.array[smallerIndex].key) {
                this.array[i] = this.array[smallerIndex];
                // Set new index to be the smaller child nodes previous index
                i = smallerIndex;
            } else {
                // If smaller child node is larger than moving node, this index
                // is its correct position
                break;
            }
        }
        // Set node to its own place we just found
        this.array[i] = movingNode;

        // Return the original top value
        return top;
    }

    _expandArray() {
        // When array is full, double its length and copy contents from old
        // array to the new, larger one
        var newArray = new Array(this.array.length * 2);
        for (var i = 0; i < this.array.length; i++) {
            newArray[i] = this.array[i];
        }
        this.array = newArray;
    }
}