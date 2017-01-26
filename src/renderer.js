var mode = {
    EDIT: 0,
    VISUALIZE: 1,
    RUN: 2
};

class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = 768;
        this.canvas.height = 768;
        this.context = canvas.getContext("2d");

        this.graph = new Graph(64);
        this.input = new Input(canvas, this.graph);
        this.mode = mode.EDIT;
    }

    draw() {
        this.graph.draw(this.canvas);
        if (this.mode == mode.VISUALIZE) {
            // Draw visualizer
        }
    }

    run() {
        this.mode = mode.RUN;
        var dijkstra = new Dijkstra();
        var t0 = performance.now();
        var result = dijkstra.findShortestPath(this.graph);
        var prev = result.prev
        var deltaTime = performance.now() - t0;


        var flatten = (node) => ((node.x) * this.graph.size + node.y);

        var path = [];
        var i = this.graph.goalNode;

        while (prev[flatten(i)] !== undefined) {
            path.push(i);
            i = prev[flatten(i)];
        }

        alert('Length: ' + path.length + ', took ' + Math.round(deltaTime) + ' ms.');
        console.log(path);
        console.log(path.length);
        //this._visualize(path);
        this.mode = mode.VISUALIZE;
    }

    clearGraph() {
        this.graph.clearGraph();
        this.mode = mode.EDIT;
    }
}

let canvas = document.getElementById("main-canvas");
let renderer = new Renderer(canvas);
setInterval(function() {
    // renderer.update();
    renderer.draw();
}, 0);

// Set buttons to run functions
document.getElementById("run").onclick = () => renderer.run();
document.getElementById("clear").onclick = () => renderer.clearGraph();