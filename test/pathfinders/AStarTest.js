describe('A*', function() {
    describe('octile', function() {
        describe('solvable', function() {
            solvableMazes.forEach((maze) => {
                let graph = new Graph(undefined, matrix = maze.maze);
                let finder = new AStar(graph, Heuristics.OCTILE);
                let result = finder.findShortestPath();

                it('should solve solvable maze', function() {
                    expect(graph.goalNode.gScore).to.be.within(maze.dist - 0.1, maze.dist + 0, 1);
                });
            });
        });

        describe('unsolvable', function() {
            it('should not solve unsolvable', function() {
                let graph = new Graph(undefined, matrix = unsolvableMaze.maze);
                let finder = new AStar(graph, Heuristics.OCTILE);
                let result = finder.findShortestPath();

                expect(graph.goalNode.gScore).to.be.infinity;
            });
        });
    });

    describe('euclidean', function() {
        describe('solvable', function() {
            solvableMazes.forEach((maze) => {
                let graph = new Graph(undefined, matrix = maze.maze);
                let finder = new AStar(graph, Heuristics.EUCLIDEAN);
                let result = finder.findShortestPath();

                it('should solve solvable maze', function() {
                    expect(graph.goalNode.gScore).to.be.within(maze.dist - 0.1, maze.dist + 0, 1);
                });
            });
        })
        describe('unsolvable', function() {
            it('should not solve unsolvable', function() {
                let graph = new Graph(undefined, matrix = unsolvableMaze.maze);
                let finder = new AStar(graph, Heuristics.EUCLIDEAN);
                let result = finder.findShortestPath();

                expect(graph.goalNode.gScore).to.be.infinity;
            });
        });
    });


    describe('manhattan', function() {
        describe('solvable', function() {
            solvableMazes.forEach((maze) => {
                let graph = new Graph(undefined, matrix = maze.maze);
                let finder = new AStar(graph, Heuristics.MANHATTAN);
                let result = finder.findShortestPath();

                it('should solve solvable maze', function() {
                    expect(graph.goalNode.gScore).to.be.within(maze.dist - 0.1, maze.dist + 0, 1);
                });
            });
        })
        describe('unsolvable', function() {
            it('should not solve unsolvable', function() {
                let graph = new Graph(undefined, matrix = unsolvableMaze.maze);
                let finder = new AStar(graph, Heuristics.MANHATTAN);
                let result = finder.findShortestPath();

                expect(graph.goalNode.gScore).to.be.infinity;
            });
        });
    });
});