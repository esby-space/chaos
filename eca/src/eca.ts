import { Canvas } from "./canvas";

// state = describing what's going on above
type Cell = [state: number, alive: boolean];
type Grid = Cell[][];

export const ECA = (rows: number, columns: number) => {
    let grid: Grid = [];
    for (let y = 0; y < rows; y++) {
        grid[y] = [];
        for (let x = 0; x < columns; x++) {
            grid[y][x] = [0, false];
        }
    }

    return {
        tileSize: 0,
        grid,

        // rule 90 => [2, 8, 16, 64]
        rules: [0] as number[],
        set rule(rule: number) {
            const binary = rule.toString(2).padStart(8, "0");
            this.rules = Array.from(binary)
                .map((str, i) => {
                    if (str == "0") return;
                    return 2 ** (7 - i);
                })
                .filter(Number) as number[];
            this.update();
        },

        update() {
            this.grid.forEach((row, y) => {
                if (y == 0) return; // we don't touch the first layer
                row.forEach((_, x) => {
                    let above = "";
                    above += `${+(x != 0 && this.grid[y - 1][x - 1][1])}`;
                    above += `${+this.grid[y - 1][x][1]}`;
                    above += `${+(
                        x != columns - 1 && this.grid[y - 1][x + 1][1]
                    )}`;

                    let state = 2 ** parseInt(above, 2);
                    let alive = this.rules.includes(state);
                    this.grid[y][x] = [state, alive];
                });
            });
        },

        flip(x: number, y: number) {
            if (y != 0) return;
            this.grid[y][x][1] = !this.grid[y][x][1];
            this.update();
        },

        random() {
            this.grid[0].forEach(
                (_, x) => (this.grid[0][x][1] = Math.random() < 0.5)
            );
            this.update();
        },

        clear() {
            this.grid[0].forEach((_, x) => (this.grid[0][x][1] = false));
            this.update();
        },

        resizeTiles(size: number) {
            this.tileSize = size / columns;
        },

        draw(canvas: Canvas) {
            canvas.clear();
            this.grid.forEach((row, y) => {
                row.forEach((cell, x) => {
                    if (cell[1]) {
                        canvas.context.fillStyle =
                            y == 0
                                ? `black`
                                : `hsl(${Math.log2(cell[0]) * 50}, 70%, 60%)`;
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
