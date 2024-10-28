import type { PageLoad } from "./$types";
import { parse } from 'yaml'

export const load: PageLoad = async ({ fetch }) => {

    let response = await fetch('../publications.yml')
    let publications = parse(await response.text())

    return {
        publications: publications
    }
}
