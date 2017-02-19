describe('Heap', function() {
    before(function beforeAll() {

    });

    it('should be empty in the beginning', function() {
        let heap = new Heap();
        assert.equal(heap.size, 0);
    });

    it('array size initializer sets size correctly', function() {
        let heap = new Heap(11);
        assert.equal(heap.array.length, 11);
    })

    it('size increases when adding a node', function() {
        let heap = new Heap();
        heap.push(5, new Node(0, 1));
        assert.equal(heap.size, 1);
    });

    it('size increases when adding a nodes', function() {
        let heap = new Heap();
        for (let i = 0; i < 150; i++) {
            heap.push(5, new Node(0, 1));
        }
        assert.equal(heap.size, 150);
    });

    it('pops nodes that were pushed', function() {
        let heap = new Heap();

        let nodesIn = [];
        nodesIn.push(new Node(0, 1));
        nodesIn.push(new Node(0, 2));
        nodesIn.push(new Node(2, 2));
        nodesIn.push(new Node(8, 2));
        nodesIn.forEach((node) => heap.push(node.x, node));

        let nodesOut = []
        while (heap.size !== 0) {
            nodesOut.push(heap.pop().node);
        }
        expect(nodesOut).to.have.members(nodesIn);
    });

    it('returns undefined if no nodes in heap', function() {
        let heap = new Heap();
        expect(heap.pop()).to.be.undefined;
    });

    it('returns nodes in order (passed ordered)', function() {
        let heap = new Heap();
        let nodesIn = []
        for (let i = 1; i <= 117; i++) {
            heap.push(i, new Node(i, i));
            nodesIn.push(new Node(i, i));
        }

        let nodesOut = []
        while (heap.size !== 0) {
            nodesOut.push(heap.pop().node);
        }
        expect(nodesIn).to.deep.equal(nodesOut);
    });

    it('returns nodes in order (passed reversed)', function() {
        let heap = new Heap();
        let nodesIn = []
        for (let i = 412; i > 0; i--) {
            heap.push(i, new Node(i, i));
            nodesIn.push(new Node(i, i));
        }

        let nodesOut = []
        while (heap.size !== 0) {
            nodesOut.push(heap.pop().node);
        }
        expect(nodesIn.reverse()).to.deep.equal(nodesOut);
    });
});