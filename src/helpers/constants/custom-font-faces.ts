import ODRegular from "@/assets/fonts/OpenDyslexic-Regular.woff2?url"
import ODItalic from "@/assets/fonts/OpenDyslexic-Italic.woff2?url"
import ODBold from "@/assets/fonts/OpenDyslexic-Bold.woff2?url"
import ODBoldItalic from "@/assets/fonts/OpenDyslexic-BoldItalic.woff2?url"

export const customFontFaces = `
@font-face {
    font-family: 'OpenDyslexic';
    src: ${ODRegular} format('opentype');
    font-weight: 400;
    font-style: normal;
}

@font-face {
    font-family: 'OpenDyslexic';
    src: ${ODItalic} format('opentype');
    font-weight: 400;
    font-style: italic;
}

@font-face {
    font-family: 'OpenDyslexic';
    src: ${ODBold} format('opentype');
    font-weight: 700;
    font-style: normal;
}

@font-face {
    font-family: 'OpenDyslexic';
    src: ${ODBoldItalic} format('opentype');
    font-weight: 700;
    font-style: italic;
}
`