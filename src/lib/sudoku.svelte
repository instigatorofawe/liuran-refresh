<script lang="ts">
import {solve_sudoku} from '$lib/pkg/wasm_modules'

let board = $state(Array(81).fill(""))
let selected = $state(null)
let message = $state("")

function onkeydown(event) {
    console.log(event.key)
    console.log(selected)
    switch (event.key) {
        case 'Escape':
            selected = null
            break
        case '1':
            if (selected != null) {
                board[selected] = "1"
            }
            break
        case '2':
            if (selected != null) {
                board[selected] = "2"
            }
            break
        case '3':
            if (selected != null) {
                board[selected] = "3"
            }
            break
        case '4':
            if (selected != null) {
                board[selected] = "4"
            }
            break
        case '5':
            if (selected != null) {
                board[selected] = "5"
            }
            break
        case '6':
            if (selected != null) {
                board[selected] = "6"
            }
            break
        case '7':
            if (selected != null) {
                board[selected] = "7"
            }
            break
        case '8':
            if (selected != null) {
                board[selected] = "8"
            }
            break
        case '9':
            if (selected != null) {
                board[selected] = "9"
            }
            break
    }
}

function select(index) {
    selected = index
}

function solve() {
    let result = solve_sudoku(board)
    if (result == undefined) {
        message = "Invalid board!"
    } else {
        board = result
    }
}

function reset() {
    board = Array(81).fill("")
    selected = null
    message = ""
}

</script>

<style>
:root {
    font-family: "Lato";
}

.row {
    display: flex;
}

.cell {
    height: 40px;
    width: 40px;
    display: flex;
    border: 1px solid;
    margin-bottom: -1px;
    margin-right: -1px;
}

.cell:last-child {
    border-right: 2px solid;
    width: 41px;
}

.left {
    border-left: 2px solid;
    width: 41px;
}

.top .cell {
    border-top: 2px solid;
    height: 41px;
}

.bottom .cell {
    border-bottom: 2px solid;
    height: 41px;
}

.cell:hover {
    background-color: #dfdfdf;
    cursor: pointer;
}

.selected {
    background-color: #d5b60a;
}

.selected:hover {
    background-color: #d5b60a;
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

<div style="margin-bottom: 15px; text-align: center;">
    <button onclick={() => solve()}>Solve</button>
    <button onclick={() => reset()}>Clear</button>
</div>

{#each [0, 1, 2, 3, 4, 5, 6, 7, 8] as rowIndex}
<div class="row" class:top={rowIndex % 3 == 0} class:bottom={rowIndex==8}>
    {#each [0, 1, 2, 3, 4, 5, 6, 7, 8] as colIndex}
    <div class="cell" class:selected={selected == rowIndex * 9 + colIndex} class:left={colIndex % 3 == 0} onclick={() => select(rowIndex * 9 + colIndex)}>
        <div style="margin: auto;">
        {board[rowIndex * 9 + colIndex]}
        </div>
    </div>
    {/each}
</div>
{/each}

<div style="min-height: 30px; margin-top: 25px; text-align: center;">
{message}
</div>

<svelte:window {onkeydown} />
