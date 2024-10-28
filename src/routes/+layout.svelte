<script>
import './styles.css'
</script>

<svelte:head>
    <title>Ran Liu</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
</svelte:head>

<div class="nav">
    <p>
        <a href="/">about</a> |
        <a href="/publications">publications</a> |
        <a href="/software">software</a> |
        <a href="/essays">essays</a>
    </p>
</div>

<div class="page-container">
    <slot />
</div>
