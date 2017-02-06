describe('Dijkstra', function() {

    describe('solvable', function() {
        let dijkstra = new Dijkstra();

        solvableMazes.forEach((maze) => {
            let graph = new Graph(undefined, matrix = maze.maze);
            let result = dijkstra.findShortestPath(graph);

            it('should solve solvable maze', function() {
                let flatted = graph.goalNode.x * graph.size + graph.goalNode.y;
                expect(result.dist[flatted]).to.be.within(maze.dist - 0.1, maze.dist + 0, 1);
            });
        });
    });

    it('should not solve unsolvable', function() {
        let graph = new Graph(undefined, matrix = unsolvableMaze.maze);
        let dijkstra = new Dijkstra();
        let result = dijkstra.findShortestPath(graph);
        let flatted = graph.goalNode.x * graph.size + graph.goalNode.y

        expect(result.dist[flatted]).to.be.infinity;
    });
});