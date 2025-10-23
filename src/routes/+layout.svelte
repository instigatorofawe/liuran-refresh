<script lang="ts">
    import { page } from '$app/stores';
    import { afterNavigate } from '$app/navigation';
    import { trackPageView, trackNavigation, trackOutboundLink } from '$lib/analytics';
    import { onMount } from 'svelte';

    // Track page views on navigation
    afterNavigate((navigation) => {
        const url = navigation.to?.url.pathname || '';
        const title = document.title;
        trackPageView(url, title);
    });

    // Handle navigation clicks
    function handleNavClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        const link = target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href') || '';
        const text = link.textContent || '';

        // Check if it's an external link
        if (href.startsWith('http')) {
            trackOutboundLink(text, href);
        } else {
            trackNavigation(text, href);
        }
    }
</script>

<svelte:head>
    <title>Ran Liu</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
    <link
        href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Noto+Serif+SC:wght@200..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
        rel="stylesheet"
    />
</svelte:head>

<div class="nav" on:click={handleNavClick}>
    <div>
        <a href="/">about</a> |
        <a href="/publications">publications</a> |
        <a href="/software">software</a> |
        <a href="/essays">essays</a> |
        <a href="https://scholar.google.com/citations?user=bshgBtkAAAAJ&hl=en">scholar</a> |
        <a href="https://github.com/instigatorofawe">github</a> |
        <a href="https://www.linkedin.com/in/rliu14/">linkedin</a>
    </div>
</div>

<div class="page-container">
    <slot />
</div>

<style>
    :global(body) {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        margin: 0;
        background-color: #fcfcfc;
    }

    :global(div) {
        box-sizing: border-box;
    }

    .nav {
        display: flex;
        width: 100%;
        height: 70px;
        font-family: "Open Sans";
        color: #898989;
        border-bottom: 1px solid #dfdfdf;
    }

    .nav div {
        margin: auto auto;
        padding: 0 12px 0 12px;
    }

    .nav a {
        color: #898989;
        text-decoration: none;
    }

    .nav a:hover {
        color: #333333;
        text-decoration: underline;
    }

    .page-container {
        display: flex;
        flex-direction: column;
        min-height: calc(100vh - 70px);
    }
</style>
