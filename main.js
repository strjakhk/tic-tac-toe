function makePlayer(name, mark){

    let score = 0;

    const getPlayerMark = () => mark;
    const getPlayerName = () => name;
    const getPlayerScore = () => score;
    const augmentScore = () => {
        score += 1;
    }

    const printMark = (gameboard, position) => {
        if(!gameboard.getBoard()[position] && !gameboard.getWinningMark()){
            gameboard.setMark(position, mark);
            return true;
        }else{
            return false;
        }
    }

    const resetScore = () => { score = 0; }

    return {
        getPlayerMark,
        getPlayerName,
        getPlayerScore,
        augmentScore,
        printMark,
        resetScore,
    }
}

const gameboard = (() => {
    const board = new Array(9);
    let completedSet;

    const restoreBoard = () => board.fill(null);

    const setMark = (cell, mark) => {
        if (cell > board.length || cell < 0){
            throw Error("Cell number to fill is invalid");    
        }
        
        if (board[cell] === null && !completedSet){
            board[cell] = mark;
        }

        verifySets();
    }

    const verifySets = () => {
        const WIN_COMBINATIONS = [
            [0, 1, 2],
            [0, 4, 8],
            [0, 3, 6],
            [1, 4, 7],
            [3, 4, 5],
            [8, 7, 6],
            [8, 5, 2],
        ]

        completedSet = WIN_COMBINATIONS.find(([a, b, c]) => {
            if (
                board[a] !== null &&
                board[a] == board[b] &&
                board[b] == board[c]
            ){
                return [a, b, c];
            }
        })

    }

    const getBoard = () => [...board];

    const getCompletedSet = () => {
        return completedSet ? [...completedSet] : null;
    };

    const getWinningMark = () => {
        return completedSet ? board[completedSet[0]] : null;
    }

    return {
        restoreBoard,
        setMark,
        getCompletedSet,
        getBoard,
        getWinningMark,
    }
})();


const gameManager = (() => {    
    const players = [];

    let playing = false;

    let winningScore = 3;
    let winningPlayer;

    let turn = 0;
    let toggleDirection = 1;
    
    const addPlayer = (name, mark) => {
        if (players.length <= 2){
            players.push(
                makePlayer(name, mark)
            );
        }
    }

    const getTurn = () => {
        if (players[0]){
            return players[turn].name;
        }
    };

    const toggleTurn = () => {
        if (players[0]){
            turn += toggleDirection;
            toggleDirection *= -1;
        }
    }

    const getWinningScore = () => score;
    const SetWinningScore = (score) => {
        if (score > 0 && score <= 10){
            winningScore = score;
        }
    }

    const checkWinning = () => {
        players.forEach(player => {
            if (player.getPlayerScore() === winningScore){
                winningPlayer = player.name;
            }else{
                winningPlayer = null;   
            }
        })
    }

    const restoreScores = () => {
        players.forEach(player => player.resetScore());
    }

    const play = (position) => {
        if (playing && !winningPlayer){
            if (players[turn].printMark(gameboard, position)){
                if (gameboard.getWinningMark()){
                    console.log(`WINNER: ${gameManager.getWinningMark()}`);
                    players[turn].augmentScore();
                    gameboard.restoreBoard();
                    checkWinning();
                    toggleTurn();
                }else{
                    toggleTurn();
                }
            }
            console.log(gameboard.getCompletedSet());
        }
    }

    const initGame = () => {        
        if (players.length < 2){
            throw Error("Cannot start the game if there are not 2 players");
        }

        restoreScores();
        gameboard.restoreBoard();
        playing = true;
    }

})();