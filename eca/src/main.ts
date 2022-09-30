import { Canvas } from "./canvas";
import { ECA } from "./eca";

const main = () => {
    const canvas = Canvas("#eca #container");
    const simulation = ECA(canvas);
    canvas.append();

    simulation.grid[10][10] = 1;
    simulation.draw();
};

main();
export {};
