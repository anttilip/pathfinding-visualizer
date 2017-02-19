class List {
    constructor(size = 32) {
        this.array = new Array(size);
        this.size = 0;
    }

    add(value) {
        if (this.size == this.array.length) {
            this._expandArray();
        }
        this.array[this.size] = value;
        this.size++;
    }

    get(i) {
        return this.array[i];
    }

    fill(value) {
        for (var i = 0; i < this.array.length; i++) {
            this.array[i] = value;
        }
        this.size = this.array.length;
    }

    _expandArray() {
        var newArray = new Array(this.array * 2);
        for (var i = 0; i < this.array.length; i++) {
            newArray[i] = this.array[i];
        }
        this.array = newArray;
    }
}