/** Dynamic list */
class List {
    constructor(initialSize = 32) {
        if (initialSize !== parseInt(initialSize) || initialSize <= 0) {
            throw Error("Size must be positive integer")
        }
        this.array = new Array(initialSize);
        this.length = 0;

        // Helper functions
        this.first = () => this.array[0];
        this.last = () => this.array[this.length - 1];
    }

    /**
     * Add value to List.
     * @param {?} value - value that will be added to the list. 
     */
    push(value) {
        if (this.length == this.array.length) {
            this._expandArray();
        }
        this.array[this.length] = value;
        this.length++;
    }

    /**
     * Return and remove last item from list.
     * @return {?} - last item in list.
     */
    pop() {
        this.length--;
        return this.array[this.length];
    }

    
    get(i) {
        return this.array[i];
    }

    /**
     * Set elemnt in index i to new value.
     * @param {?} i - index.
     * @param {?} element - new value.
     */
    set(i, element) {
        this.array[i] = element;
    }
    
    /**
     * Fill the list with given value.
     * @param {?} value - value that will fill the whole list.
     */
    fill(value) {
        for (let i = 0; i < this.array.length; i++) {
            this.array[i] = value;
        }
        this.length = this.array.length;
    }

    /**
     * Swap elements in given indexes.
     * @param {?} a - first index.
     * @param {?} b - second index.
     */
    swap(a, b) {
        let tmp = this.array[a];
        this.array[a] = this.array[b];
        this.array[b] = tmp;
    }

    /**
     * Reverse the list.
     */
    reverse() {
        let reversed = new Array(this.array.length);
        for (let i = 0; i < this.length; i++) {
            reversed[i] = this.array[this.length - 1 - i];
        }
        this.array = reversed;
    }

    _expandArray() {
        let newArray = new Array(this.array.length * 2);
        for (let i = 0; i < this.array.length; i++) {
            newArray[i] = this.array[i];
        }
        this.array = newArray;
    }
}
