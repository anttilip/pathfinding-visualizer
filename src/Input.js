class Input {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.isDragging = false;
        this.createListeners();
    }

    createListeners() {
        addEventListener('mousedown', () => this.isDragging = true);

        addEventListener('mouseup', () => this.isDragging = false);

        addEventListener('mousemove', (evt) => {
            var rect = canvas.getBoundingClientRect();
            this.x = evt.clientX - rect.left;
            this.y = evt.clientY - rect.top;
        });
    }
}