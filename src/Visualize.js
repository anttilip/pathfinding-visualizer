function Visualizer(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.input = new Input(canvas);

    this.canvas.width = 768;
    this.canvas.height = 768;

    this.update = function() {
        // Update graph and algorithms
    };

    this.draw = function() {
        // Draw graph
    };
}

var canvas = document.getElementById("main-canvas");
var visualizer = new Visualizer(canvas);
var loop = setInterval(function() {
    visualizer.update();
    visualizer.draw();
}, 1);