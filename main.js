function Player(name, mark){
    this.name = name;
    this.mark = mark;
}

Player.prototype.printMark = function(gameboard, position){
    while (!gameboard.getBoard()[position]){
        gameboard.setMark(position, this.mark);
        break;
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
    
})();