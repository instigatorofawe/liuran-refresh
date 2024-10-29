<script lang="ts">
import { Tile, Board, SolutionTable } from '$lib/tictactoe'

let board = $state(new Board())
let message = $state("You are X")
let goFirst = $state(true)
const solver = SolutionTable.getInstance()

function reset() {
    board = new Board()

    if (!goFirst) {
        board = board.act(solver.solve(board))
        message = "You are O"
    } else {
        message = "You are X"
    }
}

function swap() {
    goFirst = !goFirst
    reset()
}

function handleAction(index: number) {
    if (board.winner() == Tile.Empty && board.tiles[index] == Tile.Empty) {
        let result = board.act(index)
        if (result.winner() == Tile.Empty && result.empty().length > 0) {
            result = result.act(solver.solve(result))
        }
        board = result

        if (result.winner() != Tile.Empty) {
            message = "The winner is " + result.winner() + "!"
        } else if (result.empty().length == 0){
            message = "It's a draw!"
        }
    }

}
</script>

<style>
div {
    font-family: "Lato";
    text-align: center;
}

.square {
    display: flex;
    height: 75px;
    width: 75px;
    border: 1px solid;
    margin: -0.5px -0.5px -0.5px -0.5px;
    text-align: center;
    float: left;
}

.square:hover {
    background-color: #dfdfdf;
    cursor: pointer;
}

.square p {
    font-size: 24pt;
    font-weight: bold;
    margin: auto auto auto auto;
}

.row {
    height: 75px;
    margin: 0 0 0 0;
    font-size: 0;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.2s;
}

button:hover {
    background-color: #dfdfdf;
}

button:focus, button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
</style>


<div style="margin-bottom: 15px;">
    <button onclick={() => reset()}>Reset</button>
    <button onclick={() => swap()}>Swap</button>
</div>

<div class="row">
    <div class="square" onclick={() => handleAction(0)}>
        <p>{board.tiles[0]}</p>
    </div>
    <div class="square" onclick={() => handleAction(1)}>
        <p>{board.tiles[1]}</p>
    </div>
    <div class="square" onclick={() => handleAction(2)}>
        <p>{board.tiles[2]}</p>
    </div>
</div>
<div class="row">
    <div class="square" onclick={() => handleAction(3)}>
        <p>{board.tiles[3]}</p>
    </div>
    <div class="square" onclick={() => handleAction(4)}>
        <p>{board.tiles[4]}</p>
    </div>
    <div class="square" onclick={() => handleAction(5)}>
        <p>{board.tiles[5]}</p>
    </div>
</div>
<div class="row">
    <div class="square" onclick={() => handleAction(6)}>
        <p>{board.tiles[6]}</p>
    </div>
    <div class="square" onclick={() => handleAction(7)}>
        <p>{board.tiles[7]}</p>
    </div>
    <div class="square" onclick={() => handleAction(8)}>
        <p>{board.tiles[8]}</p>
    </div>
</div>

<div style="min-height: 30px; margin-top: 25px;">
{message}
</div>

