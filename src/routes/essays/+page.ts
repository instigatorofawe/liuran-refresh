import type { PageLoad } from "./$types";
import { parse } from "yaml";
import essays from "$lib/essays.yml?raw"

export const load: PageLoad = () => {
    return {
        essays: parse(essays)
    }
}
