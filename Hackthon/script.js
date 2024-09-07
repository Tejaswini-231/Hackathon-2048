document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('board');
    const scoreDisplay = document.getElementById('score');
    const targetScore = 2048;
    let score = 0;
    let tiles = [];
    let gameWon = false;

    function createBoard() {
        for (var i = 0; i < 16; i++) {
            var tile = document.createElement('div');
            tile.classList.add('tile');
            tile.innerText = '';
            board.appendChild(tile);
            tiles.push(tile);
        }
        addRandomNumber();
        addRandomNumber();
    }

    function addRandomNumber() {
        var emptyTiles = [];
        for (var i = 0; i < tiles.length; i++) {
            if (tiles[i].innerText === '') {
                emptyTiles.push(tiles[i]);
            }
        }

        if (emptyTiles.length > 0) {
            var randomIndex = Math.floor(Math.random() * emptyTiles.length);
            var randomTile = emptyTiles[randomIndex];
            var randomNumber = Math.random();
            if (randomNumber > 0.2) {
                randomTile.innerText = '2';
            } else {
                randomTile.innerText = '4';
            }
        }
    }

    function slideLeft(row) {
        var newRow = row.filter(function(num) {
             return num !== '';
             });
        while (newRow.length < 4) {
            newRow.push('');
        }
        return newRow;
    }

    function combineLeft(row) {
        for (var i = 0; i < 3; i++) {
            if (row[i] === row[i + 1] && row[i] !== '') {
                row[i] = (parseInt(row[i]) * 2).toString();
                score += parseInt(row[i]);
                row[i + 1] = '';
            }
        }
        return slideLeft(row);
    }

    function handleMove(direction) {
        var moved = false;
        for (var i = 0; i < 4; i++) {
            var row = [];
            if (direction === 'left') {
                for (var j = 0; j < 4; j++) {
                    row.push(tiles[i * 4 + j].innerText);
                }
                var newRow = combineLeft(slideLeft(row));
                for (var j = 0; j < 4; j++) {
                    if (tiles[i * 4 + j].innerText !== newRow[j]) moved = true;
                    tiles[i * 4 + j].innerText = newRow[j];
                }
            } else if (direction === 'right') {
                for (var j = 3; j >= 0; j--) {
                    row.push(tiles[i * 4 + j].innerText);
                }
                var newRow = combineLeft(slideLeft(row));
                for (var j = 3, k = 0; j >= 0; j--, k++) {
                    if (tiles[i * 4 + j].innerText !== newRow[k]) moved = true;
                    tiles[i * 4 + j].innerText = newRow[k];
                }
            } else if (direction === 'up') {
                for (var j = 0; j < 4; j++) {
                    row.push(tiles[j * 4 + i].innerText);
                }
                var newRow = combineLeft(slideLeft(row));
                for (var j = 0; j < 4; j++) {
                    if (tiles[j * 4 + i].innerText !== newRow[j]) moved = true;
                    tiles[j * 4 + i].innerText = newRow[j];
                }
            } else if (direction === 'down') {
                for (var j = 3; j >= 0; j--) {
                    row.push(tiles[j * 4 + i].innerText);
                }
                var newRow = combineLeft(slideLeft(row));
                for (var j = 3, k = 0; j >= 0; j--, k++) {
                    if (tiles[j * 4 + i].innerText !== newRow[k]) moved = true;
                    tiles[j * 4 + i].innerText = newRow[k];
                }
            }
        }
        if (moved) {
            addRandomNumber();
            scoreDisplay.innerText = score;
            if (checkWin()) {
                alert('You win! Final Score: ' + score);
                gameWon = true;
            } else if (checkGameOver()) {
                alert('Game Over! Final Score: ' + score);
            }
        }
    }

    function checkWin() {
        for (var i = 0; i < tiles.length; i++) {
            if (tiles[i].innerText == targetScore) {
                return true;
            }
        }
        return false;
    }

    function checkGameOver() {
        for (var i = 0; i < tiles.length; i++) {
            if (tiles[i].innerText === '') {
                return false;
            }
        }
        return true;
    }

    document.addEventListener('keydown', function(event) {
        if (gameWon) return;
        if (event.key === 'ArrowLeft') handleMove('left');
        else if (event.key === 'ArrowRight') handleMove('right');
        else if (event.key === 'ArrowUp') handleMove('up');
        else if (event.key === 'ArrowDown') handleMove('down');
    });

    createBoard();
});
