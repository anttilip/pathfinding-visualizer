// const assert = chai.assert;
// const expect = chai.expect;
canvas = {
    height: 800,
    width: 800
};
describe('Grid', function() {
    it('should be given valid parameters', function() {
        expect(() => new Grid()).to.be.an.error;
    });
    describe('size', function() {
        it('should have correct size', function() {
            let grid = new Grid(16);
            expect(grid.size).to.equal(16);
        });

        it('should have correct number of nodes', function() {
            let grid = new Grid(32);
            expect(grid.nodes).to.have.lengthOf(32);
        });
    });

    describe('toggle', function() {
        it('toggle node EMPTY -> WALL', function() {
            let grid = new Grid(16);
            grid.toggleNode(3, 3);
            let type = grid.nodes[3][3].type;
            expect(type).to.equal(nodeType.WALL);
        });

        it('toggle node WALL -> EMPTY', function() {
            let grid = new Grid(16);

            expect(grid.drawingType).to.equal(nodeType.WALL);
            grid.toggleNode(3, 3);
            let type = grid.nodes[3][3].type;

            expect(type).to.equal(nodeType.WALL);
            expect(grid.drawingType).to.equal(nodeType.WALL);
            grid.drawingType = nodeType.EMPTY;

            grid.toggleNode(3, 3);
            type = grid.nodes[3][3].type;
            expect(type).to.equal(nodeType.EMPTY);
            // expect(grid.drawingType).to.equal(nodeType.WALL);
        });

        it('toggle node does not toggle start', function() {
            let grid = new Grid(16);
            let x = grid.startNode.x;
            let y = grid.startNode.y;
            grid.toggleNode(x, y);
            let type = grid.nodes[x][y].type;
            expect(type).to.equal(nodeType.START);
        });

        it('toggle node does not toggle goal', function() {
            let grid = new Grid(16);
            let x = grid.goalNode.x;
            let y = grid.goalNode.y;
            grid.toggleNode(x, y);
            let type = grid.nodes[x][y].type;
            expect(type).to.equal(nodeType.GOAL);
        });
    });

    describe('create', function() {
        it('should be 2D array', function() {
            let grid = new Grid(16);
            expect(grid.nodes).to.be.a('array');
            expect(grid.nodes[0]).to.be.a('array');
        });

        it('should not be too small', function() {
            let grid = new Grid(16);
            expect(grid.nodes).to.have.lengthOf(16);
            expect(grid.nodes[15]).to.have.lengthOf(16);
        });

        it('should have a start node', function() {
            let grid = new Grid(16);
            expect(grid.startNode).to.be.an.instanceof(Node);
        });

        it('start node should be START', function() {
            let grid = new Grid(16);
            expect(grid.startNode.type).to.equal(nodeType.START);
        });

        it('should have a goal node', function() {
            let grid = new Grid(16);
            expect(grid.goalNode).to.be.an.instanceof(Node);
        });

        it('goal node should be GOAL', function() {
            let grid = new Grid(16);
            expect(grid.goalNode.type).to.equal(nodeType.GOAL);
        });
    });

    describe('create from matrix', function() {
        it('should be 2D array', function() {

            let grid = new Grid(undefined, matrix = m3.maze);
            expect(grid.nodes).to.be.a('array');
            expect(grid.nodes[0]).to.be.a('array');
        });

        it('should not be too small', function() {
            let grid = new Grid(undefined, matrix = m1.maze);
            expect(grid.nodes).to.have.lengthOf(m1.maze.length);
            expect(grid.nodes[0]).to.have.lengthOf(m1.maze.length);
        });

        it('should have a start node', function() {
            let grid = new Grid(undefined, m2.maze);
            expect(grid.startNode).to.be.an.instanceof(Node);
        });

        it('start node should be START', function() {
            let grid = new Grid(undefined, m2.maze);
            expect(grid.startNode.type).to.equal(nodeType.START);
        });

        it('should have a goal node', function() {
            let grid = new Grid(undefined, m2.maze);
            expect(grid.goalNode).to.be.an.instanceof(Node);
        });

        it('goal node should be GOAL', function() {
            let grid = new Grid(undefined, m2.maze);
            expect(grid.goalNode.type).to.equal(nodeType.GOAL);
        });
    });


    describe('neighbours', function() {
        it('start should have neighbours', function() {
            let grid = new Grid(16);
            let node = grid.startNode;
            expect(grid.getNodesNeighbours(node)).to.have.length.within(1, 8);

        });

        it('goal should have neighbours', function() {
            let grid = new Grid(16);
            let node = grid.goalNode;
            expect(grid.getNodesNeighbours(node)).to.have.length.within(1, 8);

        });

        it('should have correct neighbours', function() {
            let grid = new Grid(16);
            let node = grid.nodes[5][9];
            let corr = [
                grid.nodes[5][8], grid.nodes[5][10], grid.nodes[4][9],
                grid.nodes[6][9], grid.nodes[4][8], grid.nodes[4][9],
                grid.nodes[6][8], grid.nodes[6][10]]

            expect(grid.getNodesNeighbours(node).array).to.deep.include.members(corr);
        });
    });

    describe('Node empty', function() {
        it('should tell that empty node is empty', function() {
            let grid = new Grid(16);
            expect(grid._isEmpty(3, 3)).to.be.true;
        });

        it('should tell that wall node is not empty', function() {
            let grid = new Grid(16);
            // wall to 5, 5
            grid.toggleNode(5, 5);
            expect(grid._isEmpty(5, 5)).to.be.false;
        });

        it('should tell that start node is not empty', function() {
            let grid = new Grid(16);
            // start node
            expect(grid._isEmpty(0, 0)).to.be.false;
        });

        it('should tell that goal node is empty', function() {
            let grid = new Grid(16);
            // goal node
            expect(grid._isEmpty(15, 15)).to.be.true;
        });

        it('should tell that out of bounds node is not empty', function() {
            let grid = new Grid(16);
            // // out of bounds
            expect(grid._isEmpty(16, 15)).to.be.false;
        });
    });

    describe('Clear', function() {
        it('should clear all nodes', function() {
            let grid = new Grid(16);
            grid.nodes[3][3].type = nodeType.WALL;
            grid.clearGrid();
            expect(grid.nodes[3][3].type).to.equal(nodeType.EMPTY);
        });
    });

    describe('Reset', function() {
        it('should reset all nodes', function() {
            let grid = new Grid(16);
            grid.nodes[3][3].opened = true;
            grid.resetNodes();

            expect(grid.nodes[3][3].opened).to.be.false;
        });
    });
});