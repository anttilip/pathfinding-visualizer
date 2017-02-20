describe('Heap', function() {
    before(function beforeAll() {

    });

    it('should be empty in the beginning', function() {
        let heap = new Heap();
        assert.equal(heap.size, 0);
    });

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
            nodesOut.push(heap.pop());
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
            nodesOut.push(heap.pop());
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
            nodesOut.push(heap.pop());
        }
        expect(nodesIn.reverse()).to.deep.equal(nodesOut);
    });

    it('updates keys correctly (simple)', function() {
        let heap = new Heap();
        let node = new Node(1, 1)
        heap.push(3, node);
        heap.updateKey(5, node);
        expect(heap.list.get(0).key).to.equal(5);
    });

    it('updates keys correctly (complex)', function() {
        let heap = new Heap();
        for (let i = 1; i <= 231; i++) {
            if (i % 5 == 0) {
                let cur = heap.list.get(Math.floor(i / 2))
                let m;
                if (cur.key % 2 == 0) {
                    m = -cur.node.x;
                } else {
                    m = +15;
                }
                heap.updateKey(cur.key * m, cur.node)
            }
            if (i % 3 == 0) {
                heap.pop();
            }
            heap.push(i, new Node(i, 600 - i));
            heap.push(600 - i, new Node(600 - i, i))
        }

        // Huono tapa mut teinpä näin
        for (let i = 0; i < heap.size; i++) {
            let v = heap.list.get(i);
            let n = v.node;
            let c = n.hashCode();
            let success = heap.nodeIndexes[c] === i;
            if (!success) {
                expect(success).to.be.true;
                break;
            }
        }
        expect(true).to.be.true;
    });
});