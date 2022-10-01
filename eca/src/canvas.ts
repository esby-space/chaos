export type Canvas = ReturnType<typeof Canvas>;
export const Canvas = (selector: string) => {
    const container = document.querySelector(selector) as HTMLElement;
    const element = document.createElement("canvas");
    const context = element.getContext("2d");
    if (!context) throw Error("couldn't get canvas context x_x");

    const canvas = {
        element,
        container,
        context,

        onclick: (_x: number, _y: number) => {},
        append() {
            this.container.append(this.element);
            this.resize();
        },

        resize() {
            const width = this.container.clientWidth;
            const height = this.container.clientHeight;
            this.element.style.width = width + "px";
            this.element.style.height = height + "px";
            this.element.width = width * window.devicePixelRatio;
            this.element.height = height * window.devicePixelRatio;
        },

        clear() {
            this.context.resetTransform();
            this.context.moveTo(0, 0);
            this.context.clearRect(
                0,
                0,
                this.element.width,
                this.element.height
            );
        },
    };

    canvas.resize();
    window.addEventListener("resize", () => canvas.resize());
    element.addEventListener("click", (event) =>
        canvas.onclick(
            event.offsetX * window.devicePixelRatio,
            event.offsetY * window.devicePixelRatio
        )
    );

    return canvas;
};
