import { isProbablyReaderable, Readability } from "@mozilla/readability"

function readerable() {
    return isProbablyReaderable(document, {
        minContentLength: 100
    })
}

export function articleBuilder() {
    if (!readerable()) {
        return false
    }

    const documentClone = new DOMParser().parseFromString(
        document.documentElement.outerHTML,
        'text/html'
    )

    Object.defineProperty(documentClone, 'baseURI', {
        value: document.baseURI,
        configurable: true
    })

    const article = new Readability(documentClone).parse()

    return article?.textContent
}