describe('Node', function() {
    it('start as emty', function() {
        expect(new Node(1, 1).type).to.equal(nodeType.EMPTY);
    });

    it('should equal identical node', function() {
        let node = new Node(15, 14);
        expect(node.equals(new Node(15, 14))).to.be.true;
    });

    it('should not equal node with different coordinate', function() {
        let node = new Node(15, 14);
        expect(node.equals(new Node(15, 13))).to.be.false;
    });

    it('should not equal node with different type', function() {
        let node = new Node(15, 14);
        node.type = nodeType.WALL;
        expect(node.equals(new Node(15, 14))).to.be.false;
    });

    it('should reset search attributes when told so', function() {
        let node = new Node(15, 14);
        node.opened = true;
        node.closed = true;
        node.gScore = true;
        node.fScore = true;
        node.reset();
        expect(node.equals((new Node(15, 14)))).to.be.true;
    });

    it('should reset search attributes when told so', function() {
        let node = new Node(15, 14);
        node.opened = true;
        node.closed = true;
        node.gScore = true;
        node.fScore = true;
        node.reset();
        expect(node.equals((new Node(15, 14)))).to.be.true;
    });

    it('should equal same node', function() {
        let node = new Node(15, 14);
        expect(node.equals((new Node(15, 14)))).to.be.true;
    });

    it('should not equal different node', function() {
        let node = new Node(15, 15);
        expect(node.equals((new Node(15, 14)))).to.be.false;
    });
});