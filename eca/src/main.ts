import { Canvas } from "./canvas";
import { ECA } from "./eca";

const main = () => {
    const canvas = Canvas("#eca #container");
    const simulation = ECA(32, 32);

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

    const rule = document.querySelector("#eca #rule") as HTMLInputElement;
    rule.addEventListener("input", () => {
        simulation.rule = parseInt(rule.value);
        simulation.draw(canvas);
    });

    const random = document.querySelector("#eca #random") as HTMLElement;
    random.addEventListener("click", () => {
        simulation.random();
        simulation.draw(canvas);
    });

    const clear = document.querySelector("#eca #clear") as HTMLElement;
    clear.addEventListener("click", () => {
        simulation.clear();
        simulation.draw(canvas);
    });


    simulation.rule = parseInt(rule.value);
    simulation.draw(canvas);
};

main();

