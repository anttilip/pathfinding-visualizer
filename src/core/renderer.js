let mode = {
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

        this.grid = new Grid(32);
        this.input = new Input(canvas, this.grid);
        this.visualizer = undefined;
        this.mode = undefined;
        this.changeMode(mode.EDIT);
    }

    update(speed) {
        if (this.mode == mode.VISUALIZE) {
            // Convert speed slider to logarithmic
            let multiplier = Math.log(this.grid.size) / 100;
            let adjustedSpeed = Math.exp(multiplier * speed) - 1;
            // Advance visualization
            this.visualizer.tick(this.canvas, adjustedSpeed);
        }
    }

    run() {
        // Reset nodes from previous search
        this.grid.resetNodes();
        // Draw over old search before new search
        this.grid.draw(this.canvas);
        // Get selected settings
        let conf = config[document.getElementById("algo").value];
        // Create selected pathfinder and use selected heuristic
        let pathfinder = new conf.algo(this.grid, conf.heuristic);

        // Time how long does it take to find a path
        let t0 = performance.now();
        let result = pathfinder.findShortestPath();
        let deltaTime = performance.now() - t0;


        // Give stats from pathfinding
        console.log(conf.name);
        if (result.path) {
            console.log('Found path with length: ' + Number((result.path.last().gScore).toFixed(2)));
        } else {
            console.log('Path not found.');
        }
        console.log('Took: ' + Math.round(deltaTime) + ' ms.');
        console.log('Opened: ' + result.opened.length + ' nodes');


        this.visualizer = new Visualizer(result, this.grid);
        this.changeMode(mode.VISUALIZE);
    }

    clearGrid() {
        this.grid.clearGrid();
        this.changeMode(mode.EDIT);
    }

    changeMode(mode) {
        this.mode = mode;
        this.grid.draw(this.canvas);
    }
}

let speedSlider = document.querySelector("#speedSlider");
let canvas = document.getElementById("main-canvas");
let renderer = new Renderer(canvas);
setInterval(() => {
    renderer.update(speedSlider.value, size.value);
}, 0);

// Set buttons to run functions
document.getElementById("run").onclick = () => renderer.run();
document.getElementById("clear").onclick = () => renderer.clearGrid();