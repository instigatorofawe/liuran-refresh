<script lang="ts">
    import type { PageData } from './$types'
    export let data: PageData;
</script>

<style>


.publications {
    font-family: "Lato";
    margin: auto auto;
    padding: 25px 25px 25px 25px;
    max-width: 900px;
}

.publications h1 {
    margin: 0 0 1.5em 0;
    text-align: center;
    font-size: 16pt;
    font-weight: 400;
}

.publication {
    margin-bottom: 25px;
}

.publication h2 {
    font-size: 14pt;
    font-weight: 400;
}

.publication h3 {
    font-size: 12pt;
    font-weight: 300;
}

.journal-name {
    font-style: italic;
    font-weight: 300;
}

.publication-year {
    float: right;
    font-weight: 300;
}

</style>

<div class="publications">
<h1>Selected Publications</h1>

{#each data.publications as publication(publication.title)}
<div class="publication">
<h2>{publication.title}</h2>
<h3>{publication.authors}</h3>
<span class="journal-name">{publication.journal}</span><span class="publication-year">{publication.year}</span>
</div>
{/each}

</div>
