describe('Jump point search', function() {
    describe('octile', function() {
        describe('solvable', function() {
            solvableMazes.forEach((maze) => {
                let grid = new Grid(undefined, matrix = maze.maze, maze.labels);
                let finder = new JPS(grid, Heuristics.OCTILE);
                let result = finder.findShortestPath();

                it('should solve solvable maze', function() {
                    expect(grid.goalNode.gScore).to.be.within(maze.dist - 0.1, maze.dist + 0.1);
                });
            });
        });

        describe('unsolvable', function() {
            it('should not solve unsolvable', function() {
                let grid = new Grid(undefined, matrix = unsolvableMaze.maze, unsolvableMaze.labels);
                let finder = new JPS(grid, Heuristics.OCTILE);
                let result = finder.findShortestPath();

                expect(grid.goalNode.gScore).to.be.infinity;
            });
        });
    });
});