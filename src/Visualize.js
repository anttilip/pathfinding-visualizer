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
}

var canvas = document.getElementById("main-canvas");
var visualizer = new Visualizer(canvas);
var loop = setInterval(function() {
    visualizer.update();
    visualizer.draw();
}, 0);