"uset strict";

const $wrap = document.querySelector(".wrapper");
const $spider = document.querySelector(".spider");
const $web = document.querySelector(".web");

const $overlay = document.querySelector(".overlay");
const $restart = document.querySelector(".restart");
const $restartBtn = document.querySelector(".restart-btn");

let spiderOffset = 30;
let spiderY = $spider.getBoundingClientRect().top;
let webHeight = $web.offsetHeight;

let timerGame;
let timerLose;

document.addEventListener("keydown", spiderMove);

function spiderMove(event) {

    let code = event.code;

    if (code === "KeyW") {

        if (spiderY - spiderOffset <= 0) {
            return;
        }

        $spider.style.top = spiderY - spiderOffset + "px";
        $web.style.height = webHeight - spiderOffset + "px";
        webHeight -= spiderOffset;
        spiderY -= spiderOffset;
        return;
    }

    if (code === "KeyS") {

        if (spiderY + $spider.offsetHeight + spiderOffset >= $wrap.offsetHeight) {
            return;
        }

        $spider.style.top = spiderY + spiderOffset + "px";
        $web.style.height = webHeight + spiderOffset + "px";
        webHeight += spiderOffset;
        spiderY += spiderOffset;
        return;
    }

}

//game process
timerGame = setInterval(game, 400);
timerLose = setInterval(checkLose, 50);

function game() {

    let random = Math.floor(Math.random() * 2);
    let availableCord = $wrap.offsetHeight - 50;
    let randomCordY = Math.floor(20 + (Math.random() * (availableCord - 50)));

    if (random === 0) {

        random = Math.floor(Math.random() * 2);

        if (random === 0) {
            createKunai(randomCordY);
        } else {
            createRightKunai(randomCordY);
        }

    } else {

        random = Math.floor(Math.random() * 2);

        if (random === 0) {
            createShuriken(randomCordY);
        } else {
            createRightShuriken(randomCordY);
        }

    }

}

function createShuriken(cord) {

    let shuriken = document.createElement("div");
    shuriken.className = "shuriken";
    shuriken.style.top = cord + "px";
    $wrap.append(shuriken);
    shuriken.classList.add("shuriken_move");

    setTimeout(() => shuriken.remove(), 5100);

}

function createRightShuriken(cord) {

    let shuriken = document.createElement("div");
    shuriken.className = "shuriken-right";
    shuriken.style.top = cord + "px";
    $wrap.append(shuriken);
    shuriken.classList.add("shuriken-right_move");

    setTimeout(() => shuriken.remove(), 5100);

}

function createKunai(cord) {

    let kunai = document.createElement("div");
    kunai.className = "kunai";
    kunai.style.top = cord + "px";
    $wrap.append(kunai);
    kunai.classList.add("kunai_move");

    setTimeout(() => kunai.remove(), 5100);

}

function createRightKunai(cord) {

    let kunai = document.createElement("div");
    kunai.className = "kunai-right";
    kunai.style.top = cord + "px";
    $wrap.append(kunai);
    kunai.classList.add("kunai-right_move");

    setTimeout(() => kunai.remove(), 5100);

}

function checkLose() {

    let kunais = document.querySelectorAll(".kunai, .kunai-right");
    let shurikens = document.querySelectorAll(".shuriken, .shuriken-right");

    let spiderXRight = $spider.getBoundingClientRect().right;
    let spiderX = $spider.getBoundingClientRect().left;
    let spiderY = $spider.getBoundingClientRect().top;

    for (let elem of kunais) {

        if (elem.classList.contains("kunai-right")) {

            let x = elem.getBoundingClientRect().left;
            let y = elem.getBoundingClientRect().bottom;

            if ((x < spiderXRight && x > spiderX) && (y > spiderY && y < spiderY + $spider.offsetHeight + 20)) {
                clearInterval(timerGame);
                clearInterval(timerLose);
                showRestart();
                return;
            }

        } else {

            let x = elem.getBoundingClientRect().right;
            let y = elem.getBoundingClientRect().bottom;
    
            if ((x > spiderX && x < spiderX + $spider.offsetWidth) && (y > spiderY && y < spiderY + $spider.offsetHeight + 20)) {
                clearInterval(timerGame);
                clearInterval(timerLose);
                showRestart();
                return;
            }

        }

    }

    for (let elem of shurikens) {

        if (elem.classList.contains("shuriken-right")) {

            let x = elem.getBoundingClientRect().left;
            let y = elem.getBoundingClientRect().bottom;

            if ((x < spiderXRight && x > spiderX) && (y > spiderY && y < spiderY + $spider.offsetHeight + 20)) {
                clearInterval(timerGame);
                clearInterval(timerLose);
                showRestart();
                return;
            }

        } else {

            let x = elem.getBoundingClientRect().right;
            let y = elem.getBoundingClientRect().bottom;
    
            if ((x > spiderX && x < spiderX + $spider.offsetWidth) && (y > spiderY && y < spiderY + $spider.offsetHeight + 20)) {
                clearInterval(timerGame);
                clearInterval(timerLose);
                showRestart();
                return;
            }

        }

    }

}

//restart
$overlay.addEventListener("click", closeByOverlay);
$restartBtn.addEventListener("click", restart);

function restart() {
    closeByOverlay();
    timerGame = setInterval(game, 400);
    timerLose = setInterval(checkLose, 50);
}

function closeByOverlay() {
    $overlay.classList.remove("overlay_active");
    $restart.classList.remove("restart_active");
}

function showRestart() {
    $overlay.classList.add("overlay_active");
    $restart.classList.add("restart_active");

    setTimeout(() => $restartBtn.focus(), 100);

}





