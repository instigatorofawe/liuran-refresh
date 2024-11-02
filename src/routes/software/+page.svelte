<script>
import { goto } from '$app/navigation'
</script>

<style>
.software {
    font-family: "Lato";
    margin: auto auto;
    padding: 25px 0;
    max-width: 900px;
}

.software h1 {
    margin: 0 0 0.75em 0;
    text-align: center;
    font-size: 16pt;
    font-weight: 400;
}

.software h1:not(:first-child) {
    margin-top: 0.75em;
}

.software a {
    color: #1a0dab;
    text-decoration: none;
}

.software a:hover {
    text-decoration: underline;
}

.software-item {
    padding: 12.5px 25px;
    margin-bottom: 5px;
}

.software-item:hover {
    background-color: #dedede;
}

.software-item h2 {
    font-size: 14pt;
    font-weight: 400;
    margin: 0 0;
}

.software-item h3 {
    font-size: 12pt;
    font-weight: 300;
    margin: 0.75em 0;
}

.description {
    font-size: 12pt;
    font-weight: 300;
    margin: 0.75em 0;
}

.clickable:hover {
    cursor: pointer;
}
</style>

<div class="software">
<h1>Open-source contributions</h1>

<div class="software-item">
<a href="https://github.com/mh105/somata"><h2>SOMATA: State-space oscillator modeling and time series analysis</h2></a>
<div class="description">State-space Oscillator Modeling And Time-series Analysis (SOMATA) is a Python library for state-space neural signal
processing algorithms developed in the Purdon Lab.</div>
<h3>Authors: Mingjian He, Proloy Das, Ran Liu, Amanda Beck, Patrick Purdon</h3>
</div>

<h1>Toy projects</h1>

<div class="software-item clickable" onclick={goto("/software/pushfold")}>
<h2>Push/Fold Heads Up Texas Hold'em Solver</h2>
<div class="description">
A Nash equilibrium solver for the 2-player Push/Fold (all-in or fold preflop) subgame of Texas Hold'em, written in Rust
and compiled to WebAssembly. The game is solved via <a href="https://arxiv.org/abs/1407.5042">CFR+</a>, a counterfactual
regret minimization algorithm variant with good empirical performance. Precomputed tables of equities and matchup
probabilities allow fast solutions even on mobile devices.
</div>
</div>

<div class="software-item clickable" onclick={goto("/software/sudoku")}>
<h2>Sudoku Solver</h2>
<div class="description">
A Sudoku solver, written in Rust and compiled to WebAssembly. Empty cells with only one possible solution are filled in
first, before resorting to depth-first search and backtracking, starting with the cell with the fewest possible
candidates.
</div>
</div>

<div class="software-item clickable" onclick={goto("/software/tictactoe")}>
<h2>Tic-Tac-Toe Solver</h2>
<div class="description">
A Tic-Tac-Toe solver. The game is solved via tabular minimax, with reflection and rotation-invariant hashes computed in
order to reduce the number of game states to 765.
</div>
</div>

</div>
