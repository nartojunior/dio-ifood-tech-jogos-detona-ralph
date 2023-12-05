const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelectorAll(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
        startButton: document.querySelector("#btnStart")
    },
    values: {
        timerId: null,
        gameSpeedInMs: 1000,
        enemySquareId: null,
        score: 0,
        lives: 3,
        currentTime: 10,
        canStartGame: true,
        gameover: false,
        audioVolume: .2,
        playbackRate: 1.5
    }
}

function startGame(){
    if (state.values.canStartGame){
        state.values.canStartGame = false
        state.view.startButton.disabled = true
        restart()
    }
}

function playAudio(audioName) {
    let audio = new Audio(`./assets/audios/${audioName}.m4a`)
    audio.volume = state.values.audioVolume
    audio.playbackRate = state.values.playbackRate
    audio.play()
}

function decreaseLives(){
    state.values.lives--
    state.view.lives.textContent = `x${state.values.lives}`
    if (state.values.lives <= 0 && !state.values.gameover)
    {
        state.values.gameover = true
        gameOver("Acabaram suas vidas!")
    }
}

function gameOver(message){
    clearInterval(state.values.timerId)
    state.values.gameover = true
    state.values.canStartGame = true
    state.values.enemySquareId = null
    removeEnemy()

    alert(`${message} Você conseguiu ${state.values.score} pontos!`)
    state.view.startButton.disabled = false
}

function countDown() {
    let time = state.values.currentTime--
    state.view.timeLeft.innerHTML = time
    if (time <= 0) {
        gameOver("Tempo acabado!")
    }
}

function moveEnemy() {
    state.values.timerId = setInterval(chooseNewEnemySquare, state.values.gameSpeedInMs)
}

function chooseNewEnemySquare() {

    removeEnemy()

    let randNumber = Math.floor(Math.random() * 9)
    let newEnemySquare = state.view.squares[randNumber]

    newEnemySquare.classList.add(["enemy"])
    state.values.enemySquareId = newEnemySquare.id
    countDown()
}

function removeEnemy() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy")
    })
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.enemySquareId && !state.values.gameover) {
                playAudio("hit")
                state.values.score += 10
                state.view.score.innerHTML = state.values.score
                state.values.enemySquareId = null
            }
            else if( !state.values.gameover) {
                decreaseLives()
            }
        })
    })
}

function initLives(){
    state.view.lives.textContent = state.values.lives
}

function init() {
    initLives()
    addListenerHitBox()
}

function gameloop() {
    moveEnemy()
}

function restart() {
    state.values = {
        timerId: null,
        gameSpeedInMs: 1000,
        enemySquareId: null,
        score: 0,
        lives: 3,
        currentTime: 10,
        gameover: false,
        audioVolume: .2,
        playbackRate: 1.5
    }

    state.view.score.textContent = state.values.score
    state.view.timeLeft.innerHTML = state.values.currentTime
    state.view.lives.textContent = `x${state.values.lives}`

    gameloop()
}

init()