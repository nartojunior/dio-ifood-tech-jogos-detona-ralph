const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelectorAll(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },
    values:{
        timerId: null,
        gameSpeedInMs: 1000,
        enemySquareId: null,
        score: 0,
        currentTime: 10,
        gameover: false,
        audioVolume: .2,
        playbackRate: 1.5
    }
}

function playAudio(audioName){
    let audio = new Audio(`./assets/audios/${audioName}.m4a`)
    audio.volume = state.values.audioVolume
    audio.playbackRate = state.values.playbackRate
    audio.play()
}

function countDown(){
    let time = state.values.currentTime--
    state.view.timeLeft.innerHTML = time
    if (time <= 0 ){   
        clearInterval(state.values.timerId) 
        state.values.gameover = true     
        state.values.enemySquareId = null
        removeEnemy()
               
        alert(`Tempo esgotado! Você conseguiu ${state.values.score} pontos!`)
    }
}

function moveEnemy(){
    state.values.timerId = setInterval(chooseNewEnemySquare, state.values.gameSpeedInMs)
}

function chooseNewEnemySquare(){

    removeEnemy()

    let randNumber = Math.floor(Math.random() * 9)
    let newEnemySquare = state.view.squares[randNumber]

    newEnemySquare.classList.add(["enemy"])
    state.values.enemySquareId = newEnemySquare.id
    countDown()

}

function removeEnemy(){
    state.view.squares.forEach( (square) =>{
        square.classList.remove("enemy")
    })
}

function AddListenerHitBox(){
    state.view.squares.forEach( (square) =>{
        square.addEventListener("mousedown", () =>{
            if (square.id === state.values.enemySquareId && !state.values.gameover){
                playAudio("hit")
                state.values.score += 10
                state.view.score.innerHTML = state.values.score
                state.values.enemySquareId = null
                
            }
        })        
    })
}    

function init(){
    AddListenerHitBox()
}

function gameloop(){
    moveEnemy()
}

function restart(){
    state.values = {
        timerId: null,
        gameSpeedInMs: 1000,
        enemySquareId: null,
        score: 0,
        currentTime: 10,
        gameover: false
    }

    gameloop()
}

init()
gameloop()