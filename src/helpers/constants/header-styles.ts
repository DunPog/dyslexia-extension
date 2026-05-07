export function headerStyles(fontSize: string): string {
    const h6FontSize = Number(fontSize) * 1.2
    const h5FontSize = h6FontSize * 1.2
    const h4FontSize = h5FontSize * 1.2
    const h3FontSize = h4FontSize * 1.2
    const h2FontSize = h3FontSize * 1.2
    const h1FontSize = h2FontSize * 1.2

    return `
        h6 {
            font-size: ${Math.round(h6FontSize)}px !important;
        }

        h5 {
            font-size: ${Math.round(h5FontSize)}px !important;
        }

        h4 {
            font-size: ${Math.round(h4FontSize)}px !important;
        }

        h3 {
            font-size: ${Math.round(h3FontSize)}px !important;
        }

        h2 {
            font-size: ${Math.round(h2FontSize)}px !important;
        }

        h1 {
            font-size: ${Math.round(h1FontSize)}px !important;
        }
    `
}