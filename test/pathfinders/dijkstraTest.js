describe('Dijkstra', function() {
    describe('solvable', function() {
        solvableMazes.forEach((maze) => {
            let graph = new Graph(undefined, matrix = maze.maze);
            let dijkstra = new AStar(graph, Heuristics.DIJKSTRA);
            let result = dijkstra.findShortestPath();

            it('should solve solvable maze', function() {
                expect(graph.goalNode.gScore).to.be.within(maze.dist - 0.1, maze.dist + 0, 1);
            });
        });
    });

    it('should not solve unsolvable', function() {
        let graph = new Graph(undefined, matrix = unsolvableMaze.maze);
        let dijkstra = new AStar(graph, Heuristics.DIJKSTRA);
        let result = dijkstra.findShortestPath();

        expect(graph.goalNode.gScore).to.be.infinity;
    });
});