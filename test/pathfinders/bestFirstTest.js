describe('Best first', function() {
    describe('solvable', function() {
        solvableMazes.forEach((maze) => {
            let grid = new Grid(undefined, matrix = maze.maze);
            let finder = new AStar(grid, Heuristics.SQUARED_EUCLIDEAN);
            let result = finder.findShortestPath();

            it('should solve solvable maze', function() {
                expect(grid.goalNode.gScore).to.not.be.infinity;
            });
        });
    });

    describe('unsolvable', function() {
        it('should not solve unsolvable', function() {
            let grid = new Grid(undefined, matrix = unsolvableMaze.maze);
            let finder = new AStar(grid, Heuristics.SQUARED_EUCLIDEAN);
            let result = finder.findShortestPath();

            expect(grid.goalNode.gScore).to.be.infinity;
        });
    });
});