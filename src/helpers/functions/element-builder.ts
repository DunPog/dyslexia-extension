export function elementBuilder(tag: string, styles: Record<string, string>): HTMLElement {
    const node = document.createElement(tag)
    
    Object.assign(node.style, styles)
    
    return node
}