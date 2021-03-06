/* 
this will keep each player's score
*/
var playerX = 'X';
var playerO = 'O';

var state = {}

function start(state) {
    state.currentPlayer = playerX;
    state.grid = [
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1]
    ];
    return state;

}

function recMove(state, row, column) {
    state.grid[row][column] = state.currentPlayer;
    if (state.currentPlayer === playerO) {
        state.currentPlayer = playerX;



    } else {
        state.currentPlayer = playerO;
    }

    return state;
}


function displayPlayer(state) {
    for (var i = 0; i > state.grid.length; i++);
    if (state.grid[i][i] === playerX) {
        $('.tile').text(playerX);
    } else(console.log("do nothing"))
}





function hasWon(state) {
    var won = [
        /* Horizontal */
        [0 - 0, 0 - 1, 0 - 2],
        [1 - 0, 1 - 1, 1 - 2],
        [2 - 0, 2 - 1, 2 - 2],
        /* Vertical */
        [0 - 0, 1 - 0, 2 - 0],
        [0 - 1, 1 - 1, 2 - 1],
        [0 - 2, 1 - 2, 2 - 2],
        /* Diagonally */
        [0 - 0, 1 - 1, 2 - 2],
        [0 - 2, 1 - 1, 2 - 0]
    ]
    if (state.grid === won) {
        alert(state.currentPlayer + " Has Won!")
    } else {
        alert("We Have a Draw")
    }

}





function render(state) {
    if (state.grid) {
        $(".board").html(state.grid.map(renderRow).join(""));
        $('.tile').click(handleTileClick);
        $('.currentPlayer').html(renderPlayer(state.currentPlayer));



    }

    $(".startButton").click(handleStart);

}

function renderCell(parentIndex, cell, index) {
    return '<td id=' + parentIndex + '-' + index + ' class="tile"></td>'
}

function renderCellForRow(parentIndex) {
    return function (cell, index) {
        return renderCell(parentIndex, cell, index);
    }
}

function renderRow(row, index) {
    return "<tr>" + row.map(renderCellForRow(index)).join("") + "</tr>"
}

function renderPlayer(player) {
    return "Current player is " + player;
}

function handleStart(e) {
    start(state);
    render(state);
}

function handleTileClick(e) {
    var split = e.target.id.split('-').map(function (a) {
        return parseInt(a);
    })
    // displayPlayer(state)
    recMove(state, split[0], split[1]);
    render(state);
}

//start(this.state);
render(this.state);

/* TESTS */
/*** Test Helpers ***/
function testRecPlayerSwitch() {
    var testState = start({})
    testState = recMove(testState, 0, 0);
    assertEqual(testState.currentPlayer, "O");

    testState = recMove(testState, 0, 0);
    assertEqual(testState.currentPlayer, "X");
}

function testHasWon() {
    var testState = {
        grid: [
            ["X", "X", "X"],
            [-1, -1, -1],
            [-1, -1, -1],
            {
                currentPlayer: ""
            }
        ]

    };
    var won = hasWon(testState);
    assertEqual(won.status, true);

    testState.grid[0] = [-1, -1, -1];
    testState.grid[1] = ["O", "O", "O"];
    won = hasWon(testState)
    assertEqual(won.status, true);

}

function testRecMoveSaving() {
    var testState = start({});
    var currentPlayer = testState.currentPlayer;

    recMove(testState, 0, 0);

    assertEqual(testState.grid[0][0], currentPlayer);
}

function testStart() {
    var testState = {};
    testState = start(testState);

    assertEqual(testState.currentPlayer, 'X');
    assertEqual(testState.grid.length, 3, "grid should be initialised")
}

function test() {
    testStart();
    testRecPlayerSwitch();
    testRecMoveSaving();
    // testHasWon(); 
}

function assertEqual(actual, expected, message) {
    if (actual === expected) {
        console.log("PASS");
    } else {
        if (message === undefined) {
            message = "";
        }
        console.error("FAIL:" + message, arguments.callee.caller.name, actual, expected);
    }
}

test();