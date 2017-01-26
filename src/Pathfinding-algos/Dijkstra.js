class Dijkstra {
    findShortestPath(graph) {
        var nodes = new Heap();
        var dist = new Array(graph.size * graph.size);
        var prev = new Array(graph.size * graph.size);
        // TODO: implementoi oma hash set
        var alreadySeen = new Set();

        var flatten = (node) => ((node.x) * graph.size + node.y);

        // Initialize distances
        for (var i = 0; i < dist.length; i++) {
            dist[i] = Infinity
        }

        // Set start node distance to 0 and push it to heap
        dist[flatten(graph.startNode)] = 0;
        nodes.push(0, graph.startNode);

        while (nodes.size !== 0) {
            var node = nodes.pop().node;
            var neighbours = graph.getNodesNeighbours(node);
            for (var i = 0; i < neighbours.length; i++) {
                var neighbour = neighbours[i];
                // TODO: add different weight for diagonals, i.e. sqrt(2)
                var currentDistance = dist[flatten(node)] + 1;

                if (!alreadySeen.has(neighbour)) {
                    dist[flatten(neighbour)] = currentDistance;
                    prev[flatten(neighbour)] = node;
                    if (graph.goalNode.equals(neighbour)) {
                        // Goal node was found
                        console.log('löyty')
                        return prev;
                    }
                    alreadySeen.add(neighbour);
                    nodes.push(currentDistance, neighbour);
                }
            }
        }
        // Goal node was not found, i.e. path does not exist.
        return prev;

    }
}