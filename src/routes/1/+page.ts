import type { PageLoad } from "./$types"

export const load: PageLoad = async () => {
    const children = (await (await fetch('https://advent.sveltesociety.dev/data/2023/day-one.json')).json()) as ({
        name: string
        id: number
        tally: number
        naughty: boolean
    }[])
    children.map((child, index) => {
        child.id = index
        child.naughty = child.tally <= 0
    })
    return { children }
}