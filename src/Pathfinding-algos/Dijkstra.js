class Dijkstra {
    findShortestPath(graph) {
        var nodes = new Heap();
        var dist = new Array(graph.size * graph.size);
        var prev = new Array(graph.size * graph.size);
        // TODO: implementoi oma hash set
        var alreadySeen = new Set();

        // Convert node to 1D array index
        var flatten = (node) => (node.x * graph.size + node.y);

        // Initialize distances
        for (var i = 0; i < dist.length; i++) {
            dist[i] = Infinity
        }

        // Set start node distance to 0 and push it to heap
        dist[flatten(graph.startNode)] = 0;
        nodes.push(0, graph.startNode);

        // Main loop
        while (nodes.size !== 0) {
            // Get node with smallest distance
            var node = nodes.pop().node;
            // Find nodes neighbours
            var neighbours = graph.getNodesNeighbours(node);
            for (var i = 0; i < neighbours.length; i++) {
                var neighbour = neighbours[i];
                // TODO: add different weight for diagonals, i.e. sqrt(2)
                // Neighbours distance will be current nodes distance + 1
                var neighboursDistance = dist[flatten(node)] + 1;
                // If neighbour is already visited, this path must be longer so
                // no need to continue checking it.
                if (!alreadySeen.has(neighbour)) {
                    // Save neighbours distance
                    dist[flatten(neighbour)] = neighboursDistance;
                    // Set neighbours "parent" node to current node
                    prev[flatten(neighbour)] = node;
                    if (graph.goalNode.equals(neighbour)) {
                        // Goal node was found, return prev to find out path
                        return prev;
                    }
                    // Set neighbour to seen
                    alreadySeen.add(neighbour);
                    // Push neighbour to heap with its distance as a key
                    nodes.push(neighboursDistance, neighbour);
                }
            }
        }
        // Goal node was not found, i.e. path does not exist.
        return prev;
    }
}