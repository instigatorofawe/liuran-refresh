import type { PageLoad } from "./$types";
import { parse } from 'yaml'
import manifest from '$lib/publications.yml?raw'

export const load: PageLoad = async ({ fetch }) => {

    let publications = parse(manifest)

    return {
        publications: publications
    }
}
