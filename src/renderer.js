var mode = {
    EDIT: 0,
    VISUALIZE: 1,
    IDLE: 2
};

class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = 768;
        this.canvas.height = 768;
        this.context = canvas.getContext("2d");

        this.graph = new Graph(64);
        this.input = new Input(canvas, this.graph);
        this.visualizer = undefined;
        this.mode = mode.EDIT;
    }

    update() {
        if (this.mode == mode.VISUALIZE) {
            this.visualizer.tick(this.canvas, 1);
            if (this.visualizer.visualizationComplete()) {
                this.mode = mode.IDLE;
            }
        }
    }

    draw() {
        if (this.mode == mode.EDIT) {
            this.graph.draw(this.canvas);
        }
    }

    run() {
        // Draw over old search before new search
        this.graph.draw(this.canvas);
        var dijkstra = new Dijkstra();
        var t0 = performance.now();
        var result = dijkstra.findShortestPath(this.graph);
        var deltaTime = performance.now() - t0;

        alert('Took: ' + Math.round(deltaTime) + ' ms.');

        this.visualizer = new Visualizer(result, this.graph);
        this.mode = mode.VISUALIZE;
    }

    clearGraph() {
        this.graph.clearGraph();
        this.mode = mode.EDIT;
    }
}

let canvas = document.getElementById("main-canvas");
let renderer = new Renderer(canvas);
setInterval(() => {
    renderer.update();
    renderer.draw();
}, 0);

// Set buttons to run functions
document.getElementById("run").onclick = () => renderer.run();
document.getElementById("clear").onclick = () => renderer.clearGraph();