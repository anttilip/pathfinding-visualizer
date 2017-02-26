// const assert = chai.assert;
// const expect = chai.expect;
canvas = {
    height: 800,
    width: 800
};
describe('Grid', function() {
    it('should be given valid parameters', function() {
        // Must have string part or does not work
        // Must be in anon function to work
        expect(() => new Grid()).to.throw(Error, "Pass either size or matrix to Grid");
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
        it('toggle node TRAVERSABLE -> WALL', function() {
            let grid = new Grid(16);
            grid.toggleNode(3, 3);
            let type = grid.nodes[3][3].type;
            expect(type).to.equal(nodeType.WALL);
        });

        it('toggle node WALL -> TRAVERSABLE', function() {
            let grid = new Grid(16);

            grid.toggleNode(3, 3);
            let type = grid.nodes[3][3].type;

            expect(type).to.equal(nodeType.WALL);
            grid.drawingType = nodeType.TRAVERSABLE;

            grid.toggleNode(3, 3);
            type = grid.nodes[3][3].type;
            expect(type).to.equal(nodeType.TRAVERSABLE);
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
            let grid = new Grid(undefined, m3.maze, m3.labels);
            expect(grid.nodes).to.be.a('array');
            expect(grid.nodes[0]).to.be.a('array');
        });

        it('should not be too small', function() {
            let grid = new Grid(undefined, m1.maze, m3.labels);
            expect(grid.nodes).to.have.lengthOf(m1.maze.length);
            expect(grid.nodes[0]).to.have.lengthOf(m1.maze.length);
        });

        it('should have a start node', function() {
            let grid = new Grid(undefined, m2.maze, m2.labels);
            expect(grid.startNode).to.be.an.instanceof(Node);
        });

        it('start node should be START', function() {
            let grid = new Grid(undefined, m2.maze, m2.labels);
            expect(grid.startNode.type).to.equal(nodeType.START);
        });

        it('should have a goal node', function() {
            let grid = new Grid(undefined, m2.maze, m2.labels);
            expect(grid.goalNode).to.be.an.instanceof(Node);
        });

        it('goal node should be GOAL', function() {
            let grid = new Grid(undefined, m2.maze, m2.labels);
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
            expect(grid._isTraversable(3, 3)).to.be.true;
        });

        it('should tell that wall node is not empty', function() {
            let grid = new Grid(16);
            // wall to 5, 5
            grid.toggleNode(5, 5);
            expect(grid._isTraversable(5, 5)).to.be.false;
        });

        it('should tell that start node is not empty', function() {
            let grid = new Grid(16);
            // start node
            let start = grid.startNode;
            expect(grid._isTraversable(start.x, start.y)).to.be.false;
        });

        it('should tell that goal node is empty', function() {
            let grid = new Grid(16);
            // goal node
            expect(grid._isTraversable(15, 15)).to.be.true;
        });

        it('should tell that out of bounds node is not empty', function() {
            let grid = new Grid(16);
            // // out of bounds
            expect(grid._isTraversable(16, 15)).to.be.false;
        });
    });

    describe('Clear', function() {
        it('should clear all nodes', function() {
            let grid = new Grid(16);
            grid.nodes[3][3].type = nodeType.WALL;
            grid.clearGrid();
            expect(grid.nodes[3][3].type).to.equal(nodeType.TRAVERSABLE);
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

    describe('Setting start & goal nodes', function() {
        it('should set start node', function() {
            let grid = new Grid(16);
            let prevStart = grid.startNode;
            grid.setStart(5, 5);
            expect(grid.startNode).to.eql(grid.nodes[5][5]).and.not.eql(prevStart);
        });

        it('should set nodeType to START', function() {
            let grid = new Grid(16);
            grid.setStart(5, 5);
            expect(grid.nodes[5][5].type).to.eql(nodeType.START);
        });

        it('should set goal node', function() {
            let grid = new Grid(16);
            let prevGoal = grid.goalNode;
            grid.setGoal(5, 5);
            expect(grid.goalNode).to.eql(grid.nodes[5][5]).and.not.eql(prevGoal);
        });

        it('should set nodeType to GOAL', function() {
            let grid = new Grid(16);
            grid.setGoal(5, 5);
            expect(grid.nodes[5][5].type).to.eql(nodeType.GOAL);
        });
    });
});