const numbers = [61, 71, -1, -20, 87, -77, -51, -92, 71, -36, -52, -17, -72, 95, 68, -55, 46, 88, -36, 18, -86, -80, 78, 31, 9, 85, -13, 94, -9, -90, 71, 23, 13, 97, -75, -2, -48, -10, 55, -62, -68, -60, -12, 21, 39, 26, -42, -69, 37, -31, 85, -45, 93, 90, 75, 51, -90, -19, 70, -97, -12, -94, -20, 100, 15, 46, -63, -22, 24, 95, -93, 94, -63, -20, 17, 13, -99, -94, 15, -12, -8, -94, -55, -18, 82, 89, -33, -29, -57, 65, 7, -91, 75, 76, -88, -6, 40, -45, 69, 39, -90, 43, 16, 99, 67, -65, -95, -5, -84, 54, -36, 26, 83, -10, -74, -32, -62, 66, 54, -34, 79, -20, -23, -72, -22, -32, -8, 79, 74, 8, -41, -17, -53, 65, 50, -31, 43, -22, -6, 78, -59, 10, 27, 62, -86, 86, -40, 80, 82, 68, -49, -25, -43, 52, 42, -39, 57, 24, -61, -45, -12, -15, -97, -13, -32, 83, 88, -53, -75, 0, 38, 48, 35, 41, 68, -5, 83, 14, -53, 95, 49, -59, -32, 1, 97, -8, 65, 49, -82, -22, -97, 7, 31, 76, 33, 84, 76, 21, -42, 71];
const words = ["The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog.", "The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog.", "The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog."];
const sample = numbers.concat(words);

describe('List', function() {
    it('should have positive length by default', function() {
        let list = new List();
        expect(list.length).to.be.positive;
    });

    it('should not allow negative length', function() {
        // Must be in anonymous function to work
        // https://github.com/chaijs/chai/issues/71
        // Must have that string part or it doesn't work
        expect(() => new List(-1)).to.throw(Error, "Size must be positive integer");
    });

    it('should have correct array length', function() {
        let list = new List(234);
        expect(list.array.length).to.equal(234);
    });

    it('should have correct  length', function() {
        let list = new List(234);
        numbers.forEach(x => list.push(x));
        expect(list.length).to.equal(numbers.length);
    });

    describe('push', function() {
        it('should have given numbers', function() {
            let list = new List();
            numbers.forEach(x => list.push(x));
            expect(list.array).to.eql(numbers);
        });

        it('should have given words', function() {
            let list = new List();
            words.forEach(x => list.push(x));
            expect(list.array).to.eql(words);
        });
    });

    describe('pop', function() {
        it('should pop undefined if no values', function() {
            let list = new List();
            expect(list.pop()).to.be.undefined;
        });

        it('should pop all values', function() {
            let list = new List();
            sample.forEach(x => list.push(x));
            let output = []
            while (list.length !== 0) {
                output.push(list.pop());
            }
            expect(output.reverse()).to.eql(sample);
        });
    });

    it('should fill values correctly', function() {
        let list = new List(100);
        list.fill(5);
        expect(list.array).to.eql(new Array(100).fill(5));
    });

    it('should get correct value', function() {
        let list = new List();
        sample.forEach(x => list.push(x));
        expect(list.get(14)).to.equal(sample[14]);
    });


    it('should swap correctly', function() {
        let list = new List();
        sample.forEach(x => list.push(x));
        list.swap(13, 85);
        expect(list.get(13)).to.equal(sample[85]);
        expect(list.get(85)).to.equal(sample[13]);
    });

    describe('reverse', function() {
        it('should reverse [1, 2, 3]', function() {
            let list = new List(3);
            let arr = [1, 2, 3];
            arr.forEach(x => list.push(x));
            list.reverse();
            expect(list.array).to.eql(arr.reverse());
        });

        it('should reverse sample', function() {
            let list = new List();
            let arr = sample;
            arr.forEach(x => list.push(x));
            list.reverse();
            expect(list.array).to.eql(arr.reverse());
        });

        it('should reverse []', function() {
            let list = new List();
            let arr = [];
            arr.forEach(x => list.push(x));
            list.reverse();
            expect(list.array).to.eql(arr.reverse());
        });
    });

    describe('helper functions', function() {
        it('first should work when values]', function() {
            let list = new List(3);
            let arr = [1, 2, 3];
            arr.forEach(x => list.push(x));
            expect(list.first()).to.equal(1);
        });

        it('first should return undefined when empty', function() {
            let list = new List();
            expect(list.first()).to.be.undefined;
        });

        it('last should work when values]', function() {
            let list = new List(3);
            let arr = [1, 2, 3];
            arr.forEach(x => list.push(x));
            expect(list.last()).to.equal(3);
        });

        it('last should return undefined when empty', function() {
            let list = new List();
            expect(list.last()).to.be.undefined;
        });
    });
});