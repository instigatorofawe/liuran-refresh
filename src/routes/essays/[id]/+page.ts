import type { PageLoad } from "./$types"
import essays from "$lib/essays.yml?raw"
import { marked } from 'marked'
import { parse } from "yaml"

export const load: PageLoad = async ({ fetch, params }) => {
    let directory = parse(essays)
    let response: Response | null = null

    for (let i = 0; i < directory.length; i++) {
        if (directory[i].id == params.id) {
            response = await fetch('/essays/' + directory[i].md)
        }
    }

    return {
        content: marked.parse(await response.text())
    }
}
