// const assert = chai.assert;
// const expect = chai.expect;
canvas = {
    height: 800,
    width: 800
};
describe('Graph', function() {
    describe('size', function() {
        it('should have correct size', function() {
            let graph = new Graph(16);
            expect(graph.size).to.equal(16);
        });

        it('should have correct number of nodes', function() {
            let graph = new Graph(32);
            expect(graph.nodes).to.have.lengthOf(32);
        });
    });

    describe('toggle', function() {
        it('toggle node EMPTY -> WALL', function() {
            let graph = new Graph(16);
            graph.toggleNode(3, 3);
            let type = graph.nodes[3][3].type;
            expect(type).to.equal(nodeType.WALL);
        });

        it('toggle node WALL -> EMPTY', function() {
            let graph = new Graph(16);

            graph.toggleNode(3, 3);
            let type = graph.nodes[3][3].type;
            expect(type).to.equal(nodeType.WALL);

            graph.drawingType = nodeType.EMPTY;

            graph.toggleNode(3, 3);
            type = graph.nodes[3][3].type;
            expect(type).to.equal(nodeType.EMPTY);
        });

        it('toggle node does not toggle start', function() {
            let graph = new Graph(16);
            let x = graph.startNode.x;
            let y = graph.startNode.y;
            graph.toggleNode(x, y);
            let type = graph.nodes[x][y].type;
            expect(type).to.equal(nodeType.START);
        });

        it('toggle node does not toggle goal', function() {
            let graph = new Graph(16);
            let x = graph.goalNode.x;
            let y = graph.goalNode.y;
            graph.toggleNode(x, y);
            let type = graph.nodes[x][y].type;
            expect(type).to.equal(nodeType.GOAL);
        });
    });

    describe('create', function() {
        it('should be 2D array', function() {
            let graph = new Graph(16);
            expect(graph.nodes).to.be.a('array');
            expect(graph.nodes[0]).to.be.a('array');
        });

        it('should not be too small', function() {
            let graph = new Graph(16);
            expect(graph.nodes).to.have.lengthOf(16);
            expect(graph.nodes[15]).to.have.lengthOf(16);
        });

        it('should have a start node', function() {
            let graph = new Graph(16);
            expect(graph.startNode).to.be.an.instanceof(Node);
        });

        it('start node should be START', function() {
            let graph = new Graph(16);
            expect(graph.startNode.type).to.equal(nodeType.START);
        });

        it('should have a goal node', function() {
            let graph = new Graph(16);
            expect(graph.goalNode).to.be.an.instanceof(Node);
        });

        it('goal node should be GOAL', function() {
            let graph = new Graph(16);
            expect(graph.goalNode.type).to.equal(nodeType.GOAL);
        });
    });

    describe('create from matrix', function() {
        it('should be 2D array', function() {

            let graph = new Graph(undefined, matrix = m3.maze);
            expect(graph.nodes).to.be.a('array');
            expect(graph.nodes[0]).to.be.a('array');
        });

        it('should not be too small', function() {
            let graph = new Graph(undefined, matrix = m1.maze);
            expect(graph.nodes).to.have.lengthOf(m1.maze.length);
            expect(graph.nodes[0]).to.have.lengthOf(m1.maze.length);
        });

        it('should have a start node', function() {
            let graph = new Graph(undefined, m2.maze);
            expect(graph.startNode).to.be.an.instanceof(Node);
        });

        it('start node should be START', function() {
            let graph = new Graph(undefined, m2.maze);
            expect(graph.startNode.type).to.equal(nodeType.START);
        });

        it('should have a goal node', function() {
            let graph = new Graph(undefined, m2.maze);
            expect(graph.goalNode).to.be.an.instanceof(Node);
        });

        it('goal node should be GOAL', function() {
            let graph = new Graph(undefined, m2.maze);
            expect(graph.goalNode.type).to.equal(nodeType.GOAL);
        });
    });


    describe('neighbours', function() {
        it('start should have neighbours', function() {
            let graph = new Graph(16);
            let node = graph.startNode;
            expect(graph.getNodesNeighbours(node)).to.have.length.within(1, 8);

        });

        it('goal should have neighbours', function() {
            let graph = new Graph(16);
            let node = graph.goalNode;
            expect(graph.getNodesNeighbours(node)).to.have.length.within(1, 8);

        });

        it('should have correct neighbours', function() {
            let graph = new Graph(16);
            let node = graph.nodes[5][9];
            let corr = [
                graph.nodes[5][8], graph.nodes[5][10], graph.nodes[4][9],
                graph.nodes[6][9], graph.nodes[4][8], graph.nodes[4][9],
                graph.nodes[6][8], graph.nodes[6][10]]

            expect(graph.getNodesNeighbours(node).array).to.deep.include.members(corr);
        });
    });
    describe('Node empty', function() {
        it('should tell that empty node is empty', function() {
            let graph = new Graph(16);
            expect(graph._isEmpty(3, 3)).to.be.true;
        });
        it('should tell that wall node is not empty', function() {
            let graph = new Graph(16);
            // wall to 5, 5
            graph.toggleNode(5, 5);
            expect(graph._isEmpty(5, 5)).to.be.false;
        });
        it('should tell that start node is not empty', function() {
            let graph = new Graph(16);
            // start node
            expect(graph._isEmpty(0, 0)).to.be.false;
        });
        it('should tell that goal node is empty', function() {
            let graph = new Graph(16);
            // goal node
            expect(graph._isEmpty(15, 15)).to.be.true;
        });
        it('should tell that out of bounds node is not empty', function() {
            let graph = new Graph(16);
            // // out of bounds
            expect(graph._isEmpty(16, 15)).to.be.false;
        });
    });
});