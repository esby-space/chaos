import { Canvas } from "./canvas";

const ROWS = 32;
const COLUMNS = 32;

type Grid = number[][];
export const ECA = (canvas: Canvas) => {
    const grid: Grid = Array(ROWS)
        .fill(0)
        .map(() => Array(COLUMNS).fill(0));

    const simulation = {
        tileSize: canvas.element.width / COLUMNS,
        grid,

        flip(x: number, y: number) {
            if (this.grid[y][x] != 0) {
                this.grid[y][x] = 0;
            } else {
                this.grid[y][x] = 1;
            }

            this.draw();
        },

        resizeTiles(size: number) {
            this.tileSize = size / COLUMNS;
            this.draw();
        },

        draw() {
            canvas.clear();
            canvas.render((context) => {
                this.grid.forEach((row, y) => {
                    row.forEach((cell, x) => {
                        if (cell == 1) {
                            context.fillRect(
                                x * this.tileSize,
                                y * this.tileSize,
                                this.tileSize,
                                this.tileSize
                            );
                        }
                    });
                });
            });
        },
    };

    canvas.onresize = (size) => simulation.resizeTiles(size);
    canvas.onclick = (x, y) => {
        console.log(x, y);
        simulation.flip(
            Math.floor(x / simulation.tileSize),
            Math.floor(y / simulation.tileSize)
        );
    };
    return simulation;
};
