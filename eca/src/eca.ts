import { Canvas } from "./canvas";

const ROWS = 32;
const COLUMNS = 32;

// state = mini-rule describing what's going on above
// status = whether the cell is alive or not
type Cell = [state: number, status: boolean];
type Grid = Cell[][]

export const ECA = (canvas: Canvas) => {
    let grid: Grid = [];
    for (let y = 0; y < COLUMNS; y++) {
        grid[y] = [];
        for (let x = 0; x < ROWS; x++) {
            grid[y][x] = [0, false];
        }
    }

    return {
        tileSize: canvas.element.width / COLUMNS,
        grid,

        // rules are stored as the sum of powers of 2 to easily test
        // for example, rule 90 => [2, 8, 16, 64]
        rules: [0] as number[],
        set rule(rule: number) {
            const binary = rule.toString(2).padStart(8, "0");
            this.rules = Array.from(binary)
                .map((str, i) => {
                    if (str == "0") return;
                    return 2 ** (7 - i);
                })
                .filter(Number) as number[];
        },

        update() {
            this.grid.forEach((row, y) => {
                if (y == 0) return; // we don't touch the first layer
                row.forEach((_, x) => {
                    let above = "";
                    above += x == 0 || !this.grid[y - 1][x - 1][1] ? "0" : "1";
                    above += this.grid[y - 1][x][1] ? "1" : "0";
                    above += x == COLUMNS - 1 || !this.grid[y - 1][x + 1][1] ? "0" : "1";

                    let state = 2 ** parseInt(above, 2);
                    let status = this.rules.includes(state);

                    this.grid[y][x] = [state, status];
                });
            });
        },

        flip(x: number, y: number) {
            if (y != 0) return;
            this.grid[y][x][1] = !this.grid[y][x][1];
            this.update();
        },

        resizeTiles(size: number) {
            this.tileSize = size / COLUMNS;
        },

        draw(canvas: Canvas) {
            canvas.clear();
            this.grid.forEach((row, y) => {
                row.forEach((cell, x) => {
                    if (cell[1]) {
                        canvas.context.fillRect(
                            x * this.tileSize,
                            y * this.tileSize,
                            this.tileSize,
                            this.tileSize
                        );
                    }
                });
            });
        },
    };
};
