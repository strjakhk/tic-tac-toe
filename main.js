const gameboard = (() => {
    const board = new Array(9);
    let set;

    const restoreBoard = () => board.fill(null);

    const setMark = (cell, mark) => {
        if (cell > board.length || cell < 0){
            throw Error("Cell number to fill is invalid");    
        }
        
        if (board[cell] === null && !set){
            board[cell] = mark;
        }

        verifySets();
    }

    const verifySets = () => {
        const [a, b, c, d, e, f, g, h, i] = board;
        set = (
            a == b && b == c && a != null ? [a,b,c] :
            a == e && e == i && a != null ? [a,e,i] :
            a == d && d == g && a != null ? [a,d,g] :
            d == e && e == f && d != null ? [d,e,f] :
            b == e && e == h && b != null ? [b,e,h] :
            i == h && h == g && g != null ? [i,h,g] :
            i == f && f == c && i != null ? [i,f,c] : null
        );
    }

    const getSet = () => {
        if (set){
            return [...set];
        }
        return null;
    };

    const getBoard = () => [...board];

    return {
        restoreBoard,
        setMark,
        getSet,
        getBoard,
    }
})();

gameboard.restoreBoard();

gameboard.setMark(1, "O");
gameboard.setMark(4, "O");
gameboard.setMark(7, "O");
console.log(gameboard.getBoard());
console.log(gameboard.getSet());