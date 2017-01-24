function Visualizer(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.input = new Input(canvas);

    this.canvas.width = 768;
    this.canvas.height = 768;

    this.graph = new Graph(32);

    this.update = function() {
        if (this.input.isDragging) {
            this.graph.update(this.input.x, this.input.y);
        } else {
            // Dragging stopped
            this.graph.clearCurrentDrawing();
        }
    };

    this.draw = function() {
        this.graph.draw(this.canvas);
    };
}

var canvas = document.getElementById("main-canvas");
var visualizer = new Visualizer(canvas);
var loop = setInterval(function() {
    visualizer.update();
    visualizer.draw();
}, 1);