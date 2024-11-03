<script lang="ts">
    import type { PageData } from "./$types"
    let { data }: { data: PageData } = $props()
</script>

<div class="publications">
    <h1>Selected publications</h1>
    <div style="text-align: center; margin-bottom: 15px; font-weight: 300;">
        For a complete list:
        <a href="https://scholar.google.com/citations?user=bshgBtkAAAAJ&hl=en">
            https://scholar.google.com/citations?user=bshgBtkAAAAJ&hl=en
        </a>
    </div>
    <div style="text-align: right; margin-right: 25px; font-weight: 300;">(*) denotes equal contribution</div>

    {#each data.publications as publication (publication.title)}
        <div class="publication">
            <a href="https://dx.doi.org/{publication.doi}"><h2>{publication.title}</h2></a>
            <h3>{publication.authors}</h3>
            <span class="journal-name">{publication.journal}</span><span class="publication-year"
                >{publication.year}</span
            >
            {#if publication.git != null}
                <span class="github"><a href={publication.git}>[code]</a></span>
            {/if}
        </div>
    {/each}
</div>

<style>
    .publications {
        font-family: "Lato";
        margin: auto auto;
        padding: 25px 0;
        max-width: 900px;
    }

    .publications a {
        color: #1a0dab;
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
        color: #1a0dab;
    }

    .github a:hover {
        text-decoration: underline;
    }
</style>
