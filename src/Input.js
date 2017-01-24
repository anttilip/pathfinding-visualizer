function Input(canvas) {
    this.x = 0;
    this.y = 0;
    this.isDragging = false;

    // For some reason this.x does not work with eventListeners
    var _this = this;

    addEventListener('mousedown', function() {
        _this.isDragging = true;
    });

    addEventListener('mouseup', function() {
        _this.isDragging = false;
    });

    canvas.addEventListener('mousemove', function(evt) {
        var rect = canvas.getBoundingClientRect();
        _this.x = evt.clientX - rect.left;
        _this.y = evt.clientY - rect.top;
    });
}