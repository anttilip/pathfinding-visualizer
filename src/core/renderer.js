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

        this.graph = new Graph(32);
        this.input = new Input(canvas, this.graph);
        this.visualizer = undefined;
        this.mode = mode.EDIT;
    }

    update(speed) {
        if (this.mode == mode.VISUALIZE) {
            // Convert speed slider to logarithmic
            var multplier = Math.log(this.graph.size) / 100;
            var adjustedSpeed = Math.exp(multplier * speed) - 1;
            // Advance visualization
            this.visualizer.tick(this.canvas, adjustedSpeed);

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

let speedSlider = document.querySelector("#speedSlider");
let canvas = document.getElementById("main-canvas");
let renderer = new Renderer(canvas, size.value);
setInterval(() => {
    renderer.update(speedSlider.value, size.value);
    renderer.draw();
}, 0);

// Set buttons to run functions
document.getElementById("run").onclick = () => renderer.run();
document.getElementById("clear").onclick = () => renderer.clearGraph();