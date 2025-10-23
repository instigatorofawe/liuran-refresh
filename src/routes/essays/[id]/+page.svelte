<script lang="ts">
    import type { PageData } from "./$types"
    import { trackScrollDepth, trackEssayEngagement } from "$lib/analytics"
    import { onMount, onDestroy } from "svelte"
    import { page } from "$app/stores"
    import { browser } from "$app/environment"

    let { data }: { data: PageData } = $props()

    let scrollDepths = new Set<number>()
    let startTime = 0
    let maxScrollDepth = 0

    function handleScroll() {
        if (!browser) return

        const windowHeight = window.innerHeight
        const documentHeight = document.documentElement.scrollHeight
        const scrollTop = window.scrollY || document.documentElement.scrollTop

        const scrollPercent = Math.round((scrollTop / (documentHeight - windowHeight)) * 100)
        maxScrollDepth = Math.max(maxScrollDepth, scrollPercent)

        // Track specific milestones
        const milestones = [25, 50, 75, 90, 100]
        for (const milestone of milestones) {
            if (scrollPercent >= milestone && !scrollDepths.has(milestone)) {
                scrollDepths.add(milestone)
                trackScrollDepth(milestone, $page.url.pathname)
            }
        }
    }

    function trackEngagement() {
        if (startTime > 0) {
            const timeSpent = Math.round((Date.now() - startTime) / 1000)
            const essayId = $page.params.id || 'unknown'
            trackEssayEngagement(essayId, timeSpent, maxScrollDepth)
        }
    }

    onMount(() => {
        if (browser) {
            startTime = Date.now()
            window.addEventListener('scroll', handleScroll, { passive: true })
            handleScroll() // Check initial scroll position
        }
    })

    onDestroy(() => {
        if (browser) {
            window.removeEventListener('scroll', handleScroll)
            trackEngagement()
        }
    })
</script>

<div class="essay">
    <div class="essay-content">{@html data.content}</div>
</div>

<style>
    .essay {
        font-family: "Lato", "Noto Serif SC";
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
        color: #1a0dab;
        text-decoration: none;
    }

    .essay :global(a:hover) {
        text-decoration: underline;
    }

    .essay :global(ol),
    :global(ul) {
        padding-left: 2em;
    }

    .essay :global(li) {
        margin-bottom: 0.5em;
    }
</style>
