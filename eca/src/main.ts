import { Canvas } from "./canvas";
import { ECA } from "./eca";

const main = () => {
    const canvas = Canvas("#eca #container");
    const simulation = ECA(canvas);
    canvas.append();

    simulation.resizeTiles(canvas.element.width);
    window.addEventListener('resize', () => {
        simulation.resizeTiles(canvas.element.width);
        simulation.draw(canvas);
    });

    canvas.onclick = (x, y) => {
        simulation.flip(
            Math.floor(x / simulation.tileSize),
            Math.floor(y / simulation.tileSize)
        );
        simulation.draw(canvas);
    };

    simulation.rule = 30;
};

main();

