<script lang="ts">
    import type { PageData } from './$types'
	let { data }: { data: PageData } = $props();
</script>

<style>
.publications {
    font-family: "Lato";
    margin: auto auto;
    padding: 25px 0;
    max-width: 900px;
}

.publications a {
    color: #1A0DAB;
    text-decoration: none;
}

.publications a:hover {
    text-decoration: underline;
}

.publications h1 {
    margin: 0 0 0.75em 0;
    text-align: center;
    font-size: 16pt;
    font-weight: 400;
}

.publication {
    padding: 12.5px 25px;
    margin-bottom: 5px;
}

.publication:hover {
    background-color: #dedede;
}

.publication h2 {
    font-size: 14pt;
    font-weight: 400;
    margin: 0 0;
}

.publication h3 {
    font-size: 12pt;
    font-weight: 300;
    margin: 0.75em 0;
}

.journal-name {
    font-style: italic;
    font-weight: 300;
}

.publication-year {
    float: right;
    font-weight: 300;
}

.github {
    float: right;
    font-weight: 300;
    margin-right: 15px;
}

.github a {
    color: #1A0DAB;
}

.github a:hover {
    text-decoration: underline;
}
</style>

<div class="publications">
<h1>Selected Publications</h1>
<div style="text-align: center; margin-bottom: 15px;">
    For a complete list, see 
    <a href="https://scholar.google.com/citations?user=bshgBtkAAAAJ&hl=en">
    https://scholar.google.com/citations?user=bshgBtkAAAAJ&hl=en
    </a>
</div>

{#each data.publications as publication(publication.title)}
<div class="publication">
    <a href="https://dx.doi.org/{publication.doi}"><h2>{publication.title}</h2></a>
    <h3>{publication.authors}</h3>
    <span class="journal-name">{publication.journal}</span><span class="publication-year">{publication.year}</span>
    {#if publication.git != null}
    <span class="github"><a href="{publication.git}">[code]</a></span>
    {/if}
</div>
{/each}

</div>
