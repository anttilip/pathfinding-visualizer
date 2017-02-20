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

    fill(value) {
        for (let i = 0; i < this.array.length; i++) {
            this.array[i] = value;
        }
        this.length = this.array.length;
    }

    _expandArray() {
        let newArray = new Array(this.array.length * 2);
        for (let i = 0; i < this.array.length; i++) {
            newArray[i] = this.array[i];
        }
        this.array = newArray;
    }
}