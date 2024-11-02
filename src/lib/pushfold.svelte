<script>
import { solve_push_fold } from '$lib/pkg/wasm_modules'

const niter = 100

let stack = $state(5.0)
let sb = $state(0.5)
let ante = $state(0.125)
let strategy = $state(solve_push_fold(stack, sb, ante, niter))
let selected = $state("bu")

let push = $state("")
let bu_fold = $state("")
let call = $state("")
let bb_fold = $state("")

compute_freqs()

let hands = [
    "22", "32s", "42s", "52s", "62s", "72s", "82s", "92s", "T2s", "J2s", "Q2s", "K2s", "A2s",
    "32o", "33", "43s", "53s", "63s", "73s", "83s", "93s", "T3s", "J3s", "Q3s", "K3s", "A3s",
    "42o", "43o", "44", "54s", "64s", "74s", "84s", "94s", "T4s", "J4s", "Q4s", "K4s", "A4s",
    "52o", "53o", "54o", "55", "65s", "75s", "85s", "95s", "T5s", "J5s", "Q5s", "K5s", "A5s",
    "62o", "63o", "64o", "65o", "66", "76s", "86s", "96s", "T6s", "J6s", "Q6s", "K6s", "A6s",
    "72o", "73o", "74o", "75o", "76o", "77", "87s", "97s", "T7s", "J7s", "Q7s", "K7s", "A7s",
    "82o", "83o", "84o", "85o", "86o", "87o", "88", "98s", "T8s", "J8s", "Q8s", "K8s", "A8s",
    "92o", "93o", "94o", "95o", "96o", "97o", "98o", "99", "T9s", "J9s", "Q9s", "K9s", "A9s",
    "T2o", "T3o", "T4o", "T5o", "T6o", "T7o", "T8o", "T9o", "TT", "JTs", "QTs", "KTs", "ATs",
    "J2o", "J3o", "J4o", "J5o", "J6o", "J7o", "J8o", "J9o", "JTo", "JJ", "QJs", "KJs", "AJs",
    "Q2o", "Q3o", "Q4o", "Q5o", "Q6o", "Q7o", "Q8o", "Q9o", "QTo", "QJo", "QQ", "KQs", "AQs",
    "K2o", "K3o", "K4o", "K5o", "K6o", "K7o", "K8o", "K9o", "KTo", "KJo", "KQo", "KK", "AKs",
    "A2o", "A3o", "A4o", "A5o", "A6o", "A7o", "A8o", "A9o", "ATo", "AJo", "AQo", "AKo", "AA",
]

function reset() {
    stack = 5.0
    sb = 0.5
    ante = 0.125
    strategy = solve_push_fold(stack, sb, ante, niter)
    selected = "bu"
    compute_freqs()
}

function solve() {
    strategy = solve_push_fold(stack, sb, ante, niter)
    compute_freqs()
}

function select(id) {
    selected = id
}

function compute_freqs() {
    let strategy_bu = 0;
    let strategy_bb = 0;
    for (let index = 0; index < 169; index++) {
        let i = Math.floor(index / 13);
        let j = index % 13;

        let combos;
        if (i == j) {
            combos = 6;
        } else if (i < j) {
            combos = 4;
        } else {
            combos = 12;
        }

        strategy_bu += strategy[index] * combos / 1326;
        strategy_bb += strategy[index + 169] * combos / 1326;
    }
    let formatter = new Intl.NumberFormat('en-US', {maximumSignificantDigits: 4})
    push = formatter.format(strategy_bu * 100)
    bu_fold = formatter.format((1-strategy_bu) * 100)
    call = formatter.format(strategy_bb * 100)
    bb_fold = formatter.format((1 - strategy_bb) * 100)
}
</script>

<style>
:root {
    font-family: "Lato";
}

.wrapper {
    display: flex;
    flex-direction: row;
}

.row {
    display: flex;
}

.cell {
    width: 51px;
    height: 51px;
    border: 1px solid;
    margin-right: -1px;
    margin-bottom: -1px;
    display: flex;
}

.cell:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.2);
}

.bet {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 49px;
    background-color: rgb(233, 150, 122);
    z-index: -1;
}

.call {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 49px;
    background-color: rgb(143, 188, 139);
    z-index: -1;
}

.fold {
    position: absolute;
    left: 0px;
    width: 49px;
    background-color: rgb(109, 162, 192);
    z-index: -1;
}

.information {

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

.selector {
    background-color: #efefef;
}

.selector:hover {
    cursor: pointer;
    background-color: #dfdfdf;
}

.selected {
    background-color: #afafaf;
}

.selected:hover {
    background-color: #afafaf;
}

.push-summary {
    background-color: rgb(233, 150, 122);
    padding: 5px 10px 5px 10px; 
    border-radius: 5px;
}

.call-summary {
    background-color: rgb(143, 188, 139);
    padding: 5px 10px 5px 10px; 
    border-radius: 5px;
}

.fold-summary {
    background-color: rgb(109, 162, 192);
    padding: 5px 10px 5px 10px; 
    border-radius: 5px;
}
</style>


<div style="margin-bottom: 15px; text-align: center;">
Stack (BB): <input bind:value={stack} style="width: 25px; margin-right: 15px;">
SB (BB): <input bind:value={sb} style="width: 25px; margin-right: 15px;">
Ante (BB): <input bind:value={ante} style="width: 45px; margin-right: 15px;">
<button onclick={() => solve()}>Solve</button>
<button onclick={() => reset()}>Default</button>
</div>

<div class="wrapper">
<div style="width: 40px; border: 1px solid; margin-right: -1px; margin-bottom: -1px;">
    <div style="height: 325px; border-bottom: 1px solid; display: flex;" class:selected={selected=="bu"}
    onclick={() => select("bu")} class="selector">
        <div style="margin: auto;">BU</div>
    </div>
    <div style="height: calc(649px - 325px); display: flex;" class:selected={selected=="bb"} onclick={() =>
    select("bb")} class="selector">
        <div style="margin: auto;">BB</div>
    </div>

</div>
<div>
{#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as rowIndex}
<div class="row">
    {#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as colIndex}
    <div class="cell">
        <div style="position: relative;">
        {#if selected == "bu"}
        <div class="bet" style="height: calc(49px * {strategy[168 - (rowIndex + 13 * colIndex)]});"></div>
        <div class="fold" style="top: calc(49px * {strategy[168 - (rowIndex + 13 * colIndex)]}); height: calc(49px * {(1-strategy[168 - (rowIndex + 13 * colIndex)])})"></div>
        {/if}

        {#if selected == "bb"}
        <div class="call" style="height: calc(49px * {strategy[337 - (rowIndex + 13 * colIndex)]});"></div>
        <div class="fold" style="top: calc(49px * {strategy[337 - (rowIndex + 13 * colIndex)]}); height: calc(49px * {(1-strategy[337 - (rowIndex + 13 * colIndex)])})"></div>
        {/if}

        </div>
        <div style="margin: auto;">
        {hands[168 - (rowIndex + 13 * colIndex)]}
        </div>
    </div>
    {/each}
</div>
{/each}
</div>
</div>

<div style="margin-top: 15px; text-align: center;">
BU:
<span class="push-summary" style="margin-left: 5px;">push {push}%</span>
<span class="fold-summary" style="margin-right: 25px;">fold {bu_fold}%</span>

BB:
<span class="call-summary" style="margin-left: 5px;">call {call}%</span>
<span class="fold-summary">fold {bb_fold}%</span>

</div>
