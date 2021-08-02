setTimeout(function () {

    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');
    restartGame = document.querySelector("#restartGame");
    aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));

    score = 0;
    cross = true;
    obstacle.classList.add('obstacleAni');
    document.querySelector("#loaderid").style.visibility = "hidden";

    audio = new Audio('./gamefile/music.mp3');
    audiogo = new Audio('./gamefile/gameover.mp3');
    setTimeout(() => {
        audio.play();
    }, 1000);



    // for mobile control
    document.querySelector("#goleft").addEventListener("click",
        function goleft() {
            dino = document.querySelector('.dino');
            dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
            dino.style.left = (dinoX - 112) + "px";
        });

    document.querySelector("#gojump").addEventListener("click",
        function gojump() {
            dino = document.querySelector('.dino');
            dino.classList.add('animateDino');
            setTimeout(() => {
                dino.classList.remove('animateDino')
            }, 700);
        });

    document.querySelector("#goright").addEventListener("click",
        function goright() {
            dino = document.querySelector('.dino');
            dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
            dino.style.left = dinoX + 112 + "px";
        });




    // for pc control
    document.onkeydown = function (e) {
        if (e.key == "ArrowUp") {
            dino = document.querySelector('.dino');
            dino.classList.add('animateDino');
            setTimeout(() => {
                dino.classList.remove('animateDino')
            }, 700);
        }
        if (e.key == "ArrowRight") {
            dino = document.querySelector('.dino');
            dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
            dino.style.left = dinoX + 112 + "px";
        }
        if (e.key == "ArrowLeft") {
            dino = document.querySelector('.dino');
            dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
            dino.style.left = (dinoX - 112) + "px";
        }
    }



    //game code
    setInterval(() => {
        dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

        ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
        oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

        offsetX = Math.abs(dx - ox);
        offsetY = Math.abs(dy - oy);

        if (offsetX < 73 && offsetY < 52) {
            gameOver.style.visibility = "visible";
            obstacle.classList.remove('obstacleAni');
            obstacle.style.right = "-30px";
            dino.style.left = "-30px";
            audiogo.play();
            setTimeout(() => {
                audiogo.pause();
                audio.pause();
            }, 1000);

            restartGame.addEventListener("click", function () {
                score = 0;
                updateScore(score);
                gameOver.style.visibility = "hidden";
                obstacle.classList.add('obstacleAni');
                if (screen.width <= 800) {
                    obstacle.style.animationDuration = 2.7 + "s";
                } else {
                    obstacle.style.animationDuration = 4 + "s";
                }
            });
        } else if (offsetX < 145 && cross) {
            score += 1;
            updateScore(score);
            cross = false;
            setTimeout(() => {
                cross = true;
            }, 1000);
        }

    }, 10);

    function updateScore(score) {
        scoreCont.innerHTML = "Your Score: " + score;
        scoreid.innerHTML = score;
    }
}, 4000);
