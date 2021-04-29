import Confetti from "https://cdn.skypack.dev/confetti-js@0.0.18";

document.body.classList.add("js");
document.getElementById("confetti-holder").style.display = "inline";

let logger = [];
let lastKeyTime = Date.now();

const confettiSettings = {
    target: "confetti-holder",
    max: "80",
    size: "1",
    animate: true,
    props: ["circle", "square", "triangle", "line"],
    colors: [
        [165, 104, 246],
        [230, 61, 135],
        [0, 199, 228],
        [253, 214, 126]
    ],
    clock: "30",
    rotate: true,
    start_from_edge: false,
    respawn: false
};

const confetti = new Confetti(confettiSettings);

function konamiCode(e) {
    const key = e.key.toLowerCase();

    if (Date.now() - lastKeyTime > 1000) {
        logger = [];
    }

    logger.push(key);
    lastKeyTime = Date.now();

    if (
        logger.join("") ===
        "arrowuparrowuparrowdownarrowdownarrowleftarrowrightarrowleftarrowrightbaenter"
    ) {
        confetti.render();
        document.removeEventListener("keydown", konamiCode);
    }
}

document.addEventListener("keydown", konamiCode);
