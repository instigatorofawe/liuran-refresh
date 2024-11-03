<script>
    import bio from "$lib/images/bio.jpg"
</script>

<div class="about-container">
    <div class="left-wrapper">
        <div class="left">
            <img src={bio} style="width: 250px; height: 250px; object-fit: cover; border-radius: 50%;" alt="Portrait" />
            <h1>Ran Liu</h1>
            <h2>Scientist and biomedical engineer</h2>
            <span><a href="mailto:me@liuran.net">me@liuran.net</a></span>
        </div>
    </div>

    <div class="right-wrapper">
        <div class="right">
            <h1>About</h1>
            <div>
                Currently, I'm a Postdoctoral Scholar with Dr. Patrick Purdon in the department of Anesthesiology,
                Perioperative and Pain Medicine at Stanford University. My research is funded in part by the NIH through
                an NIGMS NRSA fellowship (<a
                    href="https://reporter.nih.gov/search/I7PVmY38_EGQRCTeSb2Yzg/project-details/10899776"
                >
                    F32GM148114
                </a>).
            </div>

            <div>
                I work on computational models for treatment optimization in anesthesia and pain management. My projects
                include causal inference of average and individual treatment effects of surgical pain management
                strategies, Transformer models for interpretable predictions using diagnosis and procedure billing
                codes, and physiologically informed dynamic models of postoperative pain.
            </div>

            <div>
                Previously, I completed both my PhD (2021) and my BS (2016) in Biomedical Engineering at Johns Hopkins
                University.
            </div>

            <div style="color: #6f6f6f;">This page was last updated on November 3, 2024.</div>
        </div>
    </div>
</div>

<style>
    .about-container {
        display: flex;
        flex-direction: row;
        margin: auto auto;
    }

    .left {
        margin: auto;
        font-family: "Montserrat";
        text-align: center;
        margin-left: 25px;
        margin-right: 70px;
        max-width: 300px;
    }

    .left h1 {
        font-size: 20pt;
        font-weight: 600;
        margin-bottom: 0;
    }

    .left h2 {
        font-size: 14pt;
        font-weight: 400;
        max-width: 225px;
        margin: 0.75em auto;
    }

    .left span {
        font-weight: 400;
    }

    .left a {
        color: #000000;
        text-decoration: none;
    }

    .left a:hover {
        text-decoration: underline;
    }

    .right-wrapper {
        display: flex;
    }

    .right {
        margin: auto;
        float: left;
        font-family: "Lato";
        max-width: 600px;
        text-align: justify;
        margin-right: 25px;
    }

    .right h1 {
        font-size: 16pt;
        font-weight: 400;
    }

    .right div {
        font-weight: 300;
        margin-bottom: 1.25em;
    }

    .right a {
        color: #1a0dab;
        text-decoration: none;
    }

    .right a:hover {
        text-decoration: underline;
    }

    @media only screen and (max-width: 1024px) {
        .about-container {
            flex-direction: column;
            margin: 25px;
        }

        .left {
            margin: 0 auto;
        }

        .left h1 {
            font-size: 18pt;
        }

        .left h2 {
            font-size: 12pt;
            max-width: 300px;
            margin: 0.5em auto;
        }

        .left span {
            font-size: 11pt;
        }

        .right {
            margin: 0 auto;
        }
    }
</style>
