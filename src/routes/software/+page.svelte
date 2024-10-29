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

.clickable:hover {
    cursor: pointer;
}
</style>

<div class="software">
<h1>Open-source contributions</h1>

<div class="software-item">
<a href="https://github.com/mh105/somata"><h2>SOMATA: State-space oscillator modeling and time series analysis</h2></a>
<h3>State-space Oscillator Modeling And Time-series Analysis (SOMATA) is a Python library for state-space neural signal
processing algorithms developed in the Purdon Lab.</h3>
<h3>Authors: Mingjian He, Proloy Das, Ran Liu, Amanda Beck, Patrick Purdon</h3>
</div>

<h1>Toy projects</h1>

<div class="software-item clickable" onclick={goto("/software/tictactoe")}>
<h2>Tic-Tac-Toe Solver</h2>
<h3>
A Tic-Tac-Toe solver. The game is solved via tabular minimax, with reflection and rotation-invariant hashes computed in
order to reduce the number of game states to 765.
</h3>
</div>

</div>
