class Dijkstra {
    findShortestPath(graph) {
        var nodes = new Heap();
        this.graph = graph;
        this.dist = new Array(graph.size * graph.size);
        var prev = new Array(graph.size * graph.size);
        // TODO: implementoi oma hash set
        var alreadySeen = new Set();
        // TODO: implement dynamic array
        // This is just for visualization purposes
        var seenList = [];

        // Convert node to 1D array index
        var flatten = (node) => (node.x * graph.size + node.y);

        // Initialize distances
        for (var i = 0; i < this.dist.length; i++) {
            this.dist[i] = Infinity
        }

        // Set start node distance to 0 and push it to heap
        this.dist[flatten(graph.startNode)] = 0;
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
                var neighboursDistance = this._getWeight(node, neighbour);
                // If neighbour is already visited, this path must be longer so
                // no need to continue checking it.
                if (!alreadySeen.has(neighbour)) {
                    // Save neighbours distance
                    this.dist[flatten(neighbour)] = neighboursDistance;
                    // Set neighbours "parent" node to current node
                    prev[flatten(neighbour)] = node;
                    if (graph.goalNode.equals(neighbour)) {
                        // Goal node was found, return prev to find out path
                        return {
                            prev: prev,
                            dist: this.dist,
                            seenList: seenList
                        };
                    }
                    // Set neighbour to seen
                    alreadySeen.add(neighbour);
                    seenList.push(neighbour);
                    // Push neighbour to heap with its distance as a key
                    nodes.push(neighboursDistance, neighbour);
                }
            }
        }
        // Goal node was not found, i.e. path does not exist.
        return {
            prev: prev,
            dist: this.dist,
            seenList: seenList
        };
    }

    _getWeight(node, next) {
        var flatten = (node) => (node.x * this.graph.size + node.y);
        var weight = node.x == next.x || node.y == next.y ? 1 : 1.414
        return this.dist[flatten(node)] + weight;
    }
}