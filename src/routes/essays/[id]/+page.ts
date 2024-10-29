import type { PageLoad, EntryGenerator } from "./$types"
import essays from "$lib/essays.yml?raw"
import { marked } from 'marked'
import { parse } from "yaml"

export const load: PageLoad = async ({ fetch, params }) => {
    let response: Response | null = null
    const directory = parse(essays)

    for (let i = 0; i < directory.length; i++) {
        if (directory[i].id == params.id) {
            response = await fetch('/essays/' + directory[i].md + '?raw')
        }
    }

    if (response != null) {
        return {
            content: marked.parse(await response.text())
        }
    } else {
        return {
            content: ""
        }
    }

}

export const entries: EntryGenerator = () => {
    const directory = parse(essays)
    let result = []
    for (let i = 0; i < directory.length; i++) {
        result.push({ id: directory[i].id })
    }

    return result;
};
