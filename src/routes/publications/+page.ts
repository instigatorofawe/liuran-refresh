import type { PageLoad } from "./$types";
import { parse } from 'yaml'
import publications from '$lib/publications.yml?raw'

export const load: PageLoad = async () => {

    return {
        publications: parse(publications)
    }
}
