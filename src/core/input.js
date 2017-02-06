class Input {
    constructor(canvas, graph) {
        this.graph = graph;
        this.isDragging = false;
        this._createListeners(canvas);
    }

    _onUpdate(xScreen, yScreen) {
        var xGrid = this.graph.screenToGraph(xScreen);
        var yGrid = this.graph.screenToGraph(yScreen);
        if (renderer.mode == mode.EDIT) {
            this.graph.toggleNode(xGrid, yGrid);
        } else {
            renderer.mode = mode.EDIT;
        }
    }

    _getMouseCoordinates(evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
    _createListeners(canvas) {
        canvas.addEventListener('mousedown', (evt) => {
            this.isDragging = true;
            // alert('mousedown');
            var coord = this._getMouseCoordinates(evt);
            this._onUpdate(coord.x, coord.y);
        });

        addEventListener('mouseup', () => {
            this.isDragging = false;
            this.graph.currentlyDrawing = false;
        });

        canvas.addEventListener('mousemove', (evt) => {
            if (this.isDragging) {
                // alert('mousemove');
                var coord = this._getMouseCoordinates(evt);
                this._onUpdate(coord.x, coord.y);
            }
        });
    }
}