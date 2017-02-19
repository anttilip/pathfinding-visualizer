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
        this.mode = undefined;
        this.changeMode(mode.EDIT);
    }

    update(speed) {
        if (this.mode == mode.VISUALIZE) {
            // Convert speed slider to logarithmic
            var multplier = Math.log(this.graph.size) / 100;
            var adjustedSpeed = Math.exp(multplier * speed) - 1;
            // Advance visualization
            this.visualizer.tick(this.canvas, adjustedSpeed);
        }
    }

    run() {
        // Reset nodes from previous search
        this.graph.resetNodes();
        // Draw over old search before new search
        this.graph.draw(this.canvas);
        // Get selected settings
        var conf = config[document.getElementById("algo").value];
        // Create selected pathfinder and use selected heuristic
        var pathfinder = new conf.algo(this.graph, conf.heuristic);

        // Time how long does it take to find a path
        var t0 = performance.now();
        var result = pathfinder.findShortestPath();
        var deltaTime = performance.now() - t0;

        console.log('Took: ' + Math.round(deltaTime) + ' ms.');

        this.visualizer = new Visualizer(result, this.graph);
        this.changeMode(mode.VISUALIZE);
    }

    clearGraph() {
        this.graph.clearGraph();
        this.changeMode(mode.EDIT);
    }

    changeMode(mode) {
        this.mode = mode;
        this.graph.draw(this.canvas);
    }
}

let speedSlider = document.querySelector("#speedSlider");
let canvas = document.getElementById("main-canvas");
let renderer = new Renderer(canvas, size.value);
setInterval(() => {
    renderer.update(speedSlider.value, size.value);
}, 0);

// Set buttons to run functions
document.getElementById("run").onclick = () => renderer.run();
document.getElementById("clear").onclick = () => renderer.clearGraph();