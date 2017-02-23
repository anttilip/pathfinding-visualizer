describe('DFS', function() {
    describe('solvable', function() {
        solvableMazes.forEach((maze) => {
            let grid = new Grid(undefined, matrix = maze.maze, maze.labels);
            let dfs = new DFS(grid);
            let result = dfs.findShortestPath();

            it('should solve solvable maze', function() {
                expect(grid.goalNode.gScore).to.not.be.infinity;
            });
        });
    });

    it('should not solve unsolvable', function() {
        let grid = new Grid(undefined, matrix = unsolvableMaze.maze, unsolvableMaze.labels);
        let dfs = new DFS(grid);
        let result = dfs.findShortestPath();

        expect(grid.goalNode.gScore).to.be.infinity;
    });
});