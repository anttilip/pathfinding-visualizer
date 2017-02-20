class List {
    constructor(initialSize = 32) {
        if (initialSize !== parseInt(initialSize) || initialSize <= 0) {
            throw Error("Size must be positive integer")
        }
        this.array = new Array(initialSize);
        this.length = 0;
    }

    push(value) {
        if (this.length == this.array.length) {
            this._expandArray();
        }
        this.array[this.length] = value;
        this.length++;
    }

    pop() {
        this.length--;
        return this.array[this.length];
    }

    get(i) {
        return this.array[i];
    }

    set(i, element) {
        this.array[i] = element;
    }

    fill(value) {
        for (let i = 0; i < this.array.length; i++) {
            this.array[i] = value;
        }
        this.length = this.array.length;
    }

    swap(a, b) {
        let tmp = this.array[a];
        this.array[a] = this.array[b];
        this.array[b] = tmp;
    }

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