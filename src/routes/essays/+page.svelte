<script lang="ts">
import { goto } from '$app/navigation'
import type { PageData } from './$types'
let { data }: { data: PageData } = $props()

let query = $state("")

function match(title: string, query: string) : boolean {
    if (query.length == 0) {
        return true
    }
    return (title.toLowerCase().includes(query.toLowerCase()))
}
</script>

<style>
.essays {
    margin: auto;
    font-family: "Lato";
    padding: 25px 0;
    max-width: 900px;
}

.essays h1 {
    text-align: center;
    font-size: 16pt;
    font-weight: 400;
}

.essaysTable {
    border-collapse: collapse;
    text-align: left;
    min-width: 900px;
    margin: 0 15px;
}

.essaysTable td,th {
    padding-top: 10px;
    padding-bottom: 10px;
}

.essaysTable td {
    font-weight: 300;
}

.essaysTable th {
    font-size: 14pt;
    font-weight: 400;
}

.essayTableRow:hover {
    background-color: #dfdfdf;
    cursor: pointer;
}

.essayTableCell:first-child {
    padding-left: 10px;
}

.essayTableCell:last-child {
    padding-right: 10px;
}

.essayTableCell:not(:last-child) {
    padding-right: 50px;
}

.searchBox {
    text-align: right;
    padding-right: 10px;
}

@media only screen and (max-width: 1024px) {
    .essaysTable {
        min-width: 0;
    }
    .essayTableCell:not(:last-child) {
      padding-right: 25px;
    }
}
</style>

<div class="essays">
    <h1>Essays</h1>

    <table class="essaysTable">
    <thead>
    <tr>
    <td class="searchBox" colspan="2">
        <label>Filter by title: <input bind:value={query} style="margin-left: 10px;" /></label>
    </td>
    </tr>
    <tr>
        <th class="essayTableCell">Title</th>
        <th class="essayTableCell" style="text-align: right;">Date</th>
    </tr>
    </thead>

    <tbody>

    {#each data.essays as essay}
        {#if match(essay.title, query)}
        <tr class="essayTableRow" onclick={goto("/essays/" + essay.id)}>
            <td class="essayTableCell">{@html essay.title}
            </td>
            <td class="essayTableCell" style="text-align: right;">
                {new Date(essay.date).toLocaleDateString()}
            </td>
        </tr>
        {/if}
    {/each}
    </tbody>
    </table>

</div>
