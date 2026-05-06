export const styleDictionary = {
    fontFamily: (value:string) => `font-family: ${value} !important`,
    fontSize: (value:string) => `font-size: ${value}px !important`,
    interLetterSpacing: (value:string) => `letter-spacing: ${value}% !important`,
    interWordSpacing: (value:string) => `word-spacing: ${value}% !important`,
    lineSpacing: (value:string) => `line-height: ${value} !important`,
} as const