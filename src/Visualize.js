class Visualizer {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.input = new Input();
        this.canvas.width = 768;
        this.canvas.height = 768;
        this.graph = new Graph(32);
    }

    update() {
        if (this.input.isDragging) {
            this.graph.update(this.input.x, this.input.y);
        } else {
            // Dragging stopped
            this.graph.clearCurrentDrawing();
        }
    }

    draw() {
        this.graph.draw(this.canvas);
    }

    run() {
        alert("Run not implemented yet!");
    }

    clearGraph() {
        this.graph = new Graph(this.graph.size);
    }
}

let canvas = document.getElementById("main-canvas");
let visualizer = new Visualizer(canvas);
setInterval(function() {
    visualizer.update();
    visualizer.draw();
}, 0);

// Set buttons to run functions
document.getElementById("run").onclick = () => visualizer.run();
document.getElementById("clear").onclick = () => visualizer.clearGraph();