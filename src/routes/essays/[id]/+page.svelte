<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<style>
.essay {
    font-family: "Lato";
    font-weight: 300;
    margin: auto;
    max-width: 850px;
    padding: 25px 25px;
}

.essay :global(h1) {
    padding: 0;
    margin: 0;
    font-size: 16pt;
    font-weight: 400;
    text-align: center;
}

.essay :global(h2) {
    padding: 0;
    margin: 0;
    font-size: 14pt;
    font-weight: 400;
}

.essay :global(p) {
    text-align: justify;
    text-indent: 2em;
}

.essay :global(a) {
    color: #1A0DAB;
    text-decoration: none;
}

.essay :global(a:hover) {
    text-decoration: underline;
}

.essay :global(ol), :global(ul) {
    padding-left: 2em;
}

.essay :global(li) {
    margin-bottom: 0.5em;
}

</style>

<div class="essay">
    <div class="essay-content">{@html data.content}</div>
</div>

