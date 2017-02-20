describe('Dijkstra', function() {
    describe('solvable', function() {
        solvableMazes.forEach((maze) => {
            let grid = new Grid(undefined, matrix = maze.maze);
            let dijkstra = new AStar(grid, Heuristics.DIJKSTRA);
            let result = dijkstra.findShortestPath();

            it('should solve solvable maze', function() {
                expect(grid.goalNode.gScore).to.be.within(maze.dist - 0.1, maze.dist + 0, 1);
            });
        });
    });

    it('should not solve unsolvable', function() {
        let grid = new Grid(undefined, matrix = unsolvableMaze.maze);
        let dijkstra = new AStar(grid, Heuristics.DIJKSTRA);
        let result = dijkstra.findShortestPath();

        expect(grid.goalNode.gScore).to.be.infinity;
    });
});