import { Readability } from "@mozilla/readability"

export function articleBuilder() {
    const html = document.documentElement.outerHTML

    const parser = new DOMParser()

    const parsedDocument = parser.parseFromString(html, 'text/html')

    return new Readability(parsedDocument).parse()
}