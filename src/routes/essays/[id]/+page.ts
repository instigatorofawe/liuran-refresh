import type { PageLoad, EntryGenerator } from "./$types"
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


export const entries: EntryGenerator = () => {
    let result = []
    let directory = parse(essays)
    for (let i = 0; i < directory.length; i++) {
        result.push({ id: directory[i].id })
    }

    return result;
};
